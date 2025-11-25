package usecase

import (
	"context"
	"database/sql"
	"errors"
	"math/rand"
	"strings"
	"time"
	"unicode/utf8"

	"github.com/oklog/ulid/v2"

	"db/dao"   // ← go.mod の module に合わせて
	"db/model" // ← go.mod の module に合わせて
)

var (
	ErrInvalidName = errors.New("invalid name")
	ErrInvalidAge  = errors.New("invalid age")
)

// ユースケースの公開インターフェース
type RegisterUserUsecase interface {
	Register(ctx context.Context, name string, age int) (id string, err error)
}

// 具体実装（依存：DAO と *sql.DB）
type registerUserUsecase struct {
	userDAO dao.UserDAO
	db      *sql.DB
}

// コンストラクタ（依存を注入）
func NewRegisterUserUsecase(userDAO dao.UserDAO, db *sql.DB) RegisterUserUsecase {
	return &registerUserUsecase{userDAO: userDAO, db: db}
}

// 本体
func (uc *registerUserUsecase) Register(ctx context.Context, name string, age int) (id string, err error) {
	// 1) 入力チェック
	name = strings.TrimSpace(name)
	if name == "" || utf8.RuneCountInString(name) > 50 {
		return "", ErrInvalidName
	}
	if age < 20 || age > 80 {
		return "", ErrInvalidAge
	}

	// 2) ULID 生成
	entropy := ulid.Monotonic(rand.New(rand.NewSource(time.Now().UnixNano())), 0)
	id = ulid.MustNew(ulid.Timestamp(time.Now()), entropy).String()

	u := model.User{ID: id, Name: name, Age: age}

	// 3) トランザクション
	tx, err := uc.db.BeginTx(ctx, nil)
	if err != nil {
		return "", err
	}
	defer func() {
		if err != nil {
			_ = tx.Rollback()
		}
	}()

	// 4) DAO 経由で INSERT
	if err = uc.userDAO.Insert(ctx, tx, u); err != nil {
		return "", err
	}

	// 5) コミット
	if err = tx.Commit(); err != nil {
		return "", err
	}
	return id, nil
}

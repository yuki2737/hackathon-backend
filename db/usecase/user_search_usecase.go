package usecase

import (
	"context"
	"strings"

	"db/dao"
	"db/model"
)

type SearchUserUsecase interface {
	Search(ctx context.Context, name string) ([]model.User, error)
}

type searchUserUsecase struct {
	userDAO dao.UserDAO
}

func NewSearchUserUsecase(userDAO dao.UserDAO) SearchUserUsecase {
	return &searchUserUsecase{userDAO: userDAO}
}

func (uc *searchUserUsecase) Search(ctx context.Context, name string) ([]model.User, error) {
	name = strings.TrimSpace(name)
	if name == "" {
		// 空なら空配列返す or エラー。ここでは空配列にしておく
		return []model.User{}, nil
	}
	return uc.userDAO.FindByName(ctx, name)
}

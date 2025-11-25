package dao

import (
	"context"
	"database/sql"
	"fmt"

	"db/model"
)

type UserDAO interface {
	FindByName(ctx context.Context, name string) ([]model.User, error)
	Insert(ctx context.Context, tx *sql.Tx, u model.User) error
}

type userMySQL struct {
	db *sql.DB
}

func NewUserMySQL(db *sql.DB) UserDAO {
	return &userMySQL{db: db}
}

func (r *userMySQL) FindByName(ctx context.Context, name string) ([]model.User, error) {
	rows, err := r.db.QueryContext(ctx, `SELECT id, name, age FROM user WHERE name = ?`, name)
	if err != nil {
		return nil, fmt.Errorf("query: %w", err)
	}
	defer rows.Close()

	var out []model.User
	for rows.Next() {
		var u model.User
		if err := rows.Scan(&u.ID, &u.Name, &u.Age); err != nil {
			return nil, fmt.Errorf("scan: %w", err)
		}
		out = append(out, u)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("rows: %w", err)
	}
	return out, nil
}

func (r *userMySQL) Insert(ctx context.Context, tx *sql.Tx, u model.User) error {
	if _, err := tx.ExecContext(ctx, `INSERT INTO user (id, name, age) VALUES (?, ?, ?)`, u.ID, u.Name, u.Age); err != nil {
		return fmt.Errorf("insert: %w", err)
	}
	return nil
}

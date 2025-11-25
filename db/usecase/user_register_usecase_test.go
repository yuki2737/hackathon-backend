package usecase

import (
	"context"
	"strings"
	"testing"
)

// 便利関数: 文字数nの'a'で埋めた文字列を作る
func repeat(r rune, n int) string {
	var b strings.Builder
	for i := 0; i < n; i++ {
		b.WriteRune(r)
	}
	return b.String()
}

func TestRegister_ValidationErrors(t *testing.T) {
	uc := NewRegisterUserUsecase(nil, nil) // daoもdbもnilでOK（バリデーションでreturnするため）

	tests := []struct {
		name    string
		inName  string
		inAge   int
		wantErr error
	}{
		{
			name:    "empty name",
			inName:  "",
			inAge:   25,
			wantErr: ErrInvalidName,
		},
		{
			name:    "name is only spaces (TrimSpaceで空扱い)",
			inName:  "   ",
			inAge:   25,
			wantErr: ErrInvalidName,
		},
		{
			name:    "name too long (>50 runes)",
			inName:  repeat('a', 51),
			inAge:   25,
			wantErr: ErrInvalidName,
		},
		{
			name:    "age too small (<20)",
			inName:  "taro",
			inAge:   19,
			wantErr: ErrInvalidAge,
		},
		{
			name:    "age too large (>80)",
			inName:  "taro",
			inAge:   81,
			wantErr: ErrInvalidAge,
		},
	}

	ctx := context.Background()
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			_, err := uc.Register(ctx, tt.inName, tt.inAge)
			if err == nil {
				t.Fatalf("expected error %v, got nil", tt.wantErr)
			}
			if err != tt.wantErr {
				t.Fatalf("unexpected error: want=%v got=%v", tt.wantErr, err)
			}
		})
	}
}

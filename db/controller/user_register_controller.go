package controller

import (
	"encoding/json"
	"net/http"

	"db/usecase"
)

type userRegisterHandler struct {
	uc usecase.RegisterUserUsecase
}

func NewUserRegisterHandler(uc usecase.RegisterUserUsecase) http.Handler {
	return &userRegisterHandler{uc: uc}
}

type userReq struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

type userRegRes struct {
	ID string `json:"id"`
}

func (h *userRegisterHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}

	var req userReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	id, err := h.uc.Register(r.Context(), req.Name, req.Age)
	if err != nil {
		switch err {
		case usecase.ErrInvalidName, usecase.ErrInvalidAge:
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		default:
			http.Error(w, "internal error", http.StatusInternalServerError)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(userRegRes{ID: id})
}

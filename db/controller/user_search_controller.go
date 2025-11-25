package controller

import (
	"encoding/json"
	"net/http"

	"db/usecase"
)

type userSearchHandler struct {
	uc usecase.SearchUserUsecase
}

func NewUserSearchHandler(uc usecase.SearchUserUsecase) http.Handler {
	return &userSearchHandler{uc: uc}
}

func (h *userSearchHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	name := r.URL.Query().Get("name")
	users, err := h.uc.Search(r.Context(), name)
	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	type userRes struct {
		ID   string `json:"id"`
		Name string `json:"name"`
		Age  int    `json:"age"`
	}
	out := make([]userRes, 0, len(users))
	for _, u := range users {
		out = append(out, userRes{ID: u.ID, Name: u.Name, Age: u.Age})
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(out)
}

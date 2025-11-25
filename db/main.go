package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	_ "github.com/go-sql-driver/mysql"

	"db/controller"
	"db/dao"
	"db/usecase"
)

func main() {
	// --- DB接続 ---
	db, err := openMySQL()
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// --- 依存を配線 ---
	userDAO := dao.NewUserMySQL(db)
	searchUC := usecase.NewSearchUserUsecase(userDAO)
	registerUC := usecase.NewRegisterUserUsecase(userDAO, db) // Txのため *sql.DB も渡す

	mux := http.NewServeMux()
	mux.Handle("/user", controller.NewUserSearchHandler(searchUC))              // GET /user?name=...
	mux.Handle("/user/register", controller.NewUserRegisterHandler(registerUC)) // POST /user/register

	// --- DBテスト用ハンドラー —--
	mux.HandleFunc("/test-db", func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		// INSERT
		_, err := db.ExecContext(ctx, "INSERT INTO USER(name) VALUES(?)", "test-user")
		if err != nil {
			log.Printf("INSERT error: %v", err)
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "INSERT failed: %v", err)
			return
		}

		// SELECT
		rows, err := db.QueryContext(ctx, "SELECT id, name FROM USER")
		if err != nil {
			log.Printf("SELECT error: %v", err)
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "SELECT failed: %v", err)
			return
		}
		defer rows.Close()

		fmt.Fprintf(w, "Users:\n")
		for rows.Next() {
			var id int
			var name string
			rows.Scan(&id, &name)
			fmt.Fprintf(w, "id=%d name=%s\n", id, name)
		}
	})

	// --- サーバ起動（Graceful Shutdown付き） ---
	srv := &http.Server{Addr: ":8000", Handler: mux}

	go func() {
		log.Println("Listening on :8000")
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("server error: %v", err)
		}
	}()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
	<-stop

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Printf("shutdown error: %v", err)
	}
	log.Println("server stopped")
}

// --- ここだけがDB接続の実体（daoは *sql.DB を受け取るだけ） ---
func openMySQL() (*sql.DB, error) {
	user := os.Getenv("MYSQL_USER")
	pass := os.Getenv("MYSQL_PASSWORD")
	host := os.Getenv("MYSQL_HOST")
	if host == "" {
		host = "localhost"
	}
	port := os.Getenv("MYSQL_PORT")
	if port == "" {
		port = "3306"
	}
	dbname := os.Getenv("MYSQL_DATABASE")

	// 例) test_user:password@(localhost:3306)/test_database?parseTime=true&charset=utf8mb4
	dsn := fmt.Sprintf("%s:%s@(%s:%s)/%s?parseTime=true&charset=utf8mb4", user, pass, host, port, dbname)

	db, err := sql.Open("mysql", dsn) // まだ接続しない（プール作成）
	if err != nil {
		return nil, fmt.Errorf("sql.Open: %w", err)
	}
	if err := db.Ping(); err != nil { // 実際に接続確認
		_ = db.Close()
		return nil, fmt.Errorf("db.Ping: %w", err)
	}
	return db, nil
}

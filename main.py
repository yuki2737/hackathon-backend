from fastapi import FastAPI
import os
import pymysql

app = FastAPI()

def get_conn():
    return pymysql.connect(
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PWD"),
        host=os.getenv("MYSQL_HOST"),  # Cloud SQLの Public IP
        port=3306,
        database=os.getenv("MYSQL_DATABASE"),
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor
    )

@app.get("/")
def root():
    return {"status": "Cloud Run working!"}

@app.get("/test-db")
def test_db():
    try:
        conn = get_conn()
        with conn.cursor() as cursor:
            cursor.execute("SELECT NOW() AS time")
            result = cursor.fetchone()
        conn.close()
        return {"message": "DB Connected!", "time": result["time"]}
    except Exception as e:
        return {"error": str(e)}

@app.post("/insert-user")
def insert_user(name: str):
    try:
        conn = get_conn()
        with conn.cursor() as cursor:
            cursor.execute("INSERT INTO users (name) VALUES (%s)", (name,))
        conn.commit()
        conn.close()
        return {"message": f"Inserted user: {name}"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/list-users")
def list_users():
    try:
        conn = get_conn()
        with conn.cursor() as cursor:
            cursor.execute("SELECT id, name, created_at FROM users")
            rows = cursor.fetchall()
        conn.close()
        return rows
    except Exception as e:
        return {"error": str(e)}
from fastapi import FastAPI
import os
import pymysql

app = FastAPI()

def get_conn():
    return pymysql.connect(
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PWD"),
        host=os.getenv("MYSQL_HOST"),  # /cloudsql/... が入る
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

@app.get("/create-table")
def create_table():
    try:
        conn = get_conn()
        with conn.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS test_table (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
        conn.commit()
        conn.close()
        return {"message": "テーブル作成成功！"}
    except Exception as e:
        return {"error": str(e)}

@app.post("/insert")
def insert(name: str):
    try:
        conn = get_conn()
        with conn.cursor() as cursor:
            cursor.execute("INSERT INTO test_table (name) VALUES (%s)", (name,))
        conn.commit()
        conn.close()
        return {"message": "INSERT成功！", "name": name}
    except Exception as e:
        return {"error": str(e)}

@app.get("/select")
def select():
    try:
        conn = get_conn()
        with conn.cursor() as cursor:
            cursor.execute("SELECT id, name, created_at FROM test_table")
            result = cursor.fetchall()
        conn.close()
        return {"data": result}
    except Exception as e:
        return {"error": str(e)}
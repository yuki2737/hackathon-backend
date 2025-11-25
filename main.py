from fastapi import FastAPI
import os
import pymysql

app = FastAPI()

def get_conn():
    return pymysql.connect(
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PWD"),
        database=os.getenv("MYSQL_DATABASE"),
        unix_socket=f"/cloudsql/{os.getenv('MYSQL_INSTANCE')}",
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
from binascii import Error
from urllib import request
from fastapi import FastAPI, Form, HTTPException, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
import mysql.connector
from pydantic import BaseModel
from mysql.connector.errors import IntegrityError


app = FastAPI()
templates = Jinja2Templates(directory="templates")  # Asegúrate que este path sea correcto

db_config ={
 "host": "localhost",
 "user": "root",
 "password": "root",
 "database": "fastApiProductoNotas"  
}

class Estudiante(BaseModel):
    id: int
    nombre: str
    apellido: str
    edad: int
    celular: str

class Nota(BaseModel):
    id_nota: int
    id_estudiante: int
    matematicas: int
    ingles: int
    espanhol: int
    sociales: int
    comentario: str

@app.get("/api/v1")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/api/v1/estudiantes")
async def getAllStudents(request: Request):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("SELECT * from estudiante")
    resultados = cursor.fetchall()
    cursor.close()
    conn.close()

    print(resultados)

    return templates.TemplateResponse("estudiantes.html", {"request": request, "estudiantes": resultados})
    

@app.get("/api/v1/notas")
async def getAllNotas(request: Request):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("SELECT * from nota")
    resultados = cursor.fetchall()
    cursor.close()
    conn.close()
    return templates.TemplateResponse("notas.html", {"request": request, "notas": resultados})

@app.get("/api/v1/estudiantes/register")
async def getNewStudent(request: Request):
    return templates.TemplateResponse("newStudent.html", {"request": request})

@app.post("/api/v1/estudiantes")
async def create_new_student(
    id: int = Form(...),
    nombre: str = Form(...),
    apellido: str = Form(...),
    edad: int = Form(...),
    celular: str = Form(...)
):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "INSERT INTO estudiante (id, nombre, apellido, edad, celular) VALUES (%s, %s, %s, %s, %s)"
        values = (id, nombre, apellido, edad, celular)
        cursor.execute(query, values)
        conn.commit()

        # Redirige después de insertar
        return RedirectResponse(url="/api/v1/estudiantes", status_code=303)

    except IntegrityError:
        return HTMLResponse(content="<h3>Error: El ID ya está registrado.</h3>", status_code=409)
    except Error as e:
        return HTMLResponse(content=f"<h3>Error inesperado: {str(e)}</h3>", status_code=500)
    finally:
        cursor.close()
        conn.close()

@app.get("/api/v1/notas/register")
async def getNewNote(request: Request):
    return templates.TemplateResponse("newNote.html", {"request": request})

@app.post("/api/v1/notas")
async def create_new_nota(
        id_nota: int = Form(...),
        id_estudiante: int = Form(...),
        matematicas: int = Form(...),
        ingles: int = Form(...),
        espanhol: int = Form(...),
        sociales: int = Form(...),
        comentario: str = Form(...),
    ):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "INSERT INTO nota (id_nota, id_estudiante, matematicas, ingles, espanhol, sociales, comentario) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        values = (id_nota, id_estudiante, matematicas, ingles, espanhol, sociales, comentario)
        cursor.execute(query, values)

        conn.commit()  # guarda cambios

        cursor.close()
        conn.close()

        return RedirectResponse(url="/api/v1/notas", status_code=303)

    except IntegrityError as e:
        # FOREIGN KEY
        raise HTTPException(
            status_code=409,
            detail="No se puede registrar las notas, revisa tus credenciales"
        )
    except Error as e:
        return {"error": str(e)}
    finally:
        cursor.close()
        conn.close()
    
@app.get("/api/v1/notas/{id_nota}/editar")
async def getUpdateNote(id_nota: int, request: Request):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM nota WHERE id_nota = %s", (id_nota,))
    nota = cursor.fetchone()
    cursor.close()
    conn.close()

    if not nota:
        return {"error": "Nota no encontrada"}

    return templates.TemplateResponse("updateNote.html", {
        "request": request,
        "nota": nota
    })

@app.get("/api/v1/estudiantes/{id_estudiante}/editar")
async def getUpdateEstudiante(id_estudiante: int, request: Request):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM estudiante WHERE id = %s", (id_estudiante,))
    estudiante = cursor.fetchone()
    cursor.close()
    conn.close()

    if not estudiante:
        return {"error": "Nota no encontrada"}

    return templates.TemplateResponse("updateEstudiante.html", {
        "request": request,
        "estudiante": estudiante
    })

@app.post("/api/v1/estudiantes/{id}/editar")
async def actualizar_estudiante(id: int,
    nombre: str = Form(...),
    apellido: str = Form(...),
    edad: int = Form(...),
    celular: str = Form(...)
):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE estudiante
            SET nombre = %s, apellido = %s, edad = %s, celular = %s
            WHERE id = %s
        """, (nombre, apellido, edad, celular, id))
        conn.commit()
    except Exception as e:
        return {"error": str(e)}
    finally:
        cursor.close()
        conn.close()

    return RedirectResponse(url="/api/v1/estudiantes", status_code=303)

    
@app.post("/api/v1/notas/{id_nota}/editar")
async def actualizar_nota(
    id_nota: int,
    id_estudiante: int = Form(...),
    matematicas: float = Form(...),
    ingles: float = Form(...),
    espanhol: float = Form(...),
    sociales: float = Form(...),
    comentario: str = Form("")
):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE nota
            SET id_estudiante = %s, matematicas = %s, ingles = %s, espanhol = %s,
                sociales = %s, comentario = %s
            WHERE id_nota = %s
        """, (id_estudiante, matematicas, ingles, espanhol, sociales, comentario, id_nota))
        conn.commit()
    except Exception as e:
        return {"error": str(e)}
    finally:
        cursor.close()
        conn.close()

    return RedirectResponse(url="/api/v1/notas", status_code=303)

    
@app.post("/api/v1/estudiantes/{id}/eliminar")
async def deleteEstudent(id: int):
    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "DELETE FROM estudiante WHERE id = %s"
        values = (id,)
        cursor.execute(query, values)
        conn.commit()

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Estudiante no encontrado")

        return RedirectResponse(url="/api/v1/estudiantes", status_code=303)


    except IntegrityError as e:
        # FOREIGN KEY
        raise HTTPException(
            status_code=409,
            detail="No se puede eliminar el estudiante porque tiene notas asociadas."
        )

    except Error as e:
        raise HTTPException(status_code=500, detail=f"Error en la base de datos: {str(e)}")

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
    
@app.post("/api/v1/notas/{id}/eliminar")
async def deleteNota(id: int):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "DELETE FROM nota WHERE id_nota = %s"
        values = (id,)
        cursor.execute(query, values)

        conn.commit()  # guarda cambios

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Estudiante no encontrado")

        return RedirectResponse(url="/api/v1/notas", status_code=303)


    except Error as e:
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.get("/api/v1/reporte")
async def getReporte(request: Request):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("""
SELECT 
    e.id AS id_estudiante,
    e.nombre,
    e.apellido,
    e.edad,
    e.celular,
    n.id_nota,
    n.id_estudiante,
    n.matematicas,
    n.ingles,
    n.espanhol,
    n.sociales,
    n.comentario,
    ROUND((n.matematicas + n.ingles + n.espanhol + n.sociales) / 4, 2) AS promedio
FROM estudiante AS e
INNER JOIN nota AS n ON n.id_estudiante = e.id;
""")
    resultados = cursor.fetchall()
    cursor.close()
    conn.close() 
    return templates.TemplateResponse("reporte.html", {"request": request, "registros": resultados})

@app.post("/api/v1/reporte/generate")
async def generateReporte():

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM estudiante AS e INNER JOIN nota AS n ON n.id_estudiante = e.id")
    resultados = cursor.fetchall()
    cursor.close()
    conn.close() 

    with open("reporte.csv", "w", newline='') as f:
        for i in resultados:
            print(i[0])
            f.write(f"{i[0]},{i[1]},{i[2]},{i[3]},{i[4]},{i[5]},{i[6]},{i[7]},{i[8]},{i[9]},{i[10]}{i[11]}\n")

    return RedirectResponse(url="/api/v1/reporte", status_code=303)

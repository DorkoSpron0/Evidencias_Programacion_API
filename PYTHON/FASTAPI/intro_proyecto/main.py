from fastapi import FastAPI
from pydantic import BaseModel 

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Holi"}

@app.get("/saludo/{nombre}")
async def saludo(nombre: str):
    return {"message": f"hola {nombre}"}

class Persona(BaseModel):
    id: int
    nombre: str
    edad: int


@app.post("/persona")
async def crearPersona(persona: Persona):
    return {"mensaje": f"{persona.nombre} registrado en {persona.edad} años."}

@app.put("/persona/{id}")
async def updatePersona(persona: Persona):
    return {"mensaje": f"el nuevo nombre es: {persona.nombre} y la nueva edad es: {persona.edad}"}
    
@app.delete("/persona/{id}")
async def deletePersona(id: int):
    return {"mensaje": f"la persona con id {id} fue eliminada correctamente"}
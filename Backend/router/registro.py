# Archivo que contiene las rutas relacionadas el registro de usuarios
from fastapi import APIRouter, Depends, HTTPException
from Backend.schemas import Registro, RegistroCreate
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db
from typing import List, Optional

# Se crea un objeto router para manejar las rutas
router = APIRouter()

# Ruta para crear un registro
@router.post("/registro", response_model=Registro)
# Función que crea un usuario en la base de datos
def create_registro(registro: RegistroCreate, db: Session = Depends(get_db)):
    db_registro = db_models.Registro(
       # Datos que se deben colocar en el registro, al momento de crear un nuevo usuario
        email=registro.email,
        password=registro.password,
       
    )
    # Se añade el registro a la base de datos, si los datos son correctos
    db.add(db_registro)
    db.commit()
    db.refresh(db_registro)
    return db_registro
# Ruta para obtener todos los registros
@router.get("/registro")
# Función que obtiene todos los registros de la base de datos
def get_registros(db: Session = Depends(get_db)):
    registros = db.query(db_models.Registro).all()
    return registros

# Ruta para buscar registros por email
@router.get("/registro/buscar", response_model=List[Registro])
# Función que busca registros por email
def buscar_registros(email: str = '', db: Session = Depends(get_db)):
    # Busca si hay concidencias con el email
    registros = db.query(db_models.Registro).filter(db_models.Registro.email.ilike(f"%{email}%")).all()
    return registros

# Ruta para obtener un registro por su id
@router.get("/registro/{registro_id}")
# Función que obtiene un registro por su id
def get_registro(registro_id: int, db: Session = Depends(get_db)):
    registro = db.query(db_models.Registro).filter(db_models.Registro.id == registro_id).first()
    # Si no se encuentra el registro, se lanza un error
    if registro is None:
        raise HTTPException(status_code=404, detail="Registro not found")
    return registro


from fastapi import APIRouter, Depends, HTTPException
from Backend.schemas import Registro, RegistroCreate
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db

router = APIRouter()

@router.post("/registro", response_model=Registro)
def create_registro(registro: RegistroCreate, db: Session = Depends(get_db)):
    db_registro = db_models.Registro(
       
        email=registro.email,
        password=registro.password,
       
    )
    db.add(db_registro)
    db.commit()
    db.refresh(db_registro)
    return db_registro

@router.get("/registro")
def get_registros(db: Session = Depends(get_db)):
    registros = db.query(db_models.Registro).all()
    return registros

@router.get("/registro/{registro_id}")
def get_registro(registro_id: int, db: Session = Depends(get_db)):
    registro = db.query(db_models.Registro).filter(db_models.Registro.id == registro_id).first()
    if registro is None:
        raise HTTPException(status_code=404, detail="Registro not found")
    return registro
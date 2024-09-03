from fastapi import APIRouter, Depends, HTTPException
from Backend.schemas import Barbero
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db


router = APIRouter()

@router.post("/barberos")
def create_barbero(barbero: Barbero, db: Session = Depends(get_db)):
    db_barbero = db_models.Barbero(nombre=barbero.nombre, apellido=barbero.apellido, servicios_id=barbero.servicios_id)
    db.add(db_barbero)
    db.commit()
    db.refresh(db_barbero)
    return db_barbero

@router.get("/barberos")
def get_barberos(db: Session = Depends(get_db)):
    barberos = db.query(db_models.Barbero).all()
    return barberos
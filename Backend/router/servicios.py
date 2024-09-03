from fastapi import APIRouter, Depends, HTTPException
from Backend.schemas import Servicio
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db


router = APIRouter()

@router.post("/servicios")
def create_servicio(servicio: Servicio, db: Session = Depends(get_db)):
    db_servicio = db_models.Servicio(nombre=servicio.nombre)
    db.add(db_servicio)
    db.commit()
    db.refresh(db_servicio)
    return db_servicio

@router.get("/servicios")
def get_servicios(db: Session = Depends(get_db)):
    servicios = db.query(db_models.Servicio).all()
    return servicios

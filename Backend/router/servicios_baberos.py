from fastapi import APIRouter, Depends, HTTPException
from Backend.schemas import Servicio_Babero
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db


router = APIRouter()

@router.post("/servicios_baberos")

def create_servicio_babero(servicio_babero: Servicios_Baberos, db: Session = Depends(get_db)):
    db_servicio = db_models.Servicio(nombre=servicio_babero.nombre)
    db.add(db_servicio)
    db.commit()
    db.refresh(db_servicio)

    for barbero in servicio_babero.barberos:
        db_barbero = db.query(db_models.Barbero).filter_by(nombre=barbero.nombre, apellido=barbero.apellido).first()
        if not db_barbero:
            db_barbero = db_models.Barbero(nombre=barbero.nombre, apellido=barbero.apellido)
            db.add(db_barbero)
        db_servicio.barberos.append(db_barbero)
    db.commit()
    return db_servicio

@router.get("/servicios_baberos")
def get_servicios_baberos(db: Session = Depends(get_db)):
    servicios = db.query(db_models.Servicio).all()
    return servicios
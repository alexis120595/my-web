from fastapi import APIRouter, Depends, HTTPException
from Backend.schemas import Sucursal, SucursalCreate
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db

router = APIRouter()

@router.post("/sucursal")
def create_sucursal(sucursal: SucursalCreate, db: Session = Depends(get_db)):
    new_sucursal = db_models.Sucursal(**sucursal.dict())
    db.add(new_sucursal)
    db.commit()
    db.refresh(new_sucursal)
    return new_sucursal

@router.get("/sucursal/{sucursal_id}")
def get_sucursal(sucursal_id: int, db: Session = Depends(get_db)):
    sucursal = db.query(db_models.Sucursal).filter(db_models.Sucursal.id == sucursal_id).first()
    if not sucursal:
        raise HTTPException(status_code=404, detail="Sucursal no encontrada")
    return {
        "id": sucursal.id,
        "nombre": sucursal.nombre,
        "ubicacion": sucursal.ubicacion,
        "empresa": {
            "id": sucursal.empresa.id,
            "nombre": sucursal.empresa.nombre
        }
    }

@router.get("/sucursales")
def get_sucursales(db: Session = Depends(get_db)):
    sucursales = db.query(db_models.Sucursal).all()
    return sucursales


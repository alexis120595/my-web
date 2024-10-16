from fastapi import APIRouter, Depends, HTTPException
from Backend.schemas import Servicio, ServicioCreate
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db


router = APIRouter()

@router.post("/servicios")
def create_servicio(servicio: ServicioCreate, db: Session = Depends(get_db)):
    db_servicio = db_models.Servicio(nombre=servicio.nombre, descripcion=servicio.descripcion, precio=servicio.precio, duracion=servicio.duracion,  empresa_id=servicio.empresa_id)
    db.add(db_servicio)
    db.commit()
    db.refresh(db_servicio)

    return db_servicio

@router.get("/servicios")
def get_servicios(db: Session = Depends(get_db)):
    servicios = db.query(db_models.Servicio).all()
    return servicios

@router.get("/servicios/{servicio_id}", response_model=Servicio)
def get_servicio_barberos(servicio_id: int, db: Session = Depends(get_db)):
    servicio = db.query(db_models.Servicio).filter(db_models.Servicio.id == servicio_id).first()
    if servicio is None:
        raise HTTPException(status_code=404, detail="Servicio not found")
    
    # Incluye los barberos relacionados
    servicio_with_barberos = {
        "id": servicio.id,
        "nombre": servicio.nombre,
        "empresa_id": servicio.empresa_id,
        "barberos": servicio.barberos
    }
    return servicio_with_barberos

@router.get("/empresa/{empresa_id}/servicios", response_model=list[Servicio])
def get_servicios_by_empresa(empresa_id: int, db: Session = Depends(get_db)):
    servicios = db.query(db_models.Servicio).filter(db_models.Servicio.empresa_id == empresa_id).all()
    return servicios
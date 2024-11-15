from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Query
from Backend.schemas import Barbero, BarberoCreate, BarberoUpdate
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db
import cloudinary
import cloudinary.uploader
from typing import List


router = APIRouter()

@router.post("/barberos", response_model=Barbero)
def create_barbero(barbero: BarberoCreate, db: Session = Depends(get_db)):
    # Subir la imagen a Cloudinary
    result = cloudinary.uploader.upload(barbero.imagen_url)
    imagen_url = result.get("secure_url")

    db_barbero = db_models.Barbero(
        nombre=barbero.nombre,
        apellido=barbero.apellido,
        email=barbero.email,
        sucursal_id=barbero.sucursal_id,
        imagen_url=imagen_url,  # Guardar la URL de la imagen
        empresa_id=barbero.empresa_id

    )
    db.add(db_barbero)
    db.commit()
    db.refresh(db_barbero)
    return db_barbero

@router.get("/barberos")
def get_barberos(db: Session = Depends(get_db)):
    barberos = db.query(db_models.Barbero).all()
    return barberos

@router.get("/barberos/buscar", response_model=List[Barbero])
def search_barberos_by_name(nombre: str = Query(None, min_length=1), db: Session = Depends(get_db)):
    if nombre:
        barberos = db.query(db_models.Barbero).filter(db_models.Barbero.nombre.ilike(f"%{nombre}%")).all()
    else:
        barberos = db.query(db_models.Barbero).all()
    return barberos

@router.get("/barberos/{barbero_id}")
def get_barbero(barbero_id: int, db: Session = Depends(get_db)):
    barbero = db.query(db_models.Barbero).filter(db_models.Barbero.id == barbero_id).first()
    if barbero is None:
        raise HTTPException(status_code=404, detail="Barbero not found")
    barbero_with_horarios = {
        "id": barbero.id,
        "nombre": barbero.nombre,
        "apellido": barbero.apellido,
       
        "horarios": barbero.horarios
    }
    return barbero_with_horarios

@router.get("/empresa/{empresa_id}/barberos", response_model=list[Barbero])
def get_barberos_by_empresa(empresa_id: int, db: Session = Depends(get_db)):
    barberos = db.query(db_models.Barbero).filter(db_models.Barbero.empresa_id == empresa_id).all()
    return barberos

@router.put("/barberos/{barbero_id}", response_model=Barbero)
def update_barbero(barbero_id: int, barbero_update: BarberoUpdate, db: Session = Depends(get_db)):
    barbero = db.query(db_models.Barbero).filter(db_models.Barbero.id == barbero_id).first()
    if not barbero:
        raise HTTPException(status_code=404, detail="Barbero not found")

    if barbero_update.email:
        barbero.email = barbero_update.email
    if barbero_update.sucursal_id:
        barbero.sucursal_id = barbero_update.sucursal_id
    if barbero_update.servicio_id:
        barbero.servicios = db.query(db_models.Servicio).filter(db_models.Servicio.id.in_(barbero_update.servicio_id)).all()

    db.commit()
    db.refresh(barbero)
    return barbero

@router.get("/barberos/{barbero_id}", response_model=Barbero)
def get_barbero_by_id(barbero_id: int, db: Session = Depends(get_db)):
    barbero = db.query(db_models.Barbero).filter(db_models.Barbero.id == barbero_id).first()
    if barbero is None:
        raise HTTPException(status_code=404, detail="Barbero no encontrado")
    return barbero



from fastapi import APIRouter, Depends, HTTPException, Query
from Backend.schemas import  SucursalCreate, Sucursal, SucursalUpdate
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db
from typing import List

router = APIRouter()


@router.post("/sucursales", response_model=Sucursal)
def create_sucursal(sucursal: SucursalCreate, db: Session = Depends(get_db)):
    db_sucursal = db_models.Sucursal(**sucursal.dict())
    db.add(db_sucursal)
    db.commit()
    db.refresh(db_sucursal)
    return db_sucursal



@router.get("/empresa/{empresa_id}/sucursales", response_model=List[Sucursal])
def get_sucursales_by_empresa(empresa_id: int, db: Session = Depends(get_db)):
    sucursales = db.query(db_models.Sucursal).filter(db_models.Sucursal.empresa_id == empresa_id).all()
    return sucursales



@router.get("/sucursales/buscar", response_model=List[Sucursal])
def search_sucursales_by_name(nombre: str = Query(None, min_length=1), db: Session = Depends(get_db)):
    if nombre:
        sucursales = db.query(db_models.Sucursal).filter(db_models.Sucursal.nombre.ilike(f"%{nombre}%")).all()
    else:
        sucursales = db.query(db_models.Sucursal).all()
    return sucursales

@router.put("/sucursales/{sucursal_id}", response_model=Sucursal)
def update_sucursal(sucursal_id: int, sucursal_update: SucursalUpdate, db: Session = Depends(get_db)):
    sucursal = db.query(db_models.Sucursal).filter(db_models.Sucursal.id == sucursal_id).first()
    if not sucursal:
        raise HTTPException(status_code=404, detail="Sucursal not found")

    if sucursal_update.nombre is not None:
        sucursal.nombre = sucursal_update.nombre
    if sucursal_update.ubicacion is not None:
        sucursal.ubicacion = sucursal_update.ubicacion

    db.commit()
    db.refresh(sucursal)
    return sucursal

@router.delete("/sucursales/{sucursal_id}") 
def delete_sucursal(sucursal_id: int, db: Session = Depends(get_db)):
    sucursal = db.query(db_models.Sucursal).filter(db_models.Sucursal.id == sucursal_id).first()
    if not sucursal:
        raise HTTPException(status_code=404, detail="Sucursal not found")
    db.delete(sucursal)
    db.commit()
    return {"message": "Sucursal deleted"}









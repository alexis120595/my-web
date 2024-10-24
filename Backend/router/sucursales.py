from fastapi import APIRouter, Depends, HTTPException, Query
from Backend.schemas import  SucursalCreate, Sucursal
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



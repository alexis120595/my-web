# En este archivo se encuentran las rutas relacionadas a las sucursales
from fastapi import APIRouter, Depends, HTTPException, Query
from Backend.schemas import  SucursalCreate, Sucursal, SucursalUpdate
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db
from typing import List

# Crear un enrutador para las rutas relacionadas con las sucursales
router = APIRouter()

# Ruta para crear las sucursales

@router.post("/sucursales", response_model=Sucursal)

# Función para crear una sucursal 
def create_sucursal(sucursal: SucursalCreate, db: Session = Depends(get_db)):
    db_sucursal = db_models.Sucursal(**sucursal.dict())
    # Agregar la sucursal a la base de datos
    db.add(db_sucursal)
    db.commit()
    # Refrescar la base de datos
    db.refresh(db_sucursal)
    return db_sucursal

# Ruta para obtener las sucursales de una empresa en específico
@router.get("/empresa/{empresa_id}/sucursales", response_model=List[Sucursal])
# Función para obtener las sucursales de una empresa en específico
def get_sucursales_by_empresa(empresa_id: int, db: Session = Depends(get_db)):
    # Buscar las sucursales de la empresa en la base de datos y devolverlas si existen
    sucursales = db.query(db_models.Sucursal).filter(db_models.Sucursal.empresa_id == empresa_id).all()
    return sucursales

#Ruta para buscar sucursales por nombre
@router.get("/sucursales/buscar", response_model=List[Sucursal])
# Función para buscar sucursales por nombre
def search_sucursales_by_name(nombre: str = Query(None, min_length=1), db: Session = Depends(get_db)):
    # Buscar las sucursales por nombre en la base de datos y devolverlas si existen
    if nombre:
        sucursales = db.query(db_models.Sucursal).filter(db_models.Sucursal.nombre.ilike(f"%{nombre}%")).all()
    else:
        sucursales = db.query(db_models.Sucursal).all()
    return sucursales

# Ruta para editar una sucrsal en especifico
@router.put("/sucursales/{sucursal_id}", response_model=Sucursal)
# Función para editar una sucursal en especifico
def update_sucursal(sucursal_id: int, sucursal_update: SucursalUpdate, db: Session = Depends(get_db)):
    # Buscar la sucursal en la base de datos
    sucursal = db.query(db_models.Sucursal).filter(db_models.Sucursal.id == sucursal_id).first()
    # Si no se encuentra la sucursal, devolver un error
    if not sucursal:
        raise HTTPException(status_code=404, detail="Sucursal not found")
    # Si se encuentra la sucursal, actualizar los campos que se hayan enviado
    if sucursal_update.nombre is not None:
        sucursal.nombre = sucursal_update.nombre
    if sucursal_update.ubicacion is not None:
        sucursal.ubicacion = sucursal_update.ubicacion

    db.commit()
    db.refresh(sucursal)
    return sucursal

# Ruta para eliminar una sucursal en especifico
@router.delete("/sucursales/{sucursal_id}") 
# Función para eliminar una sucursal en especifico
def delete_sucursal(sucursal_id: int, db: Session = Depends(get_db)):
    # Buscar la sucursal en la base de datos
    sucursal = db.query(db_models.Sucursal).filter(db_models.Sucursal.id == sucursal_id).first()
    if not sucursal:
        raise HTTPException(status_code=404, detail="Sucursal not found")
    # Si se encuentra la sucursal, eliminarla de la base de datos
    db.delete(sucursal)
    db.commit()
    return {"message": "Sucursal deleted"}









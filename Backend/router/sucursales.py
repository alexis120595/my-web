from fastapi import APIRouter, Depends, HTTPException
from Backend.schemas import  SucursalCreate, Sucursal, Barbero
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db

router = APIRouter()

def get_empresa_id():
    # Aquí puedes obtener el ID de la empresa desde el contexto de la aplicación, el almacenamiento local, etc.
    # Por ejemplo, si estás usando autenticación, puedes obtener el ID de la empresa del usuario autenticado.
    # Para este ejemplo, simplemente devolveré un ID de empresa fijo.
    return 1

@router.post("/sucursal", response_model=Sucursal)
def create_sucursal(sucursal: SucursalCreate, db: Session = Depends(get_db), empresa_id: int = Depends(get_empresa_id)):
    new_sucursal = db_models.Sucursal(**sucursal.dict(), empresa_id=empresa_id)
    db.add(new_sucursal)
    db.commit()
    db.refresh(new_sucursal)
    return new_sucursal

@router.get("/sucursal/{sucursal_id}")
def get_sucursal(sucursal_id: int, db: Session = Depends(get_db)):
    sucursal = db.query(db_models.Sucursal).filter(db_models.Sucursal.id == sucursal_id).first()
    if not sucursal:
        raise HTTPException(status_code=404, detail="Sucursal no encontrada")
    barberos = db.query(db_models.Barbero).filter(db_models.Barbero.sucursal_id == sucursal_id).all()
    
    return {
        "id": sucursal.id,
        "nombre": sucursal.nombre,
        "ubicacion": sucursal.ubicacion,
        "empresa_id": sucursal.empresa_id,
        "barberos": [Barbero(
            id=barbero.id,
            nombre=barbero.nombre,
            apellido=barbero.apellido,
            servicios_id=barbero.servicios_id,
            sucursal_id=barbero.sucursal_id,
            imagen_url=barbero.imagen_url
        ) for barbero in barberos],
        "reservas": []  # Si tienes reservas, puedes agregarlas aquí
    }


@router.get("/sucursales")
def get_sucursales(db: Session = Depends(get_db)):
    sucursales = db.query(db_models.Sucursal).all()
    return sucursales

@router.get("/empresa/{empresa_id}/sucursales", response_model=list[Sucursal])
def obtener_sucursales(empresa_id: int, db: Session = Depends(get_db)):
   
    
    sucursales = db.query(db_models.Sucursal).filter(db_models.Sucursal.empresa_id == empresa_id).all()
    
    return sucursales




from fastapi import APIRouter, Depends, HTTPException, Query
from Backend.schemas import Servicio, ServicioCreate
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db
from typing import List


router = APIRouter()

@router.post("/servicios", response_model=Servicio)
def create_servicio(servicio: ServicioCreate, db: Session = Depends(get_db)):
    print(f"Datos recibidos: {servicio}")
    try:
        db_servicio = db_models.Servicio(
            nombre=servicio.nombre,
            tipo_de_servicio=servicio.tipo_de_servicio,
            descripcion=servicio.descripcion,
            precio=servicio.precio,
            seña=servicio.seña,
            duracion=servicio.duracion,
            modalidad=servicio.modalidad,
            empresa_id=servicio.empresa_id
        )
        db.add(db_servicio)
        db.commit()
        db.refresh(db_servicio)

        # Asociar barberos al servicio
        for barbero_id in servicio.barberos_ids:
            barbero = db.query(db_models.Barbero).filter(db_models.Barbero.id == barbero_id).first()
            if not barbero:
                raise HTTPException(status_code=404, detail=f"Barbero with id {barbero_id} not found")
            db_servicio.barberos.append(barbero)
        
        db.commit()
        db.refresh(db_servicio)

        print(f"Servicio creado: {db_servicio}")
        return db_servicio
    except Exception as e:
        print(f"Error al crear el servicio: {e}")
        raise HTTPException(status_code=500, detail="Error al crear el servicio")




@router.get("/servicios")
def get_servicios(db: Session = Depends(get_db)):
    servicios = db.query(db_models.Servicio).all()
    return servicios

@router.get("/servicios/buscar", response_model=List[Servicio])
def buscar_servicios(nombre: str = Query(None, min_length=1), db: Session = Depends(get_db)):
    servicios = db.query(db_models.Servicio).filter(db_models.Servicio.nombre.ilike(f"%{nombre}%")).all()
    if not servicios:
        raise HTTPException(status_code=404, detail="No se encontraron servicios con ese nombre")
    return servicios


@router.get("/servicios/{servicio_id}", response_model=Servicio)
def get_servicio_barberos(servicio_id: int, db: Session = Depends(get_db)):
    servicio = db.query(db_models.Servicio).filter(db_models.Servicio.id == servicio_id).first()
    if not servicio:
        raise HTTPException(status_code=404, detail="Servicio not found")
    return servicio

@router.get("/empresa/{empresa_id}/servicios", response_model=list[Servicio])
def get_servicios_by_empresa(empresa_id: int, db: Session = Depends(get_db)):
    servicios = db.query(db_models.Servicio).filter(db_models.Servicio.empresa_id == empresa_id).all()
    return servicios


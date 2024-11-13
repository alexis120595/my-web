from fastapi import APIRouter, Depends, HTTPException, Query, Path
from sqlalchemy.orm import Session, joinedload
from Backend.schemas import ReservaCreate, Reservas
from Backend.db import db_models
from Backend.db.database import get_db
from datetime import date
from typing import List

router = APIRouter()

@router.post("/reservas", response_model=Reservas)
def create_reserva(reserva: ReservaCreate, db: Session = Depends(get_db)):
    db_reserva = db_models.Reservas(**reserva.dict())
    db.add(db_reserva)
    db.commit()
    db.refresh(db_reserva)
    return db_reserva

@router.get("/reservas/usuario/{user_id}", response_model=List[Reservas])
def get_reservas_by_usuario(user_id: int, db: Session = Depends(get_db)):
    reservas = db.query(db_models.Reservas).options(
        joinedload(db_models.Reservas.servicio).joinedload(db_models.Servicio.empresa),
        joinedload(db_models.Reservas.barbero),
        joinedload(db_models.Reservas.horario)
    ).filter(db_models.Reservas.user_id == user_id).all()

    if not reservas:
        raise HTTPException(status_code=404, detail="No reservations found for this user")
    
    return reservas

@router.get("/reservas/fecha", response_model=List[Reservas])
def get_reservas_by_fecha(fecha: date = Query(...), db: Session = Depends(get_db)):
    reservas = db.query(db_models.Reservas).options(
        joinedload(db_models.Reservas.servicio),
        joinedload(db_models.Reservas.barbero)
    ).filter(db_models.Reservas.fecha == fecha).all()

   
    return reservas


@router.delete("/reservas/{reserva_id}")
def delete_reserva(reserva_id: int, db: Session = Depends(get_db)):
    db_reserva = db.query(db_models.Reservas).filter(db_models.Reservas.id == reserva_id).first()
    
    if db_reserva is None:
        raise HTTPException(status_code=404, detail="Reserva not found")
    
    db.delete(db_reserva)
    db.commit()
    return {"message": "Reserva deleted successfully"}


@router.get("/reservas")
def get_reservas( db: Session = Depends(get_db)):
    reservas = db.query(db_models.Reservas).options(
        joinedload(db_models.Reservas.servicio),
        joinedload(db_models.Reservas.barbero)
    ).all()

    reservas_detalle = [
        {
            "id": reserva.id,
            "fecha": reserva.fecha,
            "servicio": reserva.servicio.nombre,
            "barbero": reserva.barbero.nombre
        }
        for reserva in reservas
    ]
    
    return reservas_detalle


@router.get("/reservas/{reserva_id}")
async def get_reserva_id(reserva_id: int = Path(...), db: Session = Depends(get_db)):
    reserva = db.query(db_models.Reservas).options(
        joinedload(db_models.Reservas.servicio).joinedload(db_models.Servicio.empresa),
        joinedload(db_models.Reservas.barbero),
        joinedload(db_models.Reservas.horario)
    ).filter(db_models.Reservas.id == reserva_id).first()
    
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva not found")
    
    reserva_detalle = {
        "id": reserva.id,
        "fecha": reserva.fecha,
        "servicio": reserva.servicio.nombre,
        "barbero": reserva.barbero.nombre,
        "horario": reserva.horario.hora,
        "empresa": reserva.servicio.empresa.nombre,
        "ubicacion": reserva.servicio.empresa.ubicacion,
        "precio": reserva.servicio.precio
    }
    
    return reserva_detalle

@router.get("/reservas/empresa/{empresa_id}", response_model=List[Reservas])
def get_reservas_by_empresa(empresa_id: int, db: Session = Depends(get_db)):
    reservas = db.query(db_models.Reservas).options(
        joinedload(db_models.Reservas.servicio).joinedload(db_models.Servicio.empresa),
        joinedload(db_models.Reservas.barbero),
        joinedload(db_models.Reservas.horario),
        joinedload(db_models.Reservas.usuario)
    ).filter(db_models.Reservas.empresa_id == empresa_id).all()

    if not reservas:
        raise HTTPException(status_code=404, detail="No se encontraron reservas para esta empresa")
    
    return reservas












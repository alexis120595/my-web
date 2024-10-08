from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from Backend.schemas import ReservaCreate, Reservas
from Backend.db import db_models
from Backend.db.database import get_db

router = APIRouter()

@router.post("/reservas", response_model=Reservas)
def create_reserva(reserva: ReservaCreate, db: Session = Depends(get_db)):
    db_reserva = db_models.Reservas(**reserva.dict())
    db.add(db_reserva)
    db.commit()
    db.refresh(db_reserva)
    return db_reserva

@router.get("/reservas/ultima")
async def get_ultima_reserva(db: Session = Depends(get_db)):
    ultima_reserva = db.query(db_models.Reservas).options(
        joinedload(db_models.Reservas.servicio),
        joinedload(db_models.Reservas.barbero),
        joinedload(db_models.Reservas.horario)
    ).order_by(db_models.Reservas.id.desc()).first()
    
    if not ultima_reserva:
        raise HTTPException(status_code=404, detail="No reservations found")
    
    reserva_detalle = {
        "id": ultima_reserva.id,
        "fecha": ultima_reserva.fecha,
        "servicio": ultima_reserva.servicio.nombre,
        "barbero": ultima_reserva.barbero.nombre,
        "horario": ultima_reserva.horario.hora,
        "empresa": ultima_reserva.servicio.empresa.nombre,
        "ubicacion": ultima_reserva.servicio.empresa.ubicacion
    }
    
    return reserva_detalle



@router.get("/reservas/{reserva_id}", response_model=Reservas)
def read_reserva(reserva_id: int, db: Session = Depends(get_db)):
    db_reserva = db.query(db_models.Reservas).options(
        joinedload(db_models.Reservas.servicio),
        joinedload(db_models.Reservas.barbero),
        joinedload(db_models.Reservas.horario)
    ).filter(db_models.Reservas.id == reserva_id).first()
    
    if db_reserva is None:
        raise HTTPException(status_code=404, detail="Reserva not found")
    
    reserva_detalle = {
        "id": db_reserva.id,
        "fecha": db_reserva.fecha,
        "servicio": db_reserva.servicio.nombre,
        "barbero": db_reserva.barbero.nombre,
        "horario": db_reserva.horario.hora
    }
    
    return reserva_detalle






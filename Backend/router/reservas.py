from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
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
    ultima_reserva = db.query(db_models.Reservas).order_by(db_models.Reservas.id.desc()).first()
    if not ultima_reserva:
        raise HTTPException(status_code=404, detail="No reservations found")
    return ultima_reserva

@router.get("/reservas/{reserva_id}", response_model=Reservas)
def read_reserva(reserva_id: int, db: Session = Depends(get_db)):
    db_reserva = db.query(db_models.Reservas).filter(db_models.Reservas.id == reserva_id).first()
    if db_reserva is None:
        raise HTTPException(status_code=404, detail="Reserva not found")
    return db_reserva






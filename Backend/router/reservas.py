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




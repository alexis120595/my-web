from fastapi import APIRouter, Depends, HTTPException
from Backend.schemas import Horarios
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db


router = APIRouter()

@router.post("/horarios")

def create_horario(horario: Horarios, db: Session = Depends(get_db)):
    db_horario = db_models.Horarios(hora=horario.hora, estado=horario.estado, barbero_id=horario.barbero_id)
    db.add(db_horario)
    db.commit()
    db.refresh(db_horario)
    return db_horario

@router.get("/horarios")
def get_horarios(db: Session = Depends(get_db)):
    horarios = db.query(db_models.Horarios).all()
    return horarios




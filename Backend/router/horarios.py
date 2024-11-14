from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from Backend.schemas import Horarios, HorarioUpdate, HorariosCreate, MultiplesHorarios
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db
import asyncio


router = APIRouter()

@router.post("/horarios")

def create_horario(horario: HorariosCreate, db: Session = Depends(get_db)):
    db_horario = db_models.Horarios(hora=horario.hora, barbero_id=horario.barbero_id, empresa_id=horario.empresa_id)
    db.add(db_horario)
    db.commit()
    db.refresh(db_horario)
    return db_horario

@router.get("/horarios")
def get_horarios(db: Session = Depends(get_db)):
    horarios = db.query(db_models.Horarios).all()
    return horarios

@router.post("/horarios/multiples")
def crear_multiples_horarios(horarios_data: MultiplesHorarios, db: Session = Depends(get_db)):
    nuevos_horarios = []
    for horario_data in horarios_data.horarios:
        nuevo_horario = db_models.Horarios(
            hora=horario_data.hora,
            barbero_id=horario_data.barbero_id,
            empresa_id=horario_data.empresa_id
        )
        db.add(nuevo_horario)
        nuevos_horarios.append(nuevo_horario)
    db.commit()
    return {"message": "Horarios creados exitosamente", "horarios": [horario.id for horario in nuevos_horarios]}


@router.get("/horarios/{horario_id}")
def get_horario(horario_id: int, db: Session = Depends(get_db)):
    horario = db.query(db_models.Horarios).filter(db_models.Horarios.id == horario_id).first()
    if horario is None:
        raise HTTPException(status_code=404, detail="Horario not found")
    return horario

@router.get("/horarios/barbero/{barbero_id}")
def get_horarios_by_barbero(barbero_id: int, db: Session = Depends(get_db)):
    horarios = db.query(db_models.Horarios).filter(db_models.Horarios.barbero_id == barbero_id).all()
    return horarios

@router.put("/horarios/{horario_id}")
def update_horario(horario_id: int, horario: HorarioUpdate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db_horario = db.query(db_models.Horarios).filter(db_models.Horarios.id == horario_id).first()
    if not db_horario:
        raise HTTPException(status_code=404, detail="Horario not found")
    db_horario.estado = horario.estado
    db.commit()
    print(f"Horario {horario_id} actualizado a {horario.estado}")
    
    # Iniciar la tarea asíncrona para resetear el estado del horario después de un retraso
    background_tasks.add_task(reset_horario_estado, horario_id, 60, db)  # 60 segundos = 1 minuto
    
    return {"message": "Horario updated successfully"}

async def reset_horario_estado(horario_id: int, delay: int, db: Session):
    await asyncio.sleep(delay)
    db_horario = db.query(db_models.Horarios).filter(db_models.Horarios.id == horario_id).first()
    if db_horario:
        db_horario.estado = True
        db.commit()
        db.refresh(db_horario)
        print(f"Horario {horario_id} reseteado a True")







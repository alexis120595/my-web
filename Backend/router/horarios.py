# Archivo con las rutas para los horarios
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from Backend.schemas import Horarios, HorarioUpdate, HorariosCreate, MultiplesHorarios
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db
import asyncio

# Crear un router para las rutas de los horarios
router = APIRouter()

# Ruta para crear un horario
@router.post("/horarios")
# Función para crear un horario
def create_horario(horario: HorariosCreate, db: Session = Depends(get_db)):
    # Crear un horario en la base de datos
    db_horario = db_models.Horarios(hora=horario.hora, barbero_id=horario.barbero_id, empresa_id=horario.empresa_id)
    db.add(db_horario)
    db.commit()
    db.refresh(db_horario)
    return db_horario

# Ruta para obtener todos los horarios
@router.get("/horarios")
# Función para obtener todos los horarios
def get_horarios(db: Session = Depends(get_db)):
    horarios = db.query(db_models.Horarios).all()
    return horarios
# Ruta para crear múltiples horarios
@router.post("/horarios/multiples")
# Función para crear múltiples horarios
def crear_multiples_horarios(horarios_data: MultiplesHorarios, db: Session = Depends(get_db)):
    
    nuevos_horarios = []
    # Crear múltiples horarios en la base de datos, relacionados con un barbero y una empresa
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

# Ruta para obtener un horario por su ID
@router.get("/horarios/{horario_id}")
# Función para obtener un horario por su ID
def get_horario(horario_id: int, db: Session = Depends(get_db)):
    horario = db.query(db_models.Horarios).filter(db_models.Horarios.id == horario_id).first()
    if horario is None:
        raise HTTPException(status_code=404, detail="Horario not found")
    return horario
# Ruta para obtener los horarios de un barbero
@router.get("/horarios/barbero/{barbero_id}")
# Función para obtener los horarios de un barbero
def get_horarios_by_barbero(barbero_id: int, db: Session = Depends(get_db)):
    # Se obtienen los horarios relacionados con el ID del barbero
    horarios = db.query(db_models.Horarios).filter(db_models.Horarios.barbero_id == barbero_id).all()
    return horarios

# Ruta para actualizar el estado de una horario, una ves que se selccciona el mismo, para desabilitarlo
@router.put("/horarios/{horario_id}")
# Función para actualizar un horario por su ID
def update_horario(horario_id: int, horario: HorarioUpdate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db_horario = db.query(db_models.Horarios).filter(db_models.Horarios.id == horario_id).first()
    if not db_horario:
        raise HTTPException(status_code=404, detail="Horario not found")
    db_horario.estado = horario.estado
    db.commit()
    print(f"Horario {horario_id} actualizado a {horario.estado}")
    
    # Iniciar la tarea asíncrona para resetear el estado del horario después de un retraso
    # una vez que pasa el tiempo marcado el horario cambia el estado a disponible, para poder volver a ser utilizado 
    background_tasks.add_task(reset_horario_estado, horario_id, 60, db)  # 60 segundos = 1 minuto
    
    return {"message": "Horario updated successfully"}
# Función para resetear el estado del horario
async def reset_horario_estado(horario_id: int, delay: int, db: Session):
    await asyncio.sleep(delay)
    db_horario = db.query(db_models.Horarios).filter(db_models.Horarios.id == horario_id).first()
    if db_horario:
        # Establecer el estado del horario por defecto en true
        db_horario.estado = True
        db.commit()
        db.refresh(db_horario)
        print(f"Horario {horario_id} reseteado a True")







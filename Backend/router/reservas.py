# En este archivo encontrarás las rutas relacionadas a las reservas
from fastapi import APIRouter, Depends, HTTPException, Query, Path, BackgroundTasks
from sqlalchemy.orm import Session, joinedload
from Backend.schemas import ReservaCreate, Reservas
from Backend.db import db_models
from Backend.db.database import get_db
from datetime import date
from typing import List
from Backend.email_utils import enviar_email

# Crear un enrutador para las rutas relacionadas con las reservas
router = APIRouter()

# Ruta para crear una reserva
@router.post("/reservas", response_model=Reservas)
# Función para crear una reserva
def create_reserva(reserva: ReservaCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db) ):
    db_reserva = db_models.Reservas(**reserva.dict())
    db.add(db_reserva)
    db.commit()
    db.refresh(db_reserva)
    #Obtenere el id del usuario que esta creado la reserva y relacionarlo a la misma
    usuario = db.query(db_models.Registro).filter(db_models.Registro.id == reserva.user_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    #
    horario = db.query(db_models.Horarios).filter(db_models.Horarios.id == reserva.horario_id).first()
    if not horario:
        raise HTTPException(status_code=404, detail="Horario no encontrado")

    # Preparar el contenido del correo electrónico, una vez que se haya creado la reserva
    asunto = 'Confirmación de Reserva'
    html_contenido = f"""
    <h1>Hola </h1>

    <p>Tu reserva para el día {reserva.fecha} a las {horario.hora} ha sido confirmada.</p>
    <p>¡Te esperamos!</p>
    """

    # Enviar el correo en segundo plano
    background_tasks.add_task(enviar_email, usuario.email, asunto, html_contenido)

    return db_reserva

# Ruta para obtener las reservas de un usuario
@router.get("/reservas/usuario/{user_id}", response_model=List[Reservas])
# Función para obtener las reservas de un usuario
def get_reservas_by_usuario(user_id: int, db: Session = Depends(get_db)):
    # Datos que se obtienen de la reserva
    reservas = db.query(db_models.Reservas).options(
        joinedload(db_models.Reservas.servicio).joinedload(db_models.Servicio.empresa),
        joinedload(db_models.Reservas.barbero),
        joinedload(db_models.Reservas.horario)
    ).filter(db_models.Reservas.user_id == user_id).all()

    if not reservas:
        raise HTTPException(status_code=404, detail="No reservations found for this user")
    
    return reservas

# Ruta para obtener las reservas de una fecha determinada
@router.get("/reservas/fecha", response_model=List[Reservas])
# Función para obtener las reservas de una fecha determinada
def get_reservas_by_fecha(fecha: date = Query(...), db: Session = Depends(get_db)):
    # Datos que se obtienen de la reserva
    reservas = db.query(db_models.Reservas).options(
        joinedload(db_models.Reservas.servicio),
        joinedload(db_models.Reservas.barbero)
    ).filter(db_models.Reservas.fecha == fecha).all()

   
    return reservas

# Ruta para borrar una reserva
@router.delete("/reservas/{reserva_id}")
# Función para borrar una reserva
def delete_reserva(
    reserva_id: int, 
    background_tasks: BackgroundTasks, 
    db: Session = Depends(get_db)
):
    # Buscar la reserva en la base de datos 
    db_reserva = db.query(db_models.Reservas).filter(db_models.Reservas.id == reserva_id).first()
    
    if db_reserva is None:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    
    # Obtener información del usuario
    usuario = db.query(db_models.Registro).filter(db_models.Registro.id == db_reserva.user_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # Obtener información del horario
    horario = db.query(db_models.Horarios).filter(db_models.Horarios.id == db_reserva.horario_id).first()
    if not horario:
        raise HTTPException(status_code=404, detail="Horario no encontrado")
    
    # Eliminar la reserva
    db.delete(db_reserva)
    db.commit()
    
    # Preparar el contenido del correo electrónico, cando la reserva se elimina correctamente
    asunto = 'Cancelación de Reserva'
    html_contenido = f"""
    <h1>Hola {usuario.email}</h1>
    <p>Lamentamos informarte que tu reserva para el día {db_reserva.fecha} a las {horario.hora} ha sido cancelada.</p>
    <p>Por favor, contáctanos si deseas reprogramar tu cita.</p>
    """
    
    # Enviar el correo electrónico en segundo plano
    background_tasks.add_task(enviar_email, usuario.email, asunto, html_contenido)
    
    return {"message": "Reserva eliminada correctamente y se ha notificado al cliente"}

# Ruta para obtener todas las reservas que hay en la base de datos
@router.get("/reservas")
# Función para obtener todas las reservas
def get_reservas( db: Session = Depends(get_db)):
    reservas = db.query(db_models.Reservas).options(
        joinedload(db_models.Reservas.servicio),
        joinedload(db_models.Reservas.barbero)
    ).all()
    # Detalles de las reservas
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

# Ruta para obtener una reserva en específico
@router.get("/reservas/{reserva_id}")
# Función para obtener una reserva en específico
async def get_reserva_id(reserva_id: int = Path(...), db: Session = Depends(get_db)):
    # Datos que se buscan en la base de datos para obtener la reserva
    reserva = db.query(db_models.Reservas).options(
        joinedload(db_models.Reservas.servicio).joinedload(db_models.Servicio.empresa),
        joinedload(db_models.Reservas.barbero),
        joinedload(db_models.Reservas.horario)
    ).filter(db_models.Reservas.id == reserva_id).first()
    
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva not found")
     # Datos que se obtienen de la reserva
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

# Ruta para obtener las reservas de una empresa en específico
@router.get("/reservas/empresa/{empresa_id}", response_model=List[Reservas])
# Función para obtener las reservas de una empresa en específico
def get_reservas_by_empresa(empresa_id: int, db: Session = Depends(get_db)):
    # Datos que se buscan en la base de datos para luego retornar las reservas
    reservas = db.query(db_models.Reservas).options(
        joinedload(db_models.Reservas.servicio).joinedload(db_models.Servicio.empresa),
        joinedload(db_models.Reservas.barbero),
        joinedload(db_models.Reservas.horario),
        joinedload(db_models.Reservas.usuario)
    ).filter(db_models.Reservas.empresa_id == empresa_id).all()

    if not reservas:
        raise HTTPException(status_code=404, detail="No se encontraron reservas para esta empresa")
    
    return reservas

# Ruta para obtener las reservas de un usuario en específico
@router.get("/reservas/cliente/{user_id}")
# Función para obtener las reservas de un usuario en específico
def get_reservas_by_user_id(user_id: int, db: Session = Depends(get_db)):
    # Datos que se buscan en la base de datos para luego retornar las reservas
    reservas = db.query(db_models.Reservas).options(
        joinedload(db_models.Reservas.servicio),
        joinedload(db_models.Reservas.barbero),
        joinedload(db_models.Reservas.horario),
        joinedload(db_models.Reservas.usuario)
    ).filter(db_models.Reservas.user_id == user_id).all()

    if not reservas:
        raise HTTPException(status_code=404, detail="Reservas no encontradas para el cliente")
    
    return reservas

# Ruta para candelar una reserva en específico
@router.put("/reservas/{reserva_id}/cancelar")
# Función para cancelar una reserva en específico
def cancelar_reserva(
    # Se obtiene el id de la reserva que se desea cancelar
    reserva_id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    db_reserva = db.query(db_models.Reservas).filter(db_models.Reservas.id == reserva_id).first()
    if not db_reserva:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    # Cambiar el estado de la reserva a "Cancelada"
    db_reserva.estado = "Cancelada"
    db.commit()
    db.refresh(db_reserva)

    # Enviar correo electrónico notificando la cancelación
    usuario = db.query(db_models.Registro).filter(db_models.Registro.id == db_reserva.user_id).first()
    if usuario:
        asunto = 'Reserva Cancelada'
        html_contenido = f"""
        <h1>Hola {usuario.email}</h1>
        <p>Tu reserva para el día {db_reserva.fecha} ha sido cancelada.</p>
        """
        background_tasks.add_task(enviar_email, usuario.email, asunto, html_contenido)

    return {"mensaje": "Reserva cancelada exitosamente"}

# Ruta para marcar una reserva como realizada
@router.put("/reservas/{reserva_id}/realizar")
# Función para marcar una reserva como realizada
def realizar_reserva(
    reserva_id: int,
    db: Session = Depends(get_db)
):
    db_reserva = db.query(db_models.Reservas).filter(db_models.Reservas.id == reserva_id).first()
    if not db_reserva:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    # Cambiar el estado de la reserva a "Realizada"
    db_reserva.estado = "Realizada"
    db.commit()
    db.refresh(db_reserva)

    return {"mensaje": "Reserva marcada como realizada"}











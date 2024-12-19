from fastapi import APIRouter, Depends, HTTPException, Query, Path, BackgroundTasks
from sqlalchemy.orm import Session, joinedload
from Backend.schemas import ReservaCreate, Reservas
from Backend.db import db_models
from Backend.db.database import get_db
from datetime import date
from typing import List
from Backend.email_utils import enviar_email



router = APIRouter()

@router.post("/reservas", response_model=Reservas)
def create_reserva(reserva: ReservaCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db) ):
    db_reserva = db_models.Reservas(**reserva.dict())
    db.add(db_reserva)
    db.commit()
    db.refresh(db_reserva)

    usuario = db.query(db_models.Registro).filter(db_models.Registro.id == reserva.user_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    horario = db.query(db_models.Horarios).filter(db_models.Horarios.id == reserva.horario_id).first()
    if not horario:
        raise HTTPException(status_code=404, detail="Horario no encontrado")




    asunto = 'Confirmación de Reserva'
    html_contenido = f"""
    <h1>Hola </h1>
    <p>Tu reserva para el día {reserva.fecha} a las {horario.hora} ha sido confirmada.</p>
    <p>¡Te esperamos!</p>
    """

    # Enviar el correo en segundo plano
    background_tasks.add_task(enviar_email, usuario.email, asunto, html_contenido)

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
def delete_reserva(
    reserva_id: int, 
    background_tasks: BackgroundTasks, 
    db: Session = Depends(get_db)
):
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
    
    # Preparar el contenido del correo electrónico
    asunto = 'Cancelación de Reserva'
    html_contenido = f"""
    <h1>Hola {usuario.email}</h1>
    <p>Lamentamos informarte que tu reserva para el día {db_reserva.fecha} a las {horario.hora} ha sido cancelada.</p>
    <p>Por favor, contáctanos si deseas reprogramar tu cita.</p>
    """
    
    # Enviar el correo electrónico en segundo plano
    background_tasks.add_task(enviar_email, usuario.email, asunto, html_contenido)
    
    return {"message": "Reserva eliminada correctamente y se ha notificado al cliente"}


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


@router.get("/reservas/cliente/{user_id}")
def get_reservas_by_user_id(user_id: int, db: Session = Depends(get_db)):
    reservas = db.query(db_models.Reservas).options(
        joinedload(db_models.Reservas.servicio),
        joinedload(db_models.Reservas.barbero),
        joinedload(db_models.Reservas.horario),
        joinedload(db_models.Reservas.usuario)
    ).filter(db_models.Reservas.user_id == user_id).all()

    if not reservas:
        raise HTTPException(status_code=404, detail="Reservas no encontradas para el cliente")
    
    return reservas


@router.put("/reservas/{reserva_id}/cancelar")
def cancelar_reserva(
    reserva_id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    db_reserva = db.query(db_models.Reservas).filter(db_models.Reservas.id == reserva_id).first()
    if not db_reserva:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")

    db_reserva.estado = "Cancelada"
    db.commit()
    db.refresh(db_reserva)

    # Opcional: Enviar correo electrónico notificando la cancelación
    usuario = db.query(db_models.Registro).filter(db_models.Registro.id == db_reserva.user_id).first()
    if usuario:
        asunto = 'Reserva Cancelada'
        html_contenido = f"""
        <h1>Hola {usuario.email}</h1>
        <p>Tu reserva para el día {db_reserva.fecha} ha sido cancelada.</p>
        """
        background_tasks.add_task(enviar_email, usuario.email, asunto, html_contenido)

    return {"mensaje": "Reserva cancelada exitosamente"}


@router.put("/reservas/{reserva_id}/realizar")
def realizar_reserva(
    reserva_id: int,
    db: Session = Depends(get_db)
):
    db_reserva = db.query(db_models.Reservas).filter(db_models.Reservas.id == reserva_id).first()
    if not db_reserva:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")

    db_reserva.estado = "Realizada"
    db.commit()
    db.refresh(db_reserva)

    return {"mensaje": "Reserva marcada como realizada"}











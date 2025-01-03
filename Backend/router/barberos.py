# Archivo donde encontramos las rutas relacionadas al barbero
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Query
from Backend.schemas import Barbero, BarberoCreate, BarberoUpdate
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from Backend.db import db_models
from Backend.db.database import get_db
import cloudinary
import cloudinary.uploader
from typing import List

# Crear un enrutador para las rutas relacionadas con los barberos
router = APIRouter()

# Ruta para crear a los barberos
@router.post("/barberos", response_model=Barbero)
# Función para crear al barbero
def create_barbero(barbero: BarberoCreate, db: Session = Depends(get_db)):
    # Subir la imagen a Cloudinary, foto de perfil del barbero
    result = cloudinary.uploader.upload(barbero.imagen_url)
    imagen_url = result.get("secure_url")
    # Datos para crear al barbero
    db_barbero = db_models.Barbero(
        nombre=barbero.nombre,
        apellido=barbero.apellido,
        email=barbero.email,
        sucursal_id=barbero.sucursal_id,
        imagen_url=imagen_url,  # Guardar la URL de la imagen
        empresa_id=barbero.empresa_id

    )
    # Si los datos estas bien, añade el barbero a la base de datos
    db.add(db_barbero)
    db.commit()
    # Refresca la base de datos para que se vea reflejada la nueva información
    db.refresh(db_barbero)
    return db_barbero

# Ruta para obtener a los barberos
@router.get("/barberos")
# Función para obtener a los barberos
def get_barberos(db: Session = Depends(get_db)):
    barberos = db.query(db_models.Barbero).all()
    return barberos
# Ruta para buscar a los barberos por nombre
@router.get("/barberos/buscar", response_model=List[Barbero])
# F unción para buscar a los barberos por nombre
def search_barberos_by_name(nombre: str = Query(None, min_length=1), db: Session = Depends(get_db)):
    # Busca coincidencias en la base de datos
    if nombre:
        barberos = db.query(db_models.Barbero).filter(db_models.Barbero.nombre.ilike(f"%{nombre}%")).all()
    else:
        barberos = db.query(db_models.Barbero).all()
    return barberos
# Ruta para buscar barbero en concreto
@router.get("/barberos/{barbero_id}")
# Función para buscar barbero en concreto
def get_barbero(barbero_id: int, db: Session = Depends(get_db)):
    # Busca al barbero y ademas nos muestra los horarios y servicios que tiene el mismo 
    barbero = db.query(db_models.Barbero).options(
        joinedload(db_models.Barbero.horarios),
        joinedload(db_models.Barbero.servicios)
    ).filter(db_models.Barbero.id == barbero_id).first()
    if barbero is None:
        raise HTTPException(status_code=404, detail="Barbero not found")
    # Información que nos retorna la consulta
    barbero_with_relations = {
        "id": barbero.id,
        "nombre": barbero.nombre,
        "apellido": barbero.apellido,
        "horarios": barbero.horarios,
        "servicios": barbero.servicios
    }
    return barbero_with_relations

# Ruta para obtener los barberos que tiene una empresa
@router.get("/empresa/{empresa_id}/barberos", response_model=list[Barbero])
# Función para obtener los barberos que tiene una empresa
def get_barberos_by_empresa(empresa_id: int, db: Session = Depends(get_db)):
    barberos = db.query(db_models.Barbero).filter(db_models.Barbero.empresa_id == empresa_id).all()
    return barberos
# Ruta para editar a los barberos
@router.put("/barberos/{barbero_id}", response_model=Barbero)
# Función para editar a los barberos
def update_barbero(barbero_id: int, barbero_update: BarberoUpdate, db: Session = Depends(get_db)):
    # Busca al barbero en la base de datos
    barbero = db.query(db_models.Barbero).filter(db_models.Barbero.id == barbero_id).first()
    if not barbero:
        raise HTTPException(status_code=404, detail="Barbero not found")
    # Datos que se modifican en el barbero al ejecutar la consulta
    if barbero_update.email:
        barbero.email = barbero_update.email
    if barbero_update.sucursal_id:
        barbero.sucursal_id = barbero_update.sucursal_id
    if barbero_update.servicio_id:
        barbero.servicios = db.query(db_models.Servicio).filter(db_models.Servicio.id.in_(barbero_update.servicio_id)).all()

    db.commit()
    db.refresh(barbero)
    return barbero

# Ruta para obtener a los barberos por ID
@router.get("/barberos/{barbero_id}", response_model=Barbero)
# Función para obtener a los barberos por ID
def get_barbero_by_id(barbero_id: int, db: Session = Depends(get_db)):
    barbero = db.query(db_models.Barbero).filter(db_models.Barbero.id == barbero_id).first()
    if barbero is None:
        raise HTTPException(status_code=404, detail="Barbero no encontrado")
    return barbero



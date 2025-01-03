# Archivo donde vamos a encontrar todas la rutas relacionadas a las empresas
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from Backend.schemas import Empresa, EmpresaCreate, EmpresaUpdate, Servicio, ServicioCreate, Barbero, BarberoCreate, Horarios, HorariosCreate, EmpresaConServicios
from Backend.db import db_models
from Backend.db.database import get_db
import cloudinary.uploader
from typing import List

# Crear un router para las rutas de la empresas
router = APIRouter()

# Ruta para crear una empresa
@router.post("/empresa", response_model=Empresa)
# Función para crear una empresa
def crear_empresa(empresa: EmpresaCreate, db: Session = Depends(get_db)):
    # Subir la imagen a Cloudinary
    result = cloudinary.uploader.upload(empresa.imagen_url)
    imagen_url = result.get("secure_url")

    # Crear una nueva empresa con la URL de la imagen
    nueva_empresa = db_models.Empresa(
        nombre=empresa.nombre,
        eslogan=empresa.eslogan,
        rubro=empresa.rubro,
        ubicacion=empresa.ubicacion,
        imagen_url=imagen_url,
        horarios=empresa.horarios,
        user_id=empresa.user_id
        
    )
    db.add(nueva_empresa)
    db.commit()
    db.refresh(nueva_empresa)
    return nueva_empresa

# Ruta para obtener empresas por ID
@router.get("/empresa/{empresa_id}", response_model=EmpresaConServicios)
# Función para obtener empresas por ID
def obtener_empresa(empresa_id: int, db: Session = Depends(get_db)):
    # Busca la empresa en la base de datos 
    empresa = db.query(db_models.Empresa).filter(db_models.Empresa.id == empresa_id).first()
    if empresa is None:
        raise HTTPException(status_code=404, detail="La empresa no existe")
    # Si la empresa se encuenta, se retorna una respuesta con toda la información que se le pide 
    servicios = db.query(db_models.Servicio).filter(db_models.Servicio.empresa_id == empresa_id).all()
    return {
        "id": empresa.id,
        "nombre": empresa.nombre,
        "eslogan": empresa.eslogan,
        "rubro": empresa.rubro,
        "ubicacion": empresa.ubicacion,
        "imagen_url": empresa.imagen_url,
        "horarios":empresa.horarios,
        "user_id": empresa.user_id,
        "servicios": servicios
        
    }

# Ruta para buscar empresas por nombre
@router.get("/empresa", response_model=Empresa)
# Función para buscar empresas por nombre
def buscar_empresa_por_nombre(nombre: str = Query(..., description="Nombre de la empresa"), db: Session = Depends(get_db)):
    empresa = db.query(db_models.Empresa).filter(db_models.Empresa.nombre == nombre).first()
    # Si no hay coincidencias muestra un mensaje de error
    if empresa is None:
        raise HTTPException(status_code=404, detail="La empresa no existe")
    # Si la encuentra, retorna la empresa
    return empresa

# Ruta para relacionar servicios a empresas ya creadas
@router.post("/empresa/{empresa_id}/servicio", response_model=Servicio)
# Función para relacionar los servicios a las empresas
def agregar_servicio_a_empresa(empresa_id: int, servicio: ServicioCreate, db: Session = Depends(get_db)):
    # Se crea el servicio y se lo relaciona al ID de la empresa
    empresa = db.query(db_models.Empresa).filter(db_models.Empresa.id == empresa_id).first()
    if empresa is None:
        raise HTTPException(status_code=404, detail="La empresa no existe")
    
    nuevo_servicio = db_models.Servicio(
        nombre=servicio.nombre,
        empresa_id=empresa_id
    )
    db.add(nuevo_servicio)
    db.commit()
    db.refresh(nuevo_servicio)
    return nuevo_servicio

#
@router.post("/servicio/{servicio_id}/barbero", response_model=Barbero)
def agregar_barbero_a_servicio(servicio_id: int, barbero: BarberoCreate, db: Session = Depends(get_db)):
    servicio = db.query(db_models.Servicio).filter(db_models.Servicio.id == servicio_id).first()
    if servicio is None:
        raise HTTPException(status_code=404, detail="El servicio no existe")
    
    nuevo_barbero = db_models.Barbero(
        nombre=barbero.nombre,
        apellido=barbero.apellido,
        servicios_id=servicio_id,
        empresa_id=barbero.empresa_id
    )
    db.add(nuevo_barbero)
    db.commit()
    db.refresh(nuevo_barbero)
    return nuevo_barbero

@router.post("/barbero/{barbero_id}/horario", response_model=Horarios)
def agregar_horario_a_barbero(barbero_id: int, horario: HorariosCreate, db: Session = Depends(get_db)):
    barbero = db.query(db_models.Barbero).filter(db_models.Barbero.id == barbero_id).first()
    if barbero is None:
        raise HTTPException(status_code=404, detail="El barbero no existe")
    
    nuevo_horario = db_models.Horarios(
        hora=horario.hora,
        estado=True,  # Asumimos que el horario está disponible al crearlo
        barbero_id=barbero_id,
        empresa_id=horario.empresa_id
    )
    db.add(nuevo_horario)
    db.commit()
    db.refresh(nuevo_horario)
    return nuevo_horario

# Ruta para editar la información de las empresas
@router.put("/empresa/{empresa_id}", response_model=Empresa)
# Función para editar la información de las empresas
def update_empresa(empresa_id: int, empresa_update: EmpresaUpdate, db: Session = Depends(get_db)):
    # Se busca la empresa en la base de datos
    empresa = db.query(db_models.Empresa).filter(db_models.Empresa.id == empresa_id).first()
    if not empresa:
        raise HTTPException(status_code=404, detail="Empresa no encontrada")
    # Datos que se modifican de la empresa 
    if empresa_update.nombre:
        empresa.nombre = empresa_update.nombre
    if empresa_update.eslogan:
        empresa.eslogan = empresa_update.eslogan
    if empresa_update.imagen_url:
        empresa.imagen_url = empresa_update.imagen_url

    db.commit()
    db.refresh(empresa)
    return empresa
# Ruta para obtener la empresa de determinado usuario
@router.get("/empresas/usuario/{user_id}", response_model=List[Empresa])
# Función para obtener la empresa de determiando usuario
def get_empresas_by_usuario(user_id: int, db: Session = Depends(get_db)):
    # Se busca al usuario y si tiene alguna empresa relacionada al mismo 
    empresas = db.query(db_models.Empresa).filter(db_models.Empresa.user_id == user_id).all()
    if not empresas:
        raise HTTPException(status_code=404, detail="No companies found for this user")
    return empresas

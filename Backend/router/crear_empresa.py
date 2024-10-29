from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from Backend.schemas import Empresa, EmpresaCreate, EmpresaUpdate, Servicio, ServicioCreate, Barbero, BarberoCreate, Horarios, HorariosCreate, EmpresaConServicios
from Backend.db import db_models
from Backend.db.database import get_db
import cloudinary.uploader

router = APIRouter()

@router.post("/empresa", response_model=Empresa)
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
        horarios=empresa.horarios
        
    )
    db.add(nueva_empresa)
    db.commit()
    db.refresh(nueva_empresa)
    return nueva_empresa

@router.get("/empresa/{empresa_id}", response_model=EmpresaConServicios)
def obtener_empresa(empresa_id: int, db: Session = Depends(get_db)):
    empresa = db.query(db_models.Empresa).filter(db_models.Empresa.id == empresa_id).first()
    if empresa is None:
        raise HTTPException(status_code=404, detail="La empresa no existe")
    
    servicios = db.query(db_models.Servicio).filter(db_models.Servicio.empresa_id == empresa_id).all()
    return {
        "id": empresa.id,
        "nombre": empresa.nombre,
        "eslogan": empresa.eslogan,
        "rubro": empresa.rubro,
        "ubicacion": empresa.ubicacion,
        "imagen_url": empresa.imagen_url,
        "horarios":empresa.horarios,
        "servicios": servicios
        
    }

@router.get("/empresa", response_model=Empresa)
def buscar_empresa_por_nombre(nombre: str = Query(..., description="Nombre de la empresa"), db: Session = Depends(get_db)):
    empresa = db.query(db_models.Empresa).filter(db_models.Empresa.nombre == nombre).first()
    if empresa is None:
        raise HTTPException(status_code=404, detail="La empresa no existe")
    return empresa

@router.post("/empresa/{empresa_id}/servicio", response_model=Servicio)
def agregar_servicio_a_empresa(empresa_id: int, servicio: ServicioCreate, db: Session = Depends(get_db)):
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

@router.put("/empresa/{empresa_id}", response_model=Empresa)
def update_empresa(empresa_id: int, empresa_update: EmpresaUpdate, db: Session = Depends(get_db)):
    empresa = db.query(db_models.Empresa).filter(db_models.Empresa.id == empresa_id).first()
    if not empresa:
        raise HTTPException(status_code=404, detail="Empresa no encontrada")

    if empresa_update.nombre:
        empresa.nombre = empresa_update.nombre
    if empresa_update.eslogan:
        empresa.eslogan = empresa_update.eslogan
    if empresa_update.imagen_url:
        empresa.imagen_url = empresa_update.imagen_url

    db.commit()
    db.refresh(empresa)
    return empresa

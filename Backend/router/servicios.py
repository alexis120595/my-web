# En este archivo encontrarás las rutas relacionadas a los servicios
from fastapi import APIRouter, Depends, HTTPException, Query
from Backend.schemas import Servicio, ServicioCreate, ServicioUpdate
from sqlalchemy.orm import Session, joinedload
from Backend.db import db_models
from Backend.db.database import get_db
from typing import List

# Crear un enrutador para las rutas relacionadas con las servicios
router = APIRouter()

# Ruta para crear los servicios
@router.post("/servicios", response_model=Servicio)
# Función para crear un servicio
def create_servicio(servicio: ServicioCreate, db: Session = Depends(get_db)):
    print(f"Datos recibidos: {servicio}")
    # Datos con los cuales se crea el servicio
    try:
        db_servicio = db_models.Servicio(
            nombre=servicio.nombre,
            tipo_de_servicio=servicio.tipo_de_servicio,
            descripcion=servicio.descripcion,
            precio=servicio.precio,
            seña=servicio.seña,
            duracion=servicio.duracion,
            modalidad=servicio.modalidad,
            empresa_id=servicio.empresa_id
        )
        db.add(db_servicio)
        db.commit()
        db.refresh(db_servicio)

        # Asociar barberos al servicio
        for barbero_id in servicio.barberos_ids:
            # Se toma el id del barbero y se busca en la base de datos
            #Si lo encuentra, se relaciona con el servicio
            barbero = db.query(db_models.Barbero).filter(db_models.Barbero.id == barbero_id).first()
            if not barbero:
                raise HTTPException(status_code=404, detail=f"Barbero with id {barbero_id} not found")
            db_servicio.barberos.append(barbero)
        
        db.commit()
        db.refresh(db_servicio)

        print(f"Servicio creado: {db_servicio}")
        return db_servicio
    except Exception as e:
        print(f"Error al crear el servicio: {e}")
        raise HTTPException(status_code=500, detail="Error al crear el servicio")


# Ruta para obtener los servicios
@router.get("/servicios")
# Función para obtener los servicios
def get_servicios(db: Session = Depends(get_db)):
    servicios = db.query(db_models.Servicio).all()
    return servicios

# Ruta para buscar servicios por nombre
@router.get("/servicios/buscar", response_model=List[Servicio])
# Función para buscar servicios por nombre
def buscar_servicios(nombre: str = Query(None, min_length=1), db: Session = Depends(get_db)):
    # Buscar los servicios por nombre en la base de datos y devolverlos si existen
    servicios = db.query(db_models.Servicio).filter(db_models.Servicio.nombre.ilike(f"%{nombre}%")).all()
    # Si no se encuentran servicios con ese nombre, devolver un error
    if not servicios:
        raise HTTPException(status_code=404, detail="No se encontraron servicios con ese nombre")
    return servicios

# Ruta para obtener un servicio en específico
@router.get("/servicios/{servicio_id}", response_model=Servicio)
# Función para obtener un servicio en específico
def get_servicio_barberos(servicio_id: int, db: Session = Depends(get_db)):
    # Buscar el servicio en la base de datos
    servicio = db.query(db_models.Servicio).options(joinedload(db_models.Servicio.barberos)).filter(db_models.Servicio.id == servicio_id).first()
    if not servicio:
        raise HTTPException(status_code=404, detail="Servicio not found")
    return servicio

# Ruta para obtener los servicios de una empresa en específico
@router.get("/empresa/{empresa_id}/servicios", response_model=List[Servicio])
# Función para obtener los servicios de una empresa en específico
def get_servicios_by_empresa(empresa_id: int, db: Session = Depends(get_db)):
    # Datos con los cuales se obtienen los servicios
    servicios = db.query(db_models.Servicio).options(
        joinedload(db_models.Servicio.categorias),
        joinedload(db_models.Servicio.barberos)  
    ).filter(db_models.Servicio.empresa_id == empresa_id).all()
    return servicios

# Ruta para editar un servicio en específico
@router.put("/servicios/{servicio_id}", response_model=Servicio)
# Función para editar un servicio en específico
def update_servicio(servicio_id: int, servicio_update: ServicioUpdate, db: Session = Depends(get_db)):
    # Buscar el servicio en la base de datos y devolver un error si no se encuentra
    servicio = db.query(db_models.Servicio).filter(db_models.Servicio.id == servicio_id).first()
    if not servicio:
        raise HTTPException(status_code=404, detail="Servicio not found")
    # Si se encuentra el servicio, actualizar los campos que se hayan enviado
    if servicio_update.precio is not None:
        servicio.precio = servicio_update.precio
    if servicio_update.duracion is not None:
        servicio.duracion = servicio_update.duracion
    if servicio_update.modalidad is not None:
        servicio.modalidad = servicio_update.modalidad

    db.commit()
    db.refresh(servicio)
    return servicio


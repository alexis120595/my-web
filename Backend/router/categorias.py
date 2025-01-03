# Archivo donde vamos a encotrar las rutas relacionadas a las categorias
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from Backend.schemas import CategoriaCreate, Categoria
from Backend.db import db_models
from Backend.db.database import get_db
from typing import List

# Crear un enrutador para las rutas relacionadas con las categorías
router = APIRouter()

# Ruta para crear una nueva categoría y relacionarla a un servicio
@router.post("/categorias", response_model=Categoria)
def create_categoria(categoria: CategoriaCreate, db: Session = Depends(get_db)):
    # se guarda el nombre de la categoría y el id de la empresa a la cual pertenece esa categoría
    db_categoria = db_models.Categoria(
        nombre=categoria.nombre,
        empresa_id=categoria.empresa_id
    )
    db.add(db_categoria)
    db.commit()
    db.refresh(db_categoria)

    # Asociar servicios a la categoría
    servicios = db.query(db_models.Servicio).filter(db_models.Servicio.id.in_(categoria.servicios_ids)).all()
    db_categoria.servicios.extend(servicios)
    db.commit()
    db.refresh(db_categoria)

    return db_categoria
# Ruta para obtener las categorías creadas junto con sus servicios
@router.get("/categorias", response_model=List[Categoria])
# Función para obtener las categorías con sus servicios
def get_categorias(db: Session = Depends(get_db)):
    categorias = db.query(db_models.Categoria).options(joinedload(db_models.Categoria.servicios)).all()
    return categorias
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from Backend.schemas import CategoriaCreate, Categoria
from Backend.db import db_models
from Backend.db.database import get_db
from typing import List

router = APIRouter()


@router.post("/categorias", response_model=Categoria)
def create_categoria(categoria: CategoriaCreate, db: Session = Depends(get_db)):
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

@router.get("/categorias", response_model=List[Categoria])
def get_categorias(db: Session = Depends(get_db)):
    categorias = db.query(db_models.Categoria).all()
    return categorias
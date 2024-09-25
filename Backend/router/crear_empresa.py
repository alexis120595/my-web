from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from Backend.schemas import Empresa, EmpresaCreate
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
        imagen_url=imagen_url
    )
    db.add(nueva_empresa)
    db.commit()
    db.refresh(nueva_empresa)
    return nueva_empresa
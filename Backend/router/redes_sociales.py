# Archivo con las rutas para las redes sociales de la empresa
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db
from Backend.schemas import RedesSociales, RedesSocialesCreate

# Crear un router para las rutas de las redes sociales
router = APIRouter()

# Ruta para crear las redes sociales de una empresa
@router.post("/empresa/{empresa_id}/redes-sociales", response_model=RedesSociales)
# Función para crear las redes sociales de una empresa
def crear_redes_sociales(empresa_id: int, redes_sociales: RedesSocialesCreate, db: Session = Depends(get_db)):
    # Relacionar las redes sociales con la empresa
    empresa = db.query(db_models.Empresa).filter(db_models.Empresa.id == empresa_id).first()
    if not empresa:
        raise HTTPException(status_code=404, detail="Empresa no encontrada")
    redes_existentes = db.query(db_models.RedesSociales).filter(db_models.RedesSociales.empresa_id == empresa_id).first()
    if redes_existentes:
        # Actualizar redes sociales existentes
        for key, value in redes_sociales.dict(exclude_unset=True).items():
            setattr(redes_existentes, key, value)
        db.commit()
        db.refresh(redes_existentes)
        return redes_existentes
    else:
        # Crear nuevas redes sociales
        redes = db_models.RedesSociales(**redes_sociales.dict(), empresa_id=empresa_id)
        db.add(redes)
        db.commit()
        db.refresh(redes)
        return redes
# Ruta para obtener las redes sociales de una empresa
@router.get('/empresa/{empresa_id}/redes_sociales', response_model=RedesSociales)
# Función para obtener las redes sociales de una empresa
def get_redes_sociales(empresa_id: int, db: Session = Depends(get_db)):
    redes_sociales = db.query(db_models.RedesSociales).filter(db_models.RedesSociales.empresa_id == empresa_id).first()
    if not redes_sociales:
        raise HTTPException(status_code=404, detail='Redes sociales no encontradas')
    return redes_sociales
# Ruta para actualizar las redes sociales de una empresa
@router.put('/empresa/{empresa_id}/redes_sociales', response_model=RedesSociales)
# Función para actualizar las redes sociales de una empresa
def update_redes_sociales(empresa_id: int, redes_sociales: RedesSocialesCreate, db: Session = Depends(get_db)):
    db_redes = db.query(db_models.RedesSociales).filter(db_models.RedesSociales.empresa_id == empresa_id).first()
    if not db_redes:
        raise HTTPException(status_code=404, detail='Redes sociales no encontradas')
    for key, value in redes_sociales.dict(exclude_unset=True).items():
        # Actualizar las redes sociales, con los nuevos valores
        setattr(db_redes, key, value)
    db.commit()
    db.refresh(db_redes)
    return db_redes
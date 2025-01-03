# Archivo con las rutas para el inicio de sesión de los usuarios
from fastapi import APIRouter, HTTPException, Depends
from Backend.schemas import LoginRequest, User
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db

# Crear un router para las rutas de inicio de sesión
router = APIRouter()

# Ruta para iniciar sesión
@router.post("/login", response_model=User)
# Función para iniciar sesión
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    # Verificar si el usuario existe en la base de datos 
    user = db.query(db_models.Registro).filter(db_models.Registro.email == request.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email")
    
    return {"id": user.id, "email": user.email}
from fastapi import APIRouter, HTTPException, Depends
from Backend.schemas import LoginRequest, User
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db

router = APIRouter()

@router.post("/login", response_model=User)
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(db_models.Registro).filter(db_models.Registro.email == request.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email")
    return {"id": user.id, "email": user.email}
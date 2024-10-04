from fastapi import APIRouter, HTTPException, Depends
from Backend.schemas import LoginRequest
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db

router = APIRouter()

@router.post("/login")
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(db_models.Registro).filter(db_models.Registro.email == request.email).first()
    if not user or user.password != request.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"message": "Login successful", "email": user.email }
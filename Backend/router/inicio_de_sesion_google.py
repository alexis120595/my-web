from fastapi import APIRouter, HTTPException, Depends
from Backend.schemas import LoginRequestGoogle 
from sqlalchemy.orm import Session
from Backend.db import db_models
from Backend.db.database import get_db
from google.oauth2 import id_token
from google.auth.transport import requests

router = APIRouter()

CLIENT_ID = ""


@router.post("/login/google")
async def login_google(request: LoginRequestGoogle, db: Session = Depends(get_db)):
    try:

        print("Token JWT recibido:", request.token)
        # Verificar el token JWT
        idinfo = id_token.verify_oauth2_token(request.token, requests.Request(), CLIENT_ID)

        # Obtener el email del token JWT
        email = idinfo.get('email')
        if not email:
            raise HTTPException(status_code=400, detail="Token inválido: no se encontró el email")
        print("Email obtenido del token JWT:", email)
        # Buscar al usuario en la base de datos
        user = db.query(db_models.Registro).filter(db_models.Registro.email == email).first()
        if user is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        return {"message": "Usuario verificado", "user": user}

    except ValueError:
        # Token inválido
        raise HTTPException(status_code=401, detail="Token inválido")
    

    
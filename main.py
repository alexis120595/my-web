# Importaciones necesarisas para el funcionamiento del servidor
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from Backend.router import servicios, barberos, horarios, reservas, mercado_pago, registro, inicio_de_sesion, inicio_de_sesion_google, crear_empresa, categorias, sucursales, redes_sociales
from Backend.db.database import Base, engine
from Backend.db.db_models import Servicio, Barbero, Horarios, Reservas, Registro,Categoria, Sucursal, RedesSociales
import mercadopago
import cloudinary
import cloudinary.uploader
import cloudinary.api
import os
from dotenv import load_dotenv

#Cargar variables de entorno desde el archivo .env
load_dotenv()

# Obtener variables de entorno para Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN = os.getenv("MERCADO_PAGO_ACCESS_TOKEN")

# Inicializar SDK de Mercado Pago con el access token
sdk = mercadopago.SDK(MERCADO_PAGO_ACCESS_TOKEN)

# Obtener variables de entorno para Cloudinary
CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")

# Configura Cloudinary con las credenciales obtenidas
cloudinary.config(
  cloud_name=CLOUDINARY_CLOUD_NAME,  # Reemplaza con tu cloud name
  api_key=CLOUDINARY_API_KEY,        # Reemplaza con tu API key
  api_secret=CLOUDINARY_API_SECRET   # Reemplaza con tu AP secret

)


# Función para crear las tablas en la base de datos al levantar el servidor
def create_tables():
    Base.metadata.create_all(bind=engine)

# Crear las tablas en la base de datos
create_tables()

# Inicializar la aplicación FastAPI
app = FastAPI()

# Incluir los routers de las diferentes funcionalidades
app.include_router(servicios.router)
app.include_router(barberos.router)
app.include_router(horarios.router)
app.include_router(reservas.router)
app.include_router(mercado_pago.router)
app.include_router(registro.router)
app.include_router(inicio_de_sesion.router)
app.include_router(inicio_de_sesion_google.router)
app.include_router(crear_empresa.router)
app.include_router(categorias.router)
app.include_router(sucursales.router)
app.include_router(redes_sociales.router)


# Configuración de CORS para permitir solicitudes desde ciertos orígenes
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",   
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ejecutar la aplicación con Uvicorn
if __name__ == '__main__':
  
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)

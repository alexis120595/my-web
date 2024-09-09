from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from Backend.router import servicios, barberos, horarios, reservas, mercado_pago
from Backend.db.database import Base, engine
from Backend.db.db_models import Servicio, Barbero, Horarios, Reservas
import mercadopago

sdk = mercadopago.SDK("APP_USR-7326986743119520-090914-8c171d7d35fe47dba8a546ad4601413f-1984732162")

def create_tables():
    Base.metadata.create_all(bind=engine)

create_tables()
#vendedor
#TESTUSER1946416393
#8fLwwUhyaH

#comprador
#TESTUSER1738953231
#hy7fjpqWL5


app = FastAPI()
app.include_router(servicios.router)
app.include_router(barberos.router)
app.include_router(horarios.router)
app.include_router(reservas.router)
app.include_router(mercado_pago.router)




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






if __name__ == '__main__':
    uvicorn.run("main:app", port=8000, reload=True)

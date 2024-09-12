from pydantic import BaseModel
from datetime import date
from typing import List



class Servicio(BaseModel):
    id: int
    nombre: str
    barberos: List["Barbero"] = []
    


class Barbero(BaseModel):
    id: int
    nombre: str
    apellido: str
    servicios_id: int

  
class Horarios(BaseModel):
    id: int
    hora: str
    estado: bool
    barbero_id: int

class HorarioUpdate(BaseModel):
    estado: bool    

class ReservaCreate(BaseModel):
    
    fecha: date
    servicio_id: int
    barbero_id: int
    horario_id: int

class Reservas(BaseModel):
    id: int
    fecha: date
    servicio_id: int
    barbero_id: int
    horario_id: int

class Registro(BaseModel):
    id: int
    nombre: str
    apellido: str
    email: str
    password: str
    telefono: str
    dni: str

class RegistroCreate(BaseModel):
    nombre: str
    apellido: str
    email: str
    password: str
    telefono: str
    dni: str



    





from pydantic import BaseModel
from datetime import date

class Servicio(BaseModel):
    id: int
    nombre: str
    


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



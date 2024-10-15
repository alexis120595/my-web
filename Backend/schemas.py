from pydantic import BaseModel
from datetime import date
from typing import List
from typing import Optional
from typing import Dict


class Empresa(BaseModel):
    id: int
    nombre: str
    eslogan: str
    rubro: str
    ubicacion: str
    imagen_url: Optional[str] = None
    horarios: Optional[Dict] = None 
    

class EmpresaCreate(BaseModel):
    nombre: str
    eslogan: str
    rubro: str
    ubicacion: str
    imagen_url: Optional[str] = None
    horarios: Optional[Dict] = None




class Servicio(BaseModel):
    id: int
    nombre: str
    empresa_id: int
    barberos: List["Barbero"] = []
    descripcion: Optional[str] = None
    precio: Optional[int] = None
    duracion: Optional[str] = None

class ServicioCreate(BaseModel):
    nombre: str
    empresa_id: int
    descripcion: Optional[str] = None
    precio: Optional[int] = None
    duracion: Optional[str] = None
   
    


class Barbero(BaseModel):
    id: int
    nombre: str
    apellido: str
    servicios_id: int
    empresa_id: int
    imagen_url: Optional[str] = None

class BarberoCreate(BaseModel):
    nombre: str
    apellido: str
    servicios_id: int
    empresa_id: int
    imagen_url: Optional[str] = None

  
class Horarios(BaseModel):
    id: int
    hora: str
    estado: bool
    barbero_id: int
    empresa_id: int

class HorariosCreate(BaseModel):
    hora: str
    barbero_id: int
    empresa_id: int



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
    servicio: Servicio
    barbero: Barbero
    horario: Horarios
    
    

class Registro(BaseModel):
    id: int
    email: str
    password: str
   
class RegistroCreate(BaseModel):
  
    email: str
    password: str
   

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginRequestGoogle (BaseModel):
    token: str


    
class EmpresaDetalles(Empresa):
    servicios: List[Servicio]
    barberos: List[Barbero]
    horarios: List[Horarios]

class EmpresaConServicios(Empresa):
    servicios: List[Servicio]


    



    





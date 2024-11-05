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

class EmpresaUpdate(BaseModel):
    nombre: Optional[str]
    eslogan: Optional[str]
    imagen_url: Optional[str]

class Sucursal(BaseModel):
        id: int
        nombre: str
        ubicacion: str
        empresa_id: int

class SucursalCreate(BaseModel):
    nombre: str
    ubicacion: str
    empresa_id: int

class SucursalUpdate(BaseModel):
    nombre: Optional[str]
    ubicacion: Optional[str]

class Categoria(BaseModel):
    id: int
    nombre: str
    empresa_id: int
    servicios: List["Servicio"] = []

class CategoriaCreate(BaseModel):
    nombre: str
    empresa_id: int
    servicios_ids: List[int] = []


class Config:
        orm_mode = True

class Barbero(BaseModel):
    id: int
    nombre: str
    apellido: str
    email: Optional[str] = None
    empresa_id: int
    sucursal_id: Optional[int] = None
    imagen_url: Optional[str] = None

class BarberoCreate(BaseModel):
    nombre: str
    apellido: str
    email: Optional[str] = None
    empresa_id: int
    sucursal_id: Optional[int] = None
    imagen_url: Optional[str] = None

class BarberoUpdate(BaseModel):
    
    email: Optional[str] = None
    sucursal_id: Optional[int] = None
    servicio_id: List[int] = []
    

class Servicio(BaseModel):
    id: int
    nombre: str
    tipo_de_servicio: str
    descripcion: Optional[str] = None
    precio: Optional[int] = None
    seña: Optional[int] = None
    duracion: Optional[str] = None
    modalidad: Optional[str] = None
    empresa_id: int
    barberos: List[Barbero] = []

class ServicioCreate(BaseModel):
    nombre: str
    tipo_de_servicio: str
    descripcion: Optional[str] = None
    precio: Optional[int] = None
    seña: Optional[int] = None
    duracion: Optional[str] = None
    modalidad: Optional[str] = None
    empresa_id: int
    barberos_ids: List[int] = []



class ServicioUpdate(BaseModel):
    
    precio: Optional[int]
    duracion: Optional[str]
    modalidad: Optional[str]

    
class Config:
        orm_mode = True   
    
  
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

class Registro(BaseModel):
    id: int
    email: str
    password: str

class Config:
        orm_mode = True


class ReservaCreate(BaseModel):
    
    fecha: date
    servicio_id: int
    barbero_id: int
    horario_id: int
    user_id: int


class Reservas(BaseModel):
    id: int
    fecha: date
    servicio: Servicio
    barbero: Barbero
    horario: Horarios
    usuario: Registro

class Config:
     orm_mode = True
    
   
class RegistroCreate(BaseModel):
  
    email: str
    password: str
   

class LoginRequest(BaseModel):
    email: str
    password: str

class User(BaseModel):
    id: int
    email: str

class config:
    orm_mode = True
    

class LoginRequestGoogle (BaseModel):
    token: str

    
class EmpresaDetalles(Empresa):
    servicios: List[Servicio]
    barberos: List[Barbero]
    horarios: List[Horarios]

class EmpresaConServicios(Empresa):
    servicios: List[Servicio]


    



    




    



    





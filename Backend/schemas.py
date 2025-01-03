# Een este archivo lo que vamos a ver son los esquemas que vamos a utilizar
#  para la validación de los datos que se van a enviar a la base de datos.
# Los esquemas son la estracutura de los datos que se van a enviar a la base de datos.
from pydantic import BaseModel
from datetime import date
from typing import List, Optional, Dict

# Esquemas para la entidad Empresa
class Empresa(BaseModel):
    id: int
    nombre: str
    eslogan: str
    rubro: str
    ubicacion: str
    imagen_url: Optional[str] = None
    horarios: Optional[Dict] = None 
    user_id: int
    
# Esquema para la creación de una empresa
class EmpresaCreate(BaseModel):
    nombre: str
    eslogan: str
    rubro: str
    ubicacion: str
    imagen_url: Optional[str] = None
    horarios: Optional[Dict] = None
    user_id: int

# Esquema para la actualización de una empresa
class EmpresaUpdate(BaseModel):
    nombre: Optional[str]
    eslogan: Optional[str]
    imagen_url: Optional[str]

# Esquema para la entidad Sucursal
class Sucursal(BaseModel):
        id: int
        nombre: str
        ubicacion: str
        empresa_id: int

# Esquema para la creación de una sucursal
class SucursalCreate(BaseModel):
    nombre: str
    ubicacion: str
    empresa_id: int

# Esquema para la actualización de una sucursal
class SucursalUpdate(BaseModel):
    nombre: Optional[str]
    ubicacion: Optional[str]

# Esquema para la entidad Categoria
class Categoria(BaseModel):
    id: int
    nombre: str
    empresa_id: int
    
    class Config:
        orm_mode = True

# Esquema para la creación de una categoria
class CategoriaCreate(BaseModel):
    nombre: str
    empresa_id: int
    servicios_ids: List[int] = []


class Config:
        orm_mode = True

# Esquema para la entidad Barbero
class Barbero(BaseModel):
    id: int
    nombre: str
    apellido: str
    email: Optional[str] = None
    empresa_id: int
    sucursal_id: Optional[int] = None
    imagen_url: Optional[str] = None

# Esquema para la creación de un barbero
class BarberoCreate(BaseModel):
    nombre: str
    apellido: str
    email: Optional[str] = None
    empresa_id: int
    sucursal_id: Optional[int] = None
    imagen_url: Optional[str] = None

# Esquema para la actualización de un barbero
class BarberoUpdate(BaseModel):
    email: Optional[str] = None
    sucursal_id: Optional[int] = None
    servicio_id: List[int] = []
    
# Esquema para la entidad Servicio
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
    categorias: List[Categoria] = []	

    
    class Config:
        orm_mode = True

# Esquema para la creación de un servicio
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


# Esquema para la actualización de un servicio
class ServicioUpdate(BaseModel):
    precio: Optional[int]
    duracion: Optional[str]
    modalidad: Optional[str]

    
class Config:
        orm_mode = True   
    
# Esquema para la entidad Horarios
class Horarios(BaseModel):
    id: int
    hora: str
    estado: bool
    barbero_id: int
    empresa_id: int

# Esquema para la creación de un horario
class HorariosCreate(BaseModel):
    hora: str
    barbero_id: int
    empresa_id: int

# Esquema para la creación de multiples horarios
class MultiplesHorarios(BaseModel):
    horarios: List[HorariosCreate]

# Esquema para la actualización de un horario
class HorarioUpdate(BaseModel):
    estado: bool   

# Esquema para la entidad Registro
class Registro(BaseModel):
    id: int
    email: str
    password: str

class Config:
        orm_mode = True

# Esquema para la creación de una reserva
class ReservaCreate(BaseModel):
    fecha: date
    servicio_id: int
    barbero_id: int
    horario_id: int
    user_id: int
    empresa_id: int
    estado: Optional[str] = 'Pendiente'

# Esquema para la entidad Reservas
class Reservas(BaseModel):
    id: int
    fecha: date
    servicio: Servicio
    barbero: Barbero
    horario: Horarios
    usuario: Registro
    empresa: Empresa  
    estado: str

class Config:
     orm_mode = True
    
# Esquema para crear un usuario  
class RegistroCreate(BaseModel):
    email: str
    password: str
   
# Esquema para que el usuario pueda iniciar sesión
class LoginRequest(BaseModel):
    email: str
    password: str

# Esquema para la entidad Usuario
class User(BaseModel):
    id: int
    email: str

class config:
    orm_mode = True
    
# Esquema para el inicio de sesión con Google
class LoginRequestGoogle (BaseModel):
    token: str

# Esquema para ver los detalles de una empresa 
class EmpresaDetalles(Empresa):
    servicios: List[Servicio]
    barberos: List[Barbero]
    horarios: List[Horarios]

# Esquema para una empresa con sus servicios
class EmpresaConServicios(Empresa):
    servicios: List[Servicio]

# Esquemas para las redes sociales de una empresa
class RedesSocialesBase(BaseModel):
    whatsapp: Optional[str] = None  
    instagram: Optional[str] = None
    facebook: Optional[str] = None
    youtube: Optional[str] = None
    tiktok: Optional[str] = None

# Esquema para la creación de las redes sociales
class RedesSocialesCreate(RedesSocialesBase):
    pass

# Esquema para relacionar las redes sociales con una empresa
class RedesSociales(RedesSocialesBase):
    id: int
    empresa_id: int

    class Config:
        orm_mode = True


    



    




    



    





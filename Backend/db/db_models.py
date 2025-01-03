# Archivo con los modelos de la base de datos
from Backend.db.database import Base
from sqlalchemy import Column, Integer, String, Boolean, Date, JSON, Table, Enum
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship
import enum

# Tabla de relación muchos a muchos entre servicios y barberos
servicio_barbero = Table(
    'servicio_barbero',
    Base.metadata,
    Column('servicio_id', Integer, ForeignKey('servicios.id', ondelete='CASCADE'), primary_key=True),
    Column('barbero_id', Integer, ForeignKey('barberos.id', ondelete='CASCADE'), primary_key=True)
)

# Tabla de relación muchos a muchos entre categorias y servicios
categoria_servicio = Table(
    'categoria_servicio', Base.metadata,
    Column('categoria_id', Integer, ForeignKey('categorias.id', ondelete='CASCADE'), primary_key=True),
    Column('servicio_id', Integer, ForeignKey('servicios.id', ondelete='CASCADE'), primary_key=True)
)

# Tabla de empresa con sus respectivos campos y relaciones
class Empresa(Base):
    __tablename__ = 'empresa'

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    eslogan = Column(String, index=True)
    rubro = Column(String, index=True)
    ubicacion = Column(String, index=True)
    imagen_url = Column(String, index=True)  
    horarios = Column(JSON)
    user_id = Column(Integer, ForeignKey('registro.id', ondelete='CASCADE'))  # Relacionar con el usuario
    usuario = relationship("Registro", back_populates="empresas")  # Relación inversa con Registro
    servicios = relationship('Servicio', back_populates='empresa', cascade='delete, merge')
    barberos = relationship('Barbero', back_populates='empresa', cascade='delete, merge')
    categorias = relationship('Categoria', back_populates='empresa', cascade='delete, merge')
    sucursales = relationship('Sucursal', back_populates='empresa', cascade='delete, merge')
    reservas = relationship('Reservas', back_populates='empresa', cascade='delete, merge')
    redes_sociales = relationship('RedesSociales', back_populates='empresa', uselist=False)
   
# Tabla de sucursales con sus respectivos campos y relaciones
class Sucursal(Base):
    __tablename__ = 'sucursales'
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    ubicacion = Column(String, nullable=False)
    empresa_id = Column(Integer, ForeignKey('empresa.id', ondelete='CASCADE'))
    empresa = relationship('Empresa', back_populates='sucursales')
    barberos = relationship('Barbero', back_populates='sucursal', cascade='delete, merge')

# Tabla de categorias con sus respectivos campos y relaciones
class Categoria(Base):
    __tablename__ = "categorias"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    empresa_id = Column(Integer, ForeignKey('empresa.id', ondelete='CASCADE'))
    servicios = relationship('Servicio', secondary=categoria_servicio, back_populates='categorias')
    empresa = relationship('Empresa', back_populates='categorias')

# Tabla de servicios con sus respectivos campos y relaciones
class Servicio(Base):

    __tablename__ = "servicios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    tipo_de_servicio = Column(String, index=True)
    descripcion = Column(String, index=True)
    precio = Column(Integer, index=True)
    seña = Column(Integer, index=True)
    duracion = Column(String, index=True)
    modalidad = Column(String, index=True)
    empresa_id = Column(Integer, ForeignKey('empresa.id', ondelete='CASCADE'))
    barberos = relationship("Barbero", secondary=servicio_barbero, back_populates="servicios")
    reservas = relationship("Reservas", back_populates="servicio")
    empresa = relationship('Empresa', back_populates='servicios')
    categorias = relationship("Categoria", secondary=categoria_servicio, back_populates="servicios")

# Tabla de barberos con sus respectivos campos y relaciones
class Barbero(Base):

    __tablename__ = "barberos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    apellido = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    empresa_id = Column(Integer, ForeignKey('empresa.id', ondelete='CASCADE'))
    sucursal_id = Column(Integer, ForeignKey('sucursales.id', ondelete='CASCADE'))
    imagen_url = Column(String, index=True)  
    horarios = relationship("Horarios", backref="barberos", cascade="delete, merge")
    reservas = relationship("Reservas", back_populates="barbero")
    servicios = relationship("Servicio", secondary=servicio_barbero, back_populates="barberos")
    empresa = relationship('Empresa', back_populates='barberos')
    sucursal = relationship('Sucursal', back_populates='barberos')
# Tabla de horarios con sus respectivos campos y relaciones 
class Horarios(Base):

    __tablename__ = "horarios"

    id = Column(Integer, primary_key=True, index=True)
    hora = Column(String, index=True)
    estado = Column(Boolean, default=True, index=True)
    barbero_id = Column(Integer, ForeignKey("barberos.id", ondelete="CASCADE"))
    empresa_id = Column(Integer, ForeignKey('empresa.id', ondelete='CASCADE'))
    reservas = relationship("Reservas", back_populates="horario")

# Enumeración para el estado de las reservas
class EstadoReserva(enum.Enum):
    pendiente = "Pendiente"
    cancelada = "Cancelada"
    realizada = "Realizada"

# Tabla de reservas con sus respectivos campos y relaciones 
class Reservas(Base):

    __tablename__ = "reservas"

    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(Date, index=True)
    servicio_id = Column(Integer, ForeignKey("servicios.id", ondelete="CASCADE"))
    barbero_id = Column(Integer, ForeignKey("barberos.id", ondelete="CASCADE"))
    horario_id = Column(Integer, ForeignKey("horarios.id", ondelete="CASCADE"))
    user_id = Column(Integer, ForeignKey("registro.id", ondelete="CASCADE"))  # Nueva columna para la relación con usuarios
    empresa_id = Column(Integer, ForeignKey("empresa.id", ondelete="CASCADE"))
    estado = Column(String, default='Pendiente')
    servicio = relationship("Servicio", back_populates="reservas")
    barbero = relationship("Barbero", back_populates="reservas")
    horario = relationship("Horarios", back_populates="reservas")
    usuario = relationship("Registro", back_populates="reservas")  # Definir la relación con el modelo Registro
    empresa = relationship("Empresa", back_populates="reservas")
# Tabla de registro con sus respectivos campos y relaciones
class Registro (Base):
    __tablename__ = "registro"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    password = Column(String, index=True)
    
    reservas = relationship("Reservas", back_populates="usuario")
    empresas = relationship("Empresa", back_populates="usuario") 
# Tabla de redes sociales con sus respectivos campos y relaciones
class RedesSociales(Base):
    __tablename__ = 'redes_sociales'

    id = Column(Integer, primary_key=True, index=True)
    empresa_id = Column(Integer, ForeignKey('empresa.id', ondelete='CASCADE'))
    whatsapp = Column(String, nullable=True)
    instagram = Column(String, nullable=True)
    facebook = Column(String, nullable=True)
    youtube = Column(String, nullable=True)
    tiktok = Column(String, nullable=True)

    empresa = relationship('Empresa', back_populates='redes_sociales')
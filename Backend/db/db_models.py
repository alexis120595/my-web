from Backend.db.database import Base
from sqlalchemy import Column, Integer, String, Boolean, Date, JSON
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship

class Empresa(Base):
    __tablename__ = 'empresa'

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    eslogan = Column(String, index=True)
    rubro = Column(String, index=True)
    ubicacion = Column(String, index=True)
    imagen_url = Column(String, index=True)  
    horarios = Column(JSON)
    servicios = relationship('Servicio', backref='empresa', cascade='delete, merge')
    barberos = relationship('Barbero', backref='empresa', cascade='delete, merge')
    


class Servicio(Base):

    __tablename__ = "servicios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    empresa_id = Column(Integer, ForeignKey('empresa.id', ondelete='CASCADE'))
    descripcion = Column(String, index=True)
    precio = Column(Integer, index=True)
    duracion = Column(String, index=True)
    barberos = relationship("Barbero", backref="servicios", cascade="delete, merge")
    reservas = relationship("Reservas", back_populates="servicio")


class Barbero(Base):

    __tablename__ = "barberos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    apellido = Column(String, index=True)
    servicios_id = Column(Integer, ForeignKey("servicios.id", ondelete="CASCADE"))
    empresa_id = Column(Integer, ForeignKey('empresa.id', ondelete='CASCADE'))
    imagen_url = Column(String, index=True)  
    horarios = relationship("Horarios", backref="barberos", cascade="delete, merge")
    reservas = relationship("Reservas", back_populates="barbero")
class Horarios(Base):

    __tablename__ = "horarios"

    id = Column(Integer, primary_key=True, index=True)
    hora = Column(String, index=True)
    estado = Column(Boolean, default=True, index=True)
    barbero_id = Column(Integer, ForeignKey("barberos.id", ondelete="CASCADE"))
    empresa_id = Column(Integer, ForeignKey('empresa.id', ondelete='CASCADE'))
    reservas = relationship("Reservas", back_populates="horario")
class Reservas(Base):

    __tablename__ = "reservas"

    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(Date, index=True)
    servicio_id = Column(Integer, ForeignKey("servicios.id", ondelete="CASCADE"))
    barbero_id = Column(Integer, ForeignKey("barberos.id", ondelete="CASCADE"))
    horario_id = Column(Integer, ForeignKey("horarios.id", ondelete="CASCADE"))

    
    servicio = relationship("Servicio", back_populates="reservas")
    barbero = relationship("Barbero", back_populates="reservas")
    horario = relationship("Horarios", back_populates="reservas")

class Registro (Base):
    __tablename__ = "registro"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    apellido = Column(String, index=True)
    email = Column(String, index=True)
    password = Column(String, index=True)
    telefono = Column(String, index=True)
    dni = Column(String, index=True)


    



 
    
    
 
   

   


   
    
  
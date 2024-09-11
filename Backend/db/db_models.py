from Backend.db.database import Base
from sqlalchemy import Column, Integer, String, Boolean, Date
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship



class Servicio(Base):

    __tablename__ = "servicios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    barberos = relationship("Barbero", backref="servicios", cascade="delete, merge")



class Barbero(Base):

    __tablename__ = "barberos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    apellido = Column(String, index=True)
    servicios_id = Column(Integer, ForeignKey("servicios.id", ondelete="CASCADE"))
    horarios = relationship("Horarios", backref="barberos", cascade="delete, merge")

class Horarios(Base):

    __tablename__ = "horarios"

    id = Column(Integer, primary_key=True, index=True)
    hora = Column(String, index=True)
    estado = Column(Boolean, default=True, index=True)
    barbero_id = Column(Integer, ForeignKey("barberos.id", ondelete="CASCADE"))

class Reservas(Base):

    __tablename__ = "reservas"

    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(Date, index=True)
    servicio_id = Column(Integer, ForeignKey("servicios.id", ondelete="CASCADE"))
    barbero_id = Column(Integer, ForeignKey("barberos.id", ondelete="CASCADE"))
    horario_id = Column(Integer, ForeignKey("horarios.id", ondelete="CASCADE"))


   

   


   
    
  
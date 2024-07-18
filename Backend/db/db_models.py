from Backend.db.database import Base
from sqlalchemy import Column, Integer, String

class Product(Base):

    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String)
    price = Column(Integer)
    stock = Column(Integer)
  
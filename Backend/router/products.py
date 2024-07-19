from fastapi import APIRouter, Depends
from typing import List  
from Backend.schemas import Product
from Backend.db.database import get_db
from sqlalchemy.orm import Session
from Backend.db import db_models   


router = APIRouter()

#products: List[Product] = []


    

@router.get("/products")
async def all_products(db : Session = Depends(get_db)):
    products = db.query(db_models.Product).all()
    return {"products": products}


@router.post("/products")
async def create_product(product: Product, db : Session = Depends(get_db)):
   # products.append(product)
   new_product = db_models.Product(name=product.name, price=product.price, stock=product.stock)
   db.add(new_product)
   db.commit()
   db.refresh(new_product)
   return product
from fastapi import APIRouter, Depends, HTTPException, Request
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

@router.get("/product")
async def get_product_by_id(request: Request, db: Session = Depends(get_db)):
    product_id = request.query_params.get('product_id')
    
    if product_id is None:
        raise HTTPException(status_code=400, detail="Product ID is required")
    
    try:
        product_id = int(product_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Product ID must be an integer")
    
    product = db.query(db_models.Product).filter(db_models.Product.id == product_id).first()
    
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return product



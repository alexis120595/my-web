from fastapi import APIRouter 
from typing import List  
from Backend.schemas import Product

router = APIRouter()

products: List[Product] = []

@router.get("/products")
async def all_products():
    return {"products": products}


@router.post("/products")
async def create_product(product: Product):
    products.append(product)
    return product
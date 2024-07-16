from fastapi import FastAPI
from pydantic import BaseModel


products_list = []


class Product(BaseModel):
    id: int
    name: str
    price: float
    stock: int

app = FastAPI()

@app.get("/products")
async def products():
    return {"products": products_list}
  

@app.post("/products")
async def create_product(product: Product):
    products_list.append(product.dict())
    return {"product": product}




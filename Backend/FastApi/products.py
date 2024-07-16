from fastapi import FastAPI

app = FastAPI()

@app.get("/products")
async def products():
    return {"vista de todos los productos"}
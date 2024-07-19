from fastapi import FastAPI
import uvicorn
from Backend.router import products
from Backend.db.database import Base, engine
from Backend.db.db_models import Product

def create_tables():
    Base.metadata.create_all(bind=engine)

create_tables()




app = FastAPI()
app.include_router(products.router)





if __name__ == '__main__':
    uvicorn.run("main:app", port=8000, reload=True)

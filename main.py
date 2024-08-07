from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from Backend.router import products
from Backend.db.database import Base, engine
from Backend.db.db_models import Product

def create_tables():
    Base.metadata.create_all(bind=engine)

create_tables()




app = FastAPI()
app.include_router(products.router)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)






if __name__ == '__main__':
    uvicorn.run("main:app", port=8000, reload=True)

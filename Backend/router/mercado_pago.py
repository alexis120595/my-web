# Arquivo de rotas do Mercado Pago
from fastapi import APIRouter, HTTPException, Request, BackgroundTasks
import mercadopago
import os

# Criar um roteador para as rotas do Mercado Pago
router = APIRouter()

# Obter o token de acesso do Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN = os.getenv("MERCADO_PAGO_ACCESS_TOKEN")

# Inicializador del SDK de Mercado Pago
sdk = mercadopago.SDK(MERCADO_PAGO_ACCESS_TOKEN)

# Ruta para crear una preferencia de pago
@router.post("/create_preference")
async def create_preference(request: Request):
    # Estrutura de datos para crear una preferencia de pago
    body = await request.json()
   
   # Datos que vamos a colorear en la preferencia de pago
    preference_data = {
        "items": [
            {
                "title": body["title"],
                "quantity": body["quantity"],
                "unit_price": body["unit_price"]
            }
        ],
        # URLs de redirección
        "back_urls": {
            "success": "http://localhost:3000/home?status=success",
            "failure": "http://localhost:3000/failure",
            "pending": "http://localhost:3000/pending"
        },
        "auto_return": "approved",
    }
    preference_response = sdk.preference().create(preference_data)
    preference = preference_response["response"]
    # Retornar el ID de la preferencia de pago
    return {"id": preference["id"]}

# Ruta para obtener una preferencia de pago
@router.get("/get_preference/{preference_id}")
# Función para obtener una preferencia de pago
async def get_preference(preference_id: str):
    preference = sdk.preference().get(preference_id)
    return preference["response"]
# Ruta para manejar las notificaciones de pago
@router.post("/webhook")
# Función para manejar las notificaciones de pago
async def webhook(request: Request):
    body = await request.json()
    # Manejar la notificación de pago aquí
    print(body)
    return {"status": "received"}


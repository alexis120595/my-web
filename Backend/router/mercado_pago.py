from fastapi import APIRouter, HTTPException, Request, BackgroundTasks
import mercadopago

router = APIRouter()

sdk = mercadopago.SDK("APP_USR-7326986743119520-090914-8c171d7d35fe47dba8a546ad4601413f-1984732162")

@router.post("/create_preference")
async def create_preference(request: Request):
    body = await request.json()
   
    preference_data = {
        "items": [
            {
                "title": body["title"],
                "quantity": body["quantity"],
                "unit_price": body["unit_price"]
            }
        ],
        "back_urls": {
            "success": "http://localhost:3000/home?status=success",
            "failure": "http://localhost:3000/failure",
            "pending": "http://localhost:3000/pending"
        },
        "auto_return": "approved",
    }
    preference_response = sdk.preference().create(preference_data)
    preference = preference_response["response"]
    
    return {"id": preference["id"]}

@router.get("/get_preference/{preference_id}")
async def get_preference(preference_id: str):
    preference = sdk.preference().get(preference_id)
    return preference["response"]

@router.post("/webhook")
async def webhook(request: Request):
    body = await request.json()
    # Manejar la notificación de pago aquí
    print(body)
    return {"status": "received"}


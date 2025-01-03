#Iportaciones necesarias para enviar correos electrónicos con Resend
import resend
import os
from dotenv import load_dotenv

# Carga las variables de entorno
load_dotenv()

# Configura tu API Key de Resend
RESEND_API_KEY = os.getenv("RESEND_API_KEY")

# Asigna la API Key a la configuración de Resend
resend.api_key = RESEND_API_KEY

# Función para enviar correos electrónicos
# cuando se realiza una nueva reserva
def enviar_email(destinatario, asunto, html_contenido):
    try:
        response = resend.Emails.send({
             "from": "Acme <onboarding@resend.dev>",  # Tu correo verificado
            "to": [destinatario],
            "subject": asunto,
            "html": html_contenido
        })
        print("Correo enviado exitosamente")
    except Exception as e:
        print(f"Error al enviar el correo: {e}")
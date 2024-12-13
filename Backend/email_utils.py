import resend

# Configura tu API Key de Resend
resend.api_key = "re_BvwMpm6W_8m3ZBaHzRFu7db8JdDNhkQkL"

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
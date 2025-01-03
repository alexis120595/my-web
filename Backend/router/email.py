# Archivo en el cuanl vamos a encontrar la ruta para crear el email
# que se envia cuando la reserva es creada con exito

# Ruta para
@app.post('/reservas/')
async def crear_reserva(reserva: Reserva, background_tasks: BackgroundTasks):
    # Lógica para crear la reserva (guardar en base de datos, etc.)

    # Preparar el contenido del correo
    asunto = 'Confirmación de Reserva'
    contenido_html = f"""
    <h1>Hola {reserva.nombre},</h1>
    <p>Tu reserva para el día {reserva.fecha} a las {reserva.hora} ha sido confirmada.</p>
    <p>¡Te esperamos!</p>
    """

    # Enviar el correo en segundo plano
    background_tasks.add_task(enviar_email_resend, reserva.email, asunto, contenido_html)

    return {'mensaje': 'Reserva creada exitosamente'}
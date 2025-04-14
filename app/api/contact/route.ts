import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validar que todos los campos requeridos estén presentes
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "ginkgodevs@gmail.com",
        pass: process.env.EMAIL_PASSWORD, // Asegúrate de tener esta variable de entorno configurada
      },
    })

    // Configurar el correo electrónico
    const mailOptions = {
      from: process.env.EMAIL_USER || "ginkgodevs@gmail.com",
      to: "ginkgodevs@gmail.com",
      subject: `Nuevo mensaje de contacto de ${name}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        
        Mensaje:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #293B36; border-bottom: 2px solid #D4F57A; padding-bottom: 10px;">Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-line;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">Este mensaje fue enviado desde el formulario de contacto de Ginkgo Devs.</p>
        </div>
      `,
    }

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: "Mensaje enviado correctamente" }, { status: 200 })
  } catch (error) {
    console.error("Error al enviar el mensaje:", error)
    return NextResponse.json({ error: "Error al enviar el mensaje" }, { status: 500 })
  }
}

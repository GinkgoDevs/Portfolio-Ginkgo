import { NextResponse } from "next/server"
import crypto from "crypto"

export async function GET() {
  try {
    // Generar un token CSRF simple
    const csrfToken = crypto.randomBytes(16).toString("hex")

    // Configurar los headers adecuados
    return new NextResponse(JSON.stringify({ csrfToken }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    })
  } catch (error) {
    console.error("Error generating CSRF token:", error)
    return new NextResponse(JSON.stringify({ error: "Failed to generate CSRF token" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}


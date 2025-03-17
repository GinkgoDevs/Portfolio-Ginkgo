import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales, defaultLocale } from "./i18n.config"

export function middleware(request: NextRequest) {
  // Obtener la ruta de la solicitud
  const pathname = request.nextUrl.pathname || ""

  // Asegurarse de que pathname sea siempre un string
  if (typeof pathname !== "string") {
    console.error("pathname is not a string:", pathname)
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
  }

  // Manejar específicamente la ruta raíz
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
  }

  // Verificar si la ruta ya tiene un locale
  const pathnameHasLocale = locales.some((locale) => {
    const localeStr = String(locale)
    return pathname.startsWith(`/${localeStr}/`) || pathname === `/${localeStr}`
  })

  if (pathnameHasLocale) return NextResponse.next()

  // Redirigir si no hay locale
  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`, request.url),
  )
}

export const config = {
  // Coincidir con todas las rutas excepto:
  // - rutas /api
  // - /_next (internos de Next.js)
  // - archivos estáticos (imágenes, fuentes, etc.)
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|webp|mp3|mp4|webm|ico)).*)",
    "/",
  ],
}


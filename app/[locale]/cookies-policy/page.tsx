import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Cookies | Ginkgo Devs",
  description: "Política de cookies de Ginkgo Devs",
}

export default function CookiesPolicyPage() {
  return <CookiesPolicyClient />
}

function CookiesPolicyClient() {
  return (
    <main className="min-h-screen bg-[#293B36] pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg">
          <Link
            href="/"
            className="inline-flex items-center text-[#D4F57A] hover:text-[#D4F57A]/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Política de Cookies</h1>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-white/80">Última actualización: {new Date().toLocaleDateString()}</p>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">1. ¿Qué son las Cookies?</h2>
            <p className="text-white/80 mb-4">
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tablet o móvil)
              cuando visitas un sitio web. Las cookies son ampliamente utilizadas para hacer que los sitios web
              funcionen, o funcionen de manera más eficiente, así como para proporcionar información a los propietarios
              del sitio.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
              2. Cómo Utilizamos las Cookies
            </h2>
            <p className="text-white/80 mb-4">Utilizamos diferentes tipos de cookies por las siguientes razones:</p>

            <h3 className="text-lg md:text-xl font-semibold text-white mt-6 mb-3">2.1 Cookies Necesarias</h3>
            <p className="text-white/80 mb-4">
              Estas cookies son esenciales para que puedas moverte por el sitio web y utilizar sus características. Sin
              estas cookies, no se pueden proporcionar los servicios que has solicitado, como recordar tus datos de
              inicio de sesión o los artículos de tu carrito de compra.
            </p>

            <h3 className="text-lg md:text-xl font-semibold text-white mt-6 mb-3">2.2 Cookies Analíticas</h3>
            <p className="text-white/80 mb-4">
              Estas cookies nos permiten reconocer y contar el número de visitantes y ver cómo los visitantes se mueven
              por nuestro sitio web cuando lo están utilizando. Esto nos ayuda a mejorar la forma en que funciona
              nuestro sitio web, por ejemplo, asegurándonos de que los usuarios encuentren fácilmente lo que están
              buscando.
            </p>

            <h3 className="text-lg md:text-xl font-semibold text-white mt-6 mb-3">2.3 Cookies de Marketing</h3>
            <p className="text-white/80 mb-4">
              Estas cookies registran tu visita a nuestro sitio web, las páginas que has visitado y los enlaces que has
              seguido. Utilizamos esta información para hacer que nuestro sitio web y la publicidad mostrada en él sean
              más relevantes para tus intereses. También podemos compartir esta información con terceros para este
              propósito.
            </p>

            <h3 className="text-lg md:text-xl font-semibold text-white mt-6 mb-3">2.4 Cookies de Preferencias</h3>
            <p className="text-white/80 mb-4">
              Estas cookies permiten que nuestro sitio web recuerde las elecciones que haces (como tu nombre de usuario,
              idioma o la región en la que te encuentras) y proporcione características mejoradas y más personales.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">3. Control de Cookies</h2>
            <p className="text-white/80 mb-4">
              Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las cookies que ya están en
              tu dispositivo y puedes configurar la mayoría de los navegadores para evitar que se coloquen. Si lo haces,
              es posible que tengas que ajustar manualmente algunas preferencias cada vez que visites un sitio y que
              algunos servicios y funcionalidades no funcionen.
            </p>
            <p className="text-white/80 mb-4">
              Puedes gestionar tus preferencias de cookies a través del banner de cookies que aparece cuando visitas
              nuestro sitio por primera vez, o en cualquier momento haciendo clic en el enlace "Preferencias de Cookies"
              en el pie de página de nuestro sitio.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
              4. Cookies Específicas que Utilizamos
            </h2>
            <p className="text-white/80 mb-4">
              A continuación se muestra una lista de las principales cookies que utilizamos y lo que utilizamos para:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-white/80">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-2 px-4 text-left text-[#D4F57A]">Nombre</th>
                    <th className="py-2 px-4 text-left text-[#D4F57A]">Propósito</th>
                    <th className="py-2 px-4 text-left text-[#D4F57A]">Duración</th>
                    <th className="py-2 px-4 text-left text-[#D4F57A]">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-2 px-4">cookie-consent</td>
                    <td className="py-2 px-4">Almacena tus preferencias de cookies</td>
                    <td className="py-2 px-4">1 año</td>
                    <td className="py-2 px-4">Necesaria</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 px-4">_ga</td>
                    <td className="py-2 px-4">Utilizada por Google Analytics para distinguir usuarios</td>
                    <td className="py-2 px-4">2 años</td>
                    <td className="py-2 px-4">Analítica</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 px-4">_gid</td>
                    <td className="py-2 px-4">Utilizada por Google Analytics para distinguir usuarios</td>
                    <td className="py-2 px-4">24 horas</td>
                    <td className="py-2 px-4">Analítica</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 px-4">_fbp</td>
                    <td className="py-2 px-4">Utilizada por Facebook para entregar anuncios</td>
                    <td className="py-2 px-4">3 meses</td>
                    <td className="py-2 px-4">Marketing</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 px-4">theme</td>
                    <td className="py-2 px-4">Almacena tus preferencias de tema (claro/oscuro)</td>
                    <td className="py-2 px-4">1 año</td>
                    <td className="py-2 px-4">Preferencia</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
              5. Cambios en nuestra Política de Cookies
            </h2>
            <p className="text-white/80 mb-4">
              Cualquier cambio que podamos hacer en nuestra política de cookies en el futuro se publicará en esta
              página. Por favor, comprueba con frecuencia para ver cualquier actualización o cambio en nuestra política
              de cookies.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">6. Contacto</h2>
            <p className="text-white/80 mb-4">
              Si tienes alguna pregunta sobre nuestras cookies o esta política de cookies, contáctanos en:
            </p>
            <p className="text-white/80 mb-4">
              <strong>Email:</strong> hello@ginkgodevs.com
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}


import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Ginkgo Devs",
  description: "Términos y condiciones de uso de Ginkgo Devs",
}

export default function TermsPage() {
  return <TermsClient />
}

function TermsClient() {
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

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Términos y Condiciones</h1>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-white/80">Última actualización: {new Date().toLocaleDateString()}</p>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">1. Introducción</h2>
            <p className="text-white/80 mb-4">
              Bienvenido a Ginkgo Devs. Estos términos y condiciones rigen el uso de nuestro sitio web ubicado en
              www.ginkgodevs.com (en adelante, "el Sitio"). Al acceder a este sitio web, asumimos que aceptas estos
              términos y condiciones en su totalidad. No continúes usando el sitio web de Ginkgo Devs si no aceptas
              todos los términos y condiciones establecidos en esta página.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">2. Propiedad Intelectual</h2>
            <p className="text-white/80 mb-4">
              A menos que se indique lo contrario, Ginkgo Devs y/o sus licenciantes poseen los derechos de propiedad
              intelectual de todo el material en Ginkgo Devs. Todos los derechos de propiedad intelectual están
              reservados. Puedes ver y/o imprimir páginas desde el Sitio para tu uso personal sujeto a las restricciones
              establecidas en estos términos y condiciones.
            </p>
            <p className="text-white/80 mb-4">No debes:</p>
            <ul className="list-disc pl-6 text-white/80 mb-4">
              <li>Republicar material de Ginkgo Devs</li>
              <li>Vender, alquilar o sublicenciar material de Ginkgo Devs</li>
              <li>Reproducir, duplicar o copiar material de Ginkgo Devs</li>
              <li>Redistribuir contenido de Ginkgo Devs</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
              3. Limitaciones de Responsabilidad
            </h2>
            <p className="text-white/80 mb-4">
              En ningún caso Ginkgo Devs o sus proveedores serán responsables por cualquier daño (incluyendo, sin
              limitación, daños por pérdida de datos o beneficios, o debido a la interrupción del negocio) que surjan
              del uso o la incapacidad de usar los materiales en el Sitio, incluso si Ginkgo Devs o un representante
              autorizado de Ginkgo Devs ha sido notificado oralmente o por escrito de la posibilidad de tales daños.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">4. Enlaces a Terceros</h2>
            <p className="text-white/80 mb-4">
              Ginkgo Devs puede contener enlaces a sitios web operados por terceros. No tenemos control sobre, y no
              asumimos responsabilidad por el contenido, políticas de privacidad o prácticas de sitios web o servicios
              de terceros. Reconoces y aceptas que Ginkgo Devs no será responsable, directa o indirectamente, por
              cualquier daño o pérdida causada o supuestamente causada por o en conexión con el uso o la confianza en
              cualquier contenido, bienes o servicios disponibles en o a través de cualquier sitio web o servicio de
              terceros.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">5. Modificaciones</h2>
            <p className="text-white/80 mb-4">
              Ginkgo Devs puede revisar estos términos de servicio del sitio web en cualquier momento sin previo aviso.
              Al usar este sitio web, aceptas estar sujeto a la versión actual de estos términos y condiciones.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">6. Ley Aplicable</h2>
            <p className="text-white/80 mb-4">
              Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de Argentina y te sometes
              irrevocablemente a la jurisdicción exclusiva de los tribunales en esa ubicación.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">7. Contacto</h2>
            <p className="text-white/80 mb-4">
              Si tienes alguna pregunta sobre estos Términos y Condiciones, por favor contáctanos en:
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


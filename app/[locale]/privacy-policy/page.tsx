import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Privacidad | Ginkgo Devs",
  description: "Política de privacidad de Ginkgo Devs",
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />
}

function PrivacyPolicyClient() {
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

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Política de Privacidad</h1>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-white/80">Última actualización: {new Date().toLocaleDateString()}</p>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">1. Introducción</h2>
            <p className="text-white/80 mb-4">
              En Ginkgo Devs, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta
              política de privacidad te informará sobre cómo cuidamos tus datos personales cuando visitas nuestro sitio
              web (independientemente de dónde lo visites) y te informará sobre tus derechos de privacidad y cómo la ley
              te protege.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">2. Datos que Recopilamos</h2>
            <p className="text-white/80 mb-4">
              Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre ti, que hemos
              agrupado de la siguiente manera:
            </p>
            <ul className="list-disc pl-6 text-white/80 mb-4">
              <li>
                <strong>Datos de Identidad:</strong> incluye nombre, apellido, nombre de usuario o identificador
                similar.
              </li>
              <li>
                <strong>Datos de Contacto:</strong> incluye dirección de correo electrónico y números de teléfono.
              </li>
              <li>
                <strong>Datos Técnicos:</strong> incluye dirección de protocolo de Internet (IP), datos de inicio de
                sesión, tipo y versión de navegador, configuración de zona horaria y ubicación, tipos y versiones de
                complementos del navegador, sistema operativo y plataforma, y otra tecnología en los dispositivos que
                utilizas para acceder a este sitio web.
              </li>
              <li>
                <strong>Datos de Uso:</strong> incluye información sobre cómo usas nuestro sitio web y servicios.
              </li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
              3. Cómo Recopilamos tus Datos
            </h2>
            <p className="text-white/80 mb-4">
              Utilizamos diferentes métodos para recopilar datos de y sobre ti, incluyendo:
            </p>
            <ul className="list-disc pl-6 text-white/80 mb-4">
              <li>
                <strong>Interacción directa:</strong> Puedes proporcionarnos tus datos de identidad y contacto al
                completar formularios o al comunicarte con nosotros por correo postal, teléfono, correo electrónico o de
                otra manera.
              </li>
              <li>
                <strong>Tecnologías o interacciones automatizadas:</strong> A medida que interactúas con nuestro sitio
                web, podemos recopilar automáticamente datos técnicos sobre tu equipo, acciones de navegación y
                patrones. Recopilamos estos datos personales mediante cookies y otras tecnologías similares.
              </li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">4. Cómo Usamos tus Datos</h2>
            <p className="text-white/80 mb-4">
              Solo usaremos tus datos personales cuando la ley nos lo permita. Más comúnmente, usaremos tus datos
              personales en las siguientes circunstancias:
            </p>
            <ul className="list-disc pl-6 text-white/80 mb-4">
              <li>Donde necesitemos ejecutar el contrato que estamos a punto de celebrar o hemos celebrado contigo.</li>
              <li>
                Donde sea necesario para nuestros intereses legítimos (o los de un tercero) y tus intereses y derechos
                fundamentales no anulen esos intereses.
              </li>
              <li>Donde necesitemos cumplir con una obligación legal o regulatoria.</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">5. Divulgación de tus Datos</h2>
            <p className="text-white/80 mb-4">
              Podemos compartir tus datos personales con las partes establecidas a continuación para los fines
              establecidos en esta política de privacidad:
            </p>
            <ul className="list-disc pl-6 text-white/80 mb-4">
              <li>Proveedores de servicios que proporcionan servicios de TI y administración de sistemas.</li>
              <li>Asesores profesionales que incluyen abogados, banqueros, auditores y aseguradores.</li>
              <li>Autoridades fiscales, reguladoras y otras autoridades.</li>
              <li>
                Terceros a quienes podemos elegir vender, transferir o fusionar partes de nuestro negocio o nuestros
                activos.
              </li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">6. Seguridad de Datos</h2>
            <p className="text-white/80 mb-4">
              Hemos implementado medidas de seguridad apropiadas para evitar que tus datos personales se pierdan, usen o
              accedan accidentalmente de manera no autorizada, se alteren o divulguen. Además, limitamos el acceso a tus
              datos personales a aquellos empleados, agentes, contratistas y otros terceros que tienen una necesidad
              comercial de saber. Solo procesarán tus datos personales según nuestras instrucciones y están sujetos a un
              deber de confidencialidad.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">7. Tus Derechos Legales</h2>
            <p className="text-white/80 mb-4">
              Bajo ciertas circunstancias, tienes derechos bajo las leyes de protección de datos en relación con tus
              datos personales:
            </p>
            <ul className="list-disc pl-6 text-white/80 mb-4">
              <li>Solicitar acceso a tus datos personales.</li>
              <li>Solicitar la corrección de tus datos personales.</li>
              <li>Solicitar la eliminación de tus datos personales.</li>
              <li>Oponerse al procesamiento de tus datos personales.</li>
              <li>Solicitar la restricción del procesamiento de tus datos personales.</li>
              <li>Solicitar la transferencia de tus datos personales.</li>
              <li>Derecho a retirar el consentimiento.</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">8. Contacto</h2>
            <p className="text-white/80 mb-4">
              Si tienes alguna pregunta sobre esta política de privacidad o nuestras prácticas de privacidad,
              contáctanos en:
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


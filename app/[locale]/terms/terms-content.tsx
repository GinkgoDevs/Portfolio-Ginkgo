"use client"

interface TermsContentProps {
  locale: string
}

export default function TermsContent({ locale }: TermsContentProps) {
  const isEnglish = locale === "en"

  return (
    <>
      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "1. Introduction" : "1. Introducción"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? 'Welcome to Ginkgo Devs. These terms and conditions govern your use of our website located at www.ginkgodevs.com (hereinafter, "the Site"). By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Ginkgo Devs\' website if you do not accept all of the terms and conditions stated on this page.'
          : 'Bienvenido a Ginkgo Devs. Estos términos y condiciones rigen el uso de nuestro sitio web ubicado en www.ginkgodevs.com (en adelante, "el Sitio"). Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones en su totalidad. No continúes usando el sitio web de Ginkgo Devs si no aceptas todos los términos y condiciones establecidos en esta página.'}
      </p>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "2. Intellectual Property" : "2. Propiedad Intelectual"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "Unless otherwise stated, Ginkgo Devs and/or its licensors own the intellectual property rights for all material on Ginkgo Devs. All intellectual property rights are reserved. You may view and/or print pages from the Site for your own personal use subject to restrictions set in these terms and conditions."
          : "A menos que se indique lo contrario, Ginkgo Devs y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en Ginkgo Devs. Todos los derechos de propiedad intelectual están reservados. Puedes ver y/o imprimir páginas desde el Sitio para tu uso personal sujeto a las restricciones establecidas en estos términos y condiciones."}
      </p>
      <p className="text-white/80 mb-4">{isEnglish ? "You must not:" : "No debes:"}</p>
      <ul className="list-disc pl-6 text-white/80 mb-4">
        <li>{isEnglish ? "Republish material from Ginkgo Devs" : "Republicar material de Ginkgo Devs"}</li>
        <li>
          {isEnglish
            ? "Sell, rent or sub-license material from Ginkgo Devs"
            : "Vender, alquilar o sublicenciar material de Ginkgo Devs"}
        </li>
        <li>
          {isEnglish
            ? "Reproduce, duplicate or copy material from Ginkgo Devs"
            : "Reproducir, duplicar o copiar material de Ginkgo Devs"}
        </li>
        <li>{isEnglish ? "Redistribute content from Ginkgo Devs" : "Redistribuir contenido de Ginkgo Devs"}</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "3. Limitations of Liability" : "3. Limitaciones de Responsabilidad"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "In no event shall Ginkgo Devs or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Site, even if Ginkgo Devs or a Ginkgo Devs authorized representative has been notified orally or in writing of the possibility of such damage."
          : "En ningún caso Ginkgo Devs o sus proveedores serán responsables por cualquier daño (incluyendo, sin limitación, daños por pérdida de datos o beneficios, o debido a la interrupción del negocio) que surjan del uso o la incapacidad de usar los materiales en el Sitio, incluso si Ginkgo Devs o un representante autorizado de Ginkgo Devs ha sido notificado oralmente o por escrito de la posibilidad de tales daños."}
      </p>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "4. Links to Third Parties" : "4. Enlaces a Terceros"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "Ginkgo Devs may contain links to websites operated by third parties. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Ginkgo Devs shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services."
          : "Ginkgo Devs puede contener enlaces a sitios web operados por terceros. No tenemos control sobre, y no asumimos responsabilidad por el contenido, políticas de privacidad o prácticas de sitios web o servicios de terceros. Reconoces y aceptas que Ginkgo Devs no será responsable, directa o indirectamente, por cualquier daño o pérdida causada o supuestamente causada por o en conexión con el uso o la confianza en cualquier contenido, bienes o servicios disponibles en o a través de cualquier sitio web o servicio de terceros."}
      </p>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "5. Modifications" : "5. Modificaciones"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "Ginkgo Devs may revise these terms of service for its web site at any time without notice. By using this web site you are agreeing to be bound by the then current version of these terms and conditions."
          : "Ginkgo Devs puede revisar estos términos de servicio del sitio web en cualquier momento sin previo aviso. Al usar este sitio web, aceptas estar sujeto a la versión actual de estos términos y condiciones."}
      </p>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "6. Governing Law" : "6. Ley Aplicable"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "These terms and conditions are governed by and construed in accordance with the laws of Argentina and you irrevocably submit to the exclusive jurisdiction of the courts in that location."
          : "Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de Argentina y te sometes irrevocablemente a la jurisdicción exclusiva de los tribunales en esa ubicación."}
      </p>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "7. Contact" : "7. Contacto"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "If you have any questions about these Terms and Conditions, please contact us at:"
          : "Si tienes alguna pregunta sobre estos Términos y Condiciones, por favor contáctanos en:"}
      </p>
      <p className="text-white/80 mb-4">
        <strong>Email:</strong> hello@ginkgodevs.com
      </p>
    </>
  )
}


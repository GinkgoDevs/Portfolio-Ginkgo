"use client"

interface PrivacyPolicyContentProps {
  locale: string
}

export default function PrivacyPolicyContent({ locale }: PrivacyPolicyContentProps) {
  const isEnglish = locale === "en"

  return (
    <>
      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "1. Introduction" : "1. Introducción"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "At Ginkgo Devs, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you."
          : "En Ginkgo Devs, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política de privacidad te informará sobre cómo cuidamos tus datos personales cuando visitas nuestro sitio web y te informará sobre tus derechos de privacidad y cómo la ley te protege."}
      </p>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "2. Data We Collect" : "2. Datos que Recopilamos"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:"
          : "Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre ti, que hemos agrupado de la siguiente manera:"}
      </p>
      <ul className="list-disc pl-6 text-white/80 mb-4">
        <li>
          <strong>{isEnglish ? "Identity Data:" : "Datos de Identidad:"}</strong>{" "}
          {isEnglish
            ? "includes first name, last name, username or similar identifier."
            : "incluye nombre, apellido, nombre de usuario o identificador similar."}
        </li>
        <li>
          <strong>{isEnglish ? "Contact Data:" : "Datos de Contacto:"}</strong>{" "}
          {isEnglish
            ? "includes email address and telephone numbers."
            : "incluye dirección de correo electrónico y números de teléfono."}
        </li>
        <li>
          <strong>{isEnglish ? "Technical Data:" : "Datos Técnicos:"}</strong>{" "}
          {isEnglish
            ? "includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website."
            : "incluye dirección de protocolo de Internet (IP), datos de inicio de sesión, tipo y versión de navegador, configuración de zona horaria y ubicación, tipos y versiones de complementos del navegador, sistema operativo y plataforma, y otra tecnología en los dispositivos que utilizas para acceder a este sitio web."}
        </li>
        <li>
          <strong>{isEnglish ? "Usage Data:" : "Datos de Uso:"}</strong>{" "}
          {isEnglish
            ? "includes information about how you use our website and services."
            : "incluye información sobre cómo usas nuestro sitio web y servicios."}
        </li>
      </ul>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "3. How We Collect Your Data" : "3. Cómo Recopilamos tus Datos"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "We use different methods to collect data from and about you including:"
          : "Utilizamos diferentes métodos para recopilar datos de y sobre ti, incluyendo:"}
      </p>
      <ul className="list-disc pl-6 text-white/80 mb-4">
        <li>
          <strong>{isEnglish ? "Direct interactions:" : "Interacción directa:"}</strong>{" "}
          {isEnglish
            ? "You may give us your Identity and Contact Data by filling in forms or by corresponding with us by post, phone, email or otherwise."
            : "Puedes proporcionarnos tus datos de identidad y contacto al completar formularios o al comunicarte con nosotros por correo postal, teléfono, correo electrónico o de otra manera."}
        </li>
        <li>
          <strong>
            {isEnglish ? "Automated technologies or interactions:" : "Tecnologías o interacciones automatizadas:"}
          </strong>{" "}
          {isEnglish
            ? "As you interact with our website, we may automatically collect Technical Data about your equipment, browsing actions and patterns. We collect this personal data by using cookies and other similar technologies."
            : "A medida que interactúas con nuestro sitio web, podemos recopilar automáticamente datos técnicos sobre tu equipo, acciones de navegación y patrones. Recopilamos estos datos personales mediante cookies y otras tecnologías similares."}
        </li>
      </ul>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "4. How We Use Your Data" : "4. Cómo Usamos tus Datos"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:"
          : "Solo usaremos tus datos personales cuando la ley nos lo permita. Más comúnmente, usaremos tus datos personales en las siguientes circunstancias:"}
      </p>
      <ul className="list-disc pl-6 text-white/80 mb-4">
        <li>
          {isEnglish
            ? "Where we need to perform the contract we are about to enter into or have entered into with you."
            : "Donde necesitemos ejecutar el contrato que estamos a punto de celebrar o hemos celebrado contigo."}
        </li>
        <li>
          {isEnglish
            ? "Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests."
            : "Donde sea necesario para nuestros intereses legítimos (o los de un tercero) y tus intereses y derechos fundamentales no anulen esos intereses."}
        </li>
        <li>
          {isEnglish
            ? "Where we need to comply with a legal or regulatory obligation."
            : "Donde necesitemos cumplir con una obligación legal o regulatoria."}
        </li>
      </ul>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "5. Disclosure of Your Data" : "5. Divulgación de tus Datos"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "We may share your personal data with the parties set out below for the purposes set out in this privacy policy:"
          : "Podemos compartir tus datos personales con las partes establecidas a continuación para los fines establecidos en esta política de privacidad:"}
      </p>
      <ul className="list-disc pl-6 text-white/80 mb-4">
        <li>
          {isEnglish
            ? "Service providers who provide IT and system administration services."
            : "Proveedores de servicios que proporcionan servicios de TI y administración de sistemas."}
        </li>
        <li>
          {isEnglish
            ? "Professional advisers including lawyers, bankers, auditors and insurers."
            : "Asesores profesionales que incluyen abogados, banqueros, auditores y aseguradores."}
        </li>
        <li>
          {isEnglish
            ? "Tax, regulatory and other authorities."
            : "Autoridades fiscales, reguladoras y otras autoridades."}
        </li>
        <li>
          {isEnglish
            ? "Third parties to whom we may choose to sell, transfer or merge parts of our business or our assets."
            : "Terceros a quienes podemos elegir vender, transferir o fusionar partes de nuestro negocio o nuestros activos."}
        </li>
      </ul>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "6. Data Security" : "6. Seguridad de Datos"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality."
          : "Hemos implementado medidas de seguridad apropiadas para evitar que tus datos personales se pierdan, usen o accedan accidentalmente de manera no autorizada, se alteren o divulguen. Además, limitamos el acceso a tus datos personales a aquellos empleados, agentes, contratistas y otros terceros que tienen una necesidad comercial de saber. Solo procesarán tus datos personales según nuestras instrucciones y están sujetos a un deber de confidencialidad."}
      </p>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "7. Your Legal Rights" : "7. Tus Derechos Legales"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "Under certain circumstances, you have rights under data protection laws in relation to your personal data:"
          : "Bajo ciertas circunstancias, tienes derechos bajo las leyes de protección de datos en relación con tus datos personales:"}
      </p>
      <ul className="list-disc pl-6 text-white/80 mb-4">
        <li>{isEnglish ? "Request access to your personal data." : "Solicitar acceso a tus datos personales."}</li>
        <li>
          {isEnglish ? "Request correction of your personal data." : "Solicitar la corrección de tus datos personales."}
        </li>
        <li>
          {isEnglish ? "Request erasure of your personal data." : "Solicitar la eliminación de tus datos personales."}
        </li>
        <li>
          {isEnglish
            ? "Object to processing of your personal data."
            : "Oponerse al procesamiento de tus datos personales."}
        </li>
        <li>
          {isEnglish
            ? "Request restriction of processing your personal data."
            : "Solicitar la restricción del procesamiento de tus datos personales."}
        </li>
        <li>
          {isEnglish
            ? "Request the transfer of your personal data."
            : "Solicitar la transferencia de tus datos personales."}
        </li>
        <li>{isEnglish ? "Right to withdraw consent." : "Derecho a retirar el consentimiento."}</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "8. Contact" : "8. Contacto"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "If you have any questions about this privacy policy or our privacy practices, contact us at:"
          : "Si tienes alguna pregunta sobre esta política de privacidad o nuestras prácticas de privacidad, contáctanos en:"}
      </p>
      <p className="text-white/80 mb-4">
        <strong>Email:</strong> hello@ginkgodevs.com
      </p>
    </>
  )
}


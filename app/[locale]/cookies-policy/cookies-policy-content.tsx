"use client"

interface CookiesPolicyContentProps {
  locale: string
}

export default function CookiesPolicyContent({ locale }: CookiesPolicyContentProps) {
  const isEnglish = locale === "en"

  return (
    <>
      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "1. What are Cookies?" : "1. ¿Qué son las Cookies?"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. Cookies are widely used to make websites work more efficiently, as well as to provide information to the site owners."
          : "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tablet o móvil) cuando visitas un sitio web. Las cookies son ampliamente utilizadas para hacer que los sitios web funcionen, o funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio."}
      </p>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "2. How We Use Cookies" : "2. Cómo Utilizamos las Cookies"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "We use different types of cookies for the following reasons:"
          : "Utilizamos diferentes tipos de cookies por las siguientes razones:"}
      </p>

      <h3 className="text-lg md:text-xl font-semibold text-white mt-6 mb-3">
        {isEnglish ? "2.1 Necessary Cookies" : "2.1 Cookies Necesarias"}
      </h3>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "These cookies are essential for you to move around the website and use its features. Without these cookies, services you have asked for, like remembering your login details or shopping basket items, cannot be provided."
          : "Estas cookies son esenciales para que puedas moverte por el sitio web y utilizar sus características. Sin estas cookies, no se pueden proporcionar los servicios que has solicitado, como recordar tus datos de inicio de sesión o los artículos de tu carrito de compra."}
      </p>

      <h3 className="text-lg md:text-xl font-semibold text-white mt-6 mb-3">
        {isEnglish ? "2.2 Analytics Cookies" : "2.2 Cookies Analíticas"}
      </h3>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "These cookies allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily."
          : "Estas cookies nos permiten reconocer y contar el número de visitantes y ver cómo los visitantes se mueven por nuestro sitio web cuando lo están utilizando. Esto nos ayuda a mejorar la forma en que funciona nuestro sitio web, por ejemplo, asegurándonos de que los usuarios encuentren fácilmente lo que están buscando."}
      </p>

      <h3 className="text-lg md:text-xl font-semibold text-white mt-6 mb-3">
        {isEnglish ? "2.3 Marketing Cookies" : "2.3 Cookies de Marketing"}
      </h3>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests. We may also share this information with third parties for this purpose."
          : "Estas cookies registran tu visita a nuestro sitio web, las páginas que has visitado y los enlaces que has seguido. Utilizamos esta información para hacer que nuestro sitio web y la publicidad mostrada en él sean más relevantes para tus intereses. También podemos compartir esta información con terceros para este propósito."}
      </p>

      <h3 className="text-lg md:text-xl font-semibold text-white mt-6 mb-3">
        {isEnglish ? "2.4 Preference Cookies" : "2.4 Cookies de Preferencias"}
      </h3>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "These cookies allow our website to remember choices you make (such as your user name, language or the region you are in) and provide enhanced, more personal features."
          : "Estas cookies permiten que nuestro sitio web recuerde las elecciones que haces (como tu nombre de usuario, idioma o la región en la que te encuentras) y proporcione características mejoradas y más personales."}
      </p>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "3. Cookie Control" : "3. Control de Cookies"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work."
          : "Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las cookies que ya están en tu dispositivo y puedes configurar la mayoría de los navegadores para evitar que se coloquen. Si lo haces, es posible que tengas que ajustar manualmente algunas preferencias cada vez que visites un sitio y que algunos servicios y funcionalidades no funcionen."}
      </p>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? 'You can manage your cookie preferences through the cookie banner that appears when you first visit our site, or at any time by clicking on the "Cookie Preferences" link in the footer of our site.'
          : 'Puedes gestionar tus preferencias de cookies a través del banner de cookies que aparece cuando visitas nuestro sitio por primera vez, o en cualquier momento haciendo clic en el enlace "Preferencias de Cookies" en el pie de página de nuestro sitio.'}
      </p>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "4. Specific Cookies We Use" : "4. Cookies Específicas que Utilizamos"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "Below is a list of the main cookies we use and what we use them for:"
          : "A continuación se muestra una lista de las principales cookies que utilizamos y lo que utilizamos para:"}
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse text-white/80">
          <thead>
            <tr className="border-b border-white/20">
              <th className="py-2 px-4 text-left text-[#D4F57A]">{isEnglish ? "Name" : "Nombre"}</th>
              <th className="py-2 px-4 text-left text-[#D4F57A]">{isEnglish ? "Purpose" : "Propósito"}</th>
              <th className="py-2 px-4 text-left text-[#D4F57A]">{isEnglish ? "Duration" : "Duración"}</th>
              <th className="py-2 px-4 text-left text-[#D4F57A]">{isEnglish ? "Type" : "Tipo"}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/10">
              <td className="py-2 px-4">cookie-consent</td>
              <td className="py-2 px-4">
                {isEnglish ? "Stores your cookie preferences" : "Almacena tus preferencias de cookies"}
              </td>
              <td className="py-2 px-4">1 year</td>
              <td className="py-2 px-4">{isEnglish ? "Necessary" : "Necesaria"}</td>
            </tr>
            <tr className="border-b border-white/10">
              <td className="py-2 px-4">_ga</td>
              <td className="py-2 px-4">
                {isEnglish
                  ? "Used by Google Analytics to distinguish users"
                  : "Utilizada por Google Analytics para distinguir usuarios"}
              </td>
              <td className="py-2 px-4">2 years</td>
              <td className="py-2 px-4">{isEnglish ? "Analytics" : "Analítica"}</td>
            </tr>
            <tr className="border-b border-white/10">
              <td className="py-2 px-4">_gid</td>
              <td className="py-2 px-4">
                {isEnglish
                  ? "Used by Google Analytics to distinguish users"
                  : "Utilizada por Google Analytics para distinguir usuarios"}
              </td>
              <td className="py-2 px-4">24 hours</td>
              <td className="py-2 px-4">{isEnglish ? "Analytics" : "Analítica"}</td>
            </tr>
            <tr className="border-b border-white/10">
              <td className="py-2 px-4">_fbp</td>
              <td className="py-2 px-4">
                {isEnglish
                  ? "Used by Facebook to deliver advertising"
                  : "Utilizada por Facebook para entregar anuncios"}
              </td>
              <td className="py-2 px-4">3 months</td>
              <td className="py-2 px-4">{isEnglish ? "Marketing" : "Marketing"}</td>
            </tr>
            <tr className="border-b border-white/10">
              <td className="py-2 px-4">theme</td>
              <td className="py-2 px-4">
                {isEnglish
                  ? "Stores your theme preferences (light/dark)"
                  : "Almacena tus preferencias de tema (claro/oscuro)"}
              </td>
              <td className="py-2 px-4">1 year</td>
              <td className="py-2 px-4">{isEnglish ? "Preference" : "Preferencia"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "5. Changes to our Cookie Policy" : "5. Cambios en nuestra Política de Cookies"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "Any changes we may make to our cookie policy in the future will be posted on this page. Please check back frequently to see any updates or changes to our cookie policy."
          : "Cualquier cambio que podamos hacer en nuestra política de cookies en el futuro se publicará en esta página. Por favor, comprueba con frecuencia para ver cualquier actualización o cambio en nuestra política de cookies."}
      </p>

      <h2 className="text-xl md:text-2xl font-semibold text-[#D4F57A] mt-8 mb-4">
        {isEnglish ? "6. Contact" : "6. Contacto"}
      </h2>
      <p className="text-white/80 mb-4">
        {isEnglish
          ? "If you have any questions about our cookies or this cookie policy, please contact us at:"
          : "Si tienes alguna pregunta sobre nuestras cookies o esta política de cookies, contáctanos en:"}
      </p>
      <p className="text-white/80 mb-4">
        <strong>Email:</strong> hello@ginkgodevs.com
      </p>
    </>
  )
}


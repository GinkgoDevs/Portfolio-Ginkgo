export const projects = [
  {
    id: 8,
    title: "Ale Ducca Cristales - Campus",
    titleEs: "Ale Ducca Cristales - Campus",
    description: "A next-generation Full Stack educational platform using NestJS and Next.js 15.",
    descriptionEs: "Plataforma educativa Full Stack de última generación con NestJS y Next.js 15.",
    image: "/Projects/aleducca.png",
    category: "next",
    url: "https://alejandraduccacristales.com",
    overview:
      "Una plataforma educativa que compite en calidad técnica con grandes productos SaaS, combinando lo mejor del mundo empresarial (NestJS) con la vanguardia del frontend (Next.js 15, React 19).",
    overviewEn:
      "An educational platform that competes in technical quality with major SaaS products, combining the best of the enterprise world (NestJS) with the bleeding edge of frontend (Next.js 15, React 19).",
    process: {
      planning: "Definimos una arquitectura modular y requisitos de seguridad de grado bancario.",
      planningEn: "Defined a modular architecture and bank-grade security requirements.",
      design: "Diseño moderno utilizando Tailwind CSS v4, Radix UI y Framer Motion para una experiencia premium.",
      designEn: "Modern design using Tailwind CSS v4, Radix UI, and Framer Motion for a premium experience.",
      development: "Implementación robusta con NestJS 11 para el backend y Next.js 15 con Server Components para el frontend.",
      developmentEn: "Robust implementation with NestJS 11 for the backend and Next.js 15 with Server Components for the frontend.",
      deployment: "Infraestructura escalable preparada para alto rendimiento.",
      deploymentEn: "Scalable infrastructure prepared for high performance.",
    },
    technologies: [
      "Next.js 15",
      "NestJS 11",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "PostgreSQL",
      "MercadoPago",
      "Puppeteer",
      "Zustand",
      "TanStack Query",
    ],
    keyFeatures: [
      "Plataforma Educativa Completa (Cursos, Lecciones, Progreso)",
      "E-commerce Integrado con MercadoPago",
      "Certificación Automática (Generación de PDF)",
      "Sistema de Comunidad y Comentarios",
      "Blog y CMS Integrado",
    ],
    keyFeaturesEn: [
      "Complete Educational Platform (Courses, Lessons, Progress)",
      "Integrated E-commerce with MercadoPago",
      "Automatic Certification (PDF Generation)",
      "Community and Comment System",
      "Integrated Blog and CMS",
    ],
    challenges: [
      {
        title: "Seguridad y Autenticación Avanzada",
        titleEn: "Advanced Security & Authentication",
        description:
          "Implementar un sistema de autenticación seguro que no solo use JWT, sino que maneje sesiones de forma robusta.",
        descriptionEn:
          "Implementing a secure authentication system that not only uses JWT but handles sessions robustly.",
        solution:
          "Implementamos OAuth con Google y autenticación tradicional con hashing Argon2. Desarrollamos un sistema de Refresh Tokens con rotación y revocación para máxima seguridad.",
        solutionEn:
          "Implemented OAuth with Google and traditional authentication with Argon2 hashing. Developed a Refresh Token system with rotation and revocation for maximum security.",
      },
      {
        title: "Generación Dinámica de Certificados",
        titleEn: "Dynamic Certificate Generation",
        description:
          "Generar PDFs de certificados al vuelo de manera eficiente y compatible con diferentes entornos de despliegue.",
        descriptionEn:
          "Generating certificate PDFs on the fly efficiently and compatibly with different deployment environments.",
        solution:
          "Utilizamos Puppeteer (Chrome headless) con lógica inteligente para detectar el entorno (Linux/Windows) y usar el ejecutable correcto, optimizando recursos.",
        solutionEn:
          "Used Puppeteer (headless Chrome) with smart logic to detect the environment (Linux/Windows) and use the correct executable, optimizing resources.",
      },
      {
        title: "Pagos Resilientes",
        titleEn: "Resilient Payments",
        description:
          "Manejar los errores y estados inciertos de las pasarelas de pago para asegurar que ninguna transacción se pierda.",
        descriptionEn:
          "Handling errors and uncertain states of payment gateways to ensure no transaction is lost.",
        solution:
          "Integramos MercadoPago con lógica de reintentos automáticos y verificación de estado para manejar errores del entorno sandbox y producción.",
        solutionEn:
          "Integrated MercadoPago with automatic retry logic and status verification to handle sandbox and production environment errors.",
      },
    ],
    duration: "4 meses",
    durationEn: "4 months",
    team: "1 desarrollador",
    teamEn: "1 developer",
    role: "Full Stack Developer",
    roleEn: "Full Stack Developer",
    year: "2025",
    strategies: [
      {
        title: "Arquitectura Modular",
        titleEn: "Modular Architecture",
        description: "Uso de NestJS Modules para separar dominios y facilitar la escalabilidad.",
        descriptionEn: "Use of NestJS Modules to separate domains and facilitate scalability."
      },
      {
        title: "Seguridad en Capas",
        titleEn: "Layered Security",
        description: "Implementación de múltiples barreras de seguridad (Auth Guards, Zod validation, Sanitization).",
        descriptionEn: "Implementation of multiple security barriers (Auth Guards, Zod validation, Sanitization)."
      }
    ],
    developmentTools: ["VS Code", "Insomnia", "Docker", "Figma", "GitHub Actions"]
  },
  {
    id: 9,
    title: "Shok360 - Media Platform",
    titleEs: "Shok360 - Plataforma Multimedia",
    description:
      "A Headless WordPress media platform powered by GraphQL for high-performance content delivery.",
    descriptionEs:
      "Plataforma multimedia basada en WordPress Headless con GraphQL para entrega de contenido de alto rendimiento.",
    image: "/Projects/shok360.jpg",
    category: ["next", "wordpress"],
    url: "https://www.shok360.com",

    overview:
      "A digital media platform built with a Headless WordPress architecture, decoupling content management from the frontend to enable scalability, performance and multi-channel distribution.",
    overviewEs:
      "Plataforma de medios digitales construida con una arquitectura WordPress Headless, desacoplando la gestión de contenidos del frontend para permitir escalabilidad, rendimiento y distribución multicanal.",

    process: {
      planning:
        "Definición de una arquitectura desacoplada para permitir consumo de contenido desde múltiples canales.",
      planningEn:
        "Definition of a decoupled architecture to enable content consumption across multiple channels.",

      design:
        "Diseño enfocado en consumo rápido de contenido, programas y streaming en tiempo real.",
      designEn:
        "Design focused on fast content consumption, shows and real-time streaming.",

      development:
        "Configuración de WordPress como CMS Headless utilizando WPGraphQL y consumo de datos desde el frontend.",
      developmentEn:
        "Configured WordPress as a Headless CMS using WPGraphQL and frontend data consumption.",

      deployment:
        "Infraestructura preparada para alto tráfico y consumo intensivo de contenido multimedia.",
      deploymentEn:
        "Infrastructure prepared for high traffic and intensive multimedia consumption.",
    },

    technologies: [
      "WordPress Headless",
      "WPGraphQL",
      "GraphQL",
      "JavaScript",
      "Streaming Audio",
      "REST / GraphQL APIs"
    ],

    keyFeatures: [
      "WordPress desacoplado como CMS",
      "Consumo de contenido vía GraphQL",
      "Radio en Vivo",
      "Programas y Shows Dinámicos",
      "Sección de Noticias Administrable",
      "Arquitectura preparada para multicanal"
    ],
    keyFeaturesEn: [
      "Decoupled WordPress CMS",
      "Content consumption via GraphQL",
      "Live Radio Streaming",
      "Dynamic Shows and Programs",
      "Admin-managed News Section",
      "Multi-channel Ready Architecture"
    ],

    challenges: [
      {
        title: "Desacople Total del CMS",
        titleEn: "Full CMS Decoupling",
        description:
          "Separar completamente WordPress del frontend sin perder flexibilidad editorial.",
        descriptionEn:
          "Fully decoupling WordPress from the frontend without losing editorial flexibility.",
        solution:
          "Uso de WPGraphQL para exponer el contenido de forma estructurada y tipada.",
        solutionEn:
          "Used WPGraphQL to expose content in a structured and typed manner.",
      },
      {
        title: "Performance en Contenido Multimedia",
        titleEn: "Multimedia Performance",
        description:
          "Servir contenido dinámico y streaming sin afectar tiempos de carga.",
        descriptionEn:
          "Serving dynamic content and streaming without impacting load times.",
        solution:
          "Optimización de queries GraphQL y cacheo a nivel de infraestructura.",
        solutionEn:
          "Optimized GraphQL queries and infrastructure-level caching.",
      },
    ],

    duration: "2 meses",
    durationEn: "2 months",

    team: "3 desarrolladores",
    teamEn: "3 developers",

    role: "Full Stack Developer",
    roleEn: "Full Stack Developer",

    year: "2025",

    strategies: [
      {
        title: "Arquitectura Headless",
        titleEn: "Headless Architecture",
        description:
          "Separación total entre CMS y frontend para mayor escalabilidad y mantenimiento.",
        descriptionEn:
          "Complete separation between CMS and frontend for scalability and maintainability.",
      },
      {
        title: "GraphQL First",
        titleEn: "GraphQL First",
        description:
          "Uso de GraphQL como contrato único de datos entre WordPress y el frontend.",
        descriptionEn:
          "Using GraphQL as the single data contract between WordPress and frontend.",
      },
    ],

    developmentTools: [
      "WordPress",
      "WPGraphQL",
      "GraphiQL",
      "Docker",
      "VS Code"
    ]
  },
  {
    id: 7,
    title: "Hormigón Conecta - Quoting Platform",
    titleEs: "Hormigón Conecta - Plataforma de Cotizaciones",
    description: "B2B platform for concrete quoting and order management, developed with Next.js for optimal performance and user experience.",
    descriptionEs:
      "Plataforma B2B para la cotización y gestión de pedidos de hormigón, desarrollada con Next.js para un rendimiento y experiencia de usuario óptimos.",
    image: "/Projects/HormigonConecta.png",
    category: "next", // Cambiado de 'shopify' a 'next'
    url: "https://www.hormigonconecta.com", // Actualizado desde HormigonConecta.csv
    overview: "Una aplicación de alto rendimiento para conectar proveedores y compradores de hormigón, utilizando el ecosistema moderno de React y Next.js.",
    overviewEn: "A high-performance application to connect concrete suppliers and buyers, utilizing the modern React and Next.js ecosystem.",
    process: {
      planning:
        "Definimos la lógica de cotización y los requisitos de la interfaz de usuario B2B en talleres con el cliente.",
      planningEn: "Defined quoting logic and B2B user interface requirements in workshops with the client.",
      design: "Diseño de wireframes y prototipos centrándose en la usabilidad del flujo de cotización complejo.",
      designEn: "Wireframing and prototyping focusing on the usability of the complex quoting flow.",
      development:
        "Implementado con Next.js, React y PHP para la lógica de backend. Se usó Tailwind CSS y Radix UI/shadcn/ui para componentes de interfaz.", // Actualizado
      developmentEn: "Implemented using Next.js, React, and PHP for backend logic. Tailwind CSS and Radix UI/shadcn/ui were used for interface components.", // Actualizado
      deployment: "Despliegue en Vercel, configurando un entorno de servidor robusto para manejar la lógica de negocio con PHP.",
      deploymentEn: "Deployed on Vercel, setting up a robust server environment to handle business logic with PHP.",
    },
    technologies: ["React", "Next.js", "Webpack", "Lucide", "Radix UI", "Tailwind CSS", "shadcn/ui", "PHP"], // Actualizado desde HormigonConecta.csv
    keyFeatures: [
      "Calculadora de cotizaciones en tiempo real",
      "Diseño modular con Radix UI/shadcn/ui",
      "Gestión de usuarios B2B",
      "Alta velocidad de carga con Next.js",
      "Integración de backend con PHP",
    ],
    keyFeaturesEn: [
      "Real-time quoting calculator",
      "Modular design with Radix UI/shadcn/ui",
      "B2B user management",
      "High load speed with Next.js",
      "Backend integration with PHP",
    ],
    challenges: [
      {
        title: "Manejo de Lógica de Negocio Compleja",
        titleEn: "Handling Complex Business Logic",
        description:
          "La lógica de cotización, que dependía de múltiples variables (ubicación, proveedor, volumen, tipo de hormigón), era compleja de modelar y mantener.",
        descriptionEn: "The quoting logic, which depended on multiple variables (location, supplier, volume, concrete type), was complex to model and maintain.",
        solution:
          "Se diseñó un sistema de servicios de backend en PHP robusto para aislar y gestionar la lógica de negocio, y se comunicó con el front-end de Next.js mediante una API RESTful limpia.",
        solutionEn:
          "A robust PHP backend services system was designed to isolate and manage the business logic, communicating with the Next.js front-end via a clean RESTful API.",
      },
      {
        title: "Consistencia de la Interfaz B2B",
        titleEn: "B2B Interface Consistency",
        description:
          "Asegurar una interfaz de usuario coherente y reutilizable para el panel de administración B2B.",
        descriptionEn: "Ensuring a consistent and reusable user interface for the B2B administration panel.",
        solution:
          "La adopción de Radix UI y shadcn/ui junto con Tailwind CSS permitió construir un sistema de diseño sólido y componentes reutilizables de alta calidad.",
        solutionEn:
          "The adoption of Radix UI and shadcn/ui along with Tailwind CSS allowed for building a solid design system and high-quality reusable components.",
      },
    ],
    duration: "2 meses",
    durationEn: "2 months",
    team: "1 desarrollador",
    teamEn: "1 developer",
    role: "Desarrollo completo",
    roleEn: "Complete development",
    year: "2025",
  },
  {
    id: 1,
    title: "Bauketing AI",
    titleEs: "Plataforma de Clonación Digital",
    description: "Innovative AI digital cloning platform for automated content generation.",
    descriptionEs: "Una solución moderna de clonacion digital para generar contenido.",
    image: "/Projects/Bauketing.png",
    category: "next",
    url: "https://bauketing-ia-ginkgo-devs-projects.vercel.app/",
    overview:
      "Una plataforma innovadora que permite la creación de contenido automatizado a través de la clonación digital con Inteligencia Artificial.",
    overviewEn: "An innovative platform allowing for automated content creation through AI digital cloning.",
    process: {
      planning: "Definimos historias de usuario y requisitos técnicos a través de talleres colaborativos.",
      planningEn: "Defined user stories and technical requirements through collaborative workshops.",
      design: "Creamos wireframes y maquetas de alta fidelidad con un enfoque en la experiencia del usuario.",
      designEn: "Created wireframes and high-fidelity mockups with a focus on user experience.",
      development: "Implementado con Next.js y Stripe, con un enfoque en rendimiento y escalabilidad.",
      developmentEn: "Implemented using Next.js and Stripe, with a focus on performance and scalability.",
      deployment: "Desplegado en Vercel con un robusto pipeline CI/CD para actualizaciones sin problemas.",
      deploymentEn: "Deployed on Vercel with a robust CI/CD pipeline for seamless updates.",
    },
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS", "PostgreSQL"],
    features: [
      "Diseño responsive para móvil y escritorio",
      "Búsqueda y filtrado avanzado de productos",
      "Cuentas de usuario e historial de pedidos",
      "Procesamiento seguro de pagos con Stripe",
      "Panel de administración para gestión de inventario",
    ],
    keyFeatures: [
      "Diseño responsive para móvil y escritorio",
      "Búsqueda y filtrado avanzado de productos",
      "Cuentas de usuario e historial de pedidos",
      "Procesamiento seguro de pagos con Stripe",
      "Panel de administración para gestión de inventario",
    ],
    keyFeaturesEn: [
      "Responsive design for mobile and desktop",
      "Advanced product search and filtering",
      "User accounts and order history",
      "Secure payment processing with Stripe",
      "Admin dashboard for inventory management",
    ],
    challenges: [
      {
        title: "Optimización de Rendimiento",
        titleEn: "Performance Optimization",
        description:
          "El tiempo de carga inicial para las páginas de productos era más lento de lo deseado, especialmente en dispositivos móviles.",
        descriptionEn: "The initial load time for product pages was slower than desired, especially on mobile devices.",
        solution:
          "Implementamos optimización de imágenes, carga diferida y renderizado del lado del servidor para contenido crítico. Esto redujo los tiempos de carga en un 40% y mejoró las puntuaciones de Core Web Vitals.",
        solutionEn:
          "Implemented image optimization, lazy loading, and server-side rendering for critical content. This reduced load times by 40% and improved Core Web Vitals scores.",
      },
      {
        title: "Gestión de Estado Compleja",
        titleEn: "Complex State Management",
        description:
          "La gestión del estado del carrito de compras a través de múltiples páginas y componentes resultó desafiante.",
        descriptionEn: "Managing the shopping cart state across multiple pages and components proved challenging.",
        solution:
          "Utilizamos la API de Context de React en combinación con almacenamiento local para crear un sistema de gestión de carrito persistente y eficiente.",
        solutionEn:
          "Utilized React Context API in combination with local storage to create a persistent and efficient cart management system.",
      },
    ],
    duration: "1 mes",
    durationEn: "1 month",
    team: "2 desarrolladores",
    teamEn: "2 developers",
    role: "Desarrollo completo",
    roleEn: "Complete development",
    year: "2025",
    strategies: [
      {
        title: "Optimización de Rendimiento",
        titleEn: "Performance Optimization",
        description: "Enfoque en métricas Core Web Vitals desde el inicio del desarrollo.",
        descriptionEn: "Focus on Core Web Vitals metrics from the start of development."
      },
      {
        title: "Diseño Mobile-First",
        titleEn: "Mobile-First Design",
        description: "Priorización de la experiencia en dispositivos móviles para captar mayor tráfico.",
        descriptionEn: "Prioritization of mobile experience to capture more traffic."
      }
    ],
    developmentTools: ["VS Code", "Figma", "Vercel", "GitHub"]
  },
  {
    id: 2,
    title: "Corporate Website",
    titleEs: "Sitio Web Retiro uno",
    description: "A responsive corporate website with a custom theme for a multinational company.",
    descriptionEs: "Un sitio web corporativo responsive con un tema personalizado para una empresa multinacional.",
    image: "/Projects/Retiro-Uno.png",
    category: "wordpress",
    url: "https://www.bodylinenqn.com/retiro-uno",
    overview: "Un sitio web corporativo responsive con un tema personalizado para una empresa multinacional.",
    overviewEn: "A responsive corporate website with a custom theme for a multinational company.",
    process: {
      planning: "Recopilamos requisitos del cliente y directrices de marca a través de reuniones extensas.",
      planningEn: "Gathered client requirements and brand guidelines through extensive meetings.",
      design: "Desarrollamos diseños personalizados en Figma, iterando en base a la retroalimentación del cliente.",
      designEn: "Developed custom Figma designs, iterating based on client feedback.",
      development: "Construimos un tema personalizado de WordPress con opciones avanzadas de personalización.",
      developmentEn: "Built a custom WordPress theme with advanced customization options.",
      deployment: "Lanzado en hosting gestionado de WordPress con medidas de caché y seguridad.",
      deploymentEn: "Launched on managed WordPress hosting with caching and security measures.",
    },
    technologies: ["WordPress", "PHP", "JavaScript", "SASS", "MySQL"],
    keyFeatures: [
      "Soporte multilingüe",
      "Tipos de publicación personalizados para servicios y casos de estudio",
      "Línea de tiempo interactiva de la empresa",
      "Integración con sistema de RRHH para publicaciones de empleo",
      "Análisis y seguimiento avanzados",
    ],
    keyFeaturesEn: [
      "Multi-language support",
      "Custom post types for services and case studies",
      "Interactive company timeline",
      "Integration with HR system for job postings",
      "Advanced analytics and tracking",
    ],
    challenges: [
      {
        title: "Complejidad en la Gestión de Contenido",
        titleEn: "Content Management Complexity",
        description:
          "El cliente necesitaba un sistema flexible para gestionar contenido diverso en múltiples regiones.",
        descriptionEn: "The client needed a flexible system to manage diverse content across multiple regions.",
        solution:
          "Desarrollamos tipos de publicación y taxonomías personalizadas, combinadas con Advanced Custom Fields, para crear una experiencia de gestión de contenido potente e intuitiva.",
        solutionEn:
          "Developed custom post types and taxonomies, combined with Advanced Custom Fields, to create a powerful and intuitive content management experience.",
      },
      {
        title: "Rendimiento en Diferentes Regiones",
        titleEn: "Performance Across Regions",
        description: "Con una audiencia global, asegurar tiempos de carga rápidos en diferentes regiones era crucial.",
        descriptionEn: "With a global audience, ensuring fast load times across different regions was crucial.",
        solution:
          "Implementamos una CDN, optimizamos activos y utilizamos plugins de caché de WordPress. También configuramos caché del lado del servidor para minimizar consultas a la base de datos.",
        solutionEn:
          "Implemented a CDN, optimized assets, and used WordPress caching plugins. Also set up server-side caching to minimize database queries.",
      },
    ],
    duration: "2 semanas",
    durationEn: "2 weeks",
    team: "2 desarrolladores",
    teamEn: "2 developers",
    role: "Desarrollo completo",
    roleEn: "Complete development",
    year: "2025",
  },
  {
    id: 3,
    title: "NasFit Online Store",
    titleEs: "Tienda en Línea NasFit",
    description: "A robust e-commerce store built with WordPress and WooCommerce, featuring custom design and performance optimization.",
    descriptionEs:
      "Una robusta tienda de comercio electrónico construida con WordPress y WooCommerce, destacando un diseño personalizado y optimización de rendimiento.",
    image: "/Projects/NasFit.png",
    category: "wordpress", // Cambiado de 'shopify' a 'wordpress'
    url: "https://julinas.com", // Actualizado desde nasfit.csv
    overview: "Implementación de una solución completa de e-commerce sobre WordPress, integrando WooCommerce para la gestión de productos y pagos.",
    overviewEn: "Implementation of a complete e-commerce solution on WordPress, integrating WooCommerce for product and payment management.",
    process: {
      planning:
        "Analizamos las necesidades de la marca y el catálogo de productos, definiendo recorridos clave del usuario.",
      planningEn: "Analyzed brand needs and product catalog, defining key user journeys.",
      design: "Personalizamos un tema de WordPress premium y usamos Elementor para alinearlo con la estética de la marca.",
      designEn: "Customized a premium WordPress theme and used Elementor to align with the brand's aesthetic.",
      development:
        "Construido sobre WordPress y WooCommerce, utilizando Elementor para diseños personalizados y optimizado con LiteSpeed Cache.", // Actualizado
      developmentEn: "Built on WordPress and WooCommerce, using Elementor for custom designs and optimized with LiteSpeed Cache.", // Actualizado
      deployment: "Lanzado en hosting optimizado con LiteSpeed y medidas de seguridad.",
      deploymentEn: "Launched on LiteSpeed-optimized hosting with security measures and thorough testing.",
    },
    technologies: ["WordPress", "PHP", "MySQL", "WooCommerce", "Elementor", "LiteSpeed Cache", "Yoast SEO", "Swiper", "PhotoSwipe", "jQuery", "Open Graph", "HTTP/3"], // Actualizado desde nasfit.csv
    keyFeatures: [
      "Gestión de inventario con WooCommerce",
      "Diseño responsivo optimizado con Elementor",
      "Integración de pagos flexible",
      "Optimización de SEO con Yoast",
      "Rendimiento mejorado con LiteSpeed Cache",
    ],
    keyFeaturesEn: [
      "WooCommerce inventory management",
      "Optimized responsive design with Elementor",
      "Flexible payment integration",
      "SEO optimization with Yoast",
      "Enhanced performance with LiteSpeed Cache",
    ],
    challenges: [
      {
        title: "Optimización del rendimiento de WordPress",
        titleEn: "WordPress Performance Optimization",
        description:
          "Asegurar tiempos de carga rápidos a pesar del uso intensivo de plugins y contenido en WordPress.",
        descriptionEn: "Ensuring fast load times despite heavy plugin and content usage on WordPress.",
        solution:
          "Implementamos LiteSpeed Cache y optimizamos la base de datos MySQL, reduciendo el TBT (Total Blocking Time) y mejorando la velocidad general.",
        solutionEn:
          "Implemented LiteSpeed Cache and optimized the MySQL database, reducing TBT (Total Blocking Time) and improving overall speed.",
      },
      {
        title: "Integración de Pasarela de Pagos",
        titleEn: "Payment Gateway Integration",
        description:
          "La integración de pagos con sistemas locales requería una configuración especializada dentro de WooCommerce.",
        descriptionEn:
          "Integrating with local payment systems required specialized configuration within WooCommerce.",
        solution:
          "Se utilizaron y personalizaron extensiones de WooCommerce para garantizar transacciones seguras y fluidas en múltiples divisas y métodos de pago.",
        solutionEn:
          "WooCommerce extensions were used and customized to ensure secure and seamless transactions across multiple currencies and payment methods.",
      },
    ],
    duration: "1 mes",
    durationEn: "1 month",
    team: "1 desarrollador",
    teamEn: "1 developer",
    role: "Desarrollo completo",
    roleEn: "Complete development",
    year: "2025",
  },
  {
    id: 4,
    title: "Shopify Store",
    titleEs: "Tienda Sitio Sport",
    description: "A customized Shopify store for a high-end fashion brand with unique design requirements, emphasizing speed via Cloudflare.",
    descriptionEs:
      "Una tienda Shopify personalizada para una marca de moda de alta gama con requisitos de diseño únicos, con énfasis en la velocidad a través de Cloudflare.",
    image: "/Projects/SitioSport.png",
    category: "shopify",
    url: "https://www.sitiosports.com", // Actualizado desde sitiosport.csv
    overview: "Una tienda Shopify personalizada para una marca de moda de alta gama con requisitos de diseño únicos.",
    overviewEn: "A customized Shopify store for a high-end fashion brand with unique design requirements.",
    process: {
      planning:
        "Analizamos las necesidades de la marca y el catálogo de productos, definiendo recorridos clave del usuario.",
      planningEn: "Analyzed brand needs and product catalog, defining key user journeys.",
      design: "Personalizamos un tema premium de Shopify para alinearlo con la estética de la marca.",
      designEn: "Customized a premium Shopify theme to align with the brand's aesthetic.",
      development:
        "Implementamos características personalizadas con Liquid y JavaScript, integrando librerías como core-js.",
      developmentEn: "Implemented custom features with Liquid and JavaScript, integrating libraries like core-js.",
      deployment: "Lanzado en hosting de Shopify con CDN de Cloudflare para optimizar la entrega global.",
      deploymentEn: "Launched on Shopify hosting with Cloudflare CDN to optimize global delivery.",
    },
    technologies: ["Shopify", "Liquid", "JavaScript", "CSS", "Shopify APIs", "Open Graph", "HTTP/3", "Font Awesome", "Cloudflare", "core-js"], // Actualizado desde sitiosport.csv
    keyFeatures: [
      "Configurador de productos personalizado",
      "Optimización de velocidad con Cloudflare",
      "Diseño responsive y moderno con Font Awesome",
      "Recomendaciones de productos personalizadas",
      "Gestión avanzada de inventario",
    ],
    keyFeaturesEn: [
      "Custom product configurator",
      "Speed optimization with Cloudflare",
      "Responsive and modern design with Font Awesome",
      "Personalized product recommendations",
      "Advanced inventory management",
    ],
    challenges: [
      {
        title: "Optimización de la CDN",
        titleEn: "CDN Optimization",
        description:
          "Asegurar la configuración óptima de Cloudflare para maximizar la velocidad de carga global de la tienda.",
        descriptionEn: "Ensuring optimal Cloudflare configuration to maximize the store's global load speed.",
        solution:
          "Ajustamos las reglas de caché y minificación en Cloudflare, resultando en una entrega más rápida de activos estáticos.",
        solutionEn:
          "Adjusted caching and minification rules on Cloudflare, resulting in faster delivery of static assets.",
      },
      {
        title: "Integración de Sistemas Heredados",
        titleEn: "Integration with Legacy Systems",
        description:
          "El cliente tenía sistemas existentes de inventario y CRM que necesitaban ser integrados con la nueva tienda Shopify.",
        descriptionEn:
          "The client had existing inventory and CRM systems that needed to be integrated with the new Shopify store.",
        solution:
          "Creamos aplicaciones personalizadas de Shopify y utilizamos la API de Shopify para construir integraciones perfectas, asegurando la sincronización de datos en tiempo real entre sistemas.",
        solutionEn:
          "Created custom Shopify apps and utilized Shopify's API to build seamless integrations, ensuring real-time data synchronization between systems.",
      },
    ],
    duration: "2 meses",
    durationEn: "2 months",
    team: "1 desarrollador",
    teamEn: "1 developer",
    role: "Desarrollo completo",
    roleEn: "Complete development",
    year: "2025",
  },
  {
    id: 5,
    title: "Shopify Store",
    titleEs: "Sitio Web Galindo SA",
    description: "A customized Shopify store with PWA capabilities and modern UI using Tailwind CSS for a premium user experience.",
    descriptionEs:
      "Una tienda Shopify personalizada con capacidades PWA y una interfaz de usuario moderna usando Tailwind CSS para una experiencia premium.",
    image: "/Projects/Galindo.png",
    category: "shopify",
    url: "https://www.galindosa.com.ar", // Actualizado desde Galindo.csv
    overview: "Una tienda Shopify personalizada para una marca de moda de alta gama con requisitos de diseño únicos.",
    overviewEn: "A customized Shopify store for a high-end fashion brand with unique design requirements.",
    process: {
      planning:
        "Analizamos las necesidades de la marca y el catálogo de productos, definiendo recorridos clave del usuario.",
      planningEn: "Analyzed brand needs and product catalog, defining key user journeys.",
      design: "Personalizamos un tema premium de Shopify y usamos Tailwind CSS para un diseño limpio y moderno.",
      designEn: "Customized a premium Shopify theme and used Tailwind CSS for a clean, modern design.",
      development:
        "Implementamos características personalizadas e integraciones, incluyendo la conversión a PWA para mejorar la retención.",
      developmentEn: "Implemented custom features and integrations, including PWA conversion to enhance retention.",
      deployment: "Lanzado en hosting de Shopify con pruebas exhaustivas y optimización de imágenes con Cloudinary.",
      deploymentEn: "Launched on Shopify hosting with thorough testing and image optimization using Cloudinary.",
    },
    technologies: ["Shopify", "Liquid", "JavaScript", "CSS", "Shopify APIs", "PWA", "Open Graph", "Cloudinary", "Tailwind CSS"], // Actualizado desde Galindo.csv
    keyFeatures: [
      "Configurador de productos personalizado",
      "Aplicación Web Progresiva (PWA)",
      "Gestión de imágenes con Cloudinary",
      "Diseño flexible y moderno con Tailwind CSS",
      "Gestión avanzada de inventario",
    ],
    keyFeaturesEn: [
      "Custom product configurator",
      "Progressive Web Application (PWA)",
      "Image management with Cloudinary",
      "Flexible and modern design with Tailwind CSS",
      "Advanced inventory management",
    ],
    challenges: [
      {
        title: "Integración de PWA en Shopify",
        titleEn: "PWA Integration in Shopify",
        description:
          "Implementar capacidades de Aplicación Web Progresiva (PWA) de manera efectiva en la plataforma Shopify, manteniendo la velocidad de la tienda.",
        descriptionEn:
          "Effectively implementing Progressive Web Application (PWA) capabilities on the Shopify platform while maintaining store speed.",
        solution:
          "Utilizamos service workers y optimizamos los manifiestos, asegurando que la tienda ofreciera una experiencia similar a la de una aplicación nativa en dispositivos móviles.",
        solutionEn:
          "Utilized service workers and optimized manifests, ensuring the store provided a native-app-like experience on mobile devices.",
      },
      {
        title: "Gestión de Imagen y Contenido",
        titleEn: "Image and Content Management",
        description:
          "La gestión de un amplio catálogo de productos con imágenes de alta resolución requería una solución robusta.",
        descriptionEn:
          "Managing a large product catalog with high-resolution images required a robust solution.",
        solution:
          "Integramos Cloudinary para la optimización y entrega dinámica de imágenes, mejorando significativamente el tiempo de carga de la página.",
        solutionEn:
          "Integrated Cloudinary for dynamic image optimization and delivery, significantly improving page load time.",
      },
    ],
    duration: "1 mes",
    durationEn: "1 month",
    team: "1 desarrollador",
    teamEn: "1 developer",
    role: "Desarrollo completo",
    roleEn: "Complete development",
    year: "2024",
  },
  {
    id: 6,
    title: "Chico Zossi Winery - Headless E-commerce",
    titleEs: "Bodega Chico Zossi - E-commerce Headless",
    description: "High-performance e-commerce website built with Next.js and React, delivering a superior user experience with a modern design.",
    descriptionEs:
      "Sitio web de e-commerce de alto rendimiento construido con Next.js y React, ofreciendo una experiencia de usuario superior con un diseño moderno.",
    image: "/Projects/ChicoZossi.png",
    category: "next", // Cambiado de 'shopify' a 'next'
    url: "https://www.chicozossi.com.ar", // Actualizado desde ChicoZossi.csv
    overview: "Desarrollo de un front-end de comercio electrónico desacoplado (Headless) usando Next.js, con un enfoque en la velocidad y escalabilidad.",
    overviewEn: "Development of a decoupled e-commerce front-end (Headless) using Next.js, with a focus on speed and scalability.",
    process: {
      planning:
        "Definimos la arquitectura Headless, seleccionando Next.js para el front-end y definiendo los puntos de conexión de la API.",
      planningEn: "Defined the Headless architecture, selected Next.js for the front-end, and defined API connection points.",
      design: "Creamos diseños personalizados en Figma, priorizando la experiencia de compra en un entorno desacoplado.",
      designEn: "Created custom Figma designs, prioritizing the shopping experience in a decoupled environment.",
      development:
        "Desarrollado con Next.js y React, utilizando Tailwind CSS para estilos rápidos y Webpack para la gestión de activos.", // Actualizado
      developmentEn: "Developed using Next.js and React, leveraging Tailwind CSS for rapid styling and Webpack for asset management.", // Actualizado
      deployment: "Desplegado en Vercel, aprovechando su CDN para un rendimiento global.",
      deploymentEn: "Deployed on Vercel, leveraging its CDN for global performance.",
    },
    technologies: ["React", "Next.js", "Webpack", "Open Graph", "Tailwind CSS"], // Actualizado desde ChicoZossi.csv
    keyFeatures: [
      "Arquitectura Headless para escalabilidad",
      "Renderizado del lado del servidor (SSR) con Next.js",
      "Optimización de imágenes y activos (Webpack)",
      "Diseño moderno y responsive con Tailwind CSS",
      "Experiencia de usuario fluida y de alta velocidad",
    ],
    keyFeaturesEn: [
      "Headless architecture for scalability",
      "Server-Side Rendering (SSR) with Next.js",
      "Image and asset optimization (Webpack)",
      "Modern and responsive design with Tailwind CSS",
      "Fluid and high-speed user experience",
    ],
    challenges: [
      {
        title: "Sincronización de Datos Headless",
        titleEn: "Headless Data Synchronization",
        description:
          "El desafío de mantener la sincronización de inventario y pedidos entre el CMS/Backend y el front-end desacoplado de Next.js.",
        descriptionEn: "The challenge of maintaining inventory and order synchronization between the CMS/Backend and the decoupled Next.js front-end.",
        solution:
          "Se implementó una capa de API personalizada con webhooks para asegurar la sincronización de datos en tiempo real, garantizando la consistencia de la información.",
        solutionEn:
          "A custom API layer with webhooks was implemented to ensure real-time data synchronization, guaranteeing information consistency.",
      },
      {
        title: "Gestión del Rendimiento del Build",
        titleEn: "Build Performance Management",
        description:
          "La complejidad del catálogo requería optimizar el proceso de build de Next.js para reducir los tiempos de despliegue.",
        descriptionEn:
          "The catalog's complexity required optimizing the Next.js build process to reduce deployment times.",
        solution:
          "Optimizamos la configuración de Webpack y el manejo de rutas estáticas para acelerar el build y mejorar el tiempo de primera carga.",
        solutionEn:
          "Optimized Webpack configuration and static path handling to speed up the build and improve the Time to First Byte.",
      },
    ],
    duration: "1 mes",
    durationEn: "1 month",
    team: "1 desarrollador",
    teamEn: "1 developer",
    role: "Desarrollo completo",
    roleEn: "Complete development",
    year: "2024",
  },
];

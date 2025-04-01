export const projects = [
  {
    id: 1,
    title: "Bauketing AI",
    titleEs: "Plataforma de Clonación Digital",
    description: "A modern e-commerce solution with advanced features for a growing online retailer.",
    descriptionEs: "Una solución moderna de clonacion digital para generar contenido.",
    image: "/Projects/Bauketing.png",
    category: "next",
    url: "https://bauketing.com",
    overview:
      "Una solución moderna de comercio electrónico con características avanzadas para un minorista en línea en crecimiento.",
    overviewEn: "A modern e-commerce solution with advanced features for a growing online retailer.",
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
    duration: "3 meses",
    durationEn: "3 months",
    team: "2 desarrolladores",
    teamEn: "2 developers",
    role: "Desarrollo completo",
    roleEn: "Complete development",
    year: "2023",
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
    duration: "4 meses",
    durationEn: "4 months",
    team: "3 desarrolladores",
    teamEn: "3 developers",
    role: "Desarrollo completo",
    roleEn: "Complete development",
    year: "2023",
  },
  {
    id: 3,
    title: "Shopify Store",
    titleEs: "Sitio Web NasFit",
    description: "A customized Shopify store for a high-end fashion brand with unique design requirements.",
    descriptionEs:
      "Una tienda Shopify personalizada para una marca de moda de alta gama con requisitos de diseño únicos.",
    image: "/Projects/NasFit.png",
    category: "shopify",
    url: "https://julinas.com",
    overview: "Una tienda Shopify personalizada para una marca de moda de alta gama con requisitos de diseño únicos.",
    overviewEn: "A customized Shopify store for a high-end fashion brand with unique design requirements.",
    process: {
      planning:
        "Analizamos las necesidades de la marca y el catálogo de productos, definiendo recorridos clave del usuario.",
      planningEn: "Analyzed brand needs and product catalog, defining key user journeys.",
      design: "Personalizamos un tema premium de Shopify para alinearlo con la estética de la marca.",
      designEn: "Customized a premium Shopify theme to align with the brand's aesthetic.",
      development:
        "Implementamos características personalizadas e integraciones para mejorar la experiencia de compra.",
      developmentEn: "Implemented custom features and integrations to enhance the shopping experience.",
      deployment: "Lanzado en hosting de Shopify con pruebas exhaustivas y optimización.",
      deploymentEn: "Launched on Shopify hosting with thorough testing and optimization.",
    },
    technologies: ["Shopify", "Liquid", "JavaScript", "CSS", "Shopify APIs"],
    keyFeatures: [
      "Configurador de productos personalizado",
      "Prueba virtual usando AR",
      "Programa de fidelidad integrado",
      "Recomendaciones de productos personalizadas",
      "Gestión avanzada de inventario",
    ],
    keyFeaturesEn: [
      "Custom product configurator",
      "Virtual try-on using AR",
      "Integrated loyalty program",
      "Personalized product recommendations",
      "Advanced inventory management",
    ],
    challenges: [
      {
        title: "Personalización Compleja de Productos",
        titleEn: "Complex Product Customization",
        description:
          "La marca ofrecía amplias opciones de personalización para sus productos, lo que fue difícil de implementar dentro del sistema estándar de productos de Shopify.",
        descriptionEn:
          "The brand offered extensive customization options for their products, which was challenging to implement within Shopify's standard product system.",
        solution:
          "Desarrollamos un configurador de productos personalizado utilizando el sistema de propiedades de línea de artículos de Shopify y JavaScript, permitiendo a los clientes personalizar productos con una interfaz fácil de usar.",
        solutionEn:
          "Developed a custom product configurator using Shopify's line item property system and JavaScript, allowing customers to personalize products with a user-friendly interface.",
      },
      {
        title: "Integración con Sistemas Heredados",
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
    duration: "3 meses",
    durationEn: "3 months",
    team: "2 desarrolladores",
    teamEn: "2 developers",
    role: "Desarrollo completo",
    roleEn: "Complete development",
    year: "2023",
  },
  {
    id: 4,
    title: "Shopify Store",
    titleEs: "Tienda Sitio Sport",
    description: "A customized Shopify store for a high-end fashion brand with unique design requirements.",
    descriptionEs:
      "Una tienda Shopify personalizada para una marca de moda de alta gama con requisitos de diseño únicos.",
    image: "/Projects/SitioSport.png",
    category: "shopify",
    url: "https://www.sitiosports.com",
    overview: "Una tienda Shopify personalizada para una marca de moda de alta gama con requisitos de diseño únicos.",
    overviewEn: "A customized Shopify store for a high-end fashion brand with unique design requirements.",
    process: {
      planning:
        "Analizamos las necesidades de la marca y el catálogo de productos, definiendo recorridos clave del usuario.",
      planningEn: "Analyzed brand needs and product catalog, defining key user journeys.",
      design: "Personalizamos un tema premium de Shopify para alinearlo con la estética de la marca.",
      designEn: "Customized a premium Shopify theme to align with the brand's aesthetic.",
      development:
        "Implementamos características personalizadas e integraciones para mejorar la experiencia de compra.",
      developmentEn: "Implemented custom features and integrations to enhance the shopping experience.",
      deployment: "Lanzado en hosting de Shopify con pruebas exhaustivas y optimización.",
      deploymentEn: "Launched on Shopify hosting with thorough testing and optimization.",
    },
    technologies: ["Shopify", "Liquid", "JavaScript", "CSS", "Shopify APIs"],
    keyFeatures: [
      "Configurador de productos personalizado",
      "Prueba virtual usando AR",
      "Programa de fidelidad integrado",
      "Recomendaciones de productos personalizadas",
      "Gestión avanzada de inventario",
    ],
    keyFeaturesEn: [
      "Custom product configurator",
      "Virtual try-on using AR",
      "Integrated loyalty program",
      "Personalized product recommendations",
      "Advanced inventory management",
    ],
    challenges: [
      {
        title: "Personalización Compleja de Productos",
        titleEn: "Complex Product Customization",
        description:
          "La marca ofrecía amplias opciones de personalización para sus productos, lo que fue difícil de implementar dentro del sistema estándar de productos de Shopify.",
        descriptionEn:
          "The brand offered extensive customization options for their products, which was challenging to implement within Shopify's standard product system.",
        solution:
          "Desarrollamos un configurador de productos personalizado utilizando el sistema de propiedades de línea de artículos de Shopify y JavaScript, permitiendo a los clientes personalizar productos con una interfaz fácil de usar.",
        solutionEn:
          "Developed a custom product configurator using Shopify's line item property system and JavaScript, allowing customers to personalize products with a user-friendly interface.",
      },
      {
        title: "Integración con Sistemas Heredados",
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
    duration: "3 meses",
    durationEn: "3 months",
    team: "2 desarrolladores",
    teamEn: "2 developers",
    role: "Desarrollo completo",
    roleEn: "Complete development",
    year: "2023",
  },
  {
    id: 5,
    title: "Shopify Store",
    titleEs: "Sitio Web Galindo SA",
    description: "A customized Shopify store for a high-end fashion brand with unique design requirements.",
    descriptionEs:
      "Una tienda Shopify personalizada para una marca de moda de alta gama con requisitos de diseño únicos.",
    image: "/Projects/Galindo.png",
    category: "shopify",
    url: "https://www.galindosa.com.ar",
    overview: "Una tienda Shopify personalizada para una marca de moda de alta gama con requisitos de diseño únicos.",
    overviewEn: "A customized Shopify store for a high-end fashion brand with unique design requirements.",
    process: {
      planning:
        "Analizamos las necesidades de la marca y el catálogo de productos, definiendo recorridos clave del usuario.",
      planningEn: "Analyzed brand needs and product catalog, defining key user journeys.",
      design: "Personalizamos un tema premium de Shopify para alinearlo con la estética de la marca.",
      designEn: "Customized a premium Shopify theme to align with the brand's aesthetic.",
      development:
        "Implementamos características personalizadas e integraciones para mejorar la experiencia de compra.",
      developmentEn: "Implemented custom features and integrations to enhance the shopping experience.",
      deployment: "Lanzado en hosting de Shopify con pruebas exhaustivas y optimización.",
      deploymentEn: "Launched on Shopify hosting with thorough testing and optimization.",
    },
    technologies: ["Shopify", "Liquid", "JavaScript", "CSS", "Shopify APIs"],
    keyFeatures: [
      "Configurador de productos personalizado",
      "Prueba virtual usando AR",
      "Programa de fidelidad integrado",
      "Recomendaciones de productos personalizadas",
      "Gestión avanzada de inventario",
    ],
    keyFeaturesEn: [
      "Custom product configurator",
      "Virtual try-on using AR",
      "Integrated loyalty program",
      "Personalized product recommendations",
      "Advanced inventory management",
    ],
    challenges: [
      {
        title: "Personalización Compleja de Productos",
        titleEn: "Complex Product Customization",
        description:
          "La marca ofrecía amplias opciones de personalización para sus productos, lo que fue difícil de implementar dentro del sistema estándar de productos de Shopify.",
        descriptionEn:
          "The brand offered extensive customization options for their products, which was challenging to implement within Shopify's standard product system.",
        solution:
          "Desarrollamos un configurador de productos personalizado utilizando el sistema de propiedades de línea de artículos de Shopify y JavaScript, permitiendo a los clientes personalizar productos con una interfaz fácil de usar.",
        solutionEn:
          "Developed a custom product configurator using Shopify's line item property system and JavaScript, allowing customers to personalize products with a user-friendly interface.",
      },
      {
        title: "Integración con Sistemas Heredados",
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
    duration: "3 meses",
    durationEn: "3 months",
    team: "2 desarrolladores",
    teamEn: "2 developers",
    role: "Desarrollo completo",
    roleEn: "Complete development",
    year: "2023",
  },
  {
    id: 6,
    title: "Shopify Store",
    titleEs: "Sitio Web Bodega Chico Zossi",
    description: "A customized Shopify store for a high-end fashion brand with unique design requirements.",
    descriptionEs:
      "Una tienda Shopify personalizada para una marca de moda de alta gama con requisitos de diseño únicos.",
    image: "/Projects/ChicoZossi.png",
    category: "shopify",
    url: "https://www.chicozossi.com.ar",
    overview: "Una tienda Shopify personalizada para una marca de moda de alta gama con requisitos de diseño únicos.",
    overviewEn: "A customized Shopify store for a high-end fashion brand with unique design requirements.",
    process: {
      planning:
        "Analizamos las necesidades de la marca y el catálogo de productos, definiendo recorridos clave del usuario.",
      planningEn: "Analyzed brand needs and product catalog, defining key user journeys.",
      design: "Personalizamos un tema premium de Shopify para alinearlo con la estética de la marca.",
      designEn: "Customized a premium Shopify theme to align with the brand's aesthetic.",
      development:
        "Implementamos características personalizadas e integraciones para mejorar la experiencia de compra.",
      developmentEn: "Implemented custom features and integrations to enhance the shopping experience.",
      deployment: "Lanzado en hosting de Shopify con pruebas exhaustivas y optimización.",
      deploymentEn: "Launched on Shopify hosting with thorough testing and optimization.",
    },
    technologies: ["Shopify", "Liquid", "JavaScript", "CSS", "Shopify APIs"],
    keyFeatures: [
      "Configurador de productos personalizado",
      "Prueba virtual usando AR",
      "Programa de fidelidad integrado",
      "Recomendaciones de productos personalizadas",
      "Gestión avanzada de inventario",
    ],
    keyFeaturesEn: [
      "Custom product configurator",
      "Virtual try-on using AR",
      "Integrated loyalty program",
      "Personalized product recommendations",
      "Advanced inventory management",
    ],
    challenges: [
      {
        title: "Personalización Compleja de Productos",
        titleEn: "Complex Product Customization",
        description:
          "La marca ofrecía amplias opciones de personalización para sus productos, lo que fue difícil de implementar dentro del sistema estándar de productos de Shopify.",
        descriptionEn:
          "The brand offered extensive customization options for their products, which was challenging to implement within Shopify's standard product system.",
        solution:
          "Desarrollamos un configurador de productos personalizado utilizando el sistema de propiedades de línea de artículos de Shopify y JavaScript, permitiendo a los clientes personalizar productos con una interfaz fácil de usar.",
        solutionEn:
          "Developed a custom product configurator using Shopify's line item property system and JavaScript, allowing customers to personalize products with a user-friendly interface.",
      },
      {
        title: "Integración con Sistemas Heredados",
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
    duration: "3 meses",
    durationEn: "3 months",
    team: "2 desarrolladores",
    teamEn: "2 developers",
    role: "Desarrollo completo",
    roleEn: "Complete development",
    year: "2023",
  },
]


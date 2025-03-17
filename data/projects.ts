export const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    titleEs: "Plataforma de E-commerce",
    description: "A modern e-commerce solution with advanced features for a growing online retailer.",
    descriptionEs:
      "Una solución moderna de comercio electrónico con características avanzadas para un minorista en línea en crecimiento.",
    image: "/placeholder.svg?height=400&width=600",
    category: "next",
    process: {
      planning: "Defined user stories and technical requirements through collaborative workshops.",
      planningEs: "Definimos historias de usuario y requisitos técnicos a través de talleres colaborativos.",
      design: "Created wireframes and high-fidelity mockups with a focus on user experience.",
      designEs: "Creamos wireframes y maquetas de alta fidelidad con un enfoque en la experiencia del usuario.",
      development: "Implemented using Next.js and Stripe, with a focus on performance and scalability.",
      developmentEs: "Implementado con Next.js y Stripe, con un enfoque en rendimiento y escalabilidad.",
      deployment: "Deployed on Vercel with a robust CI/CD pipeline for seamless updates.",
      deploymentEs: "Desplegado en Vercel con un robusto pipeline CI/CD para actualizaciones sin problemas.",
    },
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS", "PostgreSQL"],
    features: [
      "Responsive design for mobile and desktop",
      "Advanced product search and filtering",
      "User accounts and order history",
      "Secure payment processing with Stripe",
      "Admin dashboard for inventory management",
    ],
    featuresEs: [
      "Diseño responsive para móvil y escritorio",
      "Búsqueda y filtrado avanzado de productos",
      "Cuentas de usuario e historial de pedidos",
      "Procesamiento seguro de pagos con Stripe",
      "Panel de administración para gestión de inventario",
    ],
    challenges: [
      {
        title: "Performance Optimization",
        titleEs: "Optimización de Rendimiento",
        description: "The initial load time for product pages was slower than desired, especially on mobile devices.",
        descriptionEs:
          "El tiempo de carga inicial para las páginas de productos era más lento de lo deseado, especialmente en dispositivos móviles.",
        solution:
          "Implemented image optimization, lazy loading, and server-side rendering for critical content. This reduced load times by 40% and improved Core Web Vitals scores.",
        solutionEs:
          "Implementamos optimización de imágenes, carga diferida y renderizado del lado del servidor para contenido crítico. Esto redujo los tiempos de carga en un 40% y mejoró las puntuaciones de Core Web Vitals.",
      },
      {
        title: "Complex State Management",
        titleEs: "Gestión de Estado Compleja",
        description: "Managing the shopping cart state across multiple pages and components proved challenging.",
        descriptionEs:
          "La gestión del estado del carrito de compras a través de múltiples páginas y componentes resultó desafiante.",
        solution:
          "Utilized React Context API in combination with local storage to create a persistent and efficient cart management system.",
        solutionEs:
          "Utilizamos la API de Context de React en combinación con almacenamiento local para crear un sistema de gestión de carrito persistente y eficiente.",
      },
    ],
  },
  {
    id: 2,
    title: "Corporate Website",
    titleEs: "Sitio Web Corporativo",
    description: "A responsive corporate website with a custom theme for a multinational company.",
    descriptionEs: "Un sitio web corporativo responsive con un tema personalizado para una empresa multinacional.",
    image: "/placeholder.svg?height=400&width=600",
    category: "wordpress",
    process: {
      planning: "Gathered client requirements and brand guidelines through extensive meetings.",
      planningEs: "Recopilamos requisitos del cliente y directrices de marca a través de reuniones extensas.",
      design: "Developed custom Figma designs, iterating based on client feedback.",
      designEs: "Desarrollamos diseños personalizados en Figma, iterando en base a la retroalimentación del cliente.",
      development: "Built a custom WordPress theme with advanced customization options.",
      developmentEs: "Construimos un tema personalizado de WordPress con opciones avanzadas de personalización.",
      deployment: "Launched on managed WordPress hosting with caching and security measures.",
      deploymentEs: "Lanzado en hosting gestionado de WordPress con medidas de caché y seguridad.",
    },
    technologies: ["WordPress", "PHP", "JavaScript", "SASS", "MySQL"],
    features: [
      "Multi-language support",
      "Custom post types for services and case studies",
      "Interactive company timeline",
      "Integration with HR system for job postings",
      "Advanced analytics and tracking",
    ],
    featuresEs: [
      "Soporte multilingüe",
      "Tipos de publicación personalizados para servicios y casos de estudio",
      "Línea de tiempo interactiva de la empresa",
      "Integración con sistema de RRHH para publicaciones de empleo",
      "Análisis y seguimiento avanzados",
    ],
    challenges: [
      {
        title: "Content Management Complexity",
        titleEs: "Complejidad en la Gestión de Contenido",
        description: "The client needed a flexible system to manage diverse content across multiple regions.",
        descriptionEs:
          "El cliente necesitaba un sistema flexible para gestionar contenido diverso en múltiples regiones.",
        solution:
          "Developed custom post types and taxonomies, combined with Advanced Custom Fields, to create a powerful and intuitive content management experience.",
        solutionEs:
          "Desarrollamos tipos de publicación y taxonomías personalizadas, combinadas con Advanced Custom Fields, para crear una experiencia de gestión de contenido potente e intuitiva.",
      },
      {
        title: "Performance Across Regions",
        titleEs: "Rendimiento en Diferentes Regiones",
        description: "With a global audience, ensuring fast load times across different regions was crucial.",
        descriptionEs:
          "Con una audiencia global, asegurar tiempos de carga rápidos en diferentes regiones era crucial.",
        solution:
          "Implemented a CDN, optimized assets, and used WordPress caching plugins. Also set up server-side caching to minimize database queries.",
        solutionEs:
          "Implementamos una CDN, optimizamos activos y utilizamos plugins de caché de WordPress. También configuramos caché del lado del servidor para minimizar consultas a la base de datos.",
      },
    ],
  },
  {
    id: 3,
    title: "Shopify Store",
    titleEs: "Tienda Shopify",
    description: "A customized Shopify store for a high-end fashion brand with unique design requirements.",
    descriptionEs:
      "Una tienda Shopify personalizada para una marca de moda de alta gama con requisitos de diseño únicos.",
    image: "/placeholder.svg?height=400&width=600",
    category: "shopify",
    process: {
      planning: "Analyzed brand needs and product catalog, defining key user journeys.",
      planningEs:
        "Analizamos las necesidades de la marca y el catálogo de productos, definiendo recorridos clave del usuario.",
      design: "Customized a premium Shopify theme to align with the brand's aesthetic.",
      designEs: "Personalizamos un tema premium de Shopify para alinearlo con la estética de la marca.",
      development: "Implemented custom features and integrations to enhance the shopping experience.",
      developmentEs:
        "Implementamos características personalizadas e integraciones para mejorar la experiencia de compra.",
      deployment: "Launched on Shopify hosting with thorough testing and optimization.",
      deploymentEs: "Lanzado en hosting de Shopify con pruebas exhaustivas y optimización.",
    },
    technologies: ["Shopify", "Liquid", "JavaScript", "CSS", "Shopify APIs"],
    features: [
      "Custom product configurator",
      "Virtual try-on using AR",
      "Integrated loyalty program",
      "Personalized product recommendations",
      "Advanced inventory management",
    ],
    featuresEs: [
      "Configurador de productos personalizado",
      "Prueba virtual usando AR",
      "Programa de fidelidad integrado",
      "Recomendaciones de productos personalizadas",
      "Gestión avanzada de inventario",
    ],
    challenges: [
      {
        title: "Complex Product Customization",
        titleEs: "Personalización Compleja de Productos",
        description:
          "The brand offered extensive customization options for their products, which was challenging to implement within Shopify's standard product system.",
        descriptionEs:
          "La marca ofrecía amplias opciones de personalización para sus productos, lo que fue difícil de implementar dentro del sistema estándar de productos de Shopify.",
        solution:
          "Developed a custom product configurator using Shopify's line item property system and JavaScript, allowing customers to personalize products with a user-friendly interface.",
        solutionEs:
          "Desarrollamos un configurador de productos personalizado utilizando el sistema de propiedades de línea de artículos de Shopify y JavaScript, permitiendo a los clientes personalizar productos con una interfaz fácil de usar.",
      },
      {
        title: "Integration with Legacy Systems",
        titleEs: "Integración con Sistemas Heredados",
        description:
          "The client had existing inventory and CRM systems that needed to be integrated with the new Shopify store.",
        descriptionEs:
          "El cliente tenía sistemas existentes de inventario y CRM que necesitaban ser integrados con la nueva tienda Shopify.",
        solution:
          "Created custom Shopify apps and utilized Shopify's API to build seamless integrations, ensuring real-time data synchronization between systems.",
        solutionEs:
          "Creamos aplicaciones personalizadas de Shopify y utilizamos la API de Shopify para construir integraciones perfectas, asegurando la sincronización de datos en tiempo real entre sistemas.",
      },
    ],
  },
]


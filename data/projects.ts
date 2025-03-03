export const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A modern e-commerce solution with advanced features for a growing online retailer.",
    image: "/placeholder.svg?height=400&width=600",
    category: "next",
    process: {
      planning: "Defined user stories and technical requirements through collaborative workshops.",
      design: "Created wireframes and high-fidelity mockups with a focus on user experience.",
      development: "Implemented using Next.js and Stripe, with a focus on performance and scalability.",
      deployment: "Deployed on Vercel with a robust CI/CD pipeline for seamless updates.",
    },
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS", "PostgreSQL"],
    features: [
      "Responsive design for mobile and desktop",
      "Advanced product search and filtering",
      "User accounts and order history",
      "Secure payment processing with Stripe",
      "Admin dashboard for inventory management",
    ],
    challenges: [
      {
        title: "Performance Optimization",
        description: "The initial load time for product pages was slower than desired, especially on mobile devices.",
        solution:
          "Implemented image optimization, lazy loading, and server-side rendering for critical content. This reduced load times by 40% and improved Core Web Vitals scores.",
      },
      {
        title: "Complex State Management",
        description: "Managing the shopping cart state across multiple pages and components proved challenging.",
        solution:
          "Utilized React Context API in combination with local storage to create a persistent and efficient cart management system.",
      },
    ],
  },
  {
    id: 2,
    title: "Corporate Website",
    description: "A responsive corporate website with a custom theme for a multinational company.",
    image: "/placeholder.svg?height=400&width=600",
    category: "wordpress",
    process: {
      planning: "Gathered client requirements and brand guidelines through extensive meetings.",
      design: "Developed custom Figma designs, iterating based on client feedback.",
      development: "Built a custom WordPress theme with advanced customization options.",
      deployment: "Launched on managed WordPress hosting with caching and security measures.",
    },
    technologies: ["WordPress", "PHP", "JavaScript", "SASS", "MySQL"],
    features: [
      "Multi-language support",
      "Custom post types for services and case studies",
      "Interactive company timeline",
      "Integration with HR system for job postings",
      "Advanced analytics and tracking",
    ],
    challenges: [
      {
        title: "Content Management Complexity",
        description: "The client needed a flexible system to manage diverse content across multiple regions.",
        solution:
          "Developed custom post types and taxonomies, combined with Advanced Custom Fields, to create a powerful and intuitive content management experience.",
      },
      {
        title: "Performance Across Regions",
        description: "With a global audience, ensuring fast load times across different regions was crucial.",
        solution:
          "Implemented a CDN, optimized assets, and used WordPress caching plugins. Also set up server-side caching to minimize database queries.",
      },
    ],
  },
  {
    id: 3,
    title: "Shopify Store",
    description: "A customized Shopify store for a high-end fashion brand with unique design requirements.",
    image: "/placeholder.svg?height=400&width=600",
    category: "shopify",
    process: {
      planning: "Analyzed brand needs and product catalog, defining key user journeys.",
      design: "Customized a premium Shopify theme to align with the brand's aesthetic.",
      development: "Implemented custom features and integrations to enhance the shopping experience.",
      deployment: "Launched on Shopify hosting with thorough testing and optimization.",
    },
    technologies: ["Shopify", "Liquid", "JavaScript", "CSS", "Shopify APIs"],
    features: [
      "Custom product configurator",
      "Virtual try-on using AR",
      "Integrated loyalty program",
      "Personalized product recommendations",
      "Advanced inventory management",
    ],
    challenges: [
      {
        title: "Complex Product Customization",
        description:
          "The brand offered extensive customization options for their products, which was challenging to implement within Shopify's standard product system.",
        solution:
          "Developed a custom product configurator using Shopify's line item property system and JavaScript, allowing customers to personalize products with a user-friendly interface.",
      },
      {
        title: "Integration with Legacy Systems",
        description:
          "The client had existing inventory and CRM systems that needed to be integrated with the new Shopify store.",
        solution:
          "Created custom Shopify apps and utilized Shopify's API to build seamless integrations, ensuring real-time data synchronization between systems.",
      },
    ],
  },
]


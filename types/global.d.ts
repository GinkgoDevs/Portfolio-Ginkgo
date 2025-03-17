// Definición de tipos globales para TypeScript

// Definición para Calendly
interface Calendly {
  initInlineWidget: (options: {
    url: string
    parentElement: HTMLElement
    prefill?: Record<string, any>
    utm?: Record<string, any>
  }) => void
}

// Extender la interfaz Window para incluir Calendly
interface Window {
  Calendly?: Calendly
}


"use client"

import { useRef, useEffect } from "react"
import { Renderer, Camera, Transform, Plane, Mesh, Program, Texture } from "ogl"
import type { OGLRenderingContext } from "ogl"

import "./CircularGallery.css"

function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t
}

function autoBind(instance: object): void {
  const proto = Object.getPrototypeOf(instance)
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof (instance as any)[key] === "function") {
      (instance as any)[key] = (instance as any)[key].bind(instance)
    }
  })
}

function createTextTexture(
  gl: OGLRenderingContext,
  text: string,
  font: string = "bold 30px monospace",
  color: string = "black"
): { texture: Texture; width: number; height: number } {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  if (!context) throw new Error("Could not get 2D context")
  context.font = font
  const metrics = context.measureText(text)
  const textWidth = Math.ceil(metrics.width)
  const textHeight = Math.ceil(Number.parseInt(font, 10) * 1.2)
  canvas.width = textWidth + 20
  canvas.height = textHeight + 20
  context.font = font
  context.fillStyle = color
  context.textBaseline = "middle"
  context.textAlign = "center"
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillText(text, canvas.width / 2, canvas.height / 2)
  const texture = new Texture(gl, { generateMipmaps: false })
  texture.image = canvas
  return { texture, width: canvas.width, height: canvas.height }
}

class Title {
  gl: OGLRenderingContext;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor: string;
  font: string;
  mesh!: Mesh;

  constructor({
    gl,
    plane,
    renderer,
    text,
    textColor = "#545050",
    font = "30px sans-serif",
  }: {
    gl: OGLRenderingContext;
    plane: Mesh;
    renderer: Renderer;
    text: string;
    textColor?: string;
    font?: string;
  }) {
    autoBind(this)
    this.gl = gl
    this.plane = plane
    this.renderer = renderer
    this.text = text
    this.textColor = textColor
    this.font = font
    this.createMesh()
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor)
    const geometry = new Plane(this.gl)
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    })
    this.mesh = new Mesh(this.gl, { geometry, program })
    const aspect = width / height
    const textHeight = this.plane.scale.y * 0.15
    const textWidth = textHeight * aspect
    this.mesh.scale.set(textWidth, textHeight, 1)
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05
    this.mesh.setParent(this.plane)
  }
}

interface MediaParams {
  geometry: Plane;
  gl: OGLRenderingContext;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: { width: number; height: number };
  text: string;
  viewport: { width: number; height: number };
  bend: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  id?: string | number;
}

class Media {
  geometry: Plane;
  gl: OGLRenderingContext;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: { width: number; height: number };
  text: string;
  viewport: { width: number; height: number };
  bend: number;
  textColor?: string;
  borderRadius: number;
  font?: string;
  id?: string | number;
  extra: number = 0;
  program!: Program;
  plane!: Mesh;
  title!: Title;
  scale: number = 1;
  padding: number = 4;
  width: number = 0;
  widthTotal: number = 0;
  x: number = 0;
  speed: number = 0;
  isBefore: boolean = false;
  isAfter: boolean = false;

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
    id,
  }: MediaParams) {
    this.geometry = geometry
    this.gl = gl
    this.image = image
    this.index = index
    this.length = length
    this.renderer = renderer
    this.scene = scene
    this.screen = screen
    this.text = text
    this.viewport = viewport
    this.bend = bend
    this.textColor = textColor
    this.borderRadius = borderRadius
    this.font = font
    this.id = id
    this.extra = 0
    this.createShader()
    this.createMesh()
    this.createTitle()
    this.onResize()
  }
  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false })
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        // Rounded box SDF for UV space
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          // Apply rounded corners (assumes vUv in [0,1])
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          if(d > 0.0) {
            discard;
          }
          
          gl_FragColor = vec4(color.rgb, 1.0);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    })
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = this.image
    img.onload = () => {
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]
      texture.image = img
    }
  }
  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    })
    this.plane.setParent(this.scene)
  }
  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
    })
  }
  update(scroll: { current: number; last: number }, direction: string) {
    this.plane.position.x = this.x - scroll.current - this.extra
    const x = this.plane.position.x
    const H = this.viewport.width / 2
    if (this.bend === 0) {
      this.plane.position.y = 0
      this.plane.rotation.z = 0
    } else {
      const B_abs = Math.abs(this.bend)
      const R = (H * H + B_abs * B_abs) / (2 * B_abs)
      const effectiveX = Math.min(Math.abs(x), H)
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX)
      if (this.bend > 0) {
        this.plane.position.y = -arc
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R)
      } else {
        this.plane.position.y = arc
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R)
      }
    }
    this.speed = scroll.current - scroll.last
    this.program.uniforms.uTime.value += 0.04
    this.program.uniforms.uSpeed.value = this.speed
    const planeOffset = this.plane.scale.x / 2
    const viewportOffset = this.viewport.width / 2
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal
      this.isBefore = this.isAfter = false
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal
      this.isBefore = this.isAfter = false
    }
  }
  onResize({ screen, viewport }: { screen?: { width: number; height: number }; viewport?: { width: number; height: number } } = {}) {
    if (screen) this.screen = screen
    if (viewport) {
      this.viewport = viewport
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height]
      }
    }
    this.scale = this.screen.height / 1500
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y]
    this.padding = 4
    this.width = this.plane.scale.x + this.padding
    this.widthTotal = this.width * this.length
    this.x = this.width * this.index
  }
}

// Type definitions for gallery items and props
interface GalleryItem {
  image: string;
  text: string;
  id?: string | number;
}

interface AppOptions {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  onItemClick?: (id: string | number) => void;
  initialIndex?: number;
}

class App {
  container: HTMLElement;
  renderer!: Renderer;
  gl!: OGLRenderingContext;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  medias: Media[] = [];
  mediasImages: GalleryItem[] = [];
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  scroll: { ease: number; current: number; target: number; last: number; position?: number };
  raf: number = 0;
  onItemClick?: (id: string | number) => void;
  initialIndex: number;
  onCheckDebounce: () => void;
  isDown: boolean = false;
  lastTouchDown: number = 0;
  start: number = 0;
  dragDistance: number = 0;
  boundOnResize!: () => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!: (e: MouseEvent | TouchEvent) => void;
  boundHandleClick!: (e: MouseEvent) => void;

  constructor(
    container: HTMLElement,
    {
      items,
      bend,
      textColor = "#ffffff",
      borderRadius = 0,
      font = "bold 30px DM Sans",
      onItemClick,
      initialIndex = 2,
    }: AppOptions = {},
  ) {
    document.documentElement.classList.remove("no-js")
    this.container = container
    this.scroll = { ease: 0.05, current: 0, target: 0, last: 0 }
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200)
    this.onItemClick = onItemClick
    this.initialIndex = initialIndex
    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.onResize()
    this.createGeometry()
    this.createMedias(items, bend, textColor, borderRadius, font)

    // Set initial position to show the specified index
    if (this.medias && this.medias.length > 0) {
      const width = this.medias[0].width
      this.scroll.current = this.scroll.target = width * this.initialIndex
    }

    this.update()
    this.addEventListeners()
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true })
    this.gl = this.renderer.gl
    this.gl.clearColor(0, 0, 0, 0)
    this.container.appendChild(this.gl.canvas)

    // Make canvas take full width
    this.gl.canvas.style.width = "100%"
    this.gl.canvas.style.maxWidth = "none"
  }

  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 20
  }

  createScene() {
    this.scene = new Transform()
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    })
  }

  createMedias(
    items?: GalleryItem[],
    bend: number = 1,
    textColor?: string,
    borderRadius?: number,
    font?: string,
  ) {
    const defaultItems: GalleryItem[] = [
      { image: `https://picsum.photos/seed/1/800/600?grayscale`, text: "Bridge" },
      { image: `https://picsum.photos/seed/2/800/600?grayscale`, text: "Desk Setup" },
      { image: `https://picsum.photos/seed/3/800/600?grayscale`, text: "Waterfall" },
      { image: `https://picsum.photos/seed/4/800/600?grayscale`, text: "Strawberries" },
      { image: `https://picsum.photos/seed/5/800/600?grayscale`, text: "Deep Diving" },
      { image: `https://picsum.photos/seed/16/800/600?grayscale`, text: "Train Track" },
      { image: `https://picsum.photos/seed/17/800/600?grayscale`, text: "Santorini" },
      { image: `https://picsum.photos/seed/8/800/600?grayscale`, text: "Blurry Lights" },
      { image: `https://picsum.photos/seed/9/800/600?grayscale`, text: "New York" },
      { image: `https://picsum.photos/seed/10/800/600?grayscale`, text: "Good Boy" },
      { image: `https://picsum.photos/seed/21/800/600?grayscale`, text: "Coastline" },
      { image: `https://picsum.photos/seed/12/800/600?grayscale`, text: "Palm Trees" },
    ]
    const galleryItems = items && items.length ? items : defaultItems
    this.mediasImages = galleryItems.concat(galleryItems)
    this.medias = this.mediasImages.map((data: GalleryItem, index: number) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
        id: data.id,
      })
    })
  }

  handleClick(e: MouseEvent) {
    if (!this.onItemClick) return

    // Solo procesar el clic si no estamos arrastrando
    if (this.isDown && Math.abs(this.dragDistance) > 5) return

    // Verificar si el clic fue muy cercano al inicio del arrastre (para evitar clics accidentales durante el arrastre)
    const now = Date.now()
    if (now - this.lastTouchDown < 300) {
      // Convertir coordenadas del clic a coordenadas del canvas
      const rect = this.gl.canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Convertir a coordenadas normalizadas (-1 a 1)
      const normalizedX = (x / rect.width) * 2 - 1
      const normalizedY = -((y / rect.height) * 2 - 1) // Y invertido en WebGL

      // Encontrar el medio más cercano al punto de clic
      let closestMedia: Media | null = null
      let closestDistance = Number.POSITIVE_INFINITY
      for (let i = 0; i < this.medias.length; i++) {
        const media = this.medias[i]
        const planeX = media.plane.position.x / (this.viewport.width / 2) // Normalizar a -1 a 1
        const distance = Math.abs(normalizedX - planeX)
        const planeWidth = media.plane.scale.x / (this.viewport.width / 2) // Ancho normalizado
        if (distance < planeWidth / 2 && distance < closestDistance) {
          closestDistance = distance
          closestMedia = media
        }
      }

      if (closestMedia) {
        // Obtener el ID del proyecto
        const id = closestMedia.id
        if (id !== undefined) {
          // Centrar la tarjeta seleccionada
          const targetPosition = closestMedia.x - closestMedia.extra
          this.scroll.target = targetPosition

          // Llamar al callback con el ID del proyecto
          this.onItemClick(id)
        }
      }
    }
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true
    this.lastTouchDown = Date.now() // Registrar el tiempo del último toque
    this.scroll.position = this.scroll.current
    this.start = (e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX
    this.dragDistance = 0 // Reiniciar la distancia de arrastre
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return
    const x = (e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX
    this.dragDistance = this.start - x // Calcular la distancia de arrastre
    const distance = this.dragDistance * 0.05
    this.scroll.target = (this.scroll.position ?? 0) + distance
  }

  onTouchUp(_e?: MouseEvent | TouchEvent) {
    this.isDown = false
    this.onCheck()
  }

  onWheel(e: WheelEvent) {
    // Habilitar la funcionalidad de scroll para la galería
    if (e.deltaY > 0) {
      this.scroll.target += 1
    } else {
      this.scroll.target -= 1
    }
    this.onCheckDebounce()
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return
    const width = this.medias[0].width
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width)
    const item = width * itemIndex
    this.scroll.target = this.scroll.target < 0 ? -item : item
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    }
    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    })
    const fov = (this.camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect
    this.viewport = { width, height }
    if (this.medias) {
      this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }))
    }
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease)
    const direction = this.scroll.current > this.scroll.last ? "right" : "left"
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction))
    }
    this.renderer.render({ scene: this.scene, camera: this.camera })
    this.scroll.last = this.scroll.current
    this.raf = window.requestAnimationFrame(this.update.bind(this))
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this)
    this.boundOnTouchDown = this.onTouchDown.bind(this)
    this.boundOnTouchMove = this.onTouchMove.bind(this)
    this.boundOnTouchUp = this.onTouchUp.bind(this)
    this.boundHandleClick = this.handleClick.bind(this)

    window.addEventListener("resize", this.boundOnResize)
    window.addEventListener("mousedown", this.boundOnTouchDown)
    window.addEventListener("mousemove", this.boundOnTouchMove)
    window.addEventListener("mouseup", this.boundOnTouchUp)
    window.addEventListener("touchstart", this.boundOnTouchDown)
    window.addEventListener("touchmove", this.boundOnTouchMove)
    window.addEventListener("touchend", this.boundOnTouchUp)
    this.container.addEventListener("click", this.boundHandleClick)
  }

  destroy() {
    window.cancelAnimationFrame(this.raf)
    window.removeEventListener("resize", this.boundOnResize)
    window.removeEventListener("mousedown", this.boundOnTouchDown)
    window.removeEventListener("mousemove", this.boundOnTouchMove)
    window.removeEventListener("mouseup", this.boundOnTouchUp)
    window.removeEventListener("touchstart", this.boundOnTouchDown)
    window.removeEventListener("touchmove", this.boundOnTouchMove)
    window.removeEventListener("touchend", this.boundOnTouchUp)
    this.container.removeEventListener("click", this.boundHandleClick)

    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas)
    }
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px DM Sans",
  onItemClick,
  initialIndex = 2,
}: {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  onItemClick?: (id: string | number) => void;
  initialIndex?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      onItemClick,
      initialIndex,
    })

    return () => {
      app.destroy()
    }
  }, [items, bend, textColor, borderRadius, font, onItemClick, initialIndex])

  return <div className="circular-gallery" ref={containerRef} />
}


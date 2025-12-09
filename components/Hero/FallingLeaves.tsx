"use client"

import { useEffect, useRef, useCallback } from "react"
import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, Vector2, Vector3, Shape, ShapeGeometry, MeshBasicMaterial, Euler } from "three"

interface FallingLeavesProps {
  className?: string
}

export default function FallingLeaves({ className = "" }: FallingLeavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useRef(new Vector2())
  const lastMousePosition = useRef(new Vector2())
  const mouseVelocity = useRef(new Vector2())
  const sceneRef = useRef<InstanceType<typeof Scene> | null>(null)
  const cameraRef = useRef<InstanceType<typeof PerspectiveCamera> | null>(null)
  const rendererRef = useRef<InstanceType<typeof WebGLRenderer> | null>(null)
  const leavesRef = useRef<InstanceType<typeof Mesh>[]>([])
  const groundLeavesRef = useRef<InstanceType<typeof Mesh>[]>([])
  const worldMousePosition = useRef(new Vector3())
  const lastUpdateTime = useRef(0)
  const isMouseMoving = useRef(false)
  const mouseMovementTimer = useRef<NodeJS.Timeout | null>(null)
  const lastTime = useRef(performance.now())
  const lastMouseProcessTime = useRef(0)
  const animationFrameRef = useRef<number | null>(null)

  // Modificar el manejador de eventos handleMouseMove para verificar si el evento está dentro del hero
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!canvasRef.current) return

    // Verificar si el evento está dentro del hero section
    const heroSection = document.getElementById("home")
    if (!heroSection) return

    const heroRect = heroSection.getBoundingClientRect()

    // Si el evento está fuera del hero, ignorarlo
    if (
      event.clientY > heroRect.bottom ||
      event.clientY < heroRect.top ||
      event.clientX > heroRect.right ||
      event.clientX < heroRect.left
    ) {
      return
    }

    const rect = canvasRef.current.getBoundingClientRect()
    const currentTime = performance.now()
    const deltaTime = (currentTime - lastTime.current) / 1000 // Convert to seconds

    const newX = (event.clientX - rect.left) / rect.width
    const newY = (event.clientY - rect.top) / rect.height

    // Calculate mouse velocity
    mouseVelocity.current.x = (newX - lastMousePosition.current.x) / Math.max(deltaTime, 0.016)
    mouseVelocity.current.y = (newY - lastMousePosition.current.y) / Math.max(deltaTime, 0.016)

    // Update positions
    mousePosition.current.set(newX, newY)
    lastMousePosition.current.set(newX, newY)

    // Set mouse as moving
    isMouseMoving.current = true

    // Reset the timer
    if (mouseMovementTimer.current) {
      clearTimeout(mouseMovementTimer.current)
    }

    // Set a timer to mark mouse as stopped after 100ms of no movement
    mouseMovementTimer.current = setTimeout(() => {
      isMouseMoving.current = false
      mouseVelocity.current.set(0, 0)
    }, 100)

    lastTime.current = currentTime
  }, [])

  // Modificar el manejador de eventos handleTouchMove para verificar si el evento está dentro del hero
  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!canvasRef.current || event.touches.length === 0) return

    const touch = event.touches[0]

    // Verificar si el toque está dentro del hero section
    const heroSection = document.getElementById("home")
    if (!heroSection) return

    const heroRect = heroSection.getBoundingClientRect()

    // Si el toque está fuera del hero, ignorarlo
    if (
      touch.clientY > heroRect.bottom ||
      touch.clientY < heroRect.top ||
      touch.clientX > heroRect.right ||
      touch.clientX < heroRect.left
    ) {
      return
    }

    const rect = canvasRef.current.getBoundingClientRect()
    const currentTime = performance.now()
    const deltaTime = (currentTime - lastTime.current) / 1000

    const newX = (touch.clientX - rect.left) / rect.width
    const newY = (touch.clientY - rect.top) / rect.height

    mouseVelocity.current.x = (newX - lastMousePosition.current.x) / Math.max(deltaTime, 0.016)
    mouseVelocity.current.y = (newY - lastMousePosition.current.y) / Math.max(deltaTime, 0.016)

    mousePosition.current.set(newX, newY)
    lastMousePosition.current.set(newX, newY)

    isMouseMoving.current = true

    if (mouseMovementTimer.current) {
      clearTimeout(mouseMovementTimer.current)
    }

    mouseMovementTimer.current = setTimeout(() => {
      isMouseMoving.current = false
      mouseVelocity.current.set(0, 0)
    }, 100)

    lastTime.current = currentTime
  }, [])

  // Modificar el useEffect principal para asegurarse de que canvasRef.current existe antes de configurar los event listeners
  useEffect(() => {
    if (!canvasRef.current) return

    // Detectar si es un dispositivo móvil para optimizar rendimiento
    const isMobileDevice = window.innerWidth < 768

    const scene = new Scene()
    sceneRef.current = scene

    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    cameraRef.current = camera
    camera.position.z = 5

    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: !isMobileDevice, // Desactivar antialiasing en móvil para mejorar rendimiento
    })
    rendererRef.current = renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileDevice ? 1.5 : 2)) // Reducir pixel ratio en móvil

    // Create custom Ginkgo leaf shape based on the brand logo (5 separate floating lobes + stem)
    const shapes: InstanceType<typeof Shape>[] = []

    // Helper to rotate points around (0,0)
    const rotate = (x: number, y: number, angleDeg: number) => {
      const rad = (angleDeg * Math.PI) / 180
      const cos = Math.cos(rad)
      const sin = Math.sin(rad)
      return {
        x: x * cos - y * sin,
        y: x * sin + y * cos,
      }
    }

    // Common center point for the fan
    const fanOriginY = -0.3

    // 1. STEM
    const stem = new Shape()
    const stemW = 0.05
    const stemH = 0.25
    // Stem goes from bottom up to fanOriginY
    stem.moveTo(-stemW, fanOriginY - stemH)
    stem.lineTo(stemW, fanOriginY - stemH)
    stem.quadraticCurveTo(stemW, fanOriginY - stemH * 0.5, 0.02, fanOriginY) // Taper slightly
    stem.lineTo(-0.02, fanOriginY)
    stem.quadraticCurveTo(-stemW, fanOriginY - stemH * 0.5, -stemW, fanOriginY - stemH)
    shapes.push(stem)

    // 2. LOBES
    // Function to create a paddle-shaped lobe with optional curvature
    // bend: positive bends right, negative bends left
    const addLobe = (angleDeg: number, length: number, widthTop: number, bend: number = 0) => {
      const lobe = new Shape()

      // Define lobe upright relative to (0,0)
      const widthBase = 0.015 // Very narrow base

      // Base points
      const pBaseL = { x: -widthBase, y: 0.08 } // Start higher to leave gap
      const pBaseR = { x: widthBase, y: 0.08 }

      // Top points - apply bend to x coordinates
      const pTopL = { x: -widthTop / 2 + bend, y: length }
      const pTopR = { x: widthTop / 2 + bend, y: length }

      // Control points for the sides - add bend influence
      // Midpoint curve should follow the bend direction
      const cpSideY = length * 0.5
      const cpLeft = { x: -widthTop / 4 + bend * 0.5, y: cpSideY }
      const cpRight = { x: widthTop / 4 + bend * 0.5, y: cpSideY }

      // Top rounded arch
      // We calculate the top cap based on the tilted top vector
      const topMid = { x: bend, y: length + widthTop * 0.3 }

      // Rotate all points
      const rBaseL = rotate(pBaseL.x, pBaseL.y, angleDeg)
      const rBaseR = rotate(pBaseR.x, pBaseR.y, angleDeg)
      const rTopL = rotate(pTopL.x, pTopL.y, angleDeg)
      const rTopR = rotate(pTopR.x, pTopR.y, angleDeg)

      const rCpLeft = rotate(cpLeft.x, cpLeft.y, angleDeg)
      const rCpRight = rotate(cpRight.x, cpRight.y, angleDeg)

      const rTopMid = rotate(topMid.x, topMid.y, angleDeg)

      // Translate to fan origin
      const tx = 0
      const ty = fanOriginY

      lobe.moveTo(rBaseL.x + tx, rBaseL.y + ty)

      // Left side curve
      lobe.quadraticCurveTo(rCpLeft.x + tx, rCpLeft.y + ty, rTopL.x + tx, rTopL.y + ty)

      // Top rounded arch (simplified to one curve for smoothness)
      lobe.quadraticCurveTo(rTopMid.x + tx, rTopMid.y + ty, rTopR.x + tx, rTopR.y + ty)

      // Right side curve
      lobe.quadraticCurveTo(rCpRight.x + tx, rCpRight.y + ty, rBaseR.x + tx, rBaseR.y + ty)

      lobe.lineTo(rBaseL.x + tx, rBaseL.y + ty) // Close

      shapes.push(lobe)
    }

    // Add 6 distinct lobes radiating (3 pairs)
    // Angles: +/- 10, +/- 32, +/- 55

    // Central Pair (Split in the middle)
    addLobe(10, 0.95, 0.22, 0)      // Center Left
    addLobe(-10, 0.95, 0.22, 0)     // Center Right

    // Inner Pair
    addLobe(32, 0.90, 0.21, 0.05)   // Inner Left
    addLobe(-32, 0.90, 0.21, -0.05) // Inner Right

    // Outer Pair
    addLobe(58, 0.80, 0.19, 0.15)   // Outer Left
    addLobe(-58, 0.80, 0.19, -0.15) // Outer Right

    const leafGeometry = new ShapeGeometry(shapes)

    const leafColors = [
      0xd4f57a, // Brand Neon Lime
      0xc2e65c, // Medium Lime
      0xb0d83e, // Darker Lime
      0xF5F2EB, // Brand Soft Beige (Accent - adds light/premium feel)
    ]

    // Cantidad de hojas optimizada para mejor performance
    let leavesCount = isMobileDevice ? 30 : 50 // Reducido para mejor performance
    let groundLayerCount = isMobileDevice ? 2 : 3 // Reducido para mejor performance
    let groundLeavesPerLayer = isMobileDevice ? 60 : 100 // Reducido para mejor performance

    // Detectar preferencia de reducción de movimiento
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      leavesCount = Math.min(leavesCount, 20)
      groundLayerCount = Math.min(groundLayerCount, 2)
      groundLeavesPerLayer = Math.min(groundLeavesPerLayer, 50)
    }

    const leaves: InstanceType<typeof Mesh>[] = []
    const groundLeaves: InstanceType<typeof Mesh>[] = []

    // Ground setup
    const groundY = -3.5

    // Crear hojas del suelo
    for (let layer = 0; layer < groundLayerCount; layer++) {
      for (let i = 0; i < groundLeavesPerLayer; i++) {
        // Less beige on the ground to avoid noise
        const colorIndex = Math.random() > 0.9 ? 3 : Math.floor(Math.random() * 3)
        const leafMaterial = new MeshBasicMaterial({
          color: leafColors[colorIndex],
          side: 2,
          transparent: true,
          opacity: 0.9,
        })

        const groundLeaf = new Mesh(leafGeometry, leafMaterial)

        const x = Math.random() * 32 - 16
        const y = groundY + layer * 0.08 + Math.random() * 0.15
        const z = Math.random() * 0.5 - 0.25 + layer * 0.08
        groundLeaf.position.set(x, y, z)

        // ... (rest of ground leaf setup remains similar, implied context) ...
        groundLeaf.rotation.x = Math.PI / 2 - Math.random() * 0.3
        groundLeaf.rotation.z = Math.random() * Math.PI * 2

        const baseScale = 0.12 + Math.random() * 0.08
        const scaleX = baseScale * (0.7 + Math.random() * 0.6)
        const scaleY = baseScale * (1.0 + Math.random() * 0.8)
        groundLeaf.scale.set(scaleX, scaleY, baseScale)

        groundLeaf.userData = {
          originalPosition: new Vector3(x, y, z),
          originalRotation: new Euler().copy(groundLeaf.rotation),
          originalScale: new Vector3().copy(groundLeaf.scale),
          velocity: new Vector3(0, 0, 0),
          angularVelocity: new Vector3(0, 0, 0),
          mass: 0.3 + Math.random() * 0.7,
          isLifted: false,
          liftTime: 0,
          liftThreshold: 0.15 + Math.random() * 0.8,
          restingTime: 0,
          swayPhase: Math.random() * Math.PI * 2,
          swayAmplitude: 0.005 + Math.random() * 0.01,
        }

        scene.add(groundLeaf)
        groundLeaves.push(groundLeaf)
      }
    }

    // Crear hojas que caen con profundidad de campo
    for (let i = 0; i < leavesCount; i++) {
      // 15% chance of Beige accent for floating leaves
      const colorIndex = Math.random() > 0.85 ? 3 : Math.floor(Math.random() * 3)

      const zPos = Math.random() * 5 - 2 // Depth range: -2 to 3 (closer to camera)

      // Calculate opacity based on Z depth (Fake Depth of Field)
      // Closer (z=3) -> Opacity 1.0
      // Further (z=-2) -> Opacity 0.4
      // Normalized Z from 0 to 1 roughly
      const normalizedZ = (zPos + 2) / 5
      const depthOpacity = 0.4 + (normalizedZ * 0.6)

      const leafMaterial = new MeshBasicMaterial({
        color: leafColors[colorIndex],
        side: 2,
        transparent: true,
        opacity: depthOpacity,
      })

      const leaf = new Mesh(leafGeometry, leafMaterial)

      // Initial position
      leaf.position.set(Math.random() * 28 - 14, Math.random() * 8 + 5, zPos)
      leaf.rotation.x = Math.random() * Math.PI
      leaf.rotation.y = Math.random() * Math.PI
      leaf.rotation.z = Math.random() * Math.PI

      // Scale linked to depth (PerspectiveCamera does this, but we accent it)
      const baseScale = 0.15 + Math.random() * 0.15
      // Slight extra scale boost for closer items
      const depthScale = baseScale * (1 + normalizedZ * 0.3)
      leaf.scale.set(depthScale, depthScale, depthScale)

      // Velocidad inicial más rápida pero con física más suave después
      leaf.userData = {
        velocity: new Vector3(
          (Math.random() - 0.5) * 0.01, // Ligero movimiento horizontal aleatorio
          -0.008 - Math.random() * 0.007, // Velocidad inicial más rápida
          (Math.random() - 0.5) * 0.01, // Ligero movimiento en profundidad
        ),
        angularVelocity: new Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
        ),
        mass: 0.2 + Math.random() * 0.5, // Hojas más ligeras para movimientos más suaves
        isAffectedByMouse: false,
        lastMouseImpact: 0,
        swayFactor: 0.2 + Math.random() * 0.3, // Factor de oscilación para movimiento lateral
        swayPhase: Math.random() * Math.PI * 2, // Fase inicial aleatoria
      }

      scene.add(leaf)
      leaves.push(leaf)
    }

    leavesRef.current = leaves
    groundLeavesRef.current = groundLeaves

    const resetLeaf = (leaf: InstanceType<typeof Mesh>) => {
      leaf.position.set(Math.random() * 28 - 14, Math.random() * 8 + 5, Math.random() * 4 - 2)
      leaf.rotation.x = Math.random() * Math.PI
      leaf.rotation.y = Math.random() * Math.PI

      // Reiniciar con velocidad inicial más rápida
      leaf.userData.velocity.set(
        (Math.random() - 0.5) * 0.01,
        -0.008 - Math.random() * 0.007,
        (Math.random() - 0.5) * 0.01,
      )
      leaf.userData.isAffectedByMouse = false
    }

    const updateWorldMousePosition = () => {
      // Only update mouse position every 16ms (roughly 60fps) to avoid excessive calculations
      const now = Date.now()
      if (now - lastMouseProcessTime.current < 16) return
      lastMouseProcessTime.current = now

      if (!canvasRef.current || !camera) return

      const vector = new Vector3(mousePosition.current.x * 2 - 1, -(mousePosition.current.y * 2) + 1, 0.5)
      vector.unproject(camera)
      const dir = vector.sub(camera.position).normalize()
      const distance = -camera.position.z / dir.z
      worldMousePosition.current.copy(camera.position).add(dir.multiplyScalar(distance))
    }

    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate)

      updateWorldMousePosition()
      const currentTime = Date.now()
      const deltaTime = (currentTime - lastUpdateTime.current) / 1000
      lastUpdateTime.current = currentTime

      const mouseSpeed = mouseVelocity.current.length()

      // Ajustar el umbral de rendimiento para dispositivos móviles
      const performanceMode = isMobileDevice ? deltaTime > 0.04 : deltaTime > 0.05

      // Update falling leaves
      leaves.forEach((leaf) => {
        const userData = leaf.userData
        const velocity = userData.velocity
        const angularVelocity = userData.angularVelocity
        const mass = userData.mass

        // Apply gravity - más suave después de la velocidad inicial
        velocity.y -= 0.00015 * mass

        // Añadir movimiento ondulante lateral para simular brisa
        const time = currentTime * 0.0004
        const swayAmount = Math.sin(time + userData.swayPhase) * 0.0003 * userData.swayFactor
        velocity.x += swayAmount

        // Check for mouse proximity and apply force only if mouse is moving
        const distanceToMouse = leaf.position.distanceTo(worldMousePosition.current)
        const mouseInfluenceRadius = 3.5

        if (
          distanceToMouse < mouseInfluenceRadius &&
          isMouseMoving.current &&
          currentTime - userData.lastMouseImpact > 100
        ) {
          const direction = new Vector3().subVectors(leaf.position, worldMousePosition.current).normalize()
          const impulseStrength = 0.12 * (1 - distanceToMouse / mouseInfluenceRadius)
          velocity.add(direction.multiplyScalar(impulseStrength))

          angularVelocity.x += (Math.random() - 0.5) * 0.08
          angularVelocity.y += (Math.random() - 0.5) * 0.08
          angularVelocity.z += (Math.random() - 0.5) * 0.08

          userData.lastMouseImpact = currentTime
          userData.isAffectedByMouse = true
        }

        // Apply air resistance - más suave para movimientos más fluidos
        velocity.multiplyScalar(0.997)
        angularVelocity.multiplyScalar(0.997)

        // Update position and rotation
        leaf.position.add(velocity)
        leaf.rotation.x += angularVelocity.x
        leaf.rotation.y += angularVelocity.y
        leaf.rotation.z += angularVelocity.z

        // Ground collision
        if (leaf.position.y < groundY + 0.4) {
          if (velocity.y < -0.02) {
            // Bounce with energy loss - rebotes más suaves
            velocity.y *= -0.15
            velocity.x *= 0.92
            velocity.z *= 0.92
          } else {
            // Reset leaf
            resetLeaf(leaf)
          }
        }

        // Keep within bounds
        if (leaf.position.x > 14) leaf.position.x = -14
        if (leaf.position.x < -14) leaf.position.x = 14
      })

      // Update ground leaves with improved physics
      groundLeaves.forEach((leaf, index) => {
        // En modo rendimiento, procesar menos hojas para mantener FPS
        if (performanceMode && isMobileDevice && index % 2 !== 0) return
        if (performanceMode && !isMobileDevice && index % 3 !== 0) return

        const userData = leaf.userData
        const distanceToMouse = leaf.position.distanceTo(worldMousePosition.current)
        const mouseInfluenceRadius = 4.5

        // Only lift leaves if mouse is moving AND close to the leaf
        if (distanceToMouse < mouseInfluenceRadius && isMouseMoving.current && mouseSpeed > userData.liftThreshold) {
          if (!userData.isLifted) {
            userData.isLifted = true
            userData.liftTime = currentTime

            // Calculate lift direction based on mouse movement - más suave
            const liftDirection = new Vector3(
              mouseVelocity.current.x * 0.04,
              0.04 + Math.random() * 0.04,
              (Math.random() - 0.5) * 0.02,
            )

            // Apply initial lift impulse
            userData.velocity.copy(liftDirection)

            // Add some random spin - más suave
            userData.angularVelocity.set(
              (Math.random() - 0.5) * 0.08,
              (Math.random() - 0.5) * 0.08,
              (Math.random() - 0.5) * 0.08,
            )
          }
        }

        if (userData.isLifted) {
          // Apply gravity - más suave
          userData.velocity.y -= 0.0004 * userData.mass

          // Apply mouse influence if nearby and mouse is moving
          if (distanceToMouse < mouseInfluenceRadius && isMouseMoving.current) {
            const direction = new Vector3().subVectors(leaf.position, worldMousePosition.current).normalize()
            const force = 0.008 * (1 - distanceToMouse / mouseInfluenceRadius) * mouseSpeed
            userData.velocity.add(direction.multiplyScalar(force))
          }

          // Update position and rotation
          leaf.position.add(userData.velocity)
          leaf.rotation.x += userData.angularVelocity.x
          leaf.rotation.y += userData.angularVelocity.y
          leaf.rotation.z += userData.angularVelocity.z

          // Check for ground collision
          if (leaf.position.y < userData.originalPosition.y) {
            if (userData.velocity.y < -0.01) {
              // Bounce with energy loss - más suave
              userData.velocity.y *= -0.25
              userData.velocity.x *= 0.85
              userData.velocity.z *= 0.85
            } else {
              // Settle back to original position
              userData.restingTime = currentTime
              userData.isLifted = false
            }
          }

          // Apply air resistance - más suave
          userData.velocity.multiplyScalar(0.995)
          userData.angularVelocity.multiplyScalar(0.995)
        } else {
          // Return to original position and rotation gradually - más suave
          const returnSpeed = 0.015
          leaf.position.lerp(userData.originalPosition, returnSpeed)

          // Simplificar la rotación para evitar problemas
          leaf.rotation.x = leaf.rotation.x * (1 - returnSpeed) + userData.originalRotation.x * returnSpeed
          leaf.rotation.y = leaf.rotation.y * (1 - returnSpeed) + userData.originalRotation.y * returnSpeed
          leaf.rotation.z = leaf.rotation.z * (1 - returnSpeed) + userData.originalRotation.z * returnSpeed

          // Gentle sway for grounded leaves - mejorado
          const time = currentTime * 0.0004
          const wave = Math.sin(time + leaf.position.x * 0.2 + userData.swayPhase) * userData.swayAmplitude
          leaf.rotation.z += wave
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    // Resize handler con debouncing para evitar saltos
    // Resize handler optimizado para evitar saltos en móvil por la barra de dirección
    let lastWidth = window.innerWidth
    let resizeTimeout: NodeJS.Timeout

    const handleResize = () => {
      const currentWidth = window.innerWidth
      const isMobile = currentWidth < 768

      // En móvil, si el ancho no cambió (solo cambió el alto), es probable que sea la barra de dirección
      // Ignoramos este evento para evitar el salto/teletransportación visual
      if (isMobile && currentWidth === lastWidth) {
        return
      }

      lastWidth = currentWidth

      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        // En desktop actualizamos normal, en móvil solo si hubo cambio de ancho (rotación)
        if (cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = window.innerWidth / window.innerHeight
          cameraRef.current.updateProjectionMatrix()
          rendererRef.current.setSize(window.innerWidth, window.innerHeight)

          // Opcional: ajustar pixelRatio si cambia entre pantallas, pero es costoso
        }
      }, 200)
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)

    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      if (mouseMovementTimer.current) {
        clearTimeout(mouseMovementTimer.current)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (sceneRef.current) {
        sceneRef.current.clear()
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }
  }, [handleMouseMove, handleTouchMove])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full ${className}`}
      style={{
        zIndex: 5,
        pointerEvents: "none",
      }}
    />
  )
}

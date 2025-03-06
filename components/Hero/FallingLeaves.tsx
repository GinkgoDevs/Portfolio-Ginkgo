"use client"

import { useEffect, useRef, useCallback } from "react"
import * as THREE from "three"

interface FallingLeavesProps {
  className?: string
}

export default function FallingLeaves({ className = "" }: FallingLeavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useRef(new THREE.Vector2())
  const lastMousePosition = useRef(new THREE.Vector2())
  const mouseVelocity = useRef(new THREE.Vector2())
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const leavesRef = useRef<THREE.Mesh[]>([])
  const groundLeavesRef = useRef<THREE.Mesh[]>([])
  const worldMousePosition = useRef(new THREE.Vector3())
  const lastUpdateTime = useRef(0)
  const isMouseMoving = useRef(false)
  const mouseMovementTimer = useRef<NodeJS.Timeout | null>(null)
  const lastTime = useRef(performance.now())
  const lastMouseProcessTime = useRef(0)

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect()
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

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0]
      const rect = canvasRef.current!.getBoundingClientRect()
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
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    // Detectar si es un dispositivo móvil para optimizar rendimiento
    const isMobileDevice = window.innerWidth < 768

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    cameraRef.current = camera
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: !isMobileDevice, // Desactivar antialiasing en móvil para mejorar rendimiento
    })
    rendererRef.current = renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileDevice ? 1.5 : 2)) // Reducir pixel ratio en móvil

    // Create custom Ginkgo leaf shape
    const shape = new THREE.Shape()
    shape.moveTo(0, 1)
    shape.quadraticCurveTo(0.5, 0.8, 1, 0.5)
    shape.quadraticCurveTo(0.5, 0.2, 0, 0)
    shape.quadraticCurveTo(-0.5, 0.2, -1, 0.5)
    shape.quadraticCurveTo(-0.5, 0.8, 0, 1)

    const leafGeometry = new THREE.ShapeGeometry(shape)

    const leafColors = [
      0xd4f57a, // Light green
      0xc2e65c, // Medium green
      0xb0d83e, // Darker green
      0xa1c920, // Even darker green
    ]

    // Ajustar cantidad de hojas para móvil - aumentado ligeramente respecto a la versión anterior
    const leavesCount = isMobileDevice ? 100 : 120 // Aumentado de 80 a 100 en móvil
    const groundLayerCount = isMobileDevice ? 4 : 5 // Aumentado de 3 a 4 en móvil
    const groundLeavesPerLayer = isMobileDevice ? 180 : 250 // Aumentado de 150 a 180 en móvil

    const leaves: THREE.Mesh[] = []
    const groundLeaves: THREE.Mesh[] = []

    // Ground setup
    const groundY = -3.5

    // Crear hojas del suelo con propiedades físicas
    for (let layer = 0; layer < groundLayerCount; layer++) {
      for (let i = 0; i < groundLeavesPerLayer; i++) {
        const colorIndex = Math.floor(Math.random() * leafColors.length)
        const leafMaterial = new THREE.MeshBasicMaterial({
          color: leafColors[colorIndex],
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.9,
        })

        const groundLeaf = new THREE.Mesh(leafGeometry, leafMaterial)

        // Distribute leaves in overlapping layers for denser coverage
        const x = Math.random() * 32 - 16
        const y = groundY + layer * 0.08 + Math.random() * 0.15
        const z = Math.random() * 0.5 - 0.25 + layer * 0.08

        groundLeaf.position.set(x, y, z)

        // More varied rotation for natural look
        groundLeaf.rotation.x = Math.PI / 2 - Math.random() * 0.3
        groundLeaf.rotation.z = Math.random() * Math.PI * 2

        // Varied scale for natural look
        const baseScale = 0.12 + Math.random() * 0.08
        const scaleX = baseScale * (0.7 + Math.random() * 0.6)
        const scaleY = baseScale * (1.0 + Math.random() * 0.8)
        groundLeaf.scale.set(scaleX, scaleY, baseScale)

        // Add physics properties to userData
        groundLeaf.userData = {
          originalPosition: new THREE.Vector3(x, y, z),
          originalRotation: new THREE.Euler().copy(groundLeaf.rotation),
          originalScale: new THREE.Vector3().copy(groundLeaf.scale),
          velocity: new THREE.Vector3(0, 0, 0),
          angularVelocity: new THREE.Vector3(0, 0, 0),
          mass: 0.3 + Math.random() * 0.7, // More varied masses
          isLifted: false,
          liftTime: 0,
          liftThreshold: 0.15 + Math.random() * 0.8, // Different lift thresholds for each leaf
          restingTime: 0,
          swayPhase: Math.random() * Math.PI * 2, // Fase aleatoria para el movimiento ondulante
          swayAmplitude: 0.005 + Math.random() * 0.01, // Amplitud variable para el movimiento
        }

        scene.add(groundLeaf)
        groundLeaves.push(groundLeaf)
      }
    }

    // Crear hojas que caen
    for (let i = 0; i < leavesCount; i++) {
      const colorIndex = Math.floor(Math.random() * leafColors.length)
      const leafMaterial = new THREE.MeshBasicMaterial({
        color: leafColors[colorIndex],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      })

      const leaf = new THREE.Mesh(leafGeometry, leafMaterial)

      // Posicionar las hojas con una velocidad inicial de caída más rápida
      leaf.position.set(Math.random() * 28 - 14, Math.random() * 8 + 5, Math.random() * 4 - 2)
      leaf.rotation.x = Math.random() * Math.PI
      leaf.rotation.y = Math.random() * Math.PI
      leaf.rotation.z = Math.random() * Math.PI

      // Varied scale for more natural look
      const scale = 0.15 + Math.random() * 0.15
      leaf.scale.set(scale, scale, scale)

      // Velocidad inicial más rápida pero con física más suave después
      leaf.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01, // Ligero movimiento horizontal aleatorio
          -0.008 - Math.random() * 0.007, // Velocidad inicial más rápida
          (Math.random() - 0.5) * 0.01, // Ligero movimiento en profundidad
        ),
        angularVelocity: new THREE.Vector3(
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

    const resetLeaf = (leaf: THREE.Mesh) => {
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

      const vector = new THREE.Vector3(mousePosition.current.x * 2 - 1, -(mousePosition.current.y * 2) + 1, 0.5)
      vector.unproject(camera)
      const dir = vector.sub(camera.position).normalize()
      const distance = -camera.position.z / dir.z
      worldMousePosition.current.copy(camera.position).add(dir.multiplyScalar(distance))
    }

    function animate() {
      requestAnimationFrame(animate)

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
          const direction = new THREE.Vector3().subVectors(leaf.position, worldMousePosition.current).normalize()
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
        // En modo rendimiento, procesar menos hojas en móvil pero más que antes
        if (performanceMode && isMobileDevice && index % 3 !== 0) return
        if (performanceMode && !isMobileDevice && index % 4 !== 0) return

        const userData = leaf.userData
        const distanceToMouse = leaf.position.distanceTo(worldMousePosition.current)
        const mouseInfluenceRadius = 4.5

        // Only lift leaves if mouse is moving AND close to the leaf
        if (distanceToMouse < mouseInfluenceRadius && isMouseMoving.current && mouseSpeed > userData.liftThreshold) {
          if (!userData.isLifted) {
            userData.isLifted = true
            userData.liftTime = currentTime

            // Calculate lift direction based on mouse movement - más suave
            const liftDirection = new THREE.Vector3(
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
            const direction = new THREE.Vector3().subVectors(leaf.position, worldMousePosition.current).normalize()
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

          // Convert Euler to Quaternion for smooth interpolation
          const targetQuaternion = new THREE.Quaternion().setFromEuler(userData.originalRotation)
          const currentQuaternion = new THREE.Quaternion().setFromEuler(leaf.rotation)
          currentQuaternion.slerp(targetQuaternion, returnSpeed)
          leaf.rotation.setFromQuaternion(currentQuaternion)

          // Gentle sway for grounded leaves - mejorado
          const time = currentTime * 0.0004
          const wave = Math.sin(time + leaf.position.x * 0.2 + userData.swayPhase) * userData.swayAmplitude
          leaf.rotation.z += wave
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight
        cameraRef.current.updateProjectionMatrix()
        rendererRef.current.setSize(window.innerWidth, window.innerHeight)
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      if (mouseMovementTimer.current) {
        clearTimeout(mouseMovementTimer.current)
      }
      scene.clear()
      renderer.dispose()
    }
  }, [handleMouseMove, handleTouchMove])

  return <canvas ref={canvasRef} className={`absolute inset-0 z-0 ${className}`} />
}


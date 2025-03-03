"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight * 1.5)
    camera.position.z = 5

    // Create custom Ginkgo leaf shape
    const shape = new THREE.Shape()
    shape.moveTo(0, 1)
    shape.quadraticCurveTo(0.5, 0.8, 1, 0.5)
    shape.quadraticCurveTo(0.5, 0.2, 0, 0)
    shape.quadraticCurveTo(-0.5, 0.2, -1, 0.5)
    shape.quadraticCurveTo(-0.5, 0.8, 0, 1)

    const leafGeometry = new THREE.ShapeGeometry(shape)
    const leafMaterial = new THREE.MeshBasicMaterial({
      color: 0x90ee90,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    })

    const leaves: THREE.Mesh[] = []
    const fallenLeaves: THREE.Mesh[] = []

    for (let i = 0; i < 100; i++) {
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial)
      leaf.position.set(Math.random() * 10 - 5, Math.random() * 15 + 5, Math.random() * 5 - 2.5)
      leaf.rotation.x = Math.random() * Math.PI
      leaf.rotation.y = Math.random() * Math.PI
      leaf.scale.set(0.2, 0.2, 0.2)
      scene.add(leaf)
      leaves.push(leaf)
    }

    // Create ground texture
    const groundGeometry = new THREE.PlaneGeometry(20, 5)
    const groundTexture = new THREE.TextureLoader().load("/textures/soil_texture.jpg")
    groundTexture.wrapS = THREE.RepeatWrapping
    groundTexture.wrapT = THREE.RepeatWrapping
    groundTexture.repeat.set(5, 1)
    const groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.position.y = -7.5
    ground.rotation.x = -Math.PI / 2
    scene.add(ground)

    function animate() {
      requestAnimationFrame(animate)

      leaves.forEach((leaf, index) => {
        leaf.position.y -= 0.01
        leaf.rotation.x += 0.005
        leaf.rotation.y += 0.005
        leaf.position.x += Math.sin(leaf.position.y * 0.1) * 0.01

        if (leaf.position.y < -7) {
          if (fallenLeaves.length < 50) {
            leaf.position.y = -7
            leaf.rotation.x = Math.PI / 2
            fallenLeaves.push(leaf)
          } else {
            leaf.position.y = 15
            leaf.position.x = Math.random() * 10 - 5
          }
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / (window.innerHeight * 1.5)
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight * 1.5)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="relative h-[150vh] bg-gradient-to-b from-green-100 to-transparent overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
        <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-green-800">Welcome to Ginkgo Devs</h1>
          <p className="text-xl sm:text-2xl mb-8 text-green-700 max-w-2xl">
            Cultivating digital solutions that grow with your business
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300"
          >
            Explore Our Projects
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}


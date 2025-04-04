"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import Link from "next/link"
import { Instagram, Linkedin, Github, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "@/contexts/TranslationContext"
import { useAccessibility } from "@/components/AccessibilityProvider"

// Crear un contexto para el estado del menú
export const MenuContext = createContext<{ isMenuOpen: boolean }>({ isMenuOpen: false })

// Hook personalizado para usar el contexto del menú
export const useMenuState = () => useContext(MenuContext)

export default function Navbar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { locale } = useTranslation()
  const { highContrast, toggleHighContrast, fontSize, increaseFontSize, decreaseFontSize, resetFontSize } =
    useAccessibility()

  // Define menu items with translations
  const menuItems = [
    { name: t("home.navbar.services"), href: "#services" },
    { name: t("home.navbar.about"), href: "#about-us" },
    { name: t("home.navbar.tools"), href: "#tools" },
    { name: t("home.navbar.projects"), href: "#projects" },
    { name: t("home.navbar.contact"), href: "#contact" },
  ]

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Linkedin", icon: Linkedin, href: "#" },
    { name: "Github", icon: Github, href: "#" },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const menuVariants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  }

  const menuItemVariants = {
    closed: {
      x: 20,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  // Función para manejar el scroll suave a las secciones
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    // Extraer el ID de la sección del href
    const targetId = href.startsWith("#") ? href.substring(1) : href
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Calcular offset para tener en cuenta la altura de la barra de navegación
      const navHeight = 80 // Altura aproximada de la barra de navegación
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      // Scroll suave a la sección con offset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Actualizar la URL sin recargar la página
      window.history.pushState(null, "", href)

      // Cerrar el menú si está abierto
      if (isOpen) {
        setIsOpen(false)
      }
    }
  }

  // Modificar las funciones openMenu y closeMenu para asegurarnos de que el evento se dispare correctamente

  // Modificar la función para abrir el menú
  const openMenu = () => {
    setIsOpen(true)
    // Disparar un evento personalizado cuando el menú se abre
    const event = new CustomEvent("menuStateChange", { detail: { isOpen: true } })
    document.dispatchEvent(event)
  }

  // Modificar la función para cerrar el menú
  const closeMenu = () => {
    setIsOpen(false)
    // Disparar un evento personalizado cuando el menú se cierra
    const event = new CustomEvent("menuStateChange", { detail: { isOpen: false } })
    document.dispatchEvent(event)
  }

  return (
    <MenuContext.Provider value={{ isMenuOpen: isOpen }}>
      {/* Main Navbar */}
      <nav
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled ? "bg-[#293B36]/80 backdrop-blur-md" : "bg-[#293B36]"
        }`}
        style={{
          boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href={`/${locale}`}>
                <Image
                  src="/Logos/SVG/logo-navbar.svg"
                  alt="Ginkgo Devs Logo"
                  width={200}
                  height={129}
                  priority
                  className="w-42 sm:w-40 md:w-[250px]"
                />
              </Link>
            </div>

            {/* Menu Button */}
            <motion.button
              onClick={openMenu}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="relative z-40 px-4 py-2 rounded-full bg-[#D4F57A] text-[#293B36] hover:bg-[#D4F57A]/90 transition-colors"
            >
              <span className="text-sm font-medium">{t("home.navbar.menuButton")}</span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-4 bottom-4 right-4 w-[90vw] max-w-[320px] bg-[#D4F57A]/95 shadow-lg rounded-3xl overflow-hidden z-50"
              style={{
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
              }}
            >
              <div className="h-full flex flex-col p-5">
                {/* Close Button */}
                <motion.button
                  onClick={closeMenu}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="self-end px-4 py-2 rounded-full bg-black text-[#D4F57A] text-xs mb-6"
                >
                  <span className="font-medium">{t("home.navbar.closeButton")}</span>
                </motion.button>

                {/* Navigation Items */}
                <motion.nav className="flex-1 overflow-y-auto overflow-x-hidden">
                  <motion.ul className="space-y-1 w-full">
                    {menuItems.map((item) => (
                      <motion.li key={item.name} variants={menuItemVariants} className="w-full">
                        <Link
                          href={item.href}
                          onClick={(e) => handleSmoothScroll(e, item.href)}
                          className="text-[#293B36] text-lg font-medium hover:text-[#293B36]/70 transition-colors block w-full py-1"
                        >
                          {item.name}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.nav>

                {/* Accessibility Options */}
                <motion.div variants={menuItemVariants} className="mt-3 mb-3 bg-[#293B36]/10 rounded-xl p-3">
                  <h3 className="text-[#293B36] font-medium mb-2 text-sm">{t("accessibility.options")}</h3>

                  <div className="space-y-4">
                    {/* High Contrast Toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-[#293B36] text-sm">{t("accessibility.highContrast")}</span>
                      <button
                        onClick={toggleHighContrast}
                        className={`relative w-10 h-5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#293B36] ${
                          highContrast ? "bg-[#293B36]" : "bg-[#293B36]/20"
                        }`}
                        aria-label={highContrast ? "Desactivar alto contraste" : "Activar alto contraste"}
                        aria-pressed={highContrast}
                        role="switch"
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-[#D4F57A] transition-transform ${
                            highContrast ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Text Size Controls */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#293B36] text-sm">
                          {t("accessibility.fontSize")} ({fontSize}%)
                        </span>
                        <button
                          onClick={resetFontSize}
                          className="p-1 rounded-lg bg-[#293B36]/10 hover:bg-[#293B36]/20 text-[#293B36] transition-colors focus:outline-none focus:ring-2 focus:ring-[#293B36]"
                          aria-label="Restablecer tamaño de texto"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={decreaseFontSize}
                          className="p-2 rounded-lg bg-[#293B36]/10 hover:bg-[#293B36]/20 text-[#293B36] transition-colors flex-1 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#293B36]"
                          aria-label="Disminuir tamaño de texto"
                          disabled={fontSize <= 80}
                        >
                          <ZoomOut className="w-4 h-4" />
                        </button>
                        <button
                          onClick={increaseFontSize}
                          className="p-2 rounded-lg bg-[#293B36]/10 hover:bg-[#293B36]/20 text-[#293B36] transition-colors flex-1 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#293B36]"
                          aria-label="Aumentar tamaño de texto"
                          disabled={fontSize >= 140}
                        >
                          <ZoomIn className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div variants={menuItemVariants} className="mt-auto w-full">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {socialLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-[#293B36] hover:text-[#293B36]/70 transition-colors flex items-center gap-1 whitespace-nowrap"
                      >
                        <link.icon className="h-3 w-3" />
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MenuContext.Provider>
  )
}


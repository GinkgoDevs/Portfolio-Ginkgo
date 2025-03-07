"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Facebook, Youtube, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const menuItems = [
  { name: "Projects", href: "#projects" },
  { name: "Agency", href: "#agency" },
  { name: "Our Work", href: "#work" },
  { name: "Careers", href: "#careers" },
  { name: "Top Expertise", href: "#expertise" },
  { name: "Contact", href: "#contact" },
]

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Youtube", icon: Youtube, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Linkedin", icon: Linkedin, href: "#" },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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

  return (
    <>
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
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/descarga-BNlNhb9dAxkJ2cjd8OiX1bfCcJiRqu.png"
                alt="Ginkgo Devs Logo"
                width={200}
                height={129}
                priority
                className="w-32 sm:w-40 md:w-[250px]"
              />
            </div>

            {/* Menu Button */}
            <motion.button
              onClick={() => setIsOpen(true)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="relative z-40 px-4 py-2 rounded-full bg-[#D4F57A] text-[#293B36] hover:bg-[#D4F57A]/90 transition-colors"
            >
              <span className="text-sm font-medium">MENU</span>
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
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-4 bottom-4 right-4 w-[90vw] max-w-[300px] bg-[#D4F57A]/95 shadow-lg rounded-3xl overflow-hidden z-50"
              style={{
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
              }}
            >
              <div className="h-full flex flex-col p-5">
                {/* Close Button */}
                <motion.button
                  onClick={() => setIsOpen(false)}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="self-end px-4 py-2 rounded-full bg-black text-[#D4F57A] text-xs mb-6"
                >
                  <span className="font-medium">CLOSE</span>
                </motion.button>

                {/* Navigation Items */}
                <motion.nav className="flex-1 overflow-y-auto overflow-x-hidden">
                  <motion.ul className="space-y-2 md:space-y-2.5 w-full">
                    {menuItems.map((item) => (
                      <motion.li key={item.name} variants={menuItemVariants} className="w-full">
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="text-[#293B36] text-xl font-medium hover:text-[#293B36]/70 transition-colors block w-full whitespace-nowrap"
                        >
                          {item.name}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.nav>

                {/* Social Links */}
                <motion.div variants={menuItemVariants} className="mt-4 w-full">
                  <div className="grid grid-cols-2 gap-2 text-xs">
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
    </>
  )
}

export default Navbar


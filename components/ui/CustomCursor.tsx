"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
    const [isTagsHovered, setIsTagsHovered] = useState(false)
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 700 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        const handleMouseOver = (e: MouseEvent) => {
            // Check if target is clickable/interactive
            const target = e.target as HTMLElement
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('cursor-pointer')

            setIsTagsHovered(!!isInteractive)
        }

        window.addEventListener("mousemove", moveCursor)
        window.addEventListener("mouseover", handleMouseOver)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            window.removeEventListener("mouseover", handleMouseOver)
        }
    }, [cursorX, cursorY])

    return (
        <>
            {/* Main Cursor Dot */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-[#D4F57A] rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isTagsHovered ? 2.5 : 1,
                }}
                transition={{
                    scale: { type: "spring", damping: 25, stiffness: 300 }
                }}
            />

            {/* Outer Ring - Laggy */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-[#D4F57A] rounded-full pointer-events-none z-[9998] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isTagsHovered ? 1.5 : 1,
                    opacity: isTagsHovered ? 0.5 : 1
                }}
                transition={{
                    type: "spring",
                    damping: 40,
                    stiffness: 200,
                    mass: 0.8
                }}
            />
        </>
    )
}

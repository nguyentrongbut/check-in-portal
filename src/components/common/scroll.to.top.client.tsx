'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTopClient() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null

        const toggleVisibility = () => {
            if (timeoutId) clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                setIsVisible(window.pageYOffset > 300)
            }, 10)
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => {
            window.removeEventListener('scroll', toggleVisibility)
            if (timeoutId) clearTimeout(timeoutId)
        }
    }, [])

    const scrollToTop = () => {
        const scrollStep = -window.scrollY / (500 / 15)
        const scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep)
            } else {
                clearInterval(scrollInterval)
            }
        }, 15)
    }

    return (
        <div
            className={`fixed bottom-10 right-10 z-50 transition-all duration-500 ease-in-out ${
                isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
            }`}
        >
            <button
                onClick={scrollToTop}
                className="group bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-rotate-12 focus:outline-none cursor-pointer"
            >
                <ArrowUp
                    size={24}
                    className="transition-all duration-300 group-hover:animate-bounce"
                />
            </button>
        </div>
    )
}

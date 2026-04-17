'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

export function MagneticDust() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouse = useRef({ x: 0, y: 0, active: false })
  const particles = useRef<Particle[]>([])
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      // 🌿 more spacing = fewer particles
      const count = Math.floor((window.innerWidth * window.innerHeight) / 32000)

      particles.current = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.4 + 0.7,
      }))
    }

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY, active: true }
    }

    const onLeave = () => {
      mouse.current.active = false
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    resize()

    const animate = () => {
      if (!ctx) return

      // IMPORTANT: fully transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles.current) {
        if (mouse.current.active) {
          const dx = mouse.current.x - p.x
          const dy = mouse.current.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          // 🧲 REPULSION FIELD
          if (dist < 180) {
            const force = (180 - dist) / 180

            // normalize direction
            const nx = dx / (dist || 1)
            const ny = dy / (dist || 1)

            // push away from mouse
            p.vx -= nx * force * 0.15
            p.vy -= ny * force * 0.15
          }
        }

        // damping (smooth, premium feel)
        p.vx *= 0.92
        p.vy *= 0.92

        p.x += p.vx
        p.y += p.vy

        // wrap edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // 🌿 dark green particles
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(5, 35, 25, 0.9)'
        ctx.fill()
      }

      raf.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
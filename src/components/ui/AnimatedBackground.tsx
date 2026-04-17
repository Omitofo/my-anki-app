'use client'

import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
  const blobRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', move)

    let animation: number

    const animate = () => {
      if (!blobRef.current) return

      // smooth follow (THE MAGIC)
      current.current.x += (mouse.current.x - current.current.x) * 0.08
      current.current.y += (mouse.current.y - current.current.y) * 0.08

      blobRef.current.style.transform =
        `translate(${current.current.x - 200}px, ${current.current.y - 200}px)`

      animation = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(animation)
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        ref={blobRef}
        style={{
          position: 'absolute',
          width: '420px',
          height: '420px',
          background: 'rgba(232,98,26,0.16)',
          filter: 'blur(50px)',
          borderRadius: '50%',
        }}
      />
    </div>
  )
}
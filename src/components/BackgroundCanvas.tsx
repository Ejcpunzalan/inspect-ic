import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  color: string
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    const PARTICLE_COUNT = 55
    const CONNECTION_DIST = 140

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function createParticles(): Particle[] {
      const arr: Particle[] = []
      const colors = [
        { color: '#ffffff', alpha: 0.08 },
        { color: '#ffffff', alpha: 0.12 },
        { color: '#C83A26', alpha: 0.15 },
        { color: '#C83A26', alpha: 0.25 },
      ]
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const c = colors[Math.floor(Math.random() * colors.length)]
        arr.push({
          x: Math.random() * (canvas?.width ?? 1440),
          y: Math.random() * (canvas?.height ?? 900),
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          alpha: c.alpha,
          color: c.color,
        })
      }
      return arr
    }

    function drawGradient() {
      if (!canvas || !ctx) return
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const radius = Math.max(canvas.width, canvas.height) * 0.8
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
      gradient.addColorStop(0, '#000000')
      gradient.addColorStop(0.5, '#1a1a1a')
      gradient.addColorStop(1, '#464646')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    function drawParticles() {
      if (!canvas || !ctx) return
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    function drawConnections() {
      if (!canvas || !ctx) return
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.08
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = '#ffffff'
            ctx.globalAlpha = alpha
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
    }

    function updateParticles() {
      if (!canvas) return
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      }
    }

    function animate() {
      if (!canvas || !ctx) return
      drawGradient()
      drawConnections()
      drawParticles()
      if (!prefersReduced) {
        updateParticles()
      }
      animationId = requestAnimationFrame(animate)
    }

    resize()
    particles = createParticles()
    animate()

    window.addEventListener('resize', () => {
      resize()
      particles = createParticles()
    })

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}

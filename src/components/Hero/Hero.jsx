import { useEffect, useRef, useState } from 'react'
import './Hero.css'
import github   from '../../share/github.svg'
import linkedin from '../../share/linkedin.svg'
import profilePic from '../../share/profile.jpeg'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*></'

function scramble(target, progress) {
  return target
    .split('')
    .map((ch, i) => {
      if (ch === ' ' || ch === '\n') return ch
      if (i / target.length < progress) return ch
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
    })
    .join('')
}

const TITLE_1 = 'Senior Reporting Specialist,'
const TITLE_2 = 'Data Strategy Expert.'

export default function Hero() {
  const canvasRef = useRef(null)
  const imgWrapRef = useRef(null)
  const btnRef     = useRef(null)
  const [t1, setT1] = useState(TITLE_1)
  const [t2, setT2] = useState(TITLE_2)

  /* ── Canvas animated grid ─────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const GRID = 58
    const N    = 20

    const particles = Array.from({ length: N }, () => ({
      x:     Math.random(),
      y:     Math.random(),
      vx:    (Math.random() - 0.5) * 0.00012,
      vy:    (Math.random() - 0.5) * 0.00012,
      r:     Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.3 + 0.05,
      phase: Math.random() * Math.PI * 2,
    }))

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    const draw = (ts) => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      /* grid lines */
      ctx.strokeStyle = 'rgba(255,255,255,0.022)'
      ctx.lineWidth = 0.5
      for (let x = GRID; x < W; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = GRID; y < H; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      /* grid intersection dots */
      ctx.fillStyle = 'rgba(255,255,255,0.038)'
      for (let x = GRID; x < W; x += GRID) {
        for (let y = GRID; y < H; y += GRID) {
          ctx.beginPath(); ctx.arc(x, y, 0.8, 0, Math.PI * 2); ctx.fill()
        }
      }

      /* horizontal scan pulse */
      const scanPos = ((ts * 0.000055) % 1) * W
      const sg = ctx.createLinearGradient(scanPos - 120, 0, scanPos + 120, 0)
      sg.addColorStop(0, 'transparent')
      sg.addColorStop(0.5, 'rgba(255,255,255,0.032)')
      sg.addColorStop(1, 'transparent')
      ctx.fillStyle = sg
      ctx.fillRect(0, 0, W, H)

      /* particles */
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.phase += 0.007
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0
        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.phase))
        ctx.fillStyle = `rgba(255,255,255,${a})`
        ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2); ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  /* ── Text scramble on mount (desktop only — avoids mobile reflow) ── */
  useEffect(() => {
    const isTouch =
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches ||
      navigator.maxTouchPoints > 0
    if (isTouch) return
    const DURATION = 1100
    const start = Date.now()

    const tick = () => {
      const el = Date.now() - start
      const p1 = Math.min(el / DURATION, 1)
      const p2 = Math.min(Math.max((el - 180) / DURATION, 0), 1)
      setT1(scramble(TITLE_1, p1))
      setT2(scramble(TITLE_2, p2))
      if (p1 < 1 || p2 < 1) requestAnimationFrame(tick)
    }

    const tid = setTimeout(() => requestAnimationFrame(tick), 250)
    return () => clearTimeout(tid)
  }, [])

  /* ── Image parallax tilt ──────────────────────────────────── */
  useEffect(() => {
    const el = imgWrapRef.current
    if (!el || window.matchMedia('(hover: none)').matches) return

    const onMove = (e) => {
      const r  = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  * 2)
      const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height * 2)
      el.style.transform = `perspective(700px) rotateY(${dx*14}deg) rotateX(${-dy*14}deg) scale(1.03)`
      el.style.transition = 'transform 0.08s linear'
    }
    const onLeave = () => {
      el.style.transform  = ''
      el.style.transition = 'transform 0.6s var(--ease-spring)'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  /* ── Magnetic CTA button ──────────────────────────────────── */
  useEffect(() => {
    const btn = btnRef.current
    if (!btn || window.matchMedia('(hover: none)').matches) return

    const onMove = (e) => {
      const r  = btn.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width  / 2)
      const dy = e.clientY - (r.top  + r.height / 2)
      btn.style.transform  = `translate(${dx * 0.22}px, ${dy * 0.22}px)`
      btn.style.transition = 'transform 0.1s linear'
    }
    const onLeave = () => {
      btn.style.transform  = ''
      btn.style.transition = 'transform 0.55s var(--ease-spring)'
    }

    btn.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      btn.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="hero">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

      {/* Fibonacci-style level lines */}
      <div className="hero-levels" aria-hidden="true">
        {[['78.6%',''], ['61.8%',''], ['50.0%',''], ['38.2%',''], ['23.6%','']].map(([pct]) => (
          <div key={pct} className="hero-level-line">
            <span className="hero-level-pct">{pct}</span>
          </div>
        ))}
      </div>

      <div className="container hero-inner">
        {/* Text */}
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="hero-t1">{t1}</span>
            <span className="hero-t2">{t2}</span>
          </h1>

          <p className="hero-sub">
            I transform complex datasets into actionable executive insights using
            Power&nbsp;BI, SQL, and Azure. Specializing in procurement analytics and
            automated reporting architectures.
          </p>

          <div className="hero-actions">
            <button
              ref={btnRef}
              className="hero-cta"
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>View Experience</span>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="hero-socials">
              <a href="https://linkedin.com/in/jovan-milicev/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <img src={linkedin} alt="" />
              </a>
              <a href="https://github.com/jmilicev" target="_blank" rel="noreferrer" aria-label="GitHub">
                <img src={github} alt="" />
              </a>
            </div>
          </div>
        </div>

        {/* Profile image */}
        <div className="hero-img-wrap" ref={imgWrapRef}>
          <div className="hero-img-inner">
            <img src={profilePic} alt="Jovan Milicev" className="hero-profile" />
            <div className="hero-img-scan" aria-hidden="true" />
            <div className="hero-img-overlay" aria-hidden="true">
              <span className="hero-img-label">JM_01</span>
            </div>
          </div>
          <div className="hero-bracket hero-bracket--tl" aria-hidden="true" />
          <div className="hero-bracket hero-bracket--tr" aria-hidden="true" />
          <div className="hero-bracket hero-bracket--bl" aria-hidden="true" />
          <div className="hero-bracket hero-bracket--br" aria-hidden="true" />
          <div className="hero-ring" aria-hidden="true" />
          <div className="hero-ring hero-ring--2" aria-hidden="true" />
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="hero-scroll-line" />
        <span>scroll</span>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import './Hero.css'
import CountUp from '../shared/CountUp'
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

const STATS = [
  { to: 4,   suffix: '+', label: 'years in data' },
  { to: 5,   suffix: '',  label: 'hats worn — cs & analytics' },
  { num: '∞',             label: 'coffees consumed' },
  { to: 100, suffix: '%', label: 'powered by curiosity' },
]

export default function Hero() {
  const canvasRef  = useRef(null)
  const innerRef   = useRef(null)
  const imgWrapRef = useRef(null)
  const btnRef     = useRef(null)
  const [t1, setT1] = useState(TITLE_1)
  const [t2, setT2] = useState(TITLE_2)

  /* ── Canvas: grid + interactive particle constellation ────── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(hover: none)').matches
    const GRID = 58
    const LINK_DIST  = 110
    const MOUSE_DIST = 160
    let raf, W, H
    let particles = []
    let pulses = []
    let nextPulse = 1200
    let prevTs = 0
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width  = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const N = isTouch ? 28 : Math.min(85, Math.round((W * H) / 17000))
      particles = Array.from({ length: N }, () => {
        const bvx = (Math.random() - 0.5) * 0.22
        const bvy = (Math.random() - 0.5) * 0.22
        return {
          x: Math.random() * W, y: Math.random() * H,
          vx: bvx, vy: bvy, bvx, bvy,
          r: Math.random() * 1.3 + 0.4,
          alpha: Math.random() * 0.3 + 0.12,
          phase: Math.random() * Math.PI * 2,
        }
      })
    }

    const onMouse = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    const drawFrame = (ts) => {
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

      /* data pulses travelling along grid lines */
      const dt = prevTs ? Math.min((ts - prevTs) / 1000, 0.05) : 0.016
      prevTs = ts

      if (ts > nextPulse && pulses.length < 4) {
        nextPulse = ts + 1000 + Math.random() * 1600
        const horiz = Math.random() < 0.5
        const span  = horiz ? H : W
        const lanes = Math.max(1, Math.floor(span / GRID) - 1)
        const lane  = (1 + Math.floor(Math.random() * lanes)) * GRID
        const dir   = Math.random() < 0.5 ? 1 : -1
        pulses.push({
          horiz, lane, dir,
          p: dir > 0 ? -110 : (horiz ? W : H) + 110,
          speed: 130 + Math.random() * 170,
          tinted: Math.random() < 0.55,
          off: 0, voff: 0, boost: 0,   /* mouse-repulsion state */
          trail: [],
        })
      }

      const PULSE_R = 150, TRAIL = 95
      pulses = pulses.filter(pu => {
        /* the cursor repels the pulse like a same-pole magnet: force ramps
           up the closer it gets, shoving the head off its lane and along
           (or against) its direction of travel */
        const hx = pu.horiz ? pu.p : pu.lane + pu.off
        const hy = pu.horiz ? pu.lane + pu.off : pu.p
        const mdx = hx - mouse.x, mdy = hy - mouse.y
        const md2 = mdx * mdx + mdy * mdy
        if (md2 < PULSE_R * PULSE_R) {
          const d = Math.sqrt(md2) || 1
          const f = ((PULSE_R - d) / PULSE_R) ** 2 * 3600
          pu.boost += ((pu.horiz ? mdx : mdy) / d) * f * dt
          pu.voff  += ((pu.horiz ? mdy : mdx) / d) * f * dt
        }
        /* spring back to the lane and bleed off speed once the cursor lets go */
        pu.voff  -= pu.off * 6 * dt
        pu.voff  *= Math.max(0, 1 - 3.5 * dt)
        pu.off   += pu.voff * dt
        pu.boost *= Math.max(0, 1 - 2.2 * dt)

        pu.p += (pu.dir * pu.speed + pu.boost) * dt
        const limit = pu.horiz ? W : H
        if (pu.p < -160 || pu.p > limit + 160) return false

        /* trail follows the head's actual (possibly bent) path */
        const nx = pu.horiz ? pu.p : pu.lane + pu.off
        const ny = pu.horiz ? pu.lane + pu.off : pu.p
        pu.trail.push({ x: nx, y: ny })
        if (pu.trail.length > 80) pu.trail.shift()
        let len = 0
        for (let i = pu.trail.length - 1; i > 0; i--) {
          len += Math.hypot(pu.trail[i].x - pu.trail[i - 1].x, pu.trail[i].y - pu.trail[i - 1].y)
          if (len > TRAIL) { pu.trail.splice(0, i - 1); break }
        }

        const [r, g, b] = pu.tinted ? [74, 222, 128] : [255, 255, 255]
        const maxA = pu.tinted ? 0.4 : 0.3
        ctx.lineWidth = 1
        for (let i = 1; i < pu.trail.length; i++) {
          ctx.strokeStyle = `rgba(${r},${g},${b},${((i / pu.trail.length) * maxA).toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(pu.trail[i - 1].x, pu.trail[i - 1].y)
          ctx.lineTo(pu.trail[i].x, pu.trail[i].y)
          ctx.stroke()
        }

        /* glowing head */
        ctx.fillStyle = `rgba(${r},${g},${b},${pu.tinted ? 0.85 : 0.6})`
        ctx.beginPath()
        ctx.arc(nx, ny, 1.4, 0, Math.PI * 2)
        ctx.fill()
        return true
      })

      /* particles: drift + mouse repulsion */
      particles.forEach(p => {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < MOUSE_DIST * MOUSE_DIST) {
          const d = Math.sqrt(d2) || 1
          const f = ((MOUSE_DIST - d) / MOUSE_DIST) * 0.55
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }
        /* ease back toward base drift */
        p.vx += (p.bvx - p.vx) * 0.02
        p.vy += (p.bvy - p.vy) * 0.02
        p.x += p.vx; p.y += p.vy; p.phase += 0.008

        if (p.x < 0) p.x += W; if (p.x > W) p.x -= W
        if (p.y < 0) p.y += H; if (p.y > H) p.y -= H
      })

      /* connection lines between nearby particles */
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.13
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`
            ctx.lineWidth = 0.6
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }

        /* line from cursor to nearby particles (accent-tinted) */
        const mdx = a.x - mouse.x, mdy = a.y - mouse.y
        const md2 = mdx * mdx + mdy * mdy
        if (md2 < MOUSE_DIST * MOUSE_DIST) {
          const alpha = (1 - Math.sqrt(md2) / MOUSE_DIST) * 0.3
          ctx.strokeStyle = `rgba(74,222,128,${alpha})`
          ctx.lineWidth = 0.6
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
        }

        const alpha = a.alpha * (0.6 + 0.4 * Math.sin(a.phase))
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill()
      }
    }

    const loop = (ts) => { drawFrame(ts); raf = requestAnimationFrame(loop) }

    resize()
    window.addEventListener('resize', resize)

    if (reduced) {
      drawFrame(0)                      /* single static frame */
    } else {
      raf = requestAnimationFrame(loop)
      if (!isTouch) {
        window.addEventListener('mousemove', onMouse, { passive: true })
        document.addEventListener('mouseleave', onMouseLeave)
      }
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  /* ── Parallax fade-out as the hero scrolls away ───────────── */
  useEffect(() => {
    const el = innerRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      const vh = window.innerHeight
      if (y > vh) return
      el.style.transform = `translateY(${y * 0.18}px)`
      el.style.opacity   = String(Math.max(0, 1 - y / (vh * 0.85)))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  /* ── Text scramble on mount (desktop only — avoids mobile reflow) ── */
  useEffect(() => {
    const isTouch =
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches ||
      navigator.maxTouchPoints > 0
    if (isTouch || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
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

      <div className="container hero-inner" ref={innerRef}>
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

          {/* Animated stat counters */}
          <div className="hero-stats">
            {STATS.map((s, i) => (
              <div key={s.label} className="hero-stat">
                <span className="hero-stat-num">
                  {s.num !== undefined
                    ? s.num
                    : <CountUp to={s.to} suffix={s.suffix} duration={1600} delay={700 + i * 120} />}
                </span>
                <span className="hero-stat-key">{s.label}</span>
              </div>
            ))}
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
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="hero-scroll-line" />
        <span>scroll</span>
      </div>
    </div>
  )
}

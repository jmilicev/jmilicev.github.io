import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Experience from './components/Experience/Experience'
import Skills from './components/Skills/Skills'
import Education from './components/Education/Education'
import Contact from './components/Contact/Contact'
import './index.css'

export default function App() {
  const [scrollPct, setScrollPct] = useState(0)
  const ringRef = useRef(null)
  const dotRef  = useRef(null)

  // Custom cursor (desktop only)
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    let mx = -200, my = -200, cx = -200, cy = -200, raf

    const onMove = (e) => { mx = e.clientX; my = e.clientY }

    const tick = () => {
      cx += (mx - cx) * 0.10
      cy += (my - cy) * 0.10
      ringRef.current?.style.setProperty('transform', `translate(${cx - 18}px, ${cy - 18}px)`)
      dotRef.current?.style.setProperty('transform',  `translate(${mx - 1.5}px, ${my - 1.5}px)`)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove)

    const ring = ringRef.current
    const addHover = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => ring?.classList.add('cursor-hover'))
        el.addEventListener('mouseleave', () => ring?.classList.remove('cursor-hover'))
      })
    }
    addHover()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Global scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.07 }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="App">
      <div className="noise" aria-hidden="true" />
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />

      <Navbar />
      <main>
        <section id="home">      <Hero />       </section>
        <section id="experience"><Experience />  </section>
        <section id="skills">    <Skills />      </section>
        <section id="education"> <Education />   </section>
        <section id="contact">   <Contact />     </section>
      </main>
    </div>
  )
}

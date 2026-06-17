import { useEffect, useRef } from 'react'
import './Contact.css'

function useMagnetic(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return

    const onEnter = () => { el.style.transition = 'transform 0.1s linear' }
    const onMove  = (e) => {
      const r  = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width  / 2)
      const dy = e.clientY - (r.top  + r.height / 2)
      el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`
    }
    const onLeave = () => {
      el.style.transition = 'transform 0.55s var(--ease-spring)'
      el.style.transform  = ''
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mousemove',  onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mousemove',  onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])
}

export default function Contact() {
  const emailRef = useRef(null)
  const liRef    = useRef(null)
  useMagnetic(emailRef)
  useMagnetic(liRef)

  return (
    <section className="ct-section">
      {/* Subtle grid lines behind */}
      <div className="ct-bg-lines" aria-hidden="true">
        {Array.from({ length: 7 }).map((_, i) => <div key={i} className="ct-bg-line" />)}
      </div>

      <div className="container">
        <div className="reveal">
          <p className="section-eyebrow"><span>04</span> Contact</p>
        </div>

        <div className="ct-body reveal" style={{ '--delay': '80ms' }}>
          <h2 className="ct-heading">
            Let's build something<br />
            <span className="ct-heading-dim">meaningful together.</span>
          </h2>

          <p className="ct-text">
            Open to discussing data strategy, Power BI architecture,
            or just expanding the network.
          </p>

          <div className="ct-actions">
            <a ref={emailRef} href="mailto:contact@jovanmilicev.com" className="ct-btn ct-btn--ghost">
              Send Email
            </a>
            <a ref={liRef} href="https://linkedin.com/in/jovan-milicev/" target="_blank" rel="noreferrer" className="ct-btn ct-btn--solid">
              Connect on LinkedIn
            </a>
          </div>
        </div>

        <footer className="ct-footer">
          <span>Designed &amp; Built by Jovan Milicev</span>
          <span className="ct-footer-sep">—</span>
          <span className="ct-footer-mono">jovanmilicev.com</span>
        </footer>
      </div>
    </section>
  )
}

import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_ITEMS = ['home', 'experience', 'skills', 'education', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive]     = useState('home')
  const [isMac, setIsMac]       = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll spy: highlight the section currently in view
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    NAV_ITEMS.forEach(id => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    setIsMac(/mac/i.test(navigator.platform))
  }, [])

  const go = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container nav-inner">
        <button className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          JM<span className="nav-logo-dot">.</span>
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_ITEMS.map(id => (
            <button key={id} onClick={() => go(id)} className={`nav-link ${active === id ? 'active' : ''}`}>
              {id}
            </button>
          ))}
        </div>

        <div className="nav-right">
          <button
            className="nav-cmdk"
            onClick={() => window.dispatchEvent(new Event('jm:palette'))}
            aria-label="Open command palette"
            title="Command palette"
          >
            {isMac ? '⌘' : 'ctrl'} K
          </button>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  )
}

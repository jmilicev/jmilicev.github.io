import { useEffect, useRef } from 'react'
import './Skills.css'
import {
  SiMysql, SiPython, SiReact, SiJavascript, SiNodedotjs,
  SiGit, SiMongodb, SiApachespark, SiNextdotjs, SiTableau,
} from 'react-icons/si'
import {
  FaDatabase, FaFileExcel, FaCode, FaCogs,
  FaChartBar, FaCloud, FaShareAltSquare, FaProjectDiagram,
} from 'react-icons/fa'
import { TbApi } from 'react-icons/tb'

const ALL = [
  { name: 'Power BI',    icon: <FaChartBar /> },
  { name: 'SQL',         icon: <SiMysql /> },
  { name: 'DAX',         icon: <FaCode /> },
  { name: 'M Query',     icon: <FaCogs /> },
  { name: 'Excel',       icon: <FaFileExcel /> },
  { name: 'Tableau',     icon: <SiTableau /> },
  { name: 'MS Fabric',   icon: <FaProjectDiagram /> },
  { name: 'Azure',       icon: <FaCloud /> },
  { name: 'Python',      icon: <SiPython /> },
  { name: 'SharePoint',  icon: <FaShareAltSquare /> },
  { name: 'Databricks',  icon: <FaDatabase /> },
  { name: 'Spark',       icon: <SiApachespark /> },
  { name: 'MongoDB',     icon: <SiMongodb /> },
  { name: 'React',       icon: <SiReact /> },
  { name: 'JavaScript',  icon: <SiJavascript /> },
  { name: 'Node.js',     icon: <SiNodedotjs /> },
  { name: 'Next.js',     icon: <SiNextdotjs /> },
  { name: 'Git',         icon: <SiGit /> },
  { name: 'REST APIs',   icon: <TbApi /> },
]

const CATS = [
  { label: 'Data & Analytics',    names: ['Power BI','SQL','DAX','M Query','Excel','Tableau','MS Fabric'] },
  { label: 'Engineering & Cloud', names: ['Azure','Python','SharePoint','Databricks','Spark','MongoDB'] },
  { label: 'Development',         names: ['React','JavaScript','Node.js','Next.js','Git','REST APIs'] },
]

const MAP = Object.fromEntries(ALL.map(s => [s.name, s]))

// Duplicate for seamless CSS loop
const ROW1 = [...ALL, ...ALL]
const ROW2 = [...ALL.slice(9), ...ALL.slice(0, 9), ...ALL.slice(9), ...ALL.slice(0, 9)]

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.sk-item')
    if (!items) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    items.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="sk-section" ref={sectionRef}>

      {/* Ticker rows */}
      <div className="ticker-wrap">
        <div className="ticker ticker--fwd">
          {ROW1.map((s, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-icon" aria-hidden="true">{s.icon}</span>
              {s.name}
            </span>
          ))}
        </div>
      </div>

      <div className="ticker-wrap ticker-wrap--gap">
        <div className="ticker ticker--rev">
          {ROW2.map((s, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-icon" aria-hidden="true">{s.icon}</span>
              {s.name}
            </span>
          ))}
        </div>
      </div>

      {/* Categorised grid */}
      <div className="container">
        <div className="reveal">
          <p className="section-eyebrow"><span>02</span> Skills</p>
          <h2 className="sk-heading">Technical Toolkit</h2>
        </div>

        <div className="sk-grid">
          {CATS.map((cat, ci) => (
            <div key={ci} className="sk-cat reveal" style={{ '--delay': `${ci * 90}ms` }}>
              <h3 className="sk-cat-label">{cat.label}</h3>
              <div className="sk-items">
                {cat.names.map((name, si) => {
                  const s = MAP[name]
                  return (
                    <div
                      key={si}
                      className="sk-item"
                      style={{ '--delay': `${ci * 80 + si * 45}ms` }}
                    >
                      <span className="sk-icon" aria-hidden="true">{s?.icon}</span>
                      <span className="sk-name">{name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

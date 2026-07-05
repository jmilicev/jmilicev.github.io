import { useEffect, useRef, useState } from 'react'
import './Skills.css'
import MaskedHeading from '../shared/MaskedHeading'
import CountUp from '../shared/CountUp'
import { runSQL } from '../shared/sql'
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
  { name: 'Power BI',    icon: <FaChartBar />,       color: '#F2C811' },
  { name: 'SQL',         icon: <SiMysql />,          color: '#4CA6E8' },
  { name: 'DAX',         icon: <FaCode />,           color: '#4ade80' },
  { name: 'M Query',     icon: <FaCogs />,           color: '#9CA8FF' },
  { name: 'Excel',       icon: <FaFileExcel />,      color: '#3DBE71' },
  { name: 'Tableau',     icon: <SiTableau />,        color: '#E97627' },
  { name: 'MS Fabric',   icon: <FaProjectDiagram />, color: '#4FC3F7' },
  { name: 'Azure',       icon: <FaCloud />,          color: '#38A9F0' },
  { name: 'Python',      icon: <SiPython />,         color: '#5B9BD5' },
  { name: 'SharePoint',  icon: <FaShareAltSquare />, color: '#26B8A5' },
  { name: 'Databricks',  icon: <FaDatabase />,       color: '#FF5F46' },
  { name: 'Spark',       icon: <SiApachespark />,    color: '#E8722A' },
  { name: 'MongoDB',     icon: <SiMongodb />,        color: '#4DB33D' },
  { name: 'React',       icon: <SiReact />,          color: '#61DAFB' },
  { name: 'JavaScript',  icon: <SiJavascript />,     color: '#F7DF1E' },
  { name: 'Node.js',     icon: <SiNodedotjs />,      color: '#6CC24A' },
  { name: 'Next.js',     icon: <SiNextdotjs />,      color: '#E4E4F0' },
  { name: 'Git',         icon: <SiGit />,            color: '#F05033' },
  { name: 'REST APIs',   icon: <TbApi />,            color: '#7DD3FC' },
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

/* ── Dashboard data ─────────────────────────────────────────── */
const KPIS = [
  { label: 'yrs_in_data',   to: 4,   suffix: '+' },
  { label: 'hats_worn',     to: 5,   suffix: ''  },
  { label: 'technologies',  to: 19,  suffix: ''  },
  { label: 'curiosity_pct', to: 100, suffix: ''  },
]

const BARS = [
  { name: 'Power BI',    val: 98, color: '#F2C811' },
  { name: 'SQL',         val: 96, color: '#4CA6E8' },
  { name: 'DAX',         val: 94, color: '#4ade80' },
  { name: 'M Query',      val: 92, color: '#5B9BD5' },
  { name: 'Excel',       val: 90, color: '#3DBE71' },
  { name: 'Azure',       val: 88, color: '#1249a7' },
  { name: 'Python',     val: 86, color: '#9CA8FF' },
  { name: 'Databricks',  val: 84, color: '#FF5F46' },
  { name: 'MS Fabric',   val: 82, color: '#4FC3F7' },
  { name: 'SharePoint',       val: 80, color: '#E8722A' },
  { name: 'JavaScript',   val: 76, color: '#7DD3FC' },
  { name: 'Node.js',     val: 76, color: '#6CC24A' },

]

/* "Learning curve" career chart: school + every role in sequence, 2018 → now.
   Curve on top, tenure lanes (start → end bars, one colour per item) above the x-axis. */
const CW = 300, CHH = 152, PL = 8, PR = 10
const PT = 12, PLOT_B = 96                 /* curve plot area */
const LANE_TOP = 104, LANE_H = 5, LANE_GAP = 3
const AXIS_Y = 130
const YR0 = 2018, YR1 = 2026.7
const chartX = (yr) => PL + ((yr - YR0) / (YR1 - YR0)) * (CW - PL - PR)
const chartY = (v)  => PT + (1 - v / 100) * (PLOT_B - PT)
const laneY  = (lane) => LANE_TOP + lane * (LANE_H + LANE_GAP)

// Chronological. `from`/`to` are fractional years for the tenure lane bars;
// overlapping items sit on separate lanes so every start/end stays readable.
const MILESTONES = [
  { yr: 2018.7,  v: 8,  code: 'YU',  color: '#c084fc', label: 'York University — CS',        from: 2018.7,  to: 2023.4,  lane: 0, period: '2018 – 2023' },
  { yr: 2022.2,  v: 26, code: 'BNS', color: '#fbbf24', label: 'CEA - Scotiabank',            from: 2022.3,  to: 2024.05, lane: 1, period: 'Apr 2022 – Jan 2024' },
  { yr: 2022.75, v: 36, code: 'TA',  color: '#ec4899', label: 'Teaching Asst — York',        from: 2022.7,  to: 2023.05, lane: 2, period: 'Sept 2022 – Jan 2023' },
  { yr: 2023.6,  v: 46, code: 'CB',  color: '#1249a7', label: 'Chatbase — Full Stack',       from: 2023.35, to: 2023.7,  lane: 2, period: 'May 2023 – Sept 2023' },
  { yr: 2024.05, v: 54, code: 'PA',  color: '#16a34a', label: 'Proc. Analyst — Metrolinx',   from: 2024.05, to: 2024.83, lane: 0, period: 'Jan 2024 – Nov 2024' },
  { yr: 2024.9,  v: 70, code: 'BI',  color: '#38bdf8', label: 'BI Analyst — Metrolinx',      from: 2024.87, to: 2025.42, lane: 0, period: 'Nov 2024 – June 2025' },
  { yr: 2025.6,  v: 86, code: 'SR',  color: '#ef4444', label: 'Sr. Specialist — Metrolinx',  from: 2025.46, to: 2026.55, lane: 0, period: 'June 2025 – present' },
]

const AXIS_YEARS = [2018, 2020, 2022, 2024, 2026]

const careerPath = (() => {
  const pts = [{ yr: 2018.2, v: 4 }, ...MILESTONES, { yr: 2026.5, v: 94 }]
  return 'M' + pts.map(p => `${chartX(p.yr).toFixed(1)},${chartY(p.v).toFixed(1)}`).join(' L')
})()

/* One-dark style syntax highlighting for the footer console */
function highlightSQL(text) {
  const parts = text.split(/('[^']*'?|"[^"]*"?|\b(?:select|from|where|order|by|limit|show|tables|describe|desc|like|and|or|true|false|drop|delete|update|insert|create|alter|help)\b|\d+)/gi)
  return parts.map((p, i) => {
    if (!p) return null
    const w = p.toLowerCase()
    if (/^['"]/.test(p))               return <span key={i} className="dash-tok-str">{p}</span>
    if (/^\d+$/.test(p))               return <span key={i} className="dash-tok-num">{p}</span>
    if (w === 'true' || w === 'false') return <span key={i} className="dash-tok-bool">{p}</span>
    if (['select', 'show', 'describe', 'desc', 'help', 'drop', 'delete', 'update', 'insert', 'create', 'alter'].includes(w))
                                       return <span key={i} className="dash-tok-kw1">{p}</span>
    if (w === 'from' || w === 'tables') return <span key={i} className="dash-tok-kw2">{p}</span>
    if (['where', 'order', 'by', 'limit', 'like', 'and', 'or'].includes(w))
                                       return <span key={i} className="dash-tok-kw3">{p}</span>
    return p
  })
}

const DEFAULT_SQL = 'SELECT insight FROM insights WHERE useful = TRUE'

function Dashboard() {
  const ref = useRef(null)
  const [live, setLive] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [sqlText, setSqlText]       = useState(DEFAULT_SQL)
  const [sqlOut, setSqlOut]         = useState(null)
  const [sqlFocused, setSqlFocused] = useState(false)

  const runFooterSQL = () => setSqlOut(runSQL(sqlText))

  const onSqlKey = (e) => {
    if (e.key === 'Enter') runFooterSQL()
    if (e.key === 'Escape') {
      setSqlOut(null)
      setSqlText(DEFAULT_SQL)
      e.target.blur()
    }
  }

  /* macOS-style window controls: red closes, yellow minimizes, green restores */
  const [winState, setWinState] = useState('open')   /* 'open' | 'min' | 'closed' */
  const [jiggle, setJiggle]     = useState(false)
  const [booting, setBooting]   = useState(false)

  const onGreen = () => {
    if (winState === 'open') {
      setJiggle(true)
      setTimeout(() => setJiggle(false), 750)
    } else {
      setWinState('open')
    }
  }

  /* Relaunch: mount collapsed + fading in, then expand on the next frame
     so it plays the same smooth animation as un-minimizing */
  const relaunch = () => {
    setBooting(true)
    setWinState('min')
    requestAnimationFrame(() => requestAnimationFrame(() => setWinState('open')))
    setTimeout(() => setBooting(false), 700)
  }

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { setLive(true); io.disconnect() }
      }),
      { threshold: 0.35 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  if (winState === 'closed') {
    return (
      <div ref={ref}>
        <button className="dash-restore" onClick={relaunch}>
          <span className="dash-restore-dot" aria-hidden="true" />
          jm_analytics_console terminated — click to relaunch
        </button>
      </div>
    )
  }

  return (
    <div ref={ref}>
    <div className={`dash spotlight ${live ? 'dash-live' : ''} ${winState === 'min' ? 'dash-min' : ''} ${jiggle ? 'dash-jiggle' : ''} ${booting ? 'dash-boot' : ''}`}>
      {/* Titlebar — the traffic lights actually work */}
      <div className="dash-titlebar">
        <div className="dash-dots">
          <button className="dash-dot dash-dot--red"    onClick={() => setWinState('closed')} aria-label="Close console"    title="close" />
          <button className="dash-dot dash-dot--yellow" onClick={() => setWinState('min')}    aria-label="Minimize console" title="minimize" />
          <button className="dash-dot dash-dot--green"  onClick={onGreen}                     aria-label="Expand console"   title="expand" />
        </div>
        <span className="dash-title">JM_ANALYTICS_CONSOLE — v3.1</span>
        <span className="dash-status"><span className="dash-status-dot" aria-hidden="true" />live</span>
      </div>

      <div className="dash-collapse">
      <div className="dash-collapse-inner">
      <div className="dash-body">
        {/* KPI cards */}
        <div className="dash-kpis">
          {KPIS.map((k, i) => (
            <div key={k.label} className="dash-kpi">
              <span className="dash-kpi-num">
                <CountUp to={k.to} suffix={k.suffix} decimals={k.decimals || 0} duration={1700} delay={i * 130} start={live} />
              </span>
              <span className="dash-kpi-label">{k.label}</span>
            </div>
          ))}
        </div>

        <div className="dash-panels">
          {/* Career line chart (Now first, taking up the 1.4fr larger column) */}
          <div className="dash-panel">
            <p className="dash-panel-label">learning_curve — 2018 → now</p>
            <svg className="dash-chart" viewBox={`0 0 ${CW} ${CHH}`} role="img" aria-label="Career timeline chart, 2018 to now">
              {/* x-axis */}
              <line className="dash-axis" x1={PL} y1={AXIS_Y} x2={CW - PR} y2={AXIS_Y} />
              {AXIS_YEARS.map(yr => (
                <g key={yr}>
                  <line className="dash-tick" x1={chartX(yr)} y1={AXIS_Y} x2={chartX(yr)} y2={AXIS_Y + 3} />
                  <text className="dash-tick-label" x={chartX(yr)} y={CHH - 8}>{yr}</text>
                </g>
              ))}

              <path className="dash-spark-fill" d={`${careerPath} L${chartX(2026.5)},${PLOT_B} L${chartX(2018.2)},${PLOT_B} Z`} />
              <path className="dash-spark-line" d={careerPath} />

              {/* milestone markers, labels alternate above/below the line */}
              {MILESTONES.map((m, i) => (
                <g key={m.code} className="dash-ms" style={{ transitionDelay: `${1100 + i * 150}ms` }}>
                  <circle cx={chartX(m.yr)} cy={chartY(m.v)} r="2.8" fill={m.color} stroke="#111116" strokeWidth="1" />
                  <text
                    className="dash-ms-code"
                    x={chartX(m.yr)}
                    y={chartY(m.v) + (i % 2 ? 12 : -6.5)}
                    fill={m.color}
                    textAnchor="middle"
                  >{m.code}</text>
                </g>
              ))}

              {/* tenure lanes: each bar spans start → end in the item's colour */}
              {MILESTONES.map((m, i) => (
                <rect
                  key={`span-${m.code}`}
                  className="dash-span"
                  x={chartX(m.from)}
                  y={laneY(m.lane)}
                  width={Math.max(2, chartX(m.to) - chartX(m.from))}
                  height={LANE_H}
                  rx="2.5"
                  fill={m.color}
                  style={{ transitionDelay: `${900 + i * 120}ms` }}
                >
                  <title>{`${m.code} — ${m.period}`}</title>
                </rect>
              ))}
            </svg>

            <p className="dash-spark-note">status: still climbing ↗</p>

            <div className="dash-legend">
              {MILESTONES.map(m => (
                <span key={m.code} className="dash-legend-item">
                  <span className="dash-legend-dot" style={{ background: m.color }} />
                  <span><b>{m.code}</b> {m.label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Relative tool usage bars (Now second, taking up the 1fr smaller column) */}
          <div className="dash-panel">
            <p className="dash-panel-label">where_the_hours_go</p>
            <div className="dash-bars">
              {BARS.map((b, i) => (
                <div
                  key={b.name}
                  className={`dash-bar-row ${hovered === b.name ? 'hot' : ''}`}
                  style={{ '--bar-color': b.color }}
                  onMouseEnter={() => setHovered(b.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className="dash-bar-name">{b.name}</span>
                  <div className="dash-bar-track">
                    <div
                      className="dash-bar-fill"
                      style={{ width: live ? `${b.val}%` : '0%', transitionDelay: `${200 + i * 110}ms` }}
                    />
                  </div>
                  <span className="dash-bar-val">{b.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Console footer — a real, runnable SQL prompt */}
      <div className="dash-footer">
        <span className="dash-prompt" aria-hidden="true">&gt;</span>
        <div className="dash-sql-wrap">
          <div className="dash-sql-hl" aria-hidden="true">
            {highlightSQL(sqlText)}
            {!sqlFocused && <span className="dash-caret" />}
          </div>
          <input
            className="dash-sql-input"
            type="text"
            value={sqlText}
            onChange={(e) => setSqlText(e.target.value)}
            onKeyDown={onSqlKey}
            onFocus={() => setSqlFocused(true)}
            onBlur={() => setSqlFocused(false)}
            spellCheck="false"
            aria-label="SQL console — press Enter to run"
          />
        </div>
        <button className="dash-run" onClick={runFooterSQL}>run ↵</button>
      </div>

      {/* Query results */}
      {sqlOut && (
        <div className="dash-sql-result">
          <button
            className="dash-sql-clear"
            onClick={() => { setSqlOut(null); setSqlText(DEFAULT_SQL) }}
          >clear ✕</button>

          {sqlOut.type === 'error' && <div className="dash-sql-error">{sqlOut.message}</div>}

          {sqlOut.type === 'text' && sqlOut.lines.map((l, i) => (
            <div key={i} className="dash-sql-line">{l}</div>
          ))}

          {sqlOut.type === 'table' && (
            <>
              {sqlOut.rows.length === 0
                ? <div className="dash-sql-error">0 rows returned</div>
                : (
                  <div className="dash-table-wrap">
                    <table className="dash-table">
                      <thead>
                        <tr>{sqlOut.cols.map(c => <th key={c}>{c}</th>)}</tr>
                      </thead>
                      <tbody>
                        {sqlOut.rows.map((r, i) => (
                          <tr key={i}>{r.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              {sqlOut.note && <div className="dash-sql-note">{sqlOut.note}</div>}
            </>
          )}
        </div>
      )}
      </div>{/* /dash-collapse-inner */}
      </div>{/* /dash-collapse */}
    </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const tickersRef = useRef([])

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

  // JS marquee: eases to a stop on hover, eases back on leave, skews with scroll velocity
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = tickersRef.current.filter(Boolean)
    if (!els.length) return

    const BASE_SPEED = 42 /* px per second */
    const rows = els.map((el, i) => ({
      el,
      dir: i === 0 ? -1 : 1,
      pos: 0,
      speed: 0,
      half: el.scrollWidth / 2,
      hovered: false,
    }))

    const listeners = rows.map(row => {
      const wrap = row.el.parentElement
      const enter = () => { row.hovered = true }
      const leave = () => { row.hovered = false }
      wrap.addEventListener('mouseenter', enter)
      wrap.addEventListener('mouseleave', leave)
      return { wrap, enter, leave }
    })

    const onResize = () => rows.forEach(r => { r.half = r.el.scrollWidth / 2 })

    let lastY = window.scrollY
    let skew = 0, skewTarget = 0
    const onScroll = () => {
      const y = window.scrollY
      skewTarget = Math.max(-4, Math.min(4, (y - lastY) * 0.12))
      lastY = y
    }

    let raf, last = performance.now()
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      skewTarget *= 0.9
      skew += (skewTarget - skew) * 0.12

      rows.forEach(r => {
        const goal = r.hovered ? 0 : BASE_SPEED
        r.speed += (goal - r.speed) * Math.min(1, dt * 3.2)
        r.pos += r.dir * r.speed * dt
        if (r.half > 0) {
          if (r.pos <= -r.half) r.pos += r.half
          if (r.pos > 0)        r.pos -= r.half
        }
        r.el.style.transform = `translateX(${r.pos.toFixed(2)}px) skewX(${skew.toFixed(3)}deg)`
      })

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      listeners.forEach(({ wrap, enter, leave }) => {
        wrap.removeEventListener('mouseenter', enter)
        wrap.removeEventListener('mouseleave', leave)
      })
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="sk-section" ref={sectionRef}>

      {/* Ticker rows */}
      <div className="ticker-wrap">
        <div className="ticker ticker--fwd" ref={el => (tickersRef.current[0] = el)}>
          {ROW1.map((s, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-icon" style={{ color: s.color }} aria-hidden="true">{s.icon}</span>
              {s.name}
            </span>
          ))}
        </div>
      </div>

      <div className="ticker-wrap ticker-wrap--gap">
        <div className="ticker ticker--rev" ref={el => (tickersRef.current[1] = el)}>
          {ROW2.map((s, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-icon" style={{ color: s.color }} aria-hidden="true">{s.icon}</span>
              {s.name}
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="reveal">
          <p className="section-eyebrow"><span>02</span> Skills</p>
          <MaskedHeading className="sk-heading" text="Technical Toolkit" />
        </div>

        {/* Interactive mini-dashboard */}
        <div className="reveal" style={{ '--delay': '60ms' }}>
          <Dashboard />
        </div>

        {/* Categorised grid */}
        <div className="sk-grid">
          {CATS.map((cat, ci) => (
            <div key={ci} className="sk-cat spotlight reveal" style={{ '--delay': `${ci * 90}ms` }}>
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
                      <span className="sk-icon" style={{ color: s?.color }} aria-hidden="true">{s?.icon}</span>
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
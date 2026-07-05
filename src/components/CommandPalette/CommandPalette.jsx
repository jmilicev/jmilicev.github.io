import { useEffect, useMemo, useRef, useState } from 'react'
import './CommandPalette.css'

const goTo = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

/* ── Queryable "database" of Jovan facts ─────────────────────── */
const DB = {
  experience: {
    cols: ['role', 'company', 'start', 'end'],
    rows: [
      ['Senior Reporting Specialist', 'Metrolinx', '2025', 'present'],
      ['BI & Reporting Analyst', 'Metrolinx', '2024', '2025'],
      ['Procurement Analyst', 'Metrolinx', '2023', '2024'],
      ['Full Stack Developer', 'Chatbase', '2023', '2023'],
      ['Teaching Assistant', 'York University', '2022', '2023'],
      ['Customer Experience Associate', 'Scotiabank', '2022', '2024'],
    ],
  },
  education: {
    cols: ['degree', 'field', 'school', 'years', 'standing'],
    rows: [['Honours BA', 'Computer Science', 'York University', '2018-2023', 'First Class']],
  },
  skills: {
    cols: ['name', 'category'],
    rows: [
      ['Power BI', 'data'], ['SQL', 'data'], ['DAX', 'data'], ['M Query', 'data'],
      ['Excel', 'data'], ['Tableau', 'data'], ['MS Fabric', 'data'],
      ['Azure', 'cloud'], ['Python', 'cloud'], ['SharePoint', 'cloud'],
      ['Databricks', 'cloud'], ['Spark', 'cloud'], ['MongoDB', 'cloud'],
      ['React', 'dev'], ['JavaScript', 'dev'], ['Node.js', 'dev'],
      ['Next.js', 'dev'], ['Git', 'dev'], ['REST APIs', 'dev'],
    ],
  },
  contact: {
    cols: ['channel', 'value'],
    rows: [
      ['email', 'contact@jovanmilicev.com'],
      ['linkedin', 'linkedin.com/in/jovan-milicev'],
      ['github', 'github.com/jmilicev'],
    ],
  },
  coffee: {
    cols: ['metric', 'value'],
    rows: [
      ['cups_today', '4'],
      ['cups_total', '∞'],
      ['status', 'refill_required'],
    ],
  },
}

const HELP_LINES = [
  'this palette speaks SQL. try:',
  '  SELECT * FROM experience',
  '  SELECT name FROM skills WHERE category = \'data\'',
  '  SELECT * FROM experience WHERE company LIKE \'%metro%\'',
  '  SHOW TABLES  ·  DESCRIBE skills  ·  LIMIT / ORDER BY work too',
]

/* ── Tiny SQL engine ─────────────────────────────────────────── */
function runSQL(raw) {
  const q = raw.trim().replace(/;+\s*$/, '')

  if (/^help$/i.test(q) || /^select\s*$/i.test(q)) {
    return { type: 'text', lines: HELP_LINES }
  }

  if (/^show\s+tables$/i.test(q)) {
    return { type: 'table', cols: ['table_name'], rows: Object.keys(DB).map(t => [t]) }
  }

  const desc = q.match(/^(?:describe|desc)\s+(\w+)$/i)
  if (desc) {
    const t = DB[desc[1].toLowerCase()]
    if (!t) return { type: 'error', message: `table '${desc[1]}' not found — try SHOW TABLES` }
    return { type: 'table', cols: ['column'], rows: t.cols.map(c => [c]) }
  }

  if (/^(drop|delete|update|insert|alter|truncate|create)\b/i.test(q)) {
    return { type: 'error', message: 'permission denied: this résumé is read-only 🔒' }
  }

  const m = q.match(
    /^select\s+(.+?)\s+from\s+(\w+)(?:\s+where\s+(.+?))?(?:\s+order\s+by\s+(\w+)(\s+desc)?)?(?:\s+limit\s+(\d+))?$/i
  )
  if (!m) {
    return { type: 'error', message: 'syntax_error — expected: SELECT <cols> FROM <table> [WHERE …] (type HELP)' }
  }

  const [, colStr, tableName, whereStr, orderCol, orderDesc, limitStr] = m
  const tkey = tableName.toLowerCase()

  if (tkey === 'secrets' || tkey === 'passwords' || tkey === 'salary') {
    return { type: 'error', message: `0 rows returned from '${tkey}' (nice try)` }
  }
  const table = DB[tkey]
  if (!table) {
    return { type: 'error', message: `table '${tableName}' not found — try SHOW TABLES` }
  }

  /* columns */
  let cols
  if (colStr.trim() === '*') {
    cols = table.cols
  } else {
    cols = colStr.split(',').map(c => c.trim().toLowerCase())
    const bad = cols.find(c => !table.cols.includes(c))
    if (bad) {
      return { type: 'error', message: `unknown column '${bad}' — ${tkey} has: ${table.cols.join(', ')}` }
    }
  }

  /* rows as objects */
  let rows = table.rows.map(r => Object.fromEntries(table.cols.map((c, i) => [c, r[i]])))

  /* WHERE — single condition */
  if (whereStr) {
    const w = whereStr.match(/^(\w+)\s*(=|!=|<>|>=|<=|>|<|like)\s*(.+)$/i)
    if (!w) return { type: 'error', message: `couldn't parse WHERE clause — try: WHERE company = 'Metrolinx'` }
    const [, field, opRaw, valRaw] = w
    const f = field.toLowerCase()
    if (!table.cols.includes(f)) {
      return { type: 'error', message: `unknown column '${f}' in WHERE — ${tkey} has: ${table.cols.join(', ')}` }
    }
    const op = opRaw.toLowerCase()
    const val = valRaw.trim().replace(/^['"]|['"]$/g, '')

    rows = rows.filter(row => {
      const cell = String(row[f])
      if (op === 'like') {
        const pattern = val.toLowerCase().split('%').map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*')
        return new RegExp(`^${pattern}$`, 'i').test(cell)
      }
      const a = parseFloat(cell), b = parseFloat(val)
      const numeric = !Number.isNaN(a) && !Number.isNaN(b)
      switch (op) {
        case '=':  return numeric ? a === b : cell.toLowerCase() === val.toLowerCase()
        case '!=':
        case '<>': return numeric ? a !== b : cell.toLowerCase() !== val.toLowerCase()
        case '>':  return numeric ? a > b  : cell.toLowerCase() >  val.toLowerCase()
        case '<':  return numeric ? a < b  : cell.toLowerCase() <  val.toLowerCase()
        case '>=': return numeric ? a >= b : cell.toLowerCase() >= val.toLowerCase()
        case '<=': return numeric ? a <= b : cell.toLowerCase() <= val.toLowerCase()
        default:   return false
      }
    })
  }

  /* ORDER BY */
  if (orderCol) {
    const f = orderCol.toLowerCase()
    if (!table.cols.includes(f)) {
      return { type: 'error', message: `unknown column '${f}' in ORDER BY` }
    }
    rows = [...rows].sort((r1, r2) => {
      const a = String(r1[f]), b = String(r2[f])
      const na = parseFloat(a), nb = parseFloat(b)
      const cmp = !Number.isNaN(na) && !Number.isNaN(nb) ? na - nb : a.localeCompare(b)
      return orderDesc ? -cmp : cmp
    })
  }

  /* LIMIT */
  if (limitStr) rows = rows.slice(0, parseInt(limitStr, 10))

  const ms = (2 + Math.random() * 9).toFixed(0)
  return {
    type: 'table',
    cols,
    rows: rows.map(row => cols.map(c => row[c])),
    note: `${rows.length} row${rows.length === 1 ? '' : 's'} in set (0.00${ms}s)`,
  }
}

const isSQL = (q) =>
  /^\s*(select|show|desc|describe|help|drop|delete|insert|update|alter|truncate|create)\b/i.test(q) ||
  /^\s*help\s*$/i.test(q)

/* ── Nav items ───────────────────────────────────────────────── */
const ITEMS = [
  { label: 'Go to Home',        hint: '/home',                         action: goTo('home') },
  { label: 'Go to Experience',  hint: '/experience',                   action: goTo('experience') },
  { label: 'Go to Skills',      hint: '/skills',                       action: goTo('skills') },
  { label: 'Go to Education',   hint: '/education',                    action: goTo('education') },
  { label: 'Go to Contact',     hint: '/contact',                      action: goTo('contact') },
  { label: 'Send Email',        hint: 'contact@jovanmilicev.com',      action: () => { window.location.href = 'mailto:contact@jovanmilicev.com' } },
  { label: 'Open LinkedIn',     hint: 'linkedin.com/in/jovan-milicev', action: () => window.open('https://linkedin.com/in/jovan-milicev/', '_blank', 'noreferrer') },
  { label: 'Open GitHub',       hint: 'github.com/jmilicev',           action: () => window.open('https://github.com/jmilicev', '_blank', 'noreferrer') },
  { label: 'SQL Console',       hint: "try: SELECT * FROM experience", fill: 'SELECT * FROM experience' },
]

export default function CommandPalette() {
  const [open, setOpen]     = useState(false)
  const [query, setQuery]   = useState('')
  const [index, setIndex]   = useState(0)
  const [result, setResult] = useState(null)   /* { sql, out } */
  const inputRef = useRef(null)

  const sqlMode = isSQL(query)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ITEMS
    return ITEMS.filter(it => (it.label + ' ' + it.hint).toLowerCase().includes(q))
  }, [query])

  // Open on Ctrl/Cmd+K or the navbar button's custom event
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('jm:palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('jm:palette', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setIndex(0)
      setResult(null)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => { setIndex(0) }, [query])

  if (!open) return null

  const run = (item) => {
    if (item?.fill !== undefined) {
      setQuery(item.fill)
      inputRef.current?.focus()
      return
    }
    setOpen(false)
    item?.action()
  }

  const onInputKey = (e) => {
    if (e.key === 'Escape') { setOpen(false); return }

    if (sqlMode) {
      if (e.key === 'Enter') setResult({ sql: query.trim(), out: runSQL(query) })
      return
    }

    if (e.key === 'ArrowDown') { e.preventDefault(); setIndex(i => Math.min(i + 1, results.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setIndex(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter')     { run(results[index]) }
  }

  return (
    <div className="cp-overlay" onMouseDown={() => setOpen(false)} role="dialog" aria-label="Command palette">
      <div className="cp-panel" onMouseDown={(e) => e.stopPropagation()}>
        <div className="cp-input-row">
          <span className="cp-prompt" aria-hidden="true">&gt;_</span>
          <input
            ref={inputRef}
            className="cp-input"
            type="text"
            placeholder="type a command… or a SELECT query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            spellCheck="false"
          />
          <span className="cp-esc">esc</span>
        </div>

        {sqlMode ? (
          <div className="cp-sql">
            {!result && (
              <div className="cp-sql-hint">
                {HELP_LINES.map((l, i) => <div key={i} className="cp-sql-hint-line">{l}</div>)}
                <div className="cp-sql-hint-run">press <kbd>↵</kbd> to run</div>
              </div>
            )}

            {result && (
              <div className="cp-sql-result">
                <div className="cp-sql-echo">&gt; {result.sql}</div>

                {result.out.type === 'error' && (
                  <div className="cp-sql-error">{result.out.message}</div>
                )}

                {result.out.type === 'text' && (
                  <div className="cp-sql-hint">
                    {result.out.lines.map((l, i) => <div key={i} className="cp-sql-hint-line">{l}</div>)}
                  </div>
                )}

                {result.out.type === 'table' && (
                  <>
                    {result.out.rows.length === 0
                      ? <div className="cp-sql-error">0 rows returned</div>
                      : (
                        <div className="cp-table-wrap">
                          <table className="cp-table">
                            <thead>
                              <tr>{result.out.cols.map(c => <th key={c}>{c}</th>)}</tr>
                            </thead>
                            <tbody>
                              {result.out.rows.map((r, i) => (
                                <tr key={i}>{r.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    {result.out.note && <div className="cp-sql-note">{result.out.note}</div>}
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="cp-list">
            {results.length === 0 && <div className="cp-empty">no results — try "email", "skills", or a SELECT query</div>}
            {results.map((item, i) => (
              <button
                key={item.label}
                className={`cp-item ${i === index ? 'active' : ''}`}
                onMouseEnter={() => setIndex(i)}
                onClick={() => run(item)}
              >
                <span className="cp-item-label">{item.label}</span>
                <span className="cp-item-hint">{item.hint}</span>
              </button>
            ))}
          </div>
        )}

        <div className="cp-footer">
          {sqlMode ? (
            <>
              <span><kbd>↵</kbd> run query</span>
              <span><kbd>esc</kbd> close</span>
              <span className="cp-footer-right">jm_db v1.0 — read_only</span>
            </>
          ) : (
            <>
              <span><kbd>↑↓</kbd> navigate</span>
              <span><kbd>↵</kbd> select</span>
              <span><kbd>esc</kbd> close</span>
              <span className="cp-footer-right">psst — it speaks SQL</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

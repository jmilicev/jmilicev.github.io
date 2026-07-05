import { useEffect, useMemo, useRef, useState } from 'react'
import { runSQL, isSQL, HELP_LINES } from '../shared/sql'
import './CommandPalette.css'

const goTo = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

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

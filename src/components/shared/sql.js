/* Tiny read-only SQL engine over a fake résumé database.
   Used by both the Ctrl+K command palette and the dashboard footer console. */

export const DB = {
  experience: {
    cols: ['role', 'company', 'start', 'end'],
    rows: [
      ['Senior Reporting Specialist', 'Metrolinx', '2025', 'present'],
      ['BI & Reporting Analyst', 'Metrolinx', '2024', '2025'],
      ['Procurement Analyst', 'Metrolinx', '2024', '2024'],
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
  insights: {
    cols: ['insight', 'useful'],
    rows: [
      ['data beats opinions', 'true'],
      ['automate the boring stuff', 'true'],
      ['keep dashboards simple', 'true'],
      ['ask why before asking what', 'true'],
      ['garbage in, garbage out', 'true'],
      ['3d pie charts', 'false'],
      ['more KPIs = more clarity', 'false'],
      ['gut feel > data', 'false'],
    ],
  },
}

export const HELP_LINES = [
  'this console speaks SQL. try:',
  '  SELECT * FROM experience',
  "  SELECT name FROM skills WHERE category = 'data'",
  "  SELECT * FROM experience WHERE company LIKE '%metro%'",
  '  SHOW TABLES  ·  DESCRIBE skills  ·  LIMIT / ORDER BY work too',
]

export const isSQL = (q) =>
  /^\s*(select|show|desc|describe|help|drop|delete|insert|update|alter|truncate|create)\b/i.test(q) ||
  /^\s*help\s*$/i.test(q)

export function runSQL(raw) {
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

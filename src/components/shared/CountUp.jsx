import { useEffect, useState } from 'react'

/* Number that eases from 0 to `to` once `start` becomes true */
export default function CountUp({ to, prefix = '', suffix = '', decimals = 0, duration = 1500, delay = 0, start = true }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!start) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(to); return }

    let raf, t0
    const tid = setTimeout(() => {
      const tick = (ts) => {
        if (t0 === undefined) t0 = ts
        const p = Math.min((ts - t0) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setVal(to * eased)
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)

    return () => { clearTimeout(tid); cancelAnimationFrame(raf) }
  }, [start, to, duration, delay])

  return <>{prefix}{val.toFixed(decimals)}{suffix}</>
}

import { useEffect, useRef, useState } from 'react'

export default function useHoverPopover(delay = 180) {
  const [open, setOpen] = useState(false)
  const timer = useRef(null)
  const enter = () => { clearTimeout(timer.current); setOpen(true) }
  const leave = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), delay) }
  useEffect(() => () => clearTimeout(timer.current), [])
  return [open, { onMouseEnter: enter, onMouseLeave: leave }, setOpen]
}

import { useEffect, useRef, useState } from 'react'
import {
  Ban, Eye, Pencil, Trash2,
} from 'lucide-react'

export default function RowActions({ onAction, extended = false }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => { const close = (e) => !ref.current?.contains(e.target) && setOpen(false); addEventListener('mousedown', close); return () => removeEventListener('mousedown', close) }, [])
  const run = (action) => { setOpen(false); onAction(action) }
  return <div className="row-actions" ref={ref} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}><button aria-label="Aksi data" onClick={() => setOpen(!open)}><span className="kebab-dots" aria-hidden="true"></span></button>{open && <div><button onClick={() => run('detail')}><Eye /> Detail</button><button onClick={() => run('edit')}><Pencil /> Edit</button>{extended && <button onClick={() => run('cancel')}><Ban /> Cancel</button>}<button className="danger" onClick={() => run('delete')}><Trash2 /> Delete</button></div>}</div>
}

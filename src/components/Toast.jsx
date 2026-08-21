import { useEffect } from 'react'
import {
  Check, X,
} from 'lucide-react'

export default function Toast({ toast, onClose }) {
  useEffect(() => { if (!toast) return; const timer = setTimeout(onClose, 3200); return () => clearTimeout(timer) }, [toast, onClose])
  if (!toast) return null
  return <div className={`app-toast ${toast.type || 'success'}`}><span>{toast.type === 'error' ? <X /> : <Check />}</span><div><b>{toast.type === 'error' ? 'Terjadi kesalahan' : 'Berhasil'}</b><p>{toast.message}</p></div><button onClick={onClose}><X /></button></div>
}
import '../styles/modal.css'

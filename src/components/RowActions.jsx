import { MoreVertical, Pencil, Trash2 } from 'lucide-react'

export default function RowActions({ onAction, variant = 'menu' }) {
  if (variant === 'edit-delete') return <div className="row-actions">
    <button title="Edit data" aria-label="Edit data" onClick={() => onAction('edit')}><Pencil /></button>
    <button title="Hapus data" aria-label="Hapus data" className="danger" onClick={() => onAction('delete')}><Trash2 /></button>
  </div>
  return <div className="row-actions">
    <button title="Lihat detail dan aksi" aria-label="Lihat detail dan aksi" onClick={() => onAction('detail')}><MoreVertical /></button>
  </div>
}

import { Ban, Eye, KeyRound, Pencil, Trash2 } from 'lucide-react'

export default function RowActions({ onAction, extended = false, resetAction = false }) {
  return <div className="row-actions">
    <button title="Detail" aria-label="Detail data" onClick={() => onAction('detail')}><Eye /></button>
    <button title="Edit" aria-label="Edit data" onClick={() => onAction('edit')}><Pencil /></button>
    {extended && (resetAction
      ? <button title="Reset password" aria-label="Reset password" onClick={() => onAction('reset')}><KeyRound /></button>
      : <button title="Cancel" aria-label="Cancel data" onClick={() => onAction('cancel')}><Ban /></button>)}
    <button className="danger" title="Delete" aria-label="Hapus data" onClick={() => onAction('delete')}><Trash2 /></button>
  </div>
}

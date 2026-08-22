import { MoreVertical } from 'lucide-react'

export default function RowActions({ onAction }) {
  return <div className="row-actions">
    <button title="Lihat detail dan aksi" aria-label="Lihat detail dan aksi" onClick={() => onAction('detail')}><MoreVertical /></button>
  </div>
}

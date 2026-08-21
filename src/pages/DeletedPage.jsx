import { useState } from 'react'
import {
  ChevronDown, ListFilter, RotateCcw, Search, Trash2,
} from 'lucide-react'

export default function DeletedPage({ openModal, notify }) {
  const [tab, setTab] = useState('soft')
  const rows = tab === 'soft' ? [['Produk', 'Es Kopi Pandan', 'Admin Demo', '19 Agu 2026'], ['Pelanggan', 'Dimas Pratama', 'Manager Outlet', '18 Agu 2026'], ['Transaksi', '#INV-0981', 'Admin Demo', '17 Agu 2026']] : [['Transaksi', '#INV-0712', 'System', '02 Agu 2026'], ['Produk', 'Menu Musiman 2025', 'Admin Demo', '28 Jul 2026']]
  const action = (row, type) => {
    if (type === 'detail') openModal({ type:'detail', title:'Detail data terhapus', name:row[1], initials:row[0].slice(0,2).toUpperCase(), data:{ Tabel:row[0], Dihapus_oleh:row[2], Waktu:row[3], Jenis:tab === 'soft' ? 'Soft delete' : 'Hard delete' } })
    if (type === 'edit' && tab === 'soft') openModal({ type:'confirm', title:'Restore data', message:`Pulihkan ${row[1]}?`, description:'Data akan dikembalikan ke tabel asal pada simulasi frontend.', success:'Data berhasil dipulihkan' })
    if (type === 'delete' && tab === 'soft') openModal({ type:'confirm', title:'Delete permanen', message:`Hapus permanen ${row[1]}?`, description:'Data akan masuk ke tab hard delete pada tampilan demo.', success:'Data dipindahkan ke hard delete' })
    if (type === 'edit' && tab === 'hard') notify('Hard delete tidak dapat dipulihkan','warning')
  }
  return <div className="module-page"><div className="module-tabs"><button className={tab === 'soft' ? 'active' : ''} onClick={() => setTab('soft')}><RotateCcw /> Soft delete</button><button className={tab === 'hard' ? 'active' : ''} onClick={() => setTab('hard')}><Trash2 /> Hard delete</button></div><div className="data-card"><div className="data-toolbar"><label><Search /><input placeholder="Cari data terhapus" /></label><button><ListFilter /> Semua tabel <ChevronDown /></button></div><div className="data-table deleted-table"><div className="data-row data-head"><span>Tabel</span><span>Data</span><span>Oleh</span><span>Waktu</span><span>Aksi</span></div>{rows.map(r => <div className="data-row" key={r[1]}><span><b>{r[0]}</b></span><span>{r[1]}</span><span>{r[2]}</span><span>{r[3]}</span><span><RowActions onAction={(a)=>action(r,a)} /></span></div>)}</div></div></div>
}
import RowActions from '../components/RowActions'
import '../styles/deleted.css'

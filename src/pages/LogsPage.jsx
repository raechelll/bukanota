import {
  Activity, CalendarClock, ChevronDown, Clock3, Download, ListFilter, Search, ShieldCheck, Users,
} from 'lucide-react'

export default function LogsPage({ openModal, notify }) {
  const logs = [['14:32:08', 'Admin Demo', 'LOGIN', 'Masuk ke dashboard', '103.21.80.14'], ['14:29:41', 'Manager Outlet', 'UPDATE', 'Mengubah stok Susu UHT', '103.21.80.18'], ['14:21:12', 'Kasir 01', 'CREATE', 'Membuat transaksi #INV-1042', '103.21.80.22'], ['13:58:09', 'Admin Demo', 'BACKUP', 'Backup database manual', '103.21.80.14'], ['13:44:53', 'Manager Outlet', 'RESTORE', 'Memulihkan produk terhapus', '103.21.80.18']]
  const detail = (row) => openModal({ type:'detail', title:'Detail aktivitas', name:row[2], initials:row[1].slice(0,2).toUpperCase(), data:{ Waktu:row[0], Pengguna:row[1], Aktivitas:row[2], Detail:row[3], IP_Address:row[4] } })
  return <div className="module-page"><div className="log-kpis"><div><Activity /><span><small>Aktivitas hari ini</small><strong>1.284</strong></span></div><div><Users /><span><small>Pengguna aktif</small><strong>18</strong></span></div><div><ShieldCheck /><span><small>Aktivitas mencurigakan</small><strong>0</strong></span></div></div><div className="data-card"><div className="data-toolbar"><label><Search /><input placeholder="Cari aktivitas" /></label><button><CalendarClock /> Hari ini</button><button><ListFilter /> Semua aktivitas <ChevronDown /></button><button onClick={()=>notify('Export log demo disiapkan','info')}><Download /> Export log</button></div><div className="data-table log-table with-actions"><div className="data-row data-head"><span>Waktu</span><span>Pengguna</span><span>Aktivitas</span><span>Detail</span><span>IP Address</span><span>Aksi</span></div>{logs.map(r => <div className="data-row" key={r[0]}><span><Clock3 />{r[0]}</span><span><b>{r[1]}</b></span><span><em className={`log-${r[2].toLowerCase()}`}>{r[2]}</em></span><span>{r[3]}</span><span>{r[4]}</span><span><RowActions onAction={(a)=>a==='detail'?detail(r):notify('Log aktivitas bersifat read-only','warning')} /></span></div>)}</div></div></div>
}
import RowActions from '../components/RowActions'
import '../styles/logs.css'

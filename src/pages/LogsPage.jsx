import { useState } from 'react'
import {
  Activity, CalendarClock, ChevronDown, Clock3, Download, ListFilter, Search, Users,
} from 'lucide-react'

const LOGS = [
  ['14:32:08', 'Admin Demo', 'LOGIN', 'Masuk ke dashboard', '103.21.80.14'],
  ['14:29:41', 'Manager Outlet', 'UPDATE', 'Mengubah stok Susu UHT', '103.21.80.18'],
  ['14:21:12', 'Kasir 01', 'CREATE', 'Membuat transaksi #INV-1042', '103.21.80.22'],
  ['13:58:09', 'Admin Demo', 'BACKUP', 'Backup database manual', '103.21.80.14'],
  ['13:44:53', 'Manager Outlet', 'RESTORE', 'Memulihkan produk terhapus', '103.21.80.18'],
]
const ACTIVITIES = ['Semua aktivitas', 'LOGIN', 'CREATE', 'UPDATE', 'BACKUP', 'RESTORE']

export default function LogsPage({ notify }) {
  const [q, setQ] = useState('')
  const [activity, setActivity] = useState('Semua aktivitas')
  const [actOpen, setActOpen] = useState(false)
  const [todayOnly, setTodayOnly] = useState(true)
  const shown = LOGS.filter(r => {
    if (activity !== 'Semua aktivitas' && r[2] !== activity) return false
    if (todayOnly && !r[0].startsWith('1')) return false
    const needle = q.trim().toLowerCase()
    return !needle || r.some(v => String(v).toLowerCase().includes(needle))
  })
  return <div className="module-page"><div className="log-kpis"><div><Activity /><span><small>Aktivitas hari ini</small><strong>1.284</strong></span></div><div><Users /><span><small>Pengguna aktif</small><strong>18</strong></span></div></div><div className="data-card"><div className="data-toolbar"><label><Search /><input placeholder="Cari aktivitas" value={q} onChange={(e) => setQ(e.target.value)} /></label><button className={todayOnly ? 'filter-on' : ''} onClick={() => setTodayOnly(t => !t)}><CalendarClock /> Hari ini</button><div className="toolbar-select"><button type="button" onClick={() => setActOpen(o => !o)}><ListFilter /> {activity} <ChevronDown /></button>{actOpen && <div className="toolbar-select-menu">{ACTIVITIES.map(a => <button key={a} className={activity === a ? 'active' : ''} onClick={() => { setActivity(a); setActOpen(false) }}>{a}</button>)}</div>}</div><button onClick={() => notify('Export log demo disiapkan', 'info')}><Download /> Export log</button></div><div className="data-table log-table"><div className="data-row data-head"><span>Waktu</span><span>Pengguna</span><span>Aktivitas</span><span>Detail</span><span>IP Address</span></div>{shown.map(r => <div className="data-row" key={r[0]}><span><Clock3 />{r[0]}</span><span><b>{r[1]}</b></span><span><em className={`log-${r[2].toLowerCase()}`}>{r[2]}</em></span><span>{r[3]}</span><span>{r[4]}</span></div>)}{!shown.length && <div className="data-row empty-rows"><span>Tidak ada log yang cocok dengan filter.</span></div>}</div><div className="table-footer"><span>Menampilkan {shown.length ? `1–${shown.length}` : 0} dari {LOGS.length} data</span><div><button disabled>←</button><b>1</b><button>→</button></div></div></div></div>
}
import '../styles/logs.css'

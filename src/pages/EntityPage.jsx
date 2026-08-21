import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Building2, CalendarClock, Check, ChevronDown, Download, ListFilter, Plus, Search,
} from 'lucide-react'
import RowActions from '../components/RowActions'
import entityConfigs from './entityConfigs'

const PERIODS = [['all', 'Semua tanggal'], ['today', 'Hari ini'], ['week', '7 hari terakhir'], ['month', '30 hari terakhir']]
// tanggal sintetis deterministik: baris ke-i dibuat i*3 hari lalu agar filter periode bekerja
const rowAgeDays = (i) => i * 3

function Pop({ id, openId, setOpenId, icon: Icon, label, value, options, onPick }) {
  const open = openId === id
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpenId(null) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open, setOpenId])
  const active = value !== options[0][0]
  const current = options.find(o => o[0] === value)
  return <div className="pop-wrap" ref={ref}>
    <button className={open || active ? 'active' : ''} onClick={() => setOpenId(open ? null : id)}>
      <Icon /> {active ? `${label}: ${current[1]}` : label} <ChevronDown />
    </button>
    {open && <div className="pop-menu">
      {options.map(([val, text]) => <button key={val} className={val === value ? 'selected' : ''} onClick={() => { onPick(val); setOpenId(null) }}>{text}{val === value && <Check />}</button>)}
    </div>}
  </div>
}

export default function EntityPage({ route, openModal, notify }) {
  const config = entityConfigs[route] || entityConfigs['/payment']
  const Icon = config.icon
  const [q, setQ] = useState('')
  const [period, setPeriod] = useState('all')
  const [outlet, setOutlet] = useState('all')
  const [status, setStatus] = useState('all')
  const [openPop, setOpenPop] = useState(null)

  const formFields = config.formFields || [
    { name: 'name', label: `Nama ${config.name}`, required: true },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Telepon' },
    { name: 'status', label: 'Status', type: 'select', options: ['Aktif', 'Nonaktif', 'Pending'] },
    { name: 'description', label: 'Catatan', type: 'textarea', wide: true },
  ]
  const add = () => openModal({ type: 'form', title: `${config.cta || `Tambah ${config.name}`}`, kicker: 'TAMBAH DATA', size: 'wide', image: config.image, imageLabel: config.name === 'Membership' ? 'Foto member' : 'Avatar user', fields: formFields, success: `${config.name} berhasil ditambahkan` })
  const act = (row, action) => { if (action === 'detail') openModal({ type: 'detail', title: `Detail ${config.name}`, name: row[1], initials: String(row[1]).slice(0, 2).toUpperCase(), data: Object.fromEntries(config.columns.map((c, i) => [c, row[i]])) }); if (action === 'edit') add(); if (action === 'reset') openModal({ type: 'confirm', title: 'Reset password', message: `Reset password ${row[1]}?`, description: 'Password baru akan dikirim ke email user.', success: 'Password berhasil direset' }); if (action === 'cancel') openModal({ type: 'confirm', title: `Batalkan ${config.name}`, message: `Batalkan ${row[0]}?`, description: 'Status data akan diubah menjadi dibatalkan.', success: `${config.name} dibatalkan` }); if (action === 'delete') openModal({ type: 'confirm', title: `Hapus ${config.name}`, message: `Apakah Anda yakin ingin menghapus ${row[0]}?`, success: `${config.name} berhasil dihapus` }) }

  const outletIdx = config.columns.indexOf('Outlet')
  const outletOptions = useMemo(() => [['all', 'Semua outlet'], ...[...new Set(config.rows.map(r => outletIdx > -1 ? r[outletIdx] : null).filter(Boolean))].map(o => [o, o])], [config, outletIdx])
  const statusOptions = useMemo(() => [['all', 'Semua status'], ...[...new Set(config.rows.map(r => r[r.length - 1]))].map(s => [s, s])], [config])

  const shown = useMemo(() => config.rows.map((row, i) => ({ row, age: rowAgeDays(i) })).filter(({ row, age }) => {
    const needle = q.trim().toLowerCase()
    const okQ = !needle || row.some(v => String(v).toLowerCase().includes(needle))
    const okDate = period === 'all' || (period === 'today' && age < 1) || (period === 'week' && age <= 7) || (period === 'month' && age <= 30)
    const okOut = outlet === 'all' || (outletIdx > -1 && row[outletIdx] === outlet)
    const okStat = status === 'all' || row[row.length - 1] === status
    return okQ && okDate && okOut && okStat
  }), [config, q, period, outlet, status, outletIdx])

  return <div className="module-page entity-module">{config.stats && <div className="entity-stats">{config.stats.map(([n, v], i) => <div key={n}><span className={`metric-icon m-${i}`}><Icon /></span><small>{n}</small><strong>{v}</strong></div>)}</div>}<div className="data-card"><div className="data-toolbar"><label><Search /><input placeholder={`Cari ${config.name.toLowerCase()}`} value={q} onChange={(e) => setQ(e.target.value)} /></label><Pop id="period" openId={openPop} setOpenId={setOpenPop} icon={CalendarClock} label="Tanggal" value={period} options={PERIODS} onPick={setPeriod} /><Pop id="outlet" openId={openPop} setOpenId={setOpenPop} icon={Building2} label="Outlet" value={outlet} options={outletOptions} onPick={setOutlet} /><Pop id="status" openId={openPop} setOpenId={setOpenPop} icon={ListFilter} label="Filter" value={status} options={statusOptions} onPick={setStatus} /><button onClick={() => notify('Data berhasil diexport', 'success')}><Download /> Export</button><button className="primary" onClick={add}><Plus /> {config.cta || 'Tambah data'}</button></div><div className="data-table entity-table" style={{ '--columns': config.columns.length }}><div className="data-row data-head">{config.columns.map(c => <span key={c}>{c}</span>)}<span>Aksi</span></div>{shown.map(({ row }) => <div className="data-row" key={row[0]}>{row.map((value, i) => <span key={`${row[0]}-${i}`}>{i === 0 ? <b>{value}</b> : i === row.length - 1 ? <em className={['Pending', 'Nonaktif', 'Failed'].includes(value) ? 'warning' : ''}>{value}</em> : value}</span>)}<span><RowActions extended resetAction={config.resetAction} onAction={(a) => act(row, a)} /></span></div>)}{!shown.length && <div className="data-row empty-rows"><span>Tidak ada data yang cocok dengan pencarian atau filter.</span></div>}</div><div className="table-footer"><span>Menampilkan {shown.length ? `1–${shown.length}` : 0} dari {config.rows.length} data</span><div><button disabled>←</button><b>1</b><button>2</button><button>→</button></div></div></div></div>
}
import '../styles/entity.css'

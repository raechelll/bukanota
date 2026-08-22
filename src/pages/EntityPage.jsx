import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Building2, CalendarClock, Check, ChevronDown, Download, ListFilter, Plus, Search,
} from 'lucide-react'
import RowActions from '../components/RowActions'
import entityConfigs from './entityConfigs'
import DeletedTab from '../components/DeletedTab'
import { t } from '../utils/translate'

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

export default function EntityPage({ route, openModal, notify, language = 'id' }) {
  const config = entityConfigs[route] || entityConfigs['/payment']
  const Icon = config.icon
  const [q, setQ] = useState('')
  const [period, setPeriod] = useState('all')
  const [outlet, setOutlet] = useState('all')
  const [status, setStatus] = useState('all')
  const [openPop, setOpenPop] = useState(null)
  const hasDeletedTab = route === '/users'
  const [activeRows, setActiveRows] = useState(config.rows)
  const [deletedRows, setDeletedRows] = useState([['doni.manager', 'Doni Saputra', 'Manager', 'Cilandak', 'Nonaktif', '15 Agustus 2026'], ['sari.gudang', 'Sari Dewi', 'Staff Gudang', 'Kemang', 'Nonaktif', '30 Juli 2026']])
  const [showDeleted, setShowDeleted] = useState(false)

  const formFields = config.formFields || [
    { name: 'name', label: `Nama ${config.name}`, required: true },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Telepon' },
    { name: 'status', label: 'Status', type: 'select', options: ['Aktif', 'Nonaktif', 'Pending'] },
    { name: 'description', label: 'Catatan', type: 'textarea', wide: true },
  ]
  const add = () => openModal({ type: 'form', title: `${config.cta || `Tambah ${config.name}`}`, kicker: 'TAMBAH DATA', size: 'wide', image: config.image, imageLabel: config.name === 'Membership' ? 'Foto member' : 'Avatar user', fields: formFields, success: `${config.name} berhasil ditambahkan` })
  const act = (row, action) => { if (action === 'detail') return openModal({ type: 'form', title: `Edit ${config.name}`, subtitle: 'Perbarui data, batalkan, atau hapus dari satu panel.', size: 'wide', fields: config.columns.map((column, i) => ({ name: `field-${i}`, label: column, value: row[i], type: column === 'Status' ? 'select' : 'text', options: column === 'Status' ? ['Aktif', 'Nonaktif', 'Pending'] : undefined, required: i < 2 })), detailActions: [...(config.resetAction ? [{ key: 'reset', label: 'Reset password', tone: 'warning' }] : [{ key: 'cancel', label: 'Batalkan data', tone: 'warning' }]), { key: 'delete', label: 'Hapus', tone: 'danger' }], onDetailAction: (nextAction) => act(row, nextAction), success: `${config.name} berhasil diperbarui` }); if (action === 'edit') add(); if (action === 'reset') openModal({ type: 'confirm', title: 'Reset password', message: `Reset password ${row[1]}?`, description: 'Password baru akan dikirim ke email user.', success: 'Password berhasil direset' }); if (action === 'cancel') openModal({ type: 'confirm', title: `Batalkan ${config.name}`, message: `Batalkan ${row[0]}?`, description: 'Status data akan diubah menjadi dibatalkan.', success: `${config.name} dibatalkan` }); if (action === 'delete') openModal({ type: 'confirm', title: `Hapus ${config.name}`, message: `Apakah Anda yakin ingin menghapus ${row[0]}?`, success: `${config.name} berhasil dihapus`, ...(hasDeletedTab ? { onConfirm: () => { setActiveRows(r => r.filter(x => x[0] !== row[0])); setDeletedRows(d => d.some(x => x[0] === row[0]) ? d : [...d, [...row, '22 Agustus 2026']]); setShowDeleted(true) } } : {}) }) }

  const outletIdx = config.columns.indexOf('Outlet')
  const outletOptions = useMemo(() => [['all', 'Semua outlet'], ...[...new Set(activeRows.map(r => outletIdx > -1 ? r[outletIdx] : null).filter(Boolean))].map(o => [o, o])], [activeRows, outletIdx])
  const statusOptions = useMemo(() => [['all', 'Semua status'], ...[...new Set(activeRows.map(r => r[r.length - 1]))].map(s => [s, s])], [activeRows])

  const shown = useMemo(() => activeRows.map((row, i) => ({ row, age: rowAgeDays(i) })).filter(({ row, age }) => {
    const needle = q.trim().toLowerCase()
    const okQ = !needle || row.some(v => String(v).toLowerCase().includes(needle))
    const okDate = period === 'all' || (period === 'today' && age < 1) || (period === 'week' && age <= 7) || (period === 'month' && age <= 30)
    const okOut = outlet === 'all' || (outletIdx > -1 && row[outletIdx] === outlet)
    const okStat = status === 'all' || row[row.length - 1] === status
    return okQ && okDate && okOut && okStat
  }), [activeRows, q, period, outlet, status, outletIdx])

  return <div className="module-page entity-module">{config.stats && <div className={`entity-stats${config.stats.length === 3 ? ' cols-3' : ''}`}>{config.stats.map(([n, v], i) => <div key={n}><span className={`metric-icon m-${i}`}><Icon /></span><small>{t(language,n)}</small><strong>{v}</strong></div>)}</div>}{hasDeletedTab && <div className="module-tabs catalog-tabs"><button className={!showDeleted?'active':''} onClick={()=>setShowDeleted(false)}>{t(language,'User')}</button><button className={showDeleted?'active':''} onClick={()=>setShowDeleted(true)}>Deleted</button></div>}{hasDeletedTab && showDeleted ? <DeletedTab title={config.name} rows={deletedRows.map(r=>[r[0],r[1],r[5]])} openModal={openModal} onRestore={(row)=>{const full=deletedRows.find(x=>x[0]===row[0]);if(full){setDeletedRows(d=>d.filter(x=>x[0]!==row[0]));setActiveRows(r=>r.some(x=>x[0]===row[0])?r:[...r,full]);setShowDeleted(false)}}} onPermanentDelete={(row)=>setDeletedRows(d=>d.filter(x=>x[0]!==row[0]))} /> : <div className="data-card"><div className="data-toolbar"><label><Search /><input placeholder={`${language==='en'?'Search':'Cari'} ${t(language,config.name).toLowerCase()}`} value={q} onChange={(e) => setQ(e.target.value)} /></label><Pop id="period" openId={openPop} setOpenId={setOpenPop} icon={CalendarClock} label={t(language,'Tanggal')} value={period} options={PERIODS.map(([key,label])=>[key,t(language,label)])} onPick={setPeriod} /><Pop id="outlet" openId={openPop} setOpenId={setOpenPop} icon={Building2} label={t(language,'Outlet')} value={outlet} options={outletOptions.map(([key,label])=>[key,t(language,label)])} onPick={setOutlet} /><Pop id="status" openId={openPop} setOpenId={setOpenPop} icon={ListFilter} label={t(language,'Filter')} value={status} options={statusOptions.map(([key,label])=>[key,t(language,label)])} onPick={setStatus} /><button onClick={() => notify(language==='en'?'Data exported successfully':'Data berhasil diexport', 'success')}><Download /> {t(language,'Export')}</button><button className="primary" onClick={add}><Plus /> {t(language,config.cta || 'Tambah data')}</button></div><div className="data-table entity-table" style={{ '--columns': config.columns.length }}><div className="data-row data-head">{config.columns.map(c => <span key={c}>{t(language,c)}</span>)}<span>{t(language,'Aksi')}</span></div>{shown.map(({ row }) => <div className="data-row" key={row[0]}>{row.map((value, i) => <span data-label={t(language,config.columns[i])} key={`${row[0]}-${i}`}>{i === 0 ? <b>{value}</b> : i === row.length - 1 ? <em className={['Menunggu', 'Nonaktif', 'Gagal'].includes(value) ? 'warning' : ''}>{t(language,value)}</em> : t(language,value)}</span>)}<span data-label={t(language,'Aksi')}><RowActions onAction={(a) => act(row, a)} /></span></div>)}{!shown.length && <div className="data-row empty-rows"><span>{language==='en'?'No data matches the search or filter.':'Tidak ada data yang cocok dengan pencarian atau filter.'}</span></div>}</div><div className="table-footer"><span>{language==='en' ? `Showing ${shown.length ? `1–${shown.length}` : 0} of ${activeRows.length} records` : `Menampilkan ${shown.length ? `1–${shown.length}` : 0} dari ${activeRows.length} data`}</span><div><button disabled>←</button><b>1</b><button>2</button><button>→</button></div></div></div>}</div>
}
import '../styles/entity.css'

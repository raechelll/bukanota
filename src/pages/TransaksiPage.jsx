import { useState } from 'react'
import {
  ChevronDown, Download, Plus, Search,
} from 'lucide-react'

export default function TransaksiPage({ navigate, openModal, notify }) {
  const [addOpen, setAddOpen] = useState(false)
  const [tab, setTab] = useState('Orderan')
  const [status, setStatus] = useState('Semua')
  const orders = [['INV-20260820-001','Andi Wijaya','Kemang','21 Agu 2026','13:24','Rp 162.000','Paid'],['INV-20260820-002','Sarah Putri','Cilandak','20 Agu 2026','15:47','Rp 84.000','Paid'],['INV-20260820-003','Kevin Lim','Kemang','20 Agu 2026','18:05','Rp 126.000','Pending']]
  const [reservasi, setReservasi] = useState([
    ['RSV-20260821-001','Raisa Amelia','21 Agu 2026 · 19:00','4 orang','Meja 04','Confirmed'],
    ['RSV-20260821-002','Budi Santoso','22 Agu 2026 · 12:30','2 orang','Meja 01','Waiting'],
    ['RSV-20260820-003','Dewi Lestari','20 Agu 2026 · 18:00','6 orang','Meja 07','Confirmed'],
  ])
  const reservasiModal = () => { setAddOpen(false); openModal({ type: 'form', title: 'Tambah reservasi', kicker: 'RESERVASI', size: 'wide', fields: [{ name: 'name', label: 'Nama pelanggan', required: true }, { name: 'phone', label: 'No. telepon', placeholder: '0812...' }, { name: 'date', label: 'Tanggal', type: 'date' }, { name: 'time', label: 'Jam', type: 'time' }, { name: 'people', label: 'Jumlah orang', type: 'number' }, { name: 'table', label: 'Meja', type: 'select', options: ['Meja 01','Meja 02','Meja 03','Meja 04','Meja 05'] }, { name: 'note', label: 'Catatan', type: 'textarea', wide: true }], success: 'Reservasi berhasil ditambahkan', onConfirm: (data) => setReservasi(rows => [[`RSV-${Date.now()}`, data.name, `${data.date || '-'} · ${data.time || '-'}`, `${data.people || 2} orang`, data.table, 'Confirmed'], ...rows]) }) }
  const addBtn = <div className="add-wrap">
    <button className={addOpen ? 'open' : ''} onClick={()=>setAddOpen(v=>!v)}><Plus /> Tambah <ChevronDown /></button>
    {addOpen && <><div className="add-backdrop" onClick={()=>setAddOpen(false)}></div><div className="add-menu">
      <button onClick={()=>navigate('/pos')}><b>Orderan baru</b></button>
      <button onClick={reservasiModal}><b>Reservasi</b></button>
    </div></>}
  </div>
  return <div className="module-page">
    <div className="module-tabs">{['Orderan','Reservasi'].map(t => <button key={t} className={tab === t ? 'active' : ''} onClick={()=>{setTab(t); setStatus('Semua')}}>{t}</button>)}{addBtn}</div>
    {tab === 'Orderan' ? <div className="data-card"><div className="data-toolbar"><label><Search /><input placeholder="Cari invoice atau customer" /></label><select className="status-select" value={status} onChange={(e)=>setStatus(e.target.value)}>{['Semua','Paid','Pending'].map(s => <option key={s} value={s}>{s === 'Semua' ? 'Semua status' : s}</option>)}</select><button><Download /> Export</button></div>
      <table className="list-table"><thead><tr><th>Invoice</th><th>Customer</th><th>Outlet</th><th>Tanggal</th><th>Jam</th><th>Total</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>{orders.filter(r => status === 'Semua' || r[6] === status).map(r => <tr key={r[0]}><td><b>{r[0]}</b></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td><b>{r[5]}</b></td><td><em className={r[6]==='Pending'?'warning':''}>{r[6]}</em></td><td><RowActions onAction={(a)=>a==='detail'?openModal({type:'detail',title:'Detail transaksi',name:r[1],initials:r[1].slice(0,2).toUpperCase(),description:`Invoice ${r[0]}`,data:{Invoice:r[0],Outlet:r[2],Tanggal:r[3],Jam:r[4],Total:r[5],Status:r[6]}}):a==='edit'?notify('Transaksi yang sudah dibayar tidak bisa diubah','warning'):openModal({type:'confirm',title:'Refund transaksi',message:`Refund ${r[0]}?`,success:'Refund berhasil diproses'})} /></td></tr>)}
          {!orders.some(r => status === 'Semua' || r[6] === status) && <tr><td colSpan={8} className="empty-row">Tidak ada transaksi dengan status ini.</td></tr>}
        </tbody>
      </table>
    </div> : <div className="data-card"><div className="data-toolbar"><label><Search /><input placeholder="Cari nama atau kode reservasi" /></label><select className="status-select" value={status} onChange={(e)=>setStatus(e.target.value)}>{['Semua','Confirmed','Waiting'].map(s => <option key={s} value={s}>{s === 'Semua' ? 'Semua status' : s}</option>)}</select><button><Download /> Export</button></div>
      <table className="list-table"><thead><tr><th>Kode</th><th>Pelanggan</th><th>Waktu</th><th>Jumlah</th><th>Meja</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>{reservasi.filter(r => status === 'Semua' || r[5] === status).map(r => <tr key={r[0]}><td><b>{r[0]}</b></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td><em className={r[5]==='Waiting'?'warning':''}>{r[5]}</em></td><td><RowActions onAction={(a)=>a==='detail'?openModal({type:'detail',title:'Detail reservasi',name:r[1],initials:r[1].slice(0,2).toUpperCase(),description:`Kode ${r[0]}`,data:{Waktu:r[2],Jumlah:r[3],Meja:r[4],Status:r[5]}}):a==='edit'?notify('Buka form tambah untuk reservasi baru','info'):openModal({type:'confirm',title:'Batalkan reservasi',message:`Batalkan reservasi ${r[1]}?`,success:'Reservasi berhasil dibatalkan'})} /></td></tr>)}
          {!reservasi.some(r => status === 'Semua' || r[5] === status) && <tr><td colSpan={7} className="empty-row">Tidak ada reservasi dengan status ini.</td></tr>}
        </tbody>
      </table>
    </div>}
  </div>
}
import RowActions from '../components/RowActions'

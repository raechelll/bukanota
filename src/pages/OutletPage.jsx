import { useState } from 'react'
import {
  ArrowLeft, Download, MapPin, Pencil, Phone, Plus, Search, Store, Users,
} from 'lucide-react'

const OUTLETS = [
  { slug:'kemang', name:'Outlet Kemang', code:'OUT-01', manager:'Rina Wijaya', phone:'021 7199 2211', address:'Jl. Kemang Raya No. 18, Jakarta Selatan', staff:9, status:'Aktif' },
  { slug:'cilandak', name:'Outlet Cilandak', code:'OUT-02', manager:'Doni Saputra', phone:'021 7504 8832', address:'Jl. Raya Cilandak KKO No. 44, Jakarta Selatan', staff:6, status:'Aktif' },
]

export default function OutletPage({ route, openModal, navigate }) {
  const [tab, setTab] = useState('Promo & Diskon')
  const [subTab, setSubTab] = useState('Potongan belanja')
  const [q, setQ] = useState('')
  const tabs = ['Konfigurasi', 'Item Outlet', 'Payment', 'Promo & Diskon', 'Paket', 'Karyawan']
  const isKaryawan = tab === 'Karyawan'
  const promoTabs = ['Promo & Diskon']
  const addFields = isKaryawan
    ? [{name:'name',label:'Nama karyawan',required:true},{name:'phone',label:'Nomor HP',placeholder:'0812...'},{name:'email',label:'Email',type:'email'},{name:'shift',label:'Shift',type:'select',options:['Pagi','Malam','Full']}]
    : [{name:'name',label:`Nama ${tab}`,required:true},{name:'code',label:'Kode',placeholder:'OUT-001'},{name:'value',label:'Nilai / Harga',type:'number'},{name:'status',label:'Status',type:'select',options:['Aktif','Nonaktif']},{name:'note',label:'Catatan',type:'textarea',wide:true}]
  const add=()=>openModal({type:'form',title:`Tambah ${tab}`,kicker:'PENGATURAN OUTLET',size:'wide',image:['Item Outlet','Paket'].includes(tab),aspect:4/3,fields:addFields,success:`${tab} berhasil ditambahkan`})
  const editRow=(r)=>openModal({type:'form',title:`Edit ${isKaryawan?'karyawan':tab}`,kicker:'PENGATURAN OUTLET',size:'wide',image:['Item Outlet','Paket'].includes(tab),aspect:4/3,success:`${isKaryawan?'Karyawan':tab} berhasil diperbarui`,fields:isKaryawan?[{name:'name',label:'Nama karyawan',value:r[1],required:true},{name:'phone',label:'Nomor HP',placeholder:'0812...'},{name:'email',label:'Email',type:'email'},{name:'shift',label:'Shift',type:'select',value:r[2],options:['Pagi','Malam','Full']}]:[{name:'code',label:'Kode',value:r[0]},{name:'name',label:`Nama ${tab}`,value:r[1],required:true},...(promoTabs.includes(tab)?[{name:'date',label:'Tanggal mulai',value:r[2]}]:[{name:'value',label:'Nilai / Harga',value:r[2]}]),{name:'status',label:'Status',type:'select',options:['Aktif','Nonaktif']}]})
  const rowAction=(row,a)=>a==='delete'?openModal({type:'confirm',title:`Hapus ${isKaryawan?'karyawan':tab}`,message:`Apakah Anda yakin ingin menghapus ${row[1]}?`,success:`${isKaryawan?'Karyawan':tab} berhasil dihapus`}):editRow(row)
  const demoRows={Konfigurasi:[['CFG-01','Jam operasional','08:00–22:00'],['TAX-11','PPN','11%'],['SRV-05','Service charge','5%']], 'Item Outlet':[['ITM-001','Kopi Susu Aren','Rp 22.000'],['ITM-002','Matcha Latte','Rp 26.000']],Payment:[['PAY-01','QRIS','Aktif'],['PAY-02','Cash','Aktif']],Paket:[['PKT-01','Paket Berdua','Rp 78.000']],Karyawan:[['USR-01','Rina Kasir','Pagi'],['WTR-01','Dimas Pratama','Malam'],['USR-02','Sari Dewi','Full']]}
  const rows=demoRows[tab]||[]
  const addOutlet=()=>openModal({type:'form',title:'Tambah outlet',kicker:'OUTLET',size:'wide',fields:[{name:'name',label:'Nama outlet',required:true},{name:'code',label:'Kode outlet',placeholder:'OUT-03'},{name:'manager',label:'Manager'},{name:'phone',label:'Telepon'},{name:'address',label:'Alamat',type:'textarea',wide:true}],success:'Outlet berhasil ditambahkan'})
  const editOutlet=(o)=>openModal({type:'form',title:'Edit outlet',kicker:'OUTLET',size:'wide',success:'Outlet berhasil diperbarui',fields:[{name:'name',label:'Nama outlet',value:o.name,required:true},{name:'code',label:'Kode outlet',value:o.code},{name:'manager',label:'Manager',value:o.manager},{name:'phone',label:'Telepon',value:o.phone},{name:'address',label:'Alamat',value:o.address,type:'textarea',wide:true}]})

  const slug = route.split('/')[2]
  if (!slug) {
    const needle = q.trim().toLowerCase()
    const shown = OUTLETS.filter(o => !needle || [o.name, o.code, o.manager].some(v => v.toLowerCase().includes(needle)))
    return <div className="module-page"><div className="data-toolbar"><label><Search /><input placeholder="Cari outlet" value={q} onChange={(e) => setQ(e.target.value)} /></label><button className="primary" onClick={addOutlet}><Plus /> Tambah outlet</button></div><div className="outlet-cards">{shown.map(o => <div className="outlet-card" key={o.slug} role="button" tabIndex={0} onClick={() => navigate(`/outlet/${o.slug}`)} onKeyDown={(e)=>{if(e.key==='Enter')navigate(`/outlet/${o.slug}`)}}>
      <span className="outlet-card-icon"><Store /></span>
      <button className="outlet-edit-btn" aria-label={`Edit ${o.name}`} onClick={(e)=>{e.stopPropagation();editOutlet(o)}}><Pencil /></button>
      <section><b>{o.name}</b><small>{o.code} · Manager {o.manager}</small></section>
      <div className="outlet-card-info">
        <span><MapPin /> {o.address}</span>
        <span><Phone /> {o.phone}</span>
        <span><Users /> {o.staff} staf aktif</span>
      </div>
      <div className="outlet-card-foot"><em>Aktif</em><small>Kelola konfigurasi →</small></div>
    </div>)}{!shown.length && <p className="outlet-empty">Tidak ada outlet yang cocok dengan pencarian.</p>}</div></div>
  }

  const outlet = OUTLETS.find(o => o.slug === slug) || OUTLETS[0]
  const promoRows = {
    'Potongan belanja': [['PRO-260801','Promo Kemerdekaan','01 Agustus 2026']],
    'Promo item': [['PRO-260724','Paket Hemat Berdua','24 Juli 2026']],
    Diskon: [['PRO-260615','Diskon Member Gold','15 Juni 2026']],
  }
  return <div className="module-page"><div className="outlet-detail-head"><button className="outlet-back" onClick={() => navigate('/outlet')} aria-label="Kembali ke daftar outlet"><ArrowLeft /> Daftar outlet</button><h2>{outlet.name}</h2><small>{outlet.code} · Manager {outlet.manager}</small></div><div className="settings-card"><div className="settings-tabs">{tabs.map(t=><button className={tab===t?'active':''} onClick={()=>setTab(t)} key={t}>{t}</button>)}</div>{tab==='Promo & Diskon'?<><div className="subtabs">{Object.keys(promoRows).map(s=><button key={s} className={subTab===s?'active':''} onClick={()=>setSubTab(s)}>{s}</button>)}</div><div className="data-toolbar"><button className="primary" onClick={add}><Plus /> Tambah promo</button><button><Download /> Export</button></div><div className="data-table promo-table with-actions"><div className="data-row data-head"><span>Kode promo</span><span>Nama promo</span><span>Tanggal mulai</span><span>Status</span><span>Aksi</span></div>{promoRows[subTab].map(r=><div className="data-row" key={r[0]}><span><b>{r[0]}</b></span><span>{r[1]}</span><span>{r[2]}</span><span><em>Aktif</em></span><span><RowActions variant="edit-delete" onAction={(a)=>rowAction(r,a)} /></span></div>)}</div></>:<><div className="setting-demo-head"><div><h3>{tab}</h3><p>Demo pengaturan {tab.toLowerCase()} untuk outlet terpilih.</p></div><button onClick={add}><Plus /> Tambah data</button></div><div className="data-table outlet-demo-table"><div className="data-row data-head"><span>Kode</span><span>Nama / Pengaturan</span><span>Nilai</span><span>Status</span><span>Aksi</span></div>{rows.map(r=><div className="data-row" key={r[0]}><span><b>{r[0]}</b></span><span>{r[1]}</span><span>{r[2]}</span><span><em>Aktif</em></span><span><RowActions variant="edit-delete" onAction={(a)=>rowAction(r,a)} /></span></div>)}</div></>}</div></div>
}
import RowActions from '../components/RowActions'
import '../styles/outlet.css'

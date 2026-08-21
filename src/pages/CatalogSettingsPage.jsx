import { useState } from 'react'
import {
  ChevronDown, Download, Plus, RefreshCcw, Search,
} from 'lucide-react'
import RowActions from '../components/RowActions'
import '../styles/settings.css'

const INIT = {
  kategori: [['CAT-01','Kopi','Minuman berbasis kopi','12','Aktif'],['CAT-02','Makanan','Menu makanan utama','18','Aktif'],['CAT-03','Snack','Camilan dan pastry','9','Aktif']],
  menu: [['MNU-01','Kopi Susu Aren','Kopi','Rp 22.000','Aktif'],['MNU-02','Matcha Latte','Minuman','Rp 26.000','Aktif'],['MNU-03','Croissant Butter','Snack','Rp 18.000','Aktif']],
}

const TONES = ['tone-a', 'tone-b', 'tone-c', 'tone-d']

export default function CatalogSettingsPage({ kind, openModal }) {
  const isKat = kind === 'kategori'
  const [rows, setRows] = useState(INIT[kind])
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Semua')
  const [catOpen, setCatOpen] = useState(false)
  const add = () => openModal(isKat
    ? { type:'form', title:'Tambah kategori', kicker:'SETTING KATEGORI', fields:[{name:'name',label:'Nama kategori',required:true},{name:'description',label:'Deskripsi',type:'textarea',wide:true},{name:'status',label:'Status',type:'select',options:['Aktif','Nonaktif']}], success:'Kategori berhasil ditambahkan', onConfirm:(data)=>setRows(r=>[[`CAT-0${r.length+1}`,data.name,data.description||'-','0',data.status||'Aktif'],...r]) }
    : { type:'form', title:'Tambah menu POS', kicker:'SETTING MENU', size:'wide', image:true, imageLabel:'Gambar menu', aspect:4/3, fields:[{name:'name',label:'Nama menu',required:true},{name:'category',label:'Kategori',type:'select',options:['Kopi','Minuman','Makanan','Snack']},{name:'price',label:'Harga',type:'number'},{name:'order',label:'Sort order',type:'number'},{name:'status',label:'Status',type:'select',options:['Aktif','Nonaktif']}], success:'Menu berhasil ditambahkan', onConfirm:(data)=>setRows(r=>[[`MNU-0${r.length+1}`,data.name,data.category,`Rp ${Number(data.price||0).toLocaleString('id-ID')}`,data.status||'Aktif'],...r]) })
  const action = (row,a) => {
    if (a==='detail') openModal({ type:'detail', title:`Detail ${isKat?'kategori':'menu'}`, name:row[1], initials:row[1].slice(0,2).toUpperCase(), data:{Kode:row[0],Nama:row[1],Status:row.at(-1)} })
    if (a==='edit') add()
    if (a==='delete') openModal({ type:'confirm', title:`Hapus ${isKat?'kategori':'menu'}`, message:`Hapus ${row[1]}?`, success:`${isKat?'Kategori':'Menu'} berhasil dihapus`, onConfirm:()=>setRows(r=>r.filter(x=>x[0]!==row[0])) })
  }
  const needle = q.trim().toLowerCase()
  const catOptions = isKat ? [] : ['Semua', ...new Set(INIT.menu.map(m => m[2]))]
  const menuCount = (name) => INIT.menu.filter(m => m[2] === name).length
  const shown = rows.filter(r => {
    if (needle && !r.slice(0, 2).some(v => String(v).toLowerCase().includes(needle))) return false
    if (!isKat && cat !== 'Semua' && r[2] !== cat) return false
    return true
  })
  return <div className="module-page">
    {isKat && <div className="setting-demo-head"><div><h3>Setting kategori</h3><p>Kelola kategori yang tampil pada POS.</p></div><button onClick={add}><Plus /> Tambah kategori</button></div>}
    <div className="data-toolbar">
      <label><Search /><input placeholder={`Cari ${isKat?'kategori':'menu'}`} value={q} onChange={(e)=>setQ(e.target.value)} /></label>
      {!isKat && <div className="toolbar-select">
        <button type="button" onClick={()=>setCatOpen(o=>!o)}>{cat} <ChevronDown /></button>
        {catOpen && <div className="toolbar-select-menu">{catOptions.map(c=><button key={c} className={cat===c?'active':''} onClick={()=>{setCat(c);setCatOpen(false)}}>{c}</button>)}</div>}
      </div>}
      <button><RefreshCcw /> Refresh</button>
      <button><Download /> Export</button>
      {!isKat && <button className="primary" onClick={add}><Plus /> Tambah menu</button>}
    </div>
    {isKat
      ? <div className="data-table settings-crud-table"><div className="data-row data-head"><span>Kode</span><span>Nama kategori</span><span>Jumlah menu</span><span>Status</span><span>Aksi</span></div>{shown.map(r=><div className="data-row" key={r[0]}><span><b>{r[0]}</b></span><span>{r[1]}</span><span>{menuCount(r[1])} menu</span><span><em className={r.at(-1)==='Nonaktif'?'warning':''}>{r.at(-1)}</em></span><span><RowActions onAction={(a)=>action(r,a)} /></span></div>)}{!shown.length && <div className="data-row empty-rows"><span>Tidak ada kategori yang cocok.</span></div>}</div>
      : <div className="menu-cards">{shown.map((r,i)=><div className="menu-card" key={r[0]}>
          <span className={`menu-card-visual ${TONES[i%TONES.length]}`}>{r[1].slice(0,2).toUpperCase()}</span>
          <em className={r.at(-1)==='Nonaktif'?'warning':''}>{r.at(-1)}</em>
          <section><b>{r[1]}</b><small className="menu-cat-chip">{r[2]}</small></section>
          <div className="menu-card-foot"><strong>{r[3]}</strong><RowActions onAction={(a)=>action(r,a)} /></div>
        </div>)}{!shown.length && <p className="catalog-empty">Tidak ada menu yang cocok dengan pencarian atau filter.</p>}</div>}
  </div>
}

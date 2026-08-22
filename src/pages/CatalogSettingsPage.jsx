import { useState } from 'react'
import {
  ChevronDown, Download, Plus, RefreshCcw, Search,
} from 'lucide-react'
import RowActions from '../components/RowActions'
import '../styles/settings.css'
import DeletedTab from '../components/DeletedTab'

const INIT = {
  kategori: [['CAT-01','Kopi','Kopi dan espresso-based','12','Aktif'],['CAT-02','Minuman','Matcha, teh, dan cokelat','8','Aktif'],['CAT-03','Makanan','Rice bowl, pasta, dan roti','6','Aktif'],['CAT-04','Snack','Camilan ringan dan pastry','9','Aktif']],
  menu: [['MNU-01','Kopi Susu Aren','Kopi','Rp 22.000','Aktif'],['MNU-02','Matcha Latte','Minuman','Rp 26.000','Aktif'],['MNU-03','Croissant Butter','Snack','Rp 18.000','Aktif'],['MNU-04','Chicken Katsu Rice','Makanan','Rp 28.000','Aktif']],
}

const DELETED_INIT = {
  kategori: [['CAT-05','Jus & Smoothies','12 Agustus 2026'],['CAT-06','Roti dan Pastry','28 Juli 2026']],
  menu: [['MNU-09','Es Kopi Pandan','5 Agustus 2026'],['MNU-10','Donat Gula Halus','21 Juli 2026']],
}

const TONES = ['tone-a', 'tone-b', 'tone-c', 'tone-d']

export default function CatalogSettingsPage({ kind, openModal }) {
  const isKat = kind === 'kategori'
  const [rows, setRows] = useState(INIT[kind])
  const [deletedRows, setDeletedRows] = useState(DELETED_INIT[kind])
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Semua')
  const [catOpen, setCatOpen] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const add = () => openModal(isKat
    ? { type:'form', title:'Tambah kategori', kicker:'SETTING KATEGORI', fields:[{name:'name',label:'Nama kategori',required:true},{name:'description',label:'Deskripsi',type:'textarea',wide:true},{name:'status',label:'Status',type:'select',options:['Aktif','Nonaktif']}], success:'Kategori berhasil ditambahkan', onConfirm:(data)=>setRows(r=>[[`CAT-0${r.length+1}`,data.name,data.description||'-','0',data.status||'Aktif'],...r]) }
    : { type:'form', title:'Tambah menu POS', kicker:'SETTING MENU', size:'wide', image:true, imageLabel:'Gambar menu', aspect:4/3, fields:[{name:'name',label:'Nama menu',required:true},{name:'category',label:'Kategori',type:'select',options:['Kopi','Minuman','Makanan','Snack']},{name:'price',label:'Harga',type:'number'},{name:'order',label:'Sort order',type:'number'},{name:'status',label:'Status',type:'select',options:['Aktif','Nonaktif']}], success:'Menu berhasil ditambahkan', onConfirm:(data)=>setRows(r=>[[`MNU-0${r.length+1}`,data.name,data.category,`Rp ${Number(data.price||0).toLocaleString('id-ID')}`,data.status||'Aktif'],...r]) })
  const action = (row,a) => {
    if (a==='detail') return openModal({ type:'form', title:`Edit ${isKat?'kategori':'menu'}`, subtitle:'Edit data atau hapus dari panel yang sama.', size:'wide', image:!isKat, imageLabel:'Gambar menu', aspect:4/3, fields:isKat?[{name:'code',label:'Kode',value:row[0]},{name:'name',label:'Nama kategori',value:row[1],required:true},{name:'description',label:'Deskripsi',value:row[2],wide:true},{name:'status',label:'Status',type:'select',value:row.at(-1),options:['Aktif','Nonaktif']}]:[{name:'code',label:'Kode',value:row[0]},{name:'name',label:'Nama menu',value:row[1],required:true},{name:'category',label:'Kategori',type:'select',value:row[2],options:['Kopi','Minuman','Makanan','Snack']},{name:'price',label:'Harga',value:row[3]},{name:'status',label:'Status',type:'select',value:row.at(-1),options:['Aktif','Nonaktif']}], detailActions:[{key:'delete',label:'Hapus',tone:'danger'}],onDetailAction:(next)=>action(row,next),success:`${isKat?'Kategori':'Menu'} berhasil diperbarui` })
    if (a==='delete') openModal({ type:'confirm', title:`Hapus ${isKat?'kategori':'menu'}`, message:`Hapus ${row[1]}?`, success:`${isKat?'Kategori':'Menu'} dipindahkan ke data terhapus`, onConfirm:()=>{setRows(r=>r.filter(x=>x[0]!==row[0]));setDeletedRows(r=>[...r,[...row.slice(0,2),'22 Agustus 2026']])} })
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
    <div className="module-tabs catalog-tabs"><button className={!deleted?'active':''} onClick={()=>setDeleted(false)}>{isKat?'Kategori menu':'Menu POS'}</button><button className={deleted?'active':''} onClick={()=>setDeleted(true)}>Deleted</button></div>
    {deleted ? <DeletedTab
      title={isKat ? 'Kategori menu' : 'Menu POS'}
      rows={deletedRows.map(r => [r[0], r[1], r[2]])}
      openModal={openModal}
      onRestore={(row) => {
        const full = deletedRows.find(r => r[0] === row[0])
        if (full) {
          setDeletedRows(r => r.filter(x => x[0] !== row[0]))
          setRows(r => [...r, full])
        }
      }}
      onPermanentDelete={(row) => setDeletedRows(r => r.filter(x => x[0] !== row[0]))}
    /> : <>{isKat && <div className="setting-demo-head"><div><h3>Setting kategori</h3><p>Kelola kategori yang tampil pada POS.</p></div><button onClick={add}><Plus /> Tambah kategori</button></div>}
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
      ? <div className="data-table settings-crud-table"><div className="data-row data-head"><span>Kode</span><span>Nama kategori</span><span>Jumlah menu</span><span>Status</span><span>Aksi</span></div>{shown.map(r=><div className="data-row" key={r[0]}><span data-label="Kode"><b>{r[0]}</b></span><span data-label="Nama kategori">{r[1]}</span><span data-label="Jumlah menu">{menuCount(r[1])} menu</span><span data-label="Status"><em className={r.at(-1)==='Nonaktif'?'warning':''}>{r.at(-1)}</em></span><span data-label="Aksi"><RowActions onAction={(a)=>action(r,a)} /></span></div>)}{!shown.length && <div className="data-row empty-rows"><span>Tidak ada kategori yang cocok.</span></div>}</div>
      : <div className="menu-cards">{shown.map((r,i)=><div className="menu-card" key={r[0]}>
          <span className={`menu-card-visual ${TONES[i%TONES.length]}`}>{r[1].slice(0,2).toUpperCase()}</span>
          <em className={r.at(-1)==='Nonaktif'?'warning':''}>{r.at(-1)}</em>
          <section><b>{r[1]}</b><small className="menu-cat-chip">{r[2]}</small></section>
          <div className="menu-card-foot"><strong>{r[3]}</strong><RowActions onAction={(a)=>action(r,a)} /></div>
        </div>)}{!shown.length && <p className="catalog-empty">Tidak ada menu yang cocok dengan pencarian atau filter.</p>}</div>}</>}
  </div>
}

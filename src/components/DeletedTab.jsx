import { useState } from 'react'
import RowActions from './RowActions'

export default function DeletedTab({ title = 'Data', rows = [], openModal, onRestore, onPermanentDelete }) {
  const [demoRows, setDemoRows] = useState([['DEL-001', `Contoh data ${title}`], ['DEL-002', 'Data demo terhapus']])
  const visibleRows = rows.length ? rows : demoRows
  const action = (row, type) => {
    if (type === 'detail') return openModal({ type:'detail', title:`Detail ${title} terhapus`, name:row[1], initials:'DL', description:'Data ini dapat dipulihkan atau dihapus permanen.', data:{Kode:row[0],Dihapus:'20 Agustus 2026',Status:'Terhapus'}, detailActions:[{key:'restore',label:'Restore data',tone:'warning'},{key:'delete',label:'Hapus permanen',tone:'danger'}], onDetailAction:(next)=>action(row,next) })
    if (type === 'restore') openModal({type:'confirm',title:'Restore data',message:`Pulihkan ${row[1]}?`,description:'Data akan dikembalikan ke tab asalnya.',success:'Data berhasil dipulihkan',onConfirm:()=>rows.length && onRestore ? onRestore(row) : setDemoRows(items => items.filter(item => item[0] !== row[0]))})
    if (type === 'delete') openModal({type:'confirm',title:'Hapus permanen',message:`Hapus permanen ${row[1]}?`,description:'Data tidak dapat dikembalikan lagi.',success:'Data berhasil dihapus permanen',onConfirm:()=>rows.length && onPermanentDelete ? onPermanentDelete(row) : setDemoRows(items => items.filter(item => item[0] !== row[0]))})
  }
  return <div className="deleted-tab"><p>Data yang dihapus dari modul {title} dapat dipulihkan atau dihapus permanen.</p><div className="data-table deleted-context-table"><div className="data-row data-head"><span>Kode</span><span>Nama data</span><span>Dihapus pada</span><span>Status</span><span>Aksi</span></div>{visibleRows.length ? visibleRows.map(row=><div className="data-row" key={row[0]}><span data-label="Kode"><b>{row[0]}</b></span><span data-label="Nama data">{row[1]}</span><span data-label="Dihapus pada">20 Agustus 2026</span><span data-label="Status"><em className="warning">Terhapus</em></span><span data-label="Aksi"><RowActions onAction={(type)=>action(row,type)} /></span></div>) : <div className="data-row empty-rows"><span>Belum ada data terhapus.</span></div>}</div></div>
}

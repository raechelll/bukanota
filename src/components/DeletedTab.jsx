import RowActions from './RowActions'

export default function DeletedTab({ title = 'Data', rows = [], openModal, onRestore, onPermanentDelete }) {
  const action = (row, type) => {
    if (type === 'detail') return openModal({ type:'detail', title:`Detail ${title} terhapus`, name:row[1], initials:'DL', description:'Data ini dapat dipulihkan atau dihapus permanen.', data:{Kode:row[0],Dihapus:row[2]||'-',Status:'Terhapus'}, detailActions:[{key:'restore',label:'Restore data',tone:'warning'},{key:'delete',label:'Hapus permanen',tone:'danger'}], onDetailAction:(next)=>action(row,next) })
    if (type === 'restore') openModal({type:'confirm',title:'Restore data',message:`Pulihkan ${row[1]}?`,description:'Data akan dikembalikan ke tab asalnya.',success:'Data berhasil dipulihkan',onConfirm:()=>onRestore?.(row)})
    if (type === 'delete') openModal({type:'confirm',title:'Hapus permanen',message:`Hapus permanen ${row[1]}?`,description:'Data tidak dapat dikembalikan lagi.',success:'Data berhasil dihapus permanen',onConfirm:()=>onPermanentDelete?.(row)})
  }
  return <div className="deleted-tab"><p>Data yang dihapus dari modul {title} dapat dipulihkan atau dihapus permanen.</p><div className="data-table deleted-context-table"><div className="data-row data-head"><span>Kode</span><span>Nama</span><span>Dihapus pada</span><span>Status</span><span>Aksi</span></div>{rows.length ? rows.map(row=><div className="data-row" key={row[0]}><span data-label="Kode"><b>{row[0]}</b></span><span data-label="Nama">{row[1]}</span><span data-label="Dihapus pada">{row[2]||'-'}</span><span data-label="Status"><em className="warning">Terhapus</em></span><span data-label="Aksi"><RowActions onAction={(type)=>action(row,type)} /></span></div>) : <div className="data-row empty-rows"><span>Belum ada data terhapus.</span></div>}</div></div>
}

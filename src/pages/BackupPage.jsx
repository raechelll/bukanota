import { useState } from 'react'
import {
  CalendarClock, Check, CloudUpload, Database, HardDriveDownload,
} from 'lucide-react'

export default function BackupPage({ openModal, notify }) {
  const [tab, setTab] = useState('backup')
  const backups = [['backup_20260820_0200.sql', '20 Agu 2026 · 02:00', '148,2 MB'], ['backup_20260819_0200.sql', '19 Agu 2026 · 02:00', '146,8 MB'], ['backup_20260818_0200.sql', '18 Agu 2026 · 02:00', '145,5 MB']]
  const action = (row, type) => {
    if (type === 'detail') return openModal({ type:'detail', title:'Detail backup', name:row[0], initials:'SQL', data:{ Waktu:row[1], Ukuran:row[2], Status:'Selesai', Tipe:'Seluruh tabel SQL' }, detailActions:[{key:'download',label:'Unduh file'},{key:'restore',label:'Restore data',tone:'warning'},{key:'delete',label:'Hapus backup',tone:'danger'}], onDetailAction:(nextType)=>action(row,nextType) })
    if (type === 'edit' || type === 'download') notify(`Unduhan ${row[0]} disiapkan`, 'info')
    if (type === 'cancel' || type === 'restore') openModal({ type:'confirm', title:'Restore database', message:`Restore seluruh tabel dari ${row[0]}?`, description:'Tampilan ini adalah simulasi frontend. Tidak ada database yang benar-benar diubah.', success:'Simulasi restore berhasil' })
    if (type === 'delete') openModal({ type:'confirm', title:'Hapus backup', message:`Hapus ${row[0]}?`, success:'Backup berhasil dihapus dari tampilan demo' })
  }
  return <div className="module-page"><div className="module-tabs"><button className={tab === 'backup' ? 'active' : ''} onClick={() => setTab('backup')}><Database /> Backup & Restore</button><button className={tab === 'schedule' ? 'active' : ''} onClick={() => setTab('schedule')}><CalendarClock /> Jadwal Backup</button><div className="add-wrap"><button onClick={() => notify('Backup demo berhasil dibuat','success')}><CloudUpload /> Buat backup</button></div></div>{tab === 'backup' ? <div className="backup-layout"><div className="backup-status"><span><HardDriveDownload /></span><div><small>Backup terakhir</small><strong>20 Agustus 2026, 02:00 WIB</strong><p>Seluruh tabel SQL · 148,2 MB · Selesai</p></div><em><Check /> Aman</em></div><div className="data-card"><div className="card-heading"><div><h3>Riwayat backup</h3><p>Restore memulihkan tabel SQL pada titik waktu terpilih.</p></div></div><div className="data-table backup-table"><div className="data-row data-head"><span>Nama file</span><span>Waktu</span><span>Ukuran</span><span>Status</span><span>Aksi</span></div>{backups.map(r => <div className="data-row" key={r[0]}><span><Database /><b>{r[0]}</b></span><span>{r[1]}</span><span>{r[2]}</span><span><em>Selesai</em></span><span><RowActions extended onAction={(a)=>action(r,a)} /></span></div>)}</div></div></div> : <div className="schedule-card"><div><CalendarClock /><span><h3>Backup otomatis</h3><p>Jalankan backup sesuai waktu yang ditentukan.</p></span><label className="switch"><input type="checkbox" defaultChecked /><i></i></label></div><div className="schedule-fields"><label>Frekuensi<select defaultValue="daily"><option value="daily">Setiap hari</option><option>Setiap minggu</option></select></label><label>Waktu<input type="time" defaultValue="02:00" /></label><label>Retensi<select defaultValue="30"><option value="30">30 hari</option><option>90 hari</option></select></label></div><button className="save-button" onClick={()=>notify('Jadwal backup tersimpan','success')}>Simpan jadwal</button></div>}</div>
}
import RowActions from '../components/RowActions'
import '../styles/backup.css'

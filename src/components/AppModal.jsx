import { useEffect, useState } from 'react'
import {
  Ban, KeyRound, Pencil, RotateCcw, Save, Trash2, X,
} from 'lucide-react'
import ImageUploaderWithCrop from './ImageUploaderWithCrop'

const translations = {
  'Batal': 'Cancel', 'Simpan': 'Save', 'Hapus': 'Delete', 'Selesai': 'Done', 'Tutup': 'Close',
  'Data berhasil disimpan': 'Data saved successfully', 'Data berhasil dihapus': 'Data deleted successfully',
  'Detail informasi data': 'Data details', 'Edit ': 'Edit ', 'Tambah ': 'Add ',
  'Manajemen Stok': 'Inventory', 'Akuntansi & Pembukuan': 'Accounting & Bookkeeping',
  'Kategori Menu': 'Menu Categories', 'Log Aktivitas': 'Activity Log', 'Hak Akses': 'Access Control',
  'Backup': 'Backup', 'Outlet': 'Outlet', 'Membership': 'Membership', 'Transaksi': 'Transactions',
  'Batalkan data': 'Cancel data', 'Reset password': 'Reset password', 'Pulihkan data': 'Restore data',
  'Hapus permanen': 'Delete permanently', 'Unduh file': 'Download file',
  'Konfirmasi simpan': 'Confirm save', 'Simpan perubahan ini?': 'Save these changes?',
  'Pastikan data yang diisi sudah benar sebelum menyimpan.': 'Make sure the entered data is correct before saving.',
  'Kembali': 'Back', 'Ya, simpan': 'Yes, save',
  'Apakah Anda yakin ingin menghapus data ini?': 'Are you sure you want to delete this data?',
  'Tindakan ini tidak dapat dibatalkan pada sesi demo.': 'This action cannot be undone in the demo session.',
  'Pulihkan ': 'Restore ', 'Data akan dikembalikan ke tab asalnya.': 'The data will be returned to its original tab.',
  'Data tidak dapat dikembalikan lagi.': 'The data cannot be restored again.',
  'Status': 'Status', 'Aktif': 'Active', 'Nonaktif': 'Inactive', 'Pending': 'Pending',
  'Nama': 'Name', 'Deskripsi': 'Description', 'Kategori': 'Category', 'Harga': 'Price', 'Catatan': 'Notes',
}

function translate(value, language) {
  if (language !== 'en' || typeof value !== 'string') return value
  if (translations[value]) return translations[value]
  return Object.entries(translations).reduce((result, [id, en]) => result.replaceAll(id, en), value)
}

export default function AppModal({ modal, onClose, notify, language = 'id' }) {
  const [image, setImage] = useState(modal.initial?.image || '')
  const [confirmSubmit, setConfirmSubmit] = useState(false)
  useEffect(() => { const escape = (e) => e.key === 'Escape' && onClose(); addEventListener('keydown', escape); return () => removeEventListener('keydown', escape) }, [onClose])
  const t = (value) => translate(value, language)
  const submit = (e) => { e.preventDefault(); setConfirmSubmit(true) }
  const save = () => { const form = document.getElementById('app-modal-form'); if (!form) return; modal.onConfirm?.(Object.fromEntries(new FormData(form)), image); notify(t(modal.success || 'Data berhasil disimpan'), 'success'); onClose() }
  const detailAction = (action) => { onClose(); queueMicrotask(() => modal.onDetailAction?.(action.key)) }
  const icons = { edit: Pencil, cancel: Ban, reset: KeyRound, restore: RotateCcw, delete: Trash2, download: Save }
  return <div className="app-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && modal.type !== 'confirm' && onClose()}><div className={`app-modal ${modal.size || ''}`} role="dialog" aria-modal="true"><div className="app-modal-header"><div><h3>{t(confirmSubmit ? 'Konfirmasi simpan' : modal.title)}</h3>{modal.subtitle && !confirmSubmit && <p>{t(modal.subtitle)}</p>}</div><button onClick={onClose} aria-label={t('Tutup')}><X /></button></div>{modal.type === 'detail' && <div className="detail-modal-body"><div className="detail-identity"><span>{modal.initials || 'BN'}</span><div><h4>{t(modal.name)}</h4><p>{t(modal.description || 'Detail informasi data')}</p></div></div><div className="detail-grid">{Object.entries(modal.data || {}).map(([key, value]) => <div key={key}><span>{t(key)}</span><strong>{t(value)}</strong></div>)}</div>{modal.detailActions?.length ? <div className="detail-actions">{modal.detailActions.map(action => { const Icon = icons[action.key] || Pencil; return <button key={action.key} className={action.tone || ''} onClick={() => detailAction(action)}><Icon /> {t(action.label)}</button> })}</div> : null}</div>}{modal.type === 'confirm' && <div className="confirm-modal-body"><span className="danger-icon"><Trash2 /></span><h4>{t(modal.message || 'Apakah Anda yakin ingin menghapus data ini?')}</h4><p>{t(modal.description || 'Tindakan ini tidak dapat dibatalkan pada sesi demo.')}</p></div>}{modal.type === 'form' && !confirmSubmit && <form id="app-modal-form" className="crud-form" onSubmit={submit}>{modal.image && <ImageUploaderWithCrop label={t(modal.imageLabel || 'Gambar')} aspect={modal.aspect || 1} value={image} onChange={setImage} />}<div className="crud-fields">{(modal.fields || []).map(field => <label className={field.wide ? 'wide' : ''} key={field.name}>{t(field.label)}{field.type === 'select' ? <select name={field.name} defaultValue={field.value || ''}>{(field.options || []).map(option => <option key={option}>{t(option)}</option>)}</select> : field.type === 'textarea' ? <textarea name={field.name} defaultValue={field.value || ''} placeholder={t(field.placeholder)} /> : <input name={field.name} type={field.type || 'text'} defaultValue={field.value || ''} placeholder={t(field.placeholder)} required={field.required} />}</label>)}</div></form>}{modal.type === 'form' && confirmSubmit && <div className="confirm-modal-body"><span className="danger-icon"><Save /></span><h4>{t('Simpan perubahan ini?')}</h4><p>{t('Pastikan data yang diisi sudah benar sebelum menyimpan.')}</p></div>}{modal.type === 'custom' && modal.content}<div className="app-modal-footer">{modal.type === 'custom' ? <button className="primary" onClick={onClose}>{t('Tutup')}</button> : confirmSubmit ? <><button onClick={()=>setConfirmSubmit(false)}>{t('Kembali')}</button><button className="primary" onClick={save}><Save /> {t('Ya, simpan')}</button></> : <><button onClick={onClose}>{t('Batal')}</button>{modal.type === 'confirm' ? <button className="danger" onClick={() => { modal.onConfirm?.(); notify(t(modal.success || 'Data berhasil dihapus'), 'success'); onClose() }}><Trash2 /> {t('Hapus')}</button> : modal.type === 'detail' ? <button className="primary" onClick={onClose}>{t('Selesai')}</button> : <>{modal.detailActions?.map(action => { const Icon = icons[action.key] || Pencil; return <button key={action.key} className={action.tone || ''} type="button" onClick={() => detailAction(action)}><Icon /> {t(action.label)}</button> })}<button className="primary" form="app-modal-form" type="submit"><Save /> {t('Simpan')}</button></>}</>}</div></div></div>
}
import '../styles/modal.css'

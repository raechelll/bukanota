import { useId, useState } from 'react'
import {
  ImagePlus, Trash2, Upload,
} from 'lucide-react'
import CropOverlay from './CropOverlay'

export default function ImageUploaderWithCrop({ label = 'Gambar', aspect = 1, value, onChange }) {
  const id = useId()
  const [cropSrc, setCropSrc] = useState('')
  const choose = (e) => { const file = e.target.files?.[0]; if (file) setCropSrc(URL.createObjectURL(file)); e.target.value = '' }
  return <div className="image-uploader"><span>{label}</span><div className={`upload-preview ${aspect !== 1 ? 'landscape' : ''}`}>{value ? <img src={value} alt={`Preview ${label}`} /> : <ImagePlus />}</div><div><label htmlFor={id}><Upload />{value ? 'Ganti gambar' : 'Pilih gambar'}<input id={id} type="file" accept="image/*" onChange={choose} /></label>{value && <button type="button" onClick={() => onChange('')}><Trash2 /> Hapus</button>}</div><small>Gambar akan dibuka di cropper sebelum digunakan.</small>{cropSrc && <CropOverlay src={cropSrc} aspect={aspect} onClose={() => setCropSrc('')} onSave={(data) => { onChange(data); URL.revokeObjectURL(cropSrc); setCropSrc('') }} />}</div>
}
import '../styles/modal.css'

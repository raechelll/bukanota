import ImageUploaderWithCrop from '../components/ImageUploaderWithCrop'

export default function SettingsPage({ notify }) {
  return <div className="module-page settings-page"><div className="setting-form"><ImageUploaderWithCrop label="Logo bisnis" aspect={1} value="" onChange={()=>notify('Logo berhasil di-crop','success')} /><div className="crud-fields"><label>Nama Bisnis<input defaultValue="BukaNota Coffee" /></label><label>Telepon<input defaultValue="021 555 0199" /></label><label>Email<input defaultValue="hello@bukanota.id" /></label><label>Currency<select><option>IDR — Rupiah</option></select></label><label>Timezone<select><option>Asia/Jakarta</option></select></label><label>Language<select><option>Bahasa Indonesia</option></select></label><label className="wide">Alamat<textarea defaultValue="Jl. Kemang Raya No. 18, Jakarta Selatan" /></label></div><button className="save-button" onClick={()=>notify('Informasi bisnis disimpan','success')}>Simpan perubahan</button></div></div>
}
import '../styles/settings.css'

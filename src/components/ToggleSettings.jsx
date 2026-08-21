
export default function ToggleSettings({ title,items,onSave,saveLabel='Simpan' }) {
  return <div className="toggle-settings"><h3>{title}</h3><p>Aktifkan atau nonaktifkan konfigurasi sesuai kebutuhan operasional.</p>{items.map((item,i)=><label key={item}><span><b>{item}</b><small>Pengaturan frontend untuk {item.toLowerCase()}.</small></span><input type="checkbox" defaultChecked={i<4}/><i></i></label>)}{onSave&&<button className="save-button" onClick={onSave}>{saveLabel}</button>}</div>
}

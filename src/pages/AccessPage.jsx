import { useState } from 'react'
import {
  ChevronRight, Plus, ShieldCheck, UserCog,
} from 'lucide-react'

export default function AccessPage({ openModal, notify }) {
  const modules = ['Dashboard','POS','Product','Payment','Membership','Laporan']
  const perms = ['view','create','edit','delete','export']
  const baseRoles = [['Super Admin',1,'Akses penuh seluruh sistem dan data.'],['Admin',2,'Kelola pengguna, outlet, dan pengaturan aplikasi.'],['Manager',3,'Akses operasional untuk satu outlet.'],['Kasir',8,'Akses kasir untuk transaksi harian.'],['Staff Gudang',2,'Kelola stok dan perpindahan barang.'],['Accounting',2,'Akses pembukuan dan laporan keuangan.']]
  const build = (ri) => Object.fromEntries(modules.map((m,i)=>[m,perms.map((_,j)=>ri===0?true:j===0||i<3)]))
  const [roles, setRoles] = useState(baseRoles)
  const [role, setRole] = useState('Manager')
  const [matrix, setMatrix] = useState(() => Object.fromEntries(baseRoles.map(([r],ri)=>[r,build(ri)])))
  const current = roles.find(([r])=>r===role) || ['','','']
  const roleIndex = Math.max(roles.findIndex(([r])=>r===role), 0)
  const activeCount = modules.reduce((s,m)=>s+matrix[role][m].filter(Boolean).length,0)
  const toggle = (mi,pi) => setMatrix(m=>({...m,[role]:{...m[role],[modules[mi]]:m[role][modules[mi]].map((v,j)=>j===pi?!v:v)}}))
  const setAll = (val) => setMatrix(m=>({...m,[role]:Object.fromEntries(modules.map(m=>[m,perms.map(()=>val)]))}))
  const reset = () => setMatrix(m=>({...m,[role]:build(roleIndex)}))
  const addRole = () => openModal({type:'form',title:'Tambah role',kicker:'ROLE & PERMISSION',fields:[{name:'name',label:'Nama role',placeholder:'Supervisor',required:true},{name:'description',label:'Deskripsi',type:'textarea',wide:true},{name:'copy',label:'Salin permission dari',type:'select',options:['Tidak ada',...roles.map(([r])=>r)]}],success:'Role berhasil ditambahkan',onConfirm:(data)=>{const name=(data.name||'').trim();if(!name||roles.some(([r])=>r.toLowerCase()===name.toLowerCase()))return;setRoles(rs=>[...rs,[name,0,data.description||'Role kustom tanpa deskripsi.']]);const copyFrom=data.copy&&data.copy!=='Tidak ada'?data.copy:null;setMatrix(m=>({...m,[name]:copyFrom&&m[copyFrom]?JSON.parse(JSON.stringify(m[copyFrom])):Object.fromEntries(modules.map(mod=>[mod,perms.map(()=>false)]))}))}})
  return <div className="module-page"><div className="module-title"><button onClick={addRole}><Plus /> Tambah peran</button></div><div className="access-grid"><aside><h3>Daftar peran</h3>{roles.map(([r,u])=><button className={role===r?'active':''} onClick={()=>setRole(r)} key={r}><span><UserCog /></span><div><strong>{r}</strong><small>{u} pengguna</small></div><ChevronRight /></button>)}</aside><section><div className="permission-head"><div><h3>{current[0]}</h3><p>{current[2]}</p></div><span><ShieldCheck /> {activeCount} izin aktif</span></div><div className="permission-matrix"><div className="permission-row head"><span>Module</span>{perms.map(p=><span key={p}>{p[0].toUpperCase()+p.slice(1)}</span>)}</div>{modules.map((module,i)=><div className="permission-row" key={module}><b>{module}</b>{perms.map((p,j)=><label key={p}><input type="checkbox" checked={matrix[role][module][j]} onChange={()=>toggle(i,j)} /><i></i></label>)}</div>)}</div><div className="permission-actions"><button onClick={()=>setAll(true)}>Select All</button><button onClick={reset}>Reset</button><button className="save-button" onClick={()=>notify(`Permission ${role} berhasil disimpan (${activeCount} izin aktif)`,'success')}>Simpan permission</button></div></section></div></div>
}
import '../styles/access.css'

import {
  Building2, CalendarClock, ChevronDown, Download, ListFilter, Plus, Search,
} from 'lucide-react'
import RowActions from '../components/RowActions'
import entityConfigs from './entityConfigs'

export default function EntityPage({ route, openModal }) {
  const config=entityConfigs[route]||entityConfigs['/app/payment']
  const Icon=config.icon
  const formFields=[{name:'name',label:`Nama ${config.name}`,required:true},{name:'email',label:'Email',type:'email'},{name:'phone',label:'Telepon'},{name:'status',label:'Status',type:'select',options:['Aktif','Nonaktif','Pending']},{name:'description',label:'Catatan',type:'textarea',wide:true}]
  const add=()=>openModal({type:'form',title:`Tambah ${config.name}`,kicker:'TAMBAH DATA',size:'wide',image:config.image,imageLabel:config.name==='Membership'?'Foto member':'Avatar user',fields:formFields,success:`${config.name} berhasil ditambahkan`})
  const act=(row,action)=>{if(action==='detail')openModal({type:'detail',title:`Detail ${config.name}`,name:row[1],initials:String(row[1]).slice(0,2).toUpperCase(),data:Object.fromEntries(config.columns.map((c,i)=>[c,row[i]]))});if(action==='edit')add();if(action==='cancel')openModal({type:'confirm',title:`Batalkan ${config.name}`,message:`Batalkan ${row[0]}?`,description:'Status data akan diubah menjadi dibatalkan.',success:`${config.name} dibatalkan`});if(action==='delete')openModal({type:'confirm',title:`Hapus ${config.name}`,message:`Apakah Anda yakin ingin menghapus ${row[0]}?`,success:`${config.name} berhasil dihapus`})}
  return <div className="module-page"><div className="entity-stats">{config.stats.map(([n,v],i)=><div key={n}><span className={`metric-icon m-${i}`}><Icon /></span><small>{n}</small><strong>{v}</strong></div>)}</div><div className="data-card"><div className="data-toolbar"><label><Search /><input placeholder={`Cari ${config.name.toLowerCase()}`} /></label><button><CalendarClock /> Tanggal <ChevronDown /></button><button><Building2 /> Outlet <ChevronDown /></button><button><ListFilter /> Filter <ChevronDown /></button><button><Download /> Export <ChevronDown /></button><button className="primary" onClick={add}><Plus /> Tambah data</button></div><div className="data-table entity-table" style={{'--columns':config.columns.length}}><div className="data-row data-head">{config.columns.map(c=><span key={c}>{c}</span>)}<span>Aksi</span></div>{config.rows.map(row=><div className="data-row" key={row[0]}>{row.map((value,i)=><span key={`${row[0]}-${i}`}>{i===0?<b>{value}</b>:i===row.length-1?<em className={['Pending','Nonaktif','Failed'].includes(value)?'warning':''}>{value}</em>:value}</span>)}<span><RowActions extended onAction={(a)=>act(row,a)} /></span></div>)}</div><div className="table-footer"><span>Menampilkan 1–3 dari 128 data</span><div><button disabled>←</button><b>1</b><button>2</button><button>→</button></div></div></div></div>
}
import '../styles/entity.css'

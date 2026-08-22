import { useState } from 'react'
import {
  ArrowLeft, ArrowRight, Clock, MapPin, Search,
} from 'lucide-react'
import Logo from '../components/Logo'
import { COMPANIES, initials } from './companyData'

export default function CompanyPage({ navigate }) {
  const [q, setQ] = useState('')
  const needle = q.trim().toLowerCase()
  const shown = COMPANIES.filter(c => !needle || [c.name, c.tag, c.address].some(v => v.toLowerCase().includes(needle)))
  return <div className="company-page"><header className="company-nav"><div className="company-nav-inner"><Logo /><button className="company-back" onClick={() => navigate('/')}><ArrowLeft /> Beranda</button></div></header><main className="company-main"><div className="company-hero"><h1>Pilih perusahaan</h1><p>Pilih tempat untuk mulai pesan mandiri — tanpa antre, langsung dari meja Anda.</p></div><label className="company-search"><Search /><input placeholder="Cari nama atau kategori perusahaan" value={q} onChange={e => setQ(e.target.value)} /></label><div className="company-grid">{shown.map(c => <article className={`company-card ${!c.open ? 'closed' : ''}`} key={c.slug}><span className={`company-avatar ${c.tone}`}>{initials(c.name)}</span><section><b>{c.name}</b><em>{c.tag}</em><small><MapPin />{c.address}</small><small><Clock />{c.hours} WIB · <i className={c.open ? 'open' : ''}>{c.open ? 'Buka sekarang' : 'Tutup'}</i></small></section><button disabled={!c.open} onClick={() => navigate(`/company/${c.slug}/order`)}>Pilih perusahaan<ArrowRight /></button></article>)}{!shown.length && <p className="company-empty">Perusahaan tidak ditemukan.</p>}</div></main><footer className="company-foot">Didukung oleh <b>Bukanota</b> — self order untuk bisnis F&amp;B.</footer></div>
}
import '../styles/company.css'

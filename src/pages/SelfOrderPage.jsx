import { useRef, useState } from 'react'
import {
  ArrowLeft, Check, Clock, CreditCard, Minus, Plus, Printer, QrCode, ReceiptText, ShoppingBag, Smartphone, Utensils, X,
} from 'lucide-react'
import Toast from '../components/Toast'
import { CATS, COMPANIES, MENUS, initials, rupiah } from './companyData'

const PAYMENTS = [
  { key:'QRIS', desc:'Semua e-wallet & m-banking', icon:QrCode },
  { key:'GoPay', desc:'Bayar via aplikasi Gojek', icon:Smartphone },
  { key:'OVO', desc:'Bayar via aplikasi OVO', icon:Smartphone },
  { key:'DANA', desc:'Bayar via aplikasi DANA', icon:Smartphone },
  { key:'Kartu Debit', desc:'Tap / insert di kasir', icon:CreditCard },
  { key:'Kartu Kredit', desc:'Visa, Mastercard, JCB', icon:CreditCard },
]

const nowLabel = () => new Date().toLocaleString('id-ID', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })

export default function SelfOrderPage({ slug, navigate }) {
  const company = COMPANIES.find(c => c.slug === slug)
  const seq = useRef(0)
  const [cat, setCat] = useState('Semua')
  const [cart, setCart] = useState([])
  const [orderType, setOrderType] = useState('dinein')
  const [table, setTable] = useState('')
  const [method, setMethod] = useState('')
  const [payOpen, setPayOpen] = useState(false)
  const [done, setDone] = useState(null)
  const [toast, setToast] = useState(null)

  if (!company) return <div className="company-page"><main className="company-main"><div className="company-hero"><h1>Perusahaan tidak ditemukan</h1></div><button className="so-primary" onClick={() => navigate('/company')}>Kembali ke daftar perusahaan</button></main></div>

  const menus = MENUS[company.slug] || []
  const shown = cat === 'Semua' ? menus : menus.filter(m => m.cat === cat)
  const takeaway = orderType === 'takeaway'
  const add = (m) => { setDone(null); setCart(c => c.find(i => i.id === m.id) ? c.map(i => i.id === m.id ? { ...i, qty: i.qty + 1 } : i) : [...c, { ...m, qty: 1 }]) }
  const dec = (id) => setCart(c => c.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0))
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)

  const askPay = () => {
    const id = ++seq.current
    if (!cart.length) return setToast({ id, message: 'Keranjang masih kosong', type: 'error' })
    if (!takeaway && !table) return setToast({ id, message: 'Pilih nomor meja terlebih dahulu', type: 'error' })
    setMethod('')
    setPayOpen(true)
  }
  const confirmPay = () => {
    const id = ++seq.current
    setDone({ code:`SO-${String(id).padStart(4, '0')}`, place: takeaway ? 'Take away' : `Meja ${table}`, total, count, method, at:nowLabel() })
    setPayOpen(false)
    setToast({ id, message: 'Pembayaran berhasil — pesanan dikirim ke dapur' })
  }

  if (done) return <div className="company-page"><header className="company-nav"><div className="company-nav-inner"><button className="company-back" onClick={() => navigate('/company')}><ArrowLeft /> Daftar perusahaan</button><em>Self order</em></div></header><main className="company-main so-done-wrap"><div className="so-done"><span className="so-done-icon"><Check /></span><h2>Pesanan diterima!</h2><p>Pesanan <b>{done.code}</b> untuk <b>{done.place.toLowerCase()}</b> sedang diproses oleh {company.name}.</p><div className="so-done-meta"><span>{done.at}</span><i>{done.method}</i></div><div className="so-done-sum"><span>{done.count} item</span><b>{rupiah(done.total)}</b></div><small>Bukti pembayaran digital telah terkirim. Tunjukkan kode pesanan kepada pelayan.</small><div className="so-done-actions"><button className="so-primary" onClick={() => window.print()}><Printer /> Cetak struk</button></div><div className="so-done-actions"><button onClick={() => { setDone(null); setCart([]); setTable(''); setOrderType('dinein') }}>Pesan lagi</button><button onClick={() => navigate('/company')}>Ganti perusahaan</button></div></div></main><footer className="company-foot">Didukung oleh <b>Bukanota</b> — self order untuk bisnis F&amp;B.</footer><div className="so-receipt"><b>{company.name}</b><small>{company.address}</small><hr /><div className="rc-row"><span>No. Pesanan</span><b>{done.code}</b></div><div className="rc-row"><span>Waktu</span><b>{done.at}</b></div><div className="rc-row"><span>Area</span><b>{done.place}</b></div><div className="rc-row"><span>Pembayaran</span><b>{done.method} — Lunas</b></div><hr />{cart.map(i => <div className="rc-item" key={i.id}><span>{i.qty}× {i.name}<small>@ {rupiah(i.price)}</small></span><b>{rupiah(i.price * i.qty)}</b></div>)}<hr /><div className="rc-row rc-total"><span>Total</span><b>{rupiah(done.total)}</b></div><hr /><small className="rc-thanks">Terima kasih telah memesan!<br />Self order oleh Bukanota</small></div><Toast toast={toast} onClose={() => setToast(null)} /></div>

  return <div className="company-page"><header className="company-nav"><div className="company-nav-inner"><button className="company-back" onClick={() => navigate('/company')}><ArrowLeft /> Daftar perusahaan</button><em>Self order</em></div></header><main className="company-main"><div className="so-head"><span className={`company-avatar ${company.tone}`}>{initials(company.name)}</span><section><h1>{company.name}</h1><p>{company.tag} · <Clock />{company.hours} WIB · <i className={company.open ? 'open' : ''}>{company.open ? 'Buka' : 'Tutup'}</i></p></section><div className="so-controls"><div className="so-mode"><button className={!takeaway ? 'active' : ''} onClick={() => setOrderType('dinein')}><Utensils /> Makan di tempat</button><button className={takeaway ? 'active' : ''} onClick={() => setOrderType('takeaway')}><ShoppingBag /> Take away</button></div><label className={`so-table ${takeaway ? 'off' : ''}`}>Meja<select value={table} disabled={takeaway} onChange={e => setTable(e.target.value)}><option value="">{takeaway ? 'Tidak perlu meja' : 'Pilih meja'}</option>{(company.tables || []).map(t => <option key={t}>{t}</option>)}</select></label></div></div><div className="so-cats">{CATS.filter(c => c === 'Semua' || menus.some(m => m.cat === c)).map(c => <button key={c} className={cat === c ? 'active' : ''} onClick={() => setCat(c)}>{c}</button>)}</div><div className="so-grid"><div className="so-menus">{shown.map(m => <article className="so-card" key={m.id}><span className={`company-avatar ${company.tone}`}>{initials(m.name)}</span><section><b>{m.name}</b><small>{m.desc}</small><strong>{rupiah(m.price)}</strong></section>{(() => { const item = cart.find(i => i.id === m.id); return item ? <div className="so-step"><button onClick={() => dec(m.id)} aria-label={`Kurangi ${m.name}`}><Minus /></button><output>{item.qty}</output><button onClick={() => add(m)} aria-label={`Tambah ${m.name}`}><Plus /></button></div> : <button className="so-add" onClick={() => add(m)} aria-label={`Tambah ${m.name}`}><Plus /></button> })()}</article>)}</div><aside className="so-cart"><h3><ReceiptText /> Pesanan Anda{count > 0 && <b>{count} item</b>}</h3><div className="so-cart-type"><span>{takeaway ? <ShoppingBag /> : <Utensils />}{takeaway ? 'Take away' : 'Makan di tempat'}</span><small>{takeaway ? 'Dibungkus untuk dibawa pulang' : table ? `Meja ${table}` : 'Pilih nomor meja'}</small></div>{!cart.length && <p className="so-cart-empty">Belum ada item. Pilih menu di sebelah kiri untuk mulai memesan.</p>}{cart.map(i => <div className="so-cart-row" key={i.id}><section><b>{i.name}</b><small>{rupiah(i.price)} × {i.qty}</small></section><div className="so-step"><button onClick={() => dec(i.id)} aria-label={`Kurangi ${i.name}`}><Minus /></button><output>{i.qty}</output><button onClick={() => add(i)} aria-label={`Tambah ${i.name}`}><Plus /></button></div><strong>{rupiah(i.price * i.qty)}</strong></div>)}{!!cart.length && <div className="so-cart-total"><span>Total</span><b>{rupiah(total)}</b></div>}<button className="so-primary" disabled={!count} onClick={askPay}>Kirim pesanan ke kasir</button><small>Bayar tanpa uang tunai — pilih e-wallet atau kartu saat konfirmasi.</small></aside></div></main><footer className="company-foot">Didukung oleh <b>Bukanota</b> — self order untuk bisnis F&amp;B.</footer>{payOpen && <div className="app-modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setPayOpen(false) }}><div className="app-modal" role="dialog" aria-modal="true"><div className="app-modal-header"><div><h3>Metode pembayaran</h3><p>{count} item · {takeaway ? 'Take away' : `Meja ${table}`} · Total {rupiah(total)}</p></div><button onClick={() => setPayOpen(false)} aria-label="Tutup"><X /></button></div><div className="pay-grid">{PAYMENTS.map(p => { const Icon = p.icon; return <button key={p.key} className={method === p.key ? 'selected' : ''} onClick={() => setMethod(p.key)}><span><Icon /></span><section><b>{p.key}</b><small>{p.desc}</small></section>{method === p.key && <Check />}</button> })}</div><div className="app-modal-footer"><button onClick={() => setPayOpen(false)}>Batal</button><button className="primary" disabled={!method} onClick={confirmPay}>Bayar {rupiah(total)}</button></div></div></div>}<Toast toast={toast} onClose={() => setToast(null)} /></div>
}
import '../styles/company.css'

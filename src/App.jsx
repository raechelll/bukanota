import { useEffect, useId, useRef, useState } from 'react'
import {
  Activity, ArrowLeft, ArrowRight, BarChart3, Bell, BookOpen, Building2,
  Ban, CalendarClock, Check, ChevronDown, ChevronRight, CircleDollarSign, Clock3, CloudUpload,
  Coffee, CreditCard, Crown, Database, Download, Eye, EyeOff,
  FileText, Gift, Grid2X2, HardDriveDownload, Heart, History,
  Crop, ImagePlus, ListFilter, LockKeyhole, LogOut, Mail, Menu, MessageCircle, Minus, Package, Pencil, Plus, ReceiptText,
  RefreshCcw, RotateCcw, RotateCw, Save, Search, Settings2, ShieldCheck, ShoppingBag,
  ShoppingCart, Smartphone, Sparkles, Store, Trash2, Truck, Upload,
  UserCog, UserRound, Users, UtensilsCrossed, WalletCards, X, ZoomIn, Printer,
} from 'lucide-react'
import './App.css'

const industries = [
  { icon: UtensilsCrossed, name: 'Restoran', text: 'Meja, dapur, dan kasir terhubung.' },
  { icon: ShoppingBag, name: 'Retail', text: 'Transaksi cepat dan stok akurat.' },
  { icon: Coffee, name: 'Coffee shop', text: 'Antrian singkat, pelanggan kembali.' },
  { icon: Truck, name: 'Katering', text: 'Kelola pesanan dalam jumlah besar.' },
  { icon: Store, name: 'Toko & UMKM', text: 'Operasional harian lebih teratur.' },
  { icon: Building2, name: 'Multi outlet', text: 'Semua cabang dalam satu kontrol.' },
]

const coreFeatures = [
  { icon: ShoppingCart, name: 'Point of Sale', text: 'Transaksi cepat dengan tampilan kasir yang mudah dipelajari.' },
  { icon: WalletCards, name: 'Multi-payment', text: 'Tunai, kartu, QRIS, transfer, atau gabungkan metode pembayaran.' },
  { icon: Package, name: 'Manajemen stok', text: 'Pantau bahan baku, produk, opname, dan perpindahan stok.' },
  { icon: Crown, name: 'Membership', text: 'Kenali pelanggan dan bangun loyalitas dengan poin serta reward.' },
  { icon: ReceiptText, name: 'Split bill', text: 'Pisah dan gabungkan tagihan tanpa hitung ulang manual.' },
  { icon: Building2, name: 'Multi outlet', text: 'Bandingkan performa seluruh outlet dari satu dashboard.' },
  { icon: Smartphone, name: 'Self order', text: 'Pelanggan pesan langsung melalui QR di meja mereka.' },
  { icon: ShieldCheck, name: 'Hak akses', text: 'Batasi akses data dan menu sesuai peran setiap karyawan.' },
]

const serviceTabs = [
  { id: 'pos', label: 'Point of Sale', icon: ShoppingCart, title: 'Kasir yang terasa familiar sejak transaksi pertama.', copy: 'Katalog visual, pencarian cepat, catatan pesanan, dan pembayaran berada dalam satu alur yang ringkas.', bullets: ['Dine-in, takeaway, dan delivery', 'Split bill, join bill, diskon, dan pajak', 'Printer kasir dan dapur'], media: '/media/pos-screen.jpg' },
  { id: 'payment', label: 'Payment', icon: CreditCard, title: 'Semua cara bayar, satu rekonsiliasi.', copy: 'Terima tunai, kartu, transfer, e-wallet, dan QRIS dengan pencatatan yang lebih rapi.', bullets: ['Multi-payment satu transaksi', 'Riwayat pembayaran', 'Ringkasan shift kasir'], media: '/media/pos-screen.jpg' },
  { id: 'order', label: 'Taking Order', icon: FileText, title: 'Pesanan bergerak tanpa kertas yang tercecer.', copy: 'Pesanan dari meja diterima kasir dan area produksi secara real-time.', bullets: ['Captain order', 'Catatan khusus per menu', 'Status produksi'], media: '/media/pos-screen.jpg' },
  { id: 'member', label: 'Membership', icon: Users, title: 'Ubah kunjungan pertama menjadi pelanggan tetap.', copy: 'Simpan profil, riwayat, poin, dan preferensi pelanggan untuk layanan yang lebih personal.', bullets: ['Poin dan reward', 'Segmentasi pelanggan', 'Riwayat transaksi member'], media: '/media/promo-screen.jpg' },
  { id: 'stock', label: 'Manajemen Stok', icon: Package, title: 'Stok bergerak, Anda tetap tahu ke mana.', copy: 'Pantau stok per outlet hingga tingkat bahan baku dengan riwayat yang mudah ditelusuri.', bullets: ['Opname dan penyesuaian', 'Bill of material', 'Peringatan stok tipis'], media: '/media/inventory-screen.jpg' },
  { id: 'books', label: 'Akuntansi Pembukuan', icon: BookOpen, title: 'Pembukuan rapi tanpa pindah aplikasi.', copy: 'Transaksi operasional mengalir ke laporan keuangan yang siap ditinjau kapan saja.', bullets: ['Laba rugi dan neraca', 'Kas, bank, hutang, piutang', 'Jurnal transaksi'], media: '/media/promo-screen.jpg' },
]

const plans = [
  { name: 'Starter', desc: 'Untuk usaha yang baru mulai rapi.', price: '149', features: ['1 outlet & 2 pengguna', 'POS & multi-payment', 'Stok dasar', 'Laporan penjualan'] },
  { name: 'Growth', desc: 'Untuk bisnis yang sedang berkembang.', price: '299', popular: true, features: ['Hingga 3 outlet', 'Membership & loyalty', 'Stok & produksi lengkap', 'Laporan keuangan'] },
  { name: 'Business', desc: 'Untuk operasional berskala besar.', price: 'Hubungi', features: ['Outlet tanpa batas', 'Hak akses lanjutan', 'Backup terjadwal', 'Dukungan khusus'] },
]

const faqs = [
  ['Apakah BukaNota bisa digunakan tanpa internet?', 'Transaksi tetap dapat dicatat ketika koneksi tidak stabil dan disinkronkan kembali saat perangkat terhubung.'],
  ['Apakah cocok untuk bisnis selain restoran?', 'Ya. Alurnya dapat digunakan untuk retail, coffee shop, katering, salon, barbershop, dan berbagai jenis usaha.'],
  ['Bisakah saya memantau beberapa outlet?', 'Bisa. Penjualan, stok, dan performa seluruh outlet dapat dipantau dari satu dashboard.'],
  ['Apakah file gambar dan video tersimpan?', 'Pada demo frontend ini media hanya tampil selama sesi browser dan tidak dikirim ke server.'],
]

function Logo({ light = false }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="/" onClick={(e) => { if (location.pathname === '/') return; e.preventDefault(); history.pushState({}, '', '/'); dispatchEvent(new PopStateEvent('popstate')) }} aria-label="BukaNota - Beranda"><span className="brand-mark"><i></i><i></i><i></i><b>n</b></span><span>BUKA<span>NOTA</span></span></a>
}

function AnimatedVisual({ type = 'pos', compact = false }) {
  if (type === 'dashboard') return <div className="animated-ui dashboard-ui"><div className="aui-top"><span><Grid2X2 /> Dashboard</span><i></i><i></i></div><div className="aui-metrics"><b><small>Penjualan</small>Rp 48,6 jt<em>+12,8%</em></b><b><small>Transaksi</small>1.284<em>+8,2%</em></b><b><small>Laba kotor</small>Rp 18,4 jt<em>+14,2%</em></b></div><div className="aui-chart"><div className="chart-line"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><span>Tren penjualan · 30 hari</span></div><div className="aui-activity"><span></span><div><b>Outlet Kemang</b><small>Kontribusi tertinggi bulan ini</small></div><em>44%</em></div></div>
  if (type === 'stock') return <div className="animated-ui stock-ui"><div className="aui-top"><span><Package /> Inventori</span><button><Plus /> Produk</button></div><div className="stock-stats"><b><small>Total produk</small>284</b><b><small>Stok menipis</small>8</b></div>{[['Biji Kopi House Blend','12 kg','Aman'],['Susu UHT 1L','8 pcs','Menipis'],['Cup 12 oz','124 pcs','Aman'],['Sirup Aren','4 botol','Menipis']].map((r,i)=><div className="stock-anim-row" style={{'--delay':`${i*.1}s`}} key={r[0]}><i></i><span><b>{r[0]}</b><small>Bahan baku</small></span><strong>{r[1]}</strong><em className={r[2]==='Menipis'?'warn':''}>{r[2]}</em></div>)}</div>
  if (type === 'books') return <div className="animated-ui books-ui"><div className="aui-top"><span><BookOpen /> Laba rugi</span><button>Bulan ini <ChevronDown /></button></div><div className="profit-animated"><small>Laba bersih</small><strong>Rp 18.420.000</strong><em>+14,2% dari bulan lalu</em></div>{[['Pendapatan','100%','Rp 48,6 jt'],['Harga pokok','39%','Rp 18,7 jt'],['Biaya operasional','24%','Rp 11,4 jt']].map((r,i)=><div className="finance-bar" key={r[0]}><span>{r[0]}<b>{r[2]}</b></span><i><em style={{width:r[1],'--delay':`${i*.15}s`}}></em></i></div>)}</div>
  if (type === 'payment') return <div className="animated-ui payment-ui"><div className="aui-top"><span><CreditCard /> Pembayaran</span><b>Rp 162.000</b></div><div className="payment-options">{[['Tunai','Rp'],['QRIS','QR'],['Debit','DB'],['E-Wallet','EW']].map((p,i)=><button className={i===1?'active':''} key={p[0]}><i>{p[1]}</i><span>{p[0]}</span>{i===1&&<Check />}</button>)}</div><div className="payment-progress"><i></i><span>Menunggu pembayaran QRIS…</span></div><button className="visual-primary">Konfirmasi pembayaran <ArrowRight /></button></div>
  if (type === 'order') return <div className="animated-ui order-ui"><div className="aui-top"><span><FileText /> Taking Order</span><button><Plus /> Pesanan</button></div>{[['Meja 08','3 item','Diproses'],['Meja 12','5 item','Siap'],['Takeaway #42','2 item','Baru']].map((r,i)=><div className="order-card" style={{'--delay':`${i*.12}s`}} key={r[0]}><b>{r[0]}</b><small>{r[1]}</small><em>{r[2]}</em><div><span style={{width:`${[68,100,34][i]}%`}}></span></div></div>)}</div>
  if (type === 'member') return <div className="animated-ui member-ui"><div className="member-hero"><span>RA</span><div><b>Raisa Amelia</b><small>Gold Member · sejak 2024</small></div><Crown /></div><div className="member-points"><small>Poin tersedia</small><strong>1.240</strong><span>+180 bulan ini</span></div><div className="member-reward"><Gift /><div><b>Gratis Kopi Susu</b><small>Tukar dengan 1.000 poin</small></div><button>Tukar</button></div></div>
  return <div className={`animated-ui pos-ui ${compact ? 'compact' : ''}`}><div className="pos-anim-top"><span>BN</span><b>Kasir Utama</b><i></i><small>Outlet Kemang</small></div><div className="pos-anim-body"><aside>{[Grid2X2,ReceiptText,Package,Users].map((Icon,i)=><span className={i===0?'active':''} key={i}><Icon /></span>)}</aside><section><div className="pos-anim-heading"><div><small>Selamat pagi</small><b>Mulai transaksi</b></div><Search /></div><div className="pos-anim-tabs"><b>Semua</b><span>Kopi</span><span>Makanan</span></div><div className="pos-anim-products">{[['KS','Kopi Susu','22.000'],['AM','Americano','18.000'],['ML','Matcha Latte','26.000'],['RB','Rice Bowl','32.000']].map((p,i)=><div style={{'--delay':`${i*.1}s`}} key={p[0]}><i>{p[0]}</i><b>{p[1]}</b><small>Rp {p[2]}</small></div>)}</div></section><aside className="pos-anim-cart"><b>Pesanan #1042</b><small>Dine in · Meja 08</small><p><span>2 × Kopi Susu</span><b>44.000</b></p><p><span>1 × Americano</span><b>18.000</b></p><div><span>Total</span><b>Rp 62.000</b></div><button>Bayar sekarang <ArrowRight /></button></aside></div></div>
}

function LoginModal({ onClose, onSuccess }) {
  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState('admin')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [forgot, setForgot] = useState(false)
  const [channel, setChannel] = useState('email')
  const [sent, setSent] = useState(false)
  const submit = (e) => { e.preventDefault(); if (email === 'admin@gmail.com' && password === 'admin') onSuccess(); else setError('Email atau password demo tidak sesuai.') }
  if (forgot) return <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="login-modal forgot-modal"><button className="modal-close" onClick={onClose} aria-label="Tutup"><X /></button><button className="forgot-back" onClick={() => { setForgot(false); setSent(false) }}><ArrowLeft /> Kembali ke login</button><div className="login-heading"><span>PEMULIHAN AKUN</span><h2>Lupa password?</h2><p>Pilih cara untuk menerima instruksi reset password.</p></div>{sent ? <div className="forgot-success"><span><Check /></span><h3>Instruksi sudah disiapkan</h3><p>Demo reset melalui {channel === 'email' ? 'email' : 'WhatsApp'} berhasil. Tidak ada pesan nyata yang dikirim.</p><button onClick={() => { setForgot(false); setSent(false) }}>Kembali masuk</button></div> : <form onSubmit={(e) => { e.preventDefault(); setSent(true) }}><div className="recovery-options"><button type="button" className={channel === 'email' ? 'active' : ''} onClick={() => setChannel('email')}><Mail /><span><b>Lewat Email</b><small>Kirim tautan reset ke email akun</small></span></button><button type="button" className={channel === 'wa' ? 'active' : ''} onClick={() => setChannel('wa')}><MessageCircle /><span><b>Lewat WhatsApp</b><small>Kirim kode verifikasi ke nomor terdaftar</small></span></button></div><label>{channel === 'email' ? 'Email terdaftar' : 'Nomor WhatsApp'}<input defaultValue={channel === 'email' ? 'admin@gmail.com' : '0812 3456 7890'} /></label><button className="login-submit" type="submit">Kirim instruksi <ArrowRight /></button></form>}</div></div>
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="login-title"><div className="login-modal"><button className="modal-close" onClick={onClose} aria-label="Tutup"><X /></button><Logo /><div className="login-heading"><span>Selamat datang kembali</span><h2 id="login-title">Masuk ke BukaNota</h2><p>Kelola operasional bisnis dari satu tempat.</p></div><form onSubmit={submit}><label>Email<input value={email} onChange={e => setEmail(e.target.value)} type="email" /></label><label>Password<div className="password-field"><input value={password} onChange={e => setPassword(e.target.value)} type={show ? 'text' : 'password'} /><button type="button" onClick={() => setShow(!show)} aria-label="Tampilkan password">{show ? <EyeOff /> : <Eye />}</button></div></label><button className="forgot-link" type="button" onClick={() => setForgot(true)}>Lupa password?</button>{error && <p className="login-error">{error}</p>}<button className="login-submit" type="submit">Masuk <ArrowRight /></button></form><div className="demo-note"><LockKeyhole /><span><b>Akun demo</b>admin@gmail.com · password: admin</span></div></div></div>
}

function CropOverlay({ src, aspect = 1, onClose, onSave }) {
  const [zoom, setZoom] = useState(1)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [rotation, setRotation] = useState(0)
  useEffect(() => { const escape = (e) => e.key === 'Escape' && onClose(); addEventListener('keydown', escape); return () => removeEventListener('keydown', escape) }, [onClose])
  const crop = () => {
    const image = new Image()
    image.onload = () => {
      const width = aspect === 1 ? 600 : 800
      const height = Math.round(width / aspect)
      const canvas = document.createElement('canvas')
      canvas.width = width; canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#eef3f8'; ctx.fillRect(0, 0, width, height)
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight) * zoom
      ctx.translate(width / 2 + (x / 320) * width, height / 2 + (y / 320) * height)
      ctx.rotate(rotation * Math.PI / 180)
      ctx.scale(scale, scale)
      ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2)
      onSave(canvas.toDataURL('image/jpeg', .9))
    }
    image.src = src
  }
  return <div className="crop-overlay" role="dialog" aria-modal="true"><div className="crop-modal"><div className="app-modal-header"><div><span>CROP GAMBAR</span><h3>Sesuaikan area gambar</h3></div><button onClick={onClose}><X /></button></div><div className={`crop-stage ${aspect !== 1 ? 'landscape' : ''}`}><img src={src} alt="Pratinjau crop" style={{ transform: `translate(${x}px, ${y}px) scale(${zoom}) rotate(${rotation}deg)` }} /><i></i></div><div className="crop-controls"><label>Zoom <span><ZoomIn /><input type="range" min="1" max="3" step=".05" value={zoom} onChange={e => setZoom(Number(e.target.value))} /></span></label><label>Posisi horizontal <input type="range" min="-80" max="80" value={x} onChange={e => setX(Number(e.target.value))} /></label><label>Posisi vertikal <input type="range" min="-80" max="80" value={y} onChange={e => setY(Number(e.target.value))} /></label></div><div className="crop-actions"><button onClick={() => { setZoom(1); setX(0); setY(0); setRotation(0) }}><RefreshCcw /> Reset</button><button onClick={() => setRotation(r => (r + 90) % 360)}><RotateCw /> Putar</button><span></span><button onClick={onClose}>Batal</button><button className="primary" onClick={crop}><Crop /> Crop & simpan</button></div></div></div>
}

function ImageUploaderWithCrop({ label = 'Gambar', aspect = 1, value, onChange }) {
  const id = useId()
  const [cropSrc, setCropSrc] = useState('')
  const choose = (e) => { const file = e.target.files?.[0]; if (file) setCropSrc(URL.createObjectURL(file)); e.target.value = '' }
  return <div className="image-uploader"><span>{label}</span><div className={`upload-preview ${aspect !== 1 ? 'landscape' : ''}`}>{value ? <img src={value} alt={`Preview ${label}`} /> : <ImagePlus />}</div><div><label htmlFor={id}><Upload />{value ? 'Ganti gambar' : 'Pilih gambar'}<input id={id} type="file" accept="image/*" onChange={choose} /></label>{value && <button type="button" onClick={() => onChange('')}><Trash2 /> Hapus</button>}</div><small>Gambar akan dibuka di cropper sebelum digunakan.</small>{cropSrc && <CropOverlay src={cropSrc} aspect={aspect} onClose={() => setCropSrc('')} onSave={(data) => { onChange(data); URL.revokeObjectURL(cropSrc); setCropSrc('') }} />}</div>
}

function AppModal({ modal, onClose, notify }) {
  const [image, setImage] = useState(modal.initial?.image || '')
  useEffect(() => { const escape = (e) => e.key === 'Escape' && onClose(); addEventListener('keydown', escape); return () => removeEventListener('keydown', escape) }, [onClose])
  const submit = (e) => { e.preventDefault(); modal.onConfirm?.(Object.fromEntries(new FormData(e.currentTarget)), image); notify(modal.success || 'Data berhasil disimpan', 'success'); onClose() }
  return <div className="app-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && modal.type !== 'confirm' && onClose()}><div className={`app-modal ${modal.size || ''}`} role="dialog" aria-modal="true"><div className="app-modal-header"><div><h3>{modal.title}</h3>{modal.subtitle && <p>{modal.subtitle}</p>}</div><button onClick={onClose}><X /></button></div>{modal.type === 'detail' && <div className="detail-modal-body"><div className="detail-identity"><span>{modal.initials || 'BN'}</span><div><h4>{modal.name}</h4><p>{modal.description || 'Detail informasi data'}</p></div></div><div className="detail-grid">{Object.entries(modal.data || {}).map(([key, value]) => <div key={key}><span>{key}</span><strong>{value}</strong></div>)}</div></div>}{modal.type === 'confirm' && <div className="confirm-modal-body"><span className="danger-icon"><Trash2 /></span><h4>{modal.message || 'Apakah Anda yakin ingin menghapus data ini?'}</h4><p>{modal.description || 'Tindakan ini tidak dapat dibatalkan pada sesi demo.'}</p></div>}{modal.type === 'form' && <form id="app-modal-form" className="crud-form" onSubmit={submit}>{modal.image && <ImageUploaderWithCrop label={modal.imageLabel || 'Gambar'} aspect={modal.aspect || 1} value={image} onChange={setImage} />}<div className="crud-fields">{(modal.fields || []).map(field => <label className={field.wide ? 'wide' : ''} key={field.name}>{field.label}{field.type === 'select' ? <select name={field.name} defaultValue={field.value || ''}>{(field.options || []).map(option => <option key={option}>{option}</option>)}</select> : field.type === 'textarea' ? <textarea name={field.name} defaultValue={field.value || ''} placeholder={field.placeholder} /> : <input name={field.name} type={field.type || 'text'} defaultValue={field.value || ''} placeholder={field.placeholder} required={field.required} />}</label>)}</div></form>}<div className="app-modal-footer"><button onClick={onClose}>Batal</button>{modal.type === 'confirm' ? <button className="danger" onClick={() => { modal.onConfirm?.(); notify(modal.success || 'Data berhasil dihapus', 'success'); onClose() }}><Trash2 /> Hapus</button> : modal.type === 'detail' ? <button className="primary" onClick={onClose}>Selesai</button> : <button className="primary" form="app-modal-form" type="submit"><Save /> Simpan</button>}</div></div></div>
}

function Toast({ toast, onClose }) {
  useEffect(() => { if (!toast) return; const timer = setTimeout(onClose, 3200); return () => clearTimeout(timer) }, [toast, onClose])
  if (!toast) return null
  return <div className={`app-toast ${toast.type || 'success'}`}><span>{toast.type === 'error' ? <X /> : <Check />}</span><div><b>{toast.type === 'error' ? 'Terjadi kesalahan' : 'Berhasil'}</b><p>{toast.message}</p></div><button onClick={onClose}><X /></button></div>
}

function useHoverPopover(delay = 180) {
  const [open, setOpen] = useState(false)
  const timer = useRef(null)
  const enter = () => { clearTimeout(timer.current); setOpen(true) }
  const leave = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), delay) }
  useEffect(() => () => clearTimeout(timer.current), [])
  return [open, { onMouseEnter: enter, onMouseLeave: leave }, setOpen]
}

function RowActions({ onAction, extended = false }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => { const close = (e) => !ref.current?.contains(e.target) && setOpen(false); addEventListener('mousedown', close); return () => removeEventListener('mousedown', close) }, [])
  const run = (action) => { setOpen(false); onAction(action) }
  return <div className="row-actions" ref={ref} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}><button aria-label="Aksi data" onClick={() => setOpen(!open)}><span className="kebab-dots" aria-hidden="true"></span></button>{open && <div><button onClick={() => run('detail')}><Eye /> Detail</button><button onClick={() => run('edit')}><Pencil /> Edit</button>{extended && <button onClick={() => run('cancel')}><Ban /> Cancel</button>}<button className="danger" onClick={() => run('delete')}><Trash2 /> Delete</button></div>}</div>
}

function LandingPage({ onLogin, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('pos')
  const [openFaq, setOpenFaq] = useState(0)
  const [annual, setAnnual] = useState(true)
  const activeService = serviceTabs.find(s => s.id === activeTab)
  useEffect(() => {
    const nodes = [...document.querySelectorAll('.landing-main > section:not(.hero-section), .landing-main .section-heading')]
    nodes.forEach(node => node.classList.add('reveal'))
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('revealed')), { threshold: .12 })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])
  return <div className="site-shell">
    <header className="navbar"><div className="container nav-inner"><Logo /><nav className={menuOpen ? 'nav-links open' : 'nav-links'}><a href="#solutions" onClick={() => setMenuOpen(false)}>Solusi</a><a href="#features" onClick={() => setMenuOpen(false)}>Fitur</a><a href="#operations" onClick={() => setMenuOpen(false)}>Produk</a><a href="#pricing" onClick={() => setMenuOpen(false)}>Harga</a><a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a><button onClick={onLogin}>Masuk</button></nav><div className="nav-actions"><button className="login-link" onClick={onLogin}>Masuk</button><a className="button small" href="#pricing">Coba gratis</a></div><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Buka menu">{menuOpen ? <X /> : <Menu />}</button></div></header>
    <main className="landing-main">
      <section className="hero-section" id="home"><div className="container hero-grid"><div className="hero-copy hero-enter"><h1>Kelola bisnis tanpa<br />ribet.</h1><p>Dari transaksi pertama hingga laporan akhir bulan—semua lebih cepat, rapi, dan mudah dipantau dalam satu sistem.</p><div className="hero-actions"><button className="button" onClick={onLogin}>Mulai gratis <ArrowRight /></button><a className="text-link" href="#features">Lihat semua fitur <ChevronDown /></a></div></div><div className="hero-media hero-enter delay"><div className="soft-orb"></div><AnimatedVisual type="pos" /></div></div></section>
      <section className="trust-strip"><div className="container"><span>Dibuat untuk operasional harian</span><div><b>TRANSAKSI</b><b>STOK</b><b>LOYALTY</b><b>MULTI OUTLET</b><b>PEMBUKUAN</b></div></div></section>
      <section className="section industries" id="solutions"><div className="container"><div className="section-heading centered"><h2>Satu sistem, untuk berbagai cara berbisnis.</h2><p>Fleksibel mengikuti alur kerja Anda—bukan sebaliknya.</p></div><div className="industry-grid">{industries.map(({ icon: Icon, name, text }) => <article key={name}><span><Icon /></span><h3>{name}</h3><p>{text}</p><a href="#features">Pelajari <ChevronRight /></a></article>)}</div></div></section>
      <section className="section feature-section" id="features"><div className="container"><div className="section-heading split"><div><h2>Lengkap untuk operasional.<br />Tetap mudah digunakan.</h2></div><p>Fitur esensial untuk menjalankan bisnis harian dan mengambil keputusan dengan lebih percaya diri.</p></div><div className="feature-grid">{coreFeatures.map(({ icon: Icon, name, text }, i) => <article className={i < 2 ? 'feature-highlight' : ''} key={name}><span><Icon /></span><div><h3>{name}</h3><p>{text}</p></div><ChevronRight className="feature-arrow" /></article>)}</div></div></section>
      <section className="section service-section" id="operations"><div className="container"><div className="section-heading centered narrow"><h2>Alur sederhana dari depan hingga belakang.</h2></div><div className="service-tabs" role="tablist">{serviceTabs.map(({ id, label, icon: Icon }) => <button className={activeTab === id ? 'active' : ''} onClick={() => setActiveTab(id)} key={id}><Icon /><span>{label}</span></button>)}</div><div className="service-content"><div className="service-copy"><span className="number-label">FITUR BUKANOTA</span><h3>{activeService.title}</h3><p>{activeService.copy}</p><ul>{activeService.bullets.map(b => <li key={b}><Check />{b}</li>)}</ul><button className="outline-button" onClick={() => navigate('/app/pos')}>Buka tampilan POS <ArrowRight /></button></div><div className="service-visual"><AnimatedVisual key={activeService.id} type={activeService.id} compact /></div></div></div></section>
      <section className="section dashboard-section"><div className="container"><div className="section-heading split light"><div><h2>Lihat kondisi bisnis tanpa menunggu laporan.</h2></div><p>Penjualan, transaksi, dan performa outlet diperbarui dalam satu tampilan yang mudah dibaca.</p></div><AnimatedVisual type="dashboard" /></div></section>
      <section className="section stock-section"><div className="container two-col"><div className="product-copy"><h2>Tahu apa yang tersedia. Sebelum pelanggan bertanya.</h2><p>Pantau bahan baku dan produk, lakukan opname, serta lacak perpindahan antar outlet.</p><ul><li><Check />Stok detail per outlet dan gudang</li><li><Check />Opname, produksi, dan bill of material</li><li><Check />Peringatan stok minimum</li></ul><button className="text-button" onClick={() => navigate('/app/inventory')}>Buka halaman inventori <ArrowRight /></button></div><AnimatedVisual type="stock" /></div></section>
      <section className="section loyalty-section"><div className="container two-col reverse"><div className="loyalty-preview"><div className="member-card"><span>BUKANOTA <Crown /></span><small>MEMBER</small><strong>1.240</strong><p>Poin tersedia</p><div><b>RA</b><span><strong>Raisa Amelia</strong><small>Gold Member</small></span></div></div><div className="reward-card"><div><Gift /><span><small>Reward aktif</small><strong>Gratis Kopi Susu</strong></span></div><b>1.000 poin</b><button>Tukar reward</button></div></div><div className="product-copy"><h2>Buat pelanggan punya alasan untuk kembali.</h2><p>Bangun program loyalitas yang mudah dipakai tim dan menarik untuk pelanggan.</p><div className="mini-features"><div><Gift /><span><strong>Promo fleksibel</strong><small>Diskon, bundling, dan hadiah item.</small></span></div><div><Heart /><span><strong>Poin & membership</strong><small>Reward berdasarkan kebiasaan pelanggan.</small></span></div></div></div></div></section>
      <section className="section finance-section"><div className="container two-col"><div className="product-copy"><h2>Angka yang lebih mudah dimengerti.</h2><p>Bergerak dari transaksi menuju gambaran keuangan yang utuh tanpa merapikan data berulang kali.</p><div className="report-links"><a href="#pricing">Laba rugi & neraca <ChevronRight /></a><a href="#pricing">Kas, bank, hutang & piutang <ChevronRight /></a><a href="#pricing">Jurnal & biaya operasional <ChevronRight /></a></div></div><AnimatedVisual type="books" /></div></section>
      <section className="section pricing-section" id="pricing"><div className="container"><div className="section-heading centered narrow"><h2>Pilih paket yang tumbuh bersama bisnis.</h2><p>Mulai dengan kebutuhan hari ini. Tingkatkan kapan saja.</p><div className="billing-toggle"><button className={!annual ? 'active' : ''} onClick={() => setAnnual(false)}>Bulanan</button><button className={annual ? 'active' : ''} onClick={() => setAnnual(true)}>Tahunan <em>Hemat 20%</em></button></div></div><div className="pricing-grid">{plans.map(plan => <article className={plan.popular ? 'popular' : ''} key={plan.name}>{plan.popular && <span className="popular-label">PALING POPULER</span>}<h3>{plan.name}</h3><p>{plan.desc}</p><div className="price">{plan.price === 'Hubungi' ? <strong className="contact-price">Hubungi kami</strong> : <><small>Rp</small><strong>{annual ? plan.price : Math.round(Number(plan.price) * 1.2)}</strong><span>rb<br />/bulan</span></>}</div><button onClick={onLogin}>{plan.name === 'Business' ? 'Hubungi kami' : 'Coba gratis'}</button><ul>{plan.features.map(f => <li key={f}><Check />{f}</li>)}</ul></article>)}</div></div></section>
      <section className="section faq-section" id="faq"><div className="container faq-grid"><div className="faq-intro"><h2>Pertanyaan yang sering ditanyakan.</h2><p>Belum menemukan jawaban? Tim kami siap membantu kebutuhan bisnis Anda.</p></div><div className="faq-list">{faqs.map(([q, a], i) => <article className={openFaq === i ? 'open' : ''} key={q}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{q}</span>{openFaq === i ? <Minus /> : <Plus />}</button><div><p>{a}</p></div></article>)}</div></div></section>
    </main>
    <footer><div className="container footer-grid"><div className="footer-brand"><Logo light /><p>Sistem manajemen bisnis yang membantu usaha Indonesia tumbuh lebih rapi.</p></div><div><h3>Layanan</h3>{serviceTabs.map(s => <a key={s.id} href="#operations" onClick={() => setActiveTab(s.id)}>{s.label}</a>)}</div><div><h3>Solusi bisnis</h3>{industries.slice(0, 5).map(i => <a key={i.name} href="#solutions">{i.name}</a>)}</div><div><h3>Perusahaan</h3><a href="#pricing">Harga</a><a href="#faq">FAQ</a><a href="#faq">Hubungi kami</a></div></div><div className="container footer-bottom"><span>© 2026 BukaNota. Seluruh hak dilindungi.</span><span>Produk dari PT Meta Digital Informasi</span></div></footer>
  </div>
}

const adminMenu = [
  { label: 'Operasional', items: [['Dashboard', '/app/dashboard', Grid2X2], ['Transaksi', '/app/transactions', ShoppingCart], ['Payment', '/app/payment', CreditCard], ['Membership', '/app/membership', Users]] },
  { label: 'Bisnis', items: [['Manajemen Stok', '/app/inventory', Package], ['Akuntansi & Pembukuan', '/app/accounting', BookOpen], ['User', '/app/users', UserRound], ['Outlet', '/app/outlet', Building2]] },
  { label: 'Sistem', items: [['Log Aktivitas', '/app/logs', Activity], ['Backup', '/app/backup', Database], ['Hak Akses', '/app/access', UserCog], ['Setting', '/app/settings', Settings2], ['Deleted Data', '/app/deleted', Trash2]] },
]

function GlobalSearch({ navigate }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const results = adminMenu.flatMap(g => g.items).filter(([name]) => name.toLowerCase().includes(query.trim().toLowerCase()))
  return <div className="global-search">
    <Search />
    <input value={query} placeholder="Cari produk, transaksi, member..." onChange={(e)=>{setQuery(e.target.value); setOpen(true)}} onFocus={()=>setOpen(true)} onBlur={()=>setTimeout(()=>setOpen(false),120)} onKeyDown={(e)=>{ if(e.key==='Escape'){ setOpen(false); e.target.blur() } }} />
    {open && query.trim() ? <div className="search-pop">
      {results.length ? results.map(([name, path, Icon]) => <button key={path} onMouseDown={()=>{navigate(path); setQuery(''); setOpen(false)}}><Icon /><section><b>{name}</b><small>Buka halaman {name}</small></section></button>) : <p>Tidak ada hasil untuk "{query}"</p>}
    </div> : <kbd>⌘ K</kbd>}
  </div>
}

function AdminShell({ route, navigate, onLogout, children }) {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [expanded, setExpanded] = useState({ Operasional: true, Bisnis: true, Sistem: true })
  const [notifications, hoverNotifications, setNotifications] = useHoverPopover()
  const [profile, hoverProfile, setProfile] = useHoverPopover()
  const [outletOpen, hoverOutlet, setOutletOpen] = useHoverPopover()
  const [selectedOutlet, setSelectedOutlet] = useState('Outlet Kemang')
  const [dark, setDark] = useState(false)
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; return () => { delete document.documentElement.dataset.theme } }, [dark])
  const item = adminMenu.flatMap(g => g.items).find(x => x[1] === route)
  return <div className={`admin-app ${collapsed ? 'sidebar-collapsed' : ''}`}>
    <aside className={open ? 'admin-sidebar open' : 'admin-sidebar'}>
      <div className="admin-brand"><Logo light /><button className="desktop-collapse" onClick={() => setCollapsed(!collapsed)} aria-label="Collapse sidebar"><ChevronRight /></button><button className="mobile-close" onClick={() => setOpen(false)}><X /></button></div>
      <div className="admin-nav-scroll">{adminMenu.map(group => <div className="admin-group" key={group.label}><button className="group-toggle" onClick={() => setExpanded(s => ({ ...s, [group.label]: !s[group.label] }))}><span>{group.label}</span><ChevronDown className={expanded[group.label] ? 'open' : ''} /></button>{expanded[group.label] && <nav>{group.items.map(([name, path, Icon]) => <button title={name} key={path} className={route === path ? 'active' : ''} onClick={() => { navigate(path); setOpen(false) }}><Icon /><span>{name}</span>{name === 'Payment' && <em>12</em>}</button>)}</nav>}</div>)}      </div>
    </aside>
    <main className="admin-content">
      <header className="admin-header">
        <button className="admin-menu" onClick={() => setOpen(true)}><Menu /></button>
        <div className="admin-page-name"><small>Home / {item?.[0] || 'Dashboard'}</small><h1>{item?.[0] || 'Dashboard'}</h1></div>
        <GlobalSearch navigate={navigate} />
        <div className="admin-actions">
          <div className="header-popover outlet-popover" {...hoverOutlet}>
            <button className="outlet-selector" onClick={() => setOutletOpen(!outletOpen)}><span className="outlet-icon"><Building2 /></span><span className="outlet-copy"><small>Outlet aktif</small><b>{selectedOutlet.replace('Outlet ', '')}</b></span><ChevronDown /></button>
            {outletOpen && <div className="outlet-pop"><div><span><Building2 /></span><section><b>Pilih outlet</b><small>Data mengikuti outlet aktif</small></section></div>{['Outlet Kemang','Outlet Cilandak','Semua Outlet'].map(name => <button className={selectedOutlet === name ? 'active' : ''} key={name} onClick={() => { setSelectedOutlet(name); setOutletOpen(false) }}><span>{name.slice(0,2).toUpperCase()}</span><section><b>{name}</b><small>{name === 'Semua Outlet' ? 'Ringkasan seluruh bisnis' : 'Online · Jakarta'}</small></section>{selectedOutlet === name && <Check />}</button>)}</div>}
          </div>
          <button className="theme-button" onClick={() => setDark(!dark)} title="Ganti tema">{dark ? '☀' : '◐'}</button>
          <div className="header-popover" {...hoverNotifications}><button onClick={() => setNotifications(!notifications)}><Bell /><i></i></button>{notifications && <div className="notification-pop"><div className="pop-title"><span><Bell /></span><section><b>Notifikasi</b><small>3 informasi terbaru</small></section></div><p><Package /><span><b>Stok hampir habis</b><small>Susu UHT tersisa 8 pcs</small></span></p><p><CreditCard /><span><b>Pembayaran berhasil</b><small>INV-1042 · Rp 162.000</small></span></p><p><Database /><span><b>Backup selesai</b><small>Hari ini, 02:00 WIB</small></span></p></div>}</div>
          <div className="header-popover" {...hoverProfile}><button className="header-avatar" onClick={() => setProfile(!profile)}>AD</button>{profile && <div className="profile-pop"><div className="profile-pop-head"><span>AD</span><section><b>Admin Demo</b><small>admin@gmail.com</small><em>Super Admin</em></section></div><nav><button onClick={() => navigate('/app/profile')}><span><UserRound /></span><section><b>Profile</b><small>Informasi akun</small></section><ChevronRight /></button><button onClick={() => navigate('/app/settings')}><span><Settings2 /></span><section><b>Setting</b><small>Preferensi aplikasi</small></section><ChevronRight /></button></nav><button className="profile-logout" onClick={onLogout}><LogOut /> Logout dari akun</button></div>}</div>
        </div>
      </header>
      {children}
    </main>
  </div>
}

function DashboardPage({ navigate }) {
  const metrics = [['Penjualan hari ini','Rp 4,86 jt','12,8%',WalletCards],['Total transaksi','128','8,2%',ReceiptText],['Pendapatan','Rp 48,6 jt','10,4%',CircleDollarSign],['Laba kotor','Rp 18,4 jt','14,2%',BarChart3],['Produk terjual','426','6,8%',ShoppingBag],['Pelanggan','1.284','4,1%',Users],['Member aktif','864','7,5%',Crown],['Stok menipis','8','-2',Package]]
  return <div className="workspace dashboard-workspace"><div className="welcome-row"><div><h2>Selamat siang, Admin</h2><p>Berikut ringkasan performa seluruh outlet hari ini.</p></div><div className="dashboard-filters"><button>7 hari <ChevronDown /></button><button><CalendarClock /> Custom date</button><button className="primary" onClick={() => navigate('/app/pos')}><Plus /> Transaksi baru</button></div></div><div className="workspace-metrics expanded">{metrics.map(([n,v,g,Icon],i)=><div key={n}><span className={`metric-icon m-${i%4}`}><Icon /></span><small>{n}</small><strong>{v}</strong><em className={g.startsWith('-')?'down':''}>{g.startsWith('-')?'↓':'↗'} {g} <i>dari kemarin</i></em></div>)}</div><div className="dashboard-chart-grid"><div className="sales-panel"><div className="panel-head"><div><strong>Grafik penjualan</strong><small>Penjualan seluruh outlet · 7 hari</small></div><button>7 hari <ChevronDown /></button></div><div className="sales-total"><strong>Rp 28.640.000</strong><span>↗ 10,4%</span></div><div className="line-chart"><svg viewBox="0 0 700 190" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1770df" stopOpacity=".22"/><stop offset="1" stopColor="#1770df" stopOpacity="0"/></linearGradient></defs><path className="area" d="M0 145 C60 120,90 150,145 110 S230 130,280 80 S370 105,420 58 S510 78,560 42 S650 70,700 22 L700 190 L0 190Z"/><path d="M0 145 C60 120,90 150,145 110 S230 130,280 80 S370 105,420 58 S510 78,560 42 S650 70,700 22"/><circle cx="700" cy="22" r="5"/></svg><div>{['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map(d=><span key={d}>{d}</span>)}</div></div></div><div className="donut-panel"><div className="panel-head"><div><strong>Metode pembayaran</strong><small>Distribusi transaksi</small></div></div><div className="donut-wrap"><div className="donut-chart"><strong>1.284<small>transaksi</small></strong></div><div>{[['Cash','38%'],['QRIS','32%'],['Transfer','14%'],['E-Wallet','10%'],['Kartu','6%']].map((r,i)=><p key={r[0]}><i className={`d-${i}`}></i><span>{r[0]}</span><b>{r[1]}</b></p>)}</div></div></div></div><div className="dashboard-lists"><div className="quick-panel"><div className="panel-head"><div><strong>Produk terlaris</strong><small>Berdasarkan jumlah terjual</small></div><button>Lihat semua</button></div>{[['KS','Kopi Susu Aren','186','Rp 4,09 jt'],['ML','Matcha Latte','142','Rp 3,69 jt'],['RB','Rice Bowl Ayam','98','Rp 3,13 jt']].map(r=><div className="top-product" key={r[1]}><span>{r[0]}</span><div><b>{r[1]}</b><small>{r[2]} terjual</small></div><strong>{r[3]}</strong></div>)}</div><div className="quick-panel"><div className="panel-head"><div><strong>Stok hampir habis</strong><small>Perlu segera diisi ulang</small></div><button onClick={()=>navigate('/app/inventory')}>Inventori</button></div>{[['Susu UHT 1L','8','12'],['Sirup Aren','4','10'],['Cup 12 oz','18','30']].map(r=><div className="low-stock" key={r[0]}><div><b>{r[0]}</b><small>Minimum {r[2]}</small></div><span>{r[1]} tersisa</span></div>)}</div><div className="quick-panel"><div className="panel-head"><div><strong>Aktivitas terbaru</strong><small>Diperbarui real-time</small></div></div>{[['AD','Admin menambah produk','2 menit lalu'],['KS','Kasir membuat transaksi','5 menit lalu'],['ST','Stok Susu UHT diubah','12 menit lalu'],['DB','Backup otomatis dibuat','1 jam lalu']].map(r=><div className="activity-mini" key={r[1]}><span>{r[0]}</span><div><b>{r[1]}</b><small>{r[2]}</small></div></div>)}</div></div><div className="dashboard-transactions data-card"><div className="card-heading"><h3>Transaksi terbaru</h3><p>Transaksi dari seluruh outlet</p></div><div className="data-table dash-table"><div className="data-row data-head"><span>Invoice</span><span>Customer</span><span>Kasir</span><span>Outlet</span><span>Total</span><span>Payment</span><span>Status</span></div>{[['INV-20260820-001','Andi Wijaya','Rina','Kemang','Rp 162.000','QRIS'],['INV-20260820-002','Sarah Putri','Doni','Cilandak','Rp 84.000','Cash'],['INV-20260820-003','Kevin Lim','Rina','Kemang','Rp 126.000','Debit']].map(r=><div className="data-row" key={r[0]}>{r.map((v,i)=><span key={v}>{i===0?<b>{v}</b>:i===6?<em>Paid</em>:v}</span>)}</div>)}</div></div></div>
}

function TransaksiPage({ navigate, openModal, notify }) {
  const [addOpen, setAddOpen] = useState(false)
  const [tab, setTab] = useState('Orderan')
  const [status, setStatus] = useState('Semua')
  const orders = [['INV-20260820-001','Andi Wijaya','Kemang','Rp 162.000','Paid'],['INV-20260820-002','Sarah Putri','Cilandak','Rp 84.000','Paid'],['INV-20260820-003','Kevin Lim','Kemang','Rp 126.000','Pending']]
  const [reservasi, setReservasi] = useState([
    ['RSV-20260821-001','Raisa Amelia','21 Agu 2026 · 19:00','4 orang','Meja 04','Confirmed'],
    ['RSV-20260821-002','Budi Santoso','22 Agu 2026 · 12:30','2 orang','Meja 01','Waiting'],
    ['RSV-20260820-003','Dewi Lestari','20 Agu 2026 · 18:00','6 orang','Meja 07','Confirmed'],
  ])
  const reservasiModal = () => { setAddOpen(false); openModal({ type: 'form', title: 'Tambah reservasi', kicker: 'RESERVASI', size: 'wide', fields: [{ name: 'name', label: 'Nama pelanggan', required: true }, { name: 'phone', label: 'No. telepon', placeholder: '0812...' }, { name: 'date', label: 'Tanggal', type: 'date' }, { name: 'time', label: 'Jam', type: 'time' }, { name: 'people', label: 'Jumlah orang', type: 'number' }, { name: 'table', label: 'Meja', type: 'select', options: ['Meja 01','Meja 02','Meja 03','Meja 04','Meja 05'] }, { name: 'note', label: 'Catatan', type: 'textarea', wide: true }], success: 'Reservasi berhasil ditambahkan', onConfirm: (data) => setReservasi(rows => [[`RSV-${Date.now()}`, data.name, `${data.date || '-'} · ${data.time || '-'}`, `${data.people || 2} orang`, data.table, 'Confirmed'], ...rows]) }) }
  const addBtn = <div className="add-wrap">
    <button className={addOpen ? 'open' : ''} onClick={()=>setAddOpen(v=>!v)}><Plus /> Tambah <ChevronDown /></button>
    {addOpen && <><div className="add-backdrop" onClick={()=>setAddOpen(false)}></div><div className="add-menu">
      <button onClick={()=>navigate('/app/pos')}><ShoppingCart /><section><b>Orderan baru</b><small>Buat transaksi lewat kasir POS</small></section><ArrowRight /></button>
      <button onClick={reservasiModal}><CalendarClock /><section><b>Reservasi</b><small>Catat reservasi meja pelanggan</small></section><ArrowRight /></button>
    </div></>}
  </div>
  return <div className="module-page">
    <div className="module-tabs">{['Orderan','Reservasi'].map(t => <button key={t} className={tab === t ? 'active' : ''} onClick={()=>{setTab(t); setStatus('Semua')}}>{t}</button>)}</div>
    {tab === 'Orderan' ? <div className="data-card"><div className="data-toolbar"><label><Search /><input placeholder="Cari invoice atau customer" /></label><select className="status-select" value={status} onChange={(e)=>setStatus(e.target.value)}>{['Semua','Paid','Pending'].map(s => <option key={s} value={s}>{s === 'Semua' ? 'Semua status' : s}</option>)}</select><button><Download /> Export</button>{addBtn}</div>
      <table className="list-table"><thead><tr><th>Invoice</th><th>Customer</th><th>Outlet</th><th>Total</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>{orders.filter(r => status === 'Semua' || r[4] === status).map(r => <tr key={r[0]}><td><b>{r[0]}</b></td><td>{r[1]}</td><td>{r[2]}</td><td><b>{r[3]}</b></td><td><em className={r[4]==='Pending'?'warning':''}>{r[4]}</em></td><td><RowActions onAction={(a)=>a==='detail'?openModal({type:'detail',title:'Detail transaksi',name:r[1],initials:r[1].slice(0,2).toUpperCase(),description:`Invoice ${r[0]}`,data:{Invoice:r[0],Outlet:r[2],Total:r[3],Status:r[4]}}):a==='edit'?notify('Transaksi yang sudah dibayar tidak bisa diubah','warning'):openModal({type:'confirm',title:'Refund transaksi',message:`Refund ${r[0]}?`,success:'Refund berhasil diproses'})} /></td></tr>)}
          {!orders.some(r => status === 'Semua' || r[4] === status) && <tr><td colSpan={6} className="empty-row">Tidak ada transaksi dengan status ini.</td></tr>}
        </tbody>
      </table>
    </div> : <div className="data-card"><div className="data-toolbar"><label><Search /><input placeholder="Cari nama atau kode reservasi" /></label><select className="status-select" value={status} onChange={(e)=>setStatus(e.target.value)}>{['Semua','Confirmed','Waiting'].map(s => <option key={s} value={s}>{s === 'Semua' ? 'Semua status' : s}</option>)}</select><button><Download /> Export</button>{addBtn}</div>
      <table className="list-table"><thead><tr><th>Kode</th><th>Pelanggan</th><th>Waktu</th><th>Jumlah</th><th>Meja</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>{reservasi.filter(r => status === 'Semua' || r[5] === status).map(r => <tr key={r[0]}><td><b>{r[0]}</b></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td><em className={r[5]==='Waiting'?'warning':''}>{r[5]}</em></td><td><RowActions onAction={(a)=>a==='detail'?openModal({type:'detail',title:'Detail reservasi',name:r[1],initials:r[1].slice(0,2).toUpperCase(),description:`Kode ${r[0]}`,data:{Waktu:r[2],Jumlah:r[3],Meja:r[4],Status:r[5]}}):a==='edit'?notify('Buka form tambah untuk reservasi baru','info'):openModal({type:'confirm',title:'Batalkan reservasi',message:`Batalkan reservasi ${r[1]}?`,success:'Reservasi berhasil dibatalkan'})} /></td></tr>)}
          {!reservasi.some(r => status === 'Semua' || r[5] === status) && <tr><td colSpan={7} className="empty-row">Tidak ada reservasi dengan status ini.</td></tr>}
        </tbody>
      </table>
    </div>}
  </div>
}

const posProducts = [
  ['Kopi Susu Aren', 'Kopi', 22000, 'KS', 'https://akcdn.detik.net.id/community/media/visual/2024/10/16/es-kopi-susu-gula-aren.jpeg?w=650'], ['Americano', 'Kopi', 18000, 'AM'], ['Matcha Latte', 'Minuman', 26000, 'ML', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbmlzV5cenuuSYMnMYxRBp2K7U9TTQOn_I6C9QTUnUFhT3-J5rz4AIDD7z&s=10'], ['Chocolate', 'Minuman', 24000, 'CH'], ['Rice Bowl Ayam', 'Makanan', 32000, 'RB', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPhimlPgWyuzBmtKAQL5IlUvEoF7Qwc1FH8Sxj_vZe0A&s=10'], ['Croissant', 'Makanan', 18000, 'CR', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp-m_xQvcEUOMX4mIQQ-k1ZnCz_FVYCbqDJUvDfSp7gQ&s=10'], ['Nasi Goreng', 'Makanan', 28000, 'NG', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUpPoLpIHF21YLKglSy9XC3GxvuP6w7v4JKyimYdu-uA&s=10'], ['Es Teh Lemon', 'Minuman', 16000, 'TL', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd7C1CrwrV6yYlIPPcspjPsS4BKHCvr1UPhp_iUjf-RQ&s=10'],
]

function calcTotals(cart) {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const tax = Math.round(total * .11)
  const service = Math.round(total * .05)
  const rounding = Math.round((total + tax + service) / 100) * 100 - (total + tax + service)
  return { total, tax, service, rounding, finalTotal: total + tax + service + rounding }
}

function PosPage({ navigate, openModal, notify, cart, setCart, meja, setMeja }) {
  const [category, setCategory] = useState('Semua')
  const [orderTab, setOrderTab] = useState('Orderan')
  const add = ([name, , price]) => setCart(items => { const found = items.find(i => i.name === name); return found ? items.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i) : [...items, { name, price, qty: 1 }] })
  const qty = (name, amount) => setCart(items => items.map(i => i.name === name ? { ...i, qty: Math.max(0, i.qty + amount) } : i).filter(i => i.qty > 0))
  const { total, tax, service, rounding, finalTotal } = calcTotals(cart)
  const shown = category === 'Semua' ? posProducts : posProducts.filter(p => p[1] === category)
  const tableModal = () => openModal({ type: 'form', title: 'Pilih meja', kicker: 'ORDERAN', fields: [{ name: 'meja', label: 'Nomor meja (boleh dikosongkan)', type: 'select', options: ['Tanpa meja', 'Meja 01', 'Meja 02', 'Meja 03', 'Meja 04', 'Meja 05', 'Meja 06', 'Meja 07', 'Meja 08'] }], success: 'Meja berhasil dipilih', onConfirm: (data) => setMeja(data.meja === 'Tanpa meja' ? null : data.meja) })
  const discountModal = () => openModal({ type: 'form', title: 'Tambah discount', kicker: 'PROMO', fields: [{ name: 'type', label: 'Tipe discount', type: 'select', options: ['Persentase','Nominal','Promo code'] }, { name: 'value', label: 'Nilai', placeholder: '10 atau 25000' }, { name: 'code', label: 'Kode promo', placeholder: 'HEMAT20', wide: true }], success: 'Discount berhasil diterapkan' })
  return <div className="pos-page">
    <header className="pos-page-header"><button className="back-button" onClick={() => navigate('/app/transactions')}><ArrowLeft /> Kembali</button><div><strong>Point of Sale</strong><span><i></i>Outlet Kemang · Kasir Utama</span></div><div className="pos-header-actions"><button onClick={() => notify('Riwayat transaksi dibuka', 'info')}><History /> Riwayat</button><button onClick={() => notify('Transaksi berhasil di-hold', 'success')}><Clock3 /> Hold</button></div></header>
    <main className="pos-workspace">
      <section className="pos-catalog"><div className="catalog-head"><div><small>Transaksi baru</small><h1>Pilih produk</h1></div><label><Search /><input placeholder="Cari produk atau barcode" /></label></div><div className="category-tabs">{['Semua','Kopi','Makanan','Minuman'].map(c=><button className={category===c?'active':''} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</div><div className="real-product-grid">{shown.map((p,i)=><button onClick={()=>add(p)} key={p[0]}><span className={`real-product-image rp-${i%4}`}>{p[4] ? <img src={p[4]} alt={p[0]} loading="lazy" /> : p[3]}</span><strong>{p[0]}</strong><small>{p[1]} · Stok {24-i}</small><b>Rp {p[2].toLocaleString('id-ID')}</b><i><Plus /></i></button>)}</div></section>
      <aside className="real-cart">
        <div className="real-cart-head"><div><small>Pesanan aktif</small><h2>#INV-20260820-004</h2><span>Hari ini · 13:24</span></div><button className={meja ? 'table-head-btn has-meja' : 'table-head-btn'} aria-label="Pilih meja" title="Pilih meja" onClick={tableModal}>{meja || <UtensilsCrossed />}</button></div>
        <div className="order-type"><button className={orderTab === 'Orderan' ? 'active' : ''} onClick={()=>setOrderTab('Orderan')}>Orderan</button><button className={orderTab === 'Detail' ? 'active' : ''} onClick={()=>setOrderTab('Detail')}>Detail</button></div>
        <div className="cart-table-head"><span>{orderTab === 'Orderan' ? 'Item pesanan' : 'Informasi pesanan'}</span><span>{orderTab === 'Orderan' ? `${cart.reduce((sum,item)=>sum+item.qty,0)} item` : '#INV-20260820-004'}</span></div>
        <div className="cart-lines">{orderTab === 'Orderan' ? (cart.length ? <table className="cart-table">
          <thead><tr><th>No</th><th>Item</th><th>Qty</th><th>Total</th></tr></thead>
          <tbody>{cart.map((item, index) => <tr key={item.name}>
            <td>{index + 1}</td>
            <td><b>{item.name}</b><small>Rp {item.price.toLocaleString('id-ID')} / item</small></td>
            <td><span className="qty-control"><button aria-label={`Kurangi ${item.name}`} onClick={()=>qty(item.name,-1)}><Minus /></button><strong>{item.qty}</strong><button aria-label={`Tambah ${item.name}`} onClick={()=>qty(item.name,1)}><Plus /></button></span></td>
            <td>Rp {(item.price*item.qty).toLocaleString('id-ID')}</td>
          </tr>)}</tbody>
        </table> : <div className="empty-cart">Pilih produk untuk memulai transaksi.</div>) : <div className="order-detail">
          <div><small>No. Order</small><b>#INV-20260820-004</b></div>
          <div><small>Tipe pesanan</small><b>{meja ? 'Dine in' : 'Takeaway'}</b></div>
          <div><small>Meja</small><b>{meja || 'Tanpa meja'}</b></div>
          <div><small>Kasir</small><b>Kasir Utama</b></div>
          <div><small>Waktu</small><b>Hari ini · 13:24</b></div>
          <div><small>Total item</small><b>{cart.reduce((s,i)=>s+i.qty,0)} item</b></div>
          <div><small>Status pembayaran</small><b className="unpaid">Belum dibayar</b></div>
        </div>}</div>
        <div className="cart-summary"><p><span>Subtotal</span><b>Rp {total.toLocaleString('id-ID')}</b></p><p><span>Diskon</span><button onClick={discountModal}>Tambah</button></p><p><span>Tax</span><b>Rp {tax.toLocaleString('id-ID')}</b></p><p><span>Service</span><b>Rp {service.toLocaleString('id-ID')}</b></p><p><span>Pembulatan</span><b>{rounding < 0 ? '-' : ''}Rp {Math.abs(rounding).toLocaleString('id-ID')}</b></p><p className="grand-total"><span>Total</span><b>Rp {finalTotal.toLocaleString('id-ID')}</b></p><div className="cart-tools"><button onClick={()=>notify('Pilih orderan untuk di-split', 'info')}><ReceiptText /> Split Bill</button><button onClick={()=>notify('Pilih orderan untuk di-join', 'info')}><FileText /> Join Bill</button><button onClick={()=>notify('Bill dikirim ke printer', 'success')}><Printer /> Print Bill</button><button onClick={()=>{setCart([]);notify('Order dibatalkan', 'info')}}><Ban /> Cancel Order</button></div><button className="pay-button" disabled={!cart.length} onClick={()=>navigate('/app/checkout')}>Bayar <span>Rp {finalTotal.toLocaleString('id-ID')}</span><ArrowRight /></button></div>
      </aside>
    </main>
  </div>
}

function CheckoutPage({ navigate, openModal, notify, cart, setCart, meja }) {
  const [method, setMethod] = useState(null)
  const { total, tax, service, rounding, finalTotal } = calcTotals(cart)
  const methods = [['Cash', CircleDollarSign, 'Uang tunai'], ['QRIS', Grid2X2, 'Scan & pay'], ['Debit', CreditCard, 'Kartu debit'], ['Kredit', CreditCard, 'Kartu kredit'], ['E-Wallet', Smartphone, 'GoPay/OVO/DANA'], ['Transfer', Building2, 'Bank transfer']]
  const pay = () => openModal({ type: 'form', title: 'Konfirmasi pembayaran', kicker: `${method} · RP ${finalTotal.toLocaleString('id-ID')}`, size: 'wide', fields: [{ name: 'note', label: 'Catatan / no. referensi', placeholder: 'Opsional', wide: true }], success: `Pembayaran ${method} berhasil · INV-20260820-004`, onConfirm: () => { setCart([]); navigate('/app/transactions') } })
  return <div className="pos-page">
    <header className="pos-page-header"><button className="back-button" onClick={()=>navigate('/app/pos')}><ArrowLeft /> Kembali</button><div><strong>Pembayaran</strong><span><i></i>Outlet Kemang · Kasir Utama</span></div><div className="pos-header-actions"><button onClick={()=>notify('Order disimpan sebagai pending', 'info')}><Clock3 /> Pending</button></div></header>
    <main className="checkout-page">
      <section className="checkout-panel">
        <div className="checkout-head"><small>Ringkasan orderan</small><h2>#INV-20260820-004</h2><span>{meja || 'Tanpa meja'} · {cart.reduce((s,i)=>s+i.qty,0)} item</span></div>
        {cart.length ? <>
          <table className="cart-table checkout-table">
            <thead><tr><th>No</th><th>Item</th><th>Qty</th><th>Total</th></tr></thead>
            <tbody>{cart.map((item, index) => <tr key={item.name}><td>{index + 1}</td><td><b>{item.name}</b><small>Rp {item.price.toLocaleString('id-ID')} / item</small></td><td>{item.qty}</td><td>Rp {(item.price*item.qty).toLocaleString('id-ID')}</td></tr>)}</tbody>
          </table>
          <div className="cart-summary checkout-recap"><p><span>Subtotal</span><b>Rp {total.toLocaleString('id-ID')}</b></p><p><span>Tax</span><b>Rp {tax.toLocaleString('id-ID')}</b></p><p><span>Service</span><b>Rp {service.toLocaleString('id-ID')}</b></p><p><span>Pembulatan</span><b>{rounding < 0 ? '-' : ''}Rp {Math.abs(rounding).toLocaleString('id-ID')}</b></p><p className="grand-total"><span>Total</span><b>Rp {finalTotal.toLocaleString('id-ID')}</b></p></div>
        </> : <div className="empty-cart"><ShoppingCart /><b>Belum ada orderan</b><span>Buat orderan baru lewat kasir POS.</span><button className="pay-button" onClick={()=>navigate('/app/pos')}>Ke halaman POS <ArrowRight /></button></div>}
      </section>
      <section className="checkout-panel">
        <div className="checkout-head"><small>Pembayaran</small><h3>Pilih metode pembayaran</h3><span>Metode mengikuti konfigurasi outlet aktif.</span></div>
        <div className="method-grid">{methods.map(([name, Icon, desc]) => <button key={name} className={method === name ? 'active' : ''} disabled={!cart.length} onClick={()=>setMethod(name)}><span className="method-icon"><Icon /></span><section><b>{name}</b><small>{desc}</small></section><i className="method-check"><Check /></i></button>)}</div>
        <button className="pay-button checkout-pay" disabled={!method || !cart.length} onClick={pay}>Bayar <span>Rp {finalTotal.toLocaleString('id-ID')}</span><ArrowRight /></button>
      </section>
    </main>
  </div>
}

const inventoryRows = [
  ['BRG-001', 'Biji Kopi House Blend', 'Bahan baku', '12 kg', 'Aman'], ['BRG-002', 'Susu UHT 1L', 'Bahan baku', '8 pcs', 'Menipis'], ['BRG-003', 'Cup 12 oz', 'Kemasan', '124 pcs', 'Aman'], ['BRG-004', 'Sirup Aren', 'Bahan baku', '4 botol', 'Menipis'], ['PRD-018', 'Croissant Butter', 'Produk jadi', '18 pcs', 'Aman'],
]

function InventoryPage({ openModal }) {
  const [tab,setTab]=useState('Produk')
  const tabs=['Produk','Kategori','Stock In','Stock Out','Adjustment','Stock Opname','Supplier']
  const addProduct=()=>openModal({type:'form',title:`Tambah ${tab}`,kicker:'MANAJEMEN STOK',size:'wide',image:['Produk','Kategori'].includes(tab),imageLabel:tab==='Kategori'?'Icon kategori':'Gambar produk',aspect:tab==='Produk'?4/3:1,fields:[{name:'name',label:`Nama ${tab}`,required:true},{name:'sku',label:'SKU / Reference',placeholder:'BRG-005'},{name:'category',label:'Kategori',type:'select',options:['Bahan baku','Produk jadi','Kemasan']},{name:'unit',label:'Satuan',type:'select',options:['pcs','kg','liter','box']},{name:'buy',label:'Harga beli',type:'number'},{name:'sell',label:'Harga jual',type:'number'},{name:'stock',label:'Stok awal',type:'number'},{name:'min',label:'Minimum stok',type:'number'},{name:'description',label:'Deskripsi',type:'textarea',wide:true}],success:`${tab} berhasil ditambahkan`})
  const action=(name,action)=>{if(action==='detail')openModal({type:'detail',title:'Detail produk',name,initials:name.slice(0,2).toUpperCase(),description:'Informasi produk dan stok',data:{SKU:'BRG-001',Kategori:'Bahan baku',Stok:'12 kg','Harga jual':'Rp 120.000',Status:'Aktif'}});if(action==='edit')addProduct();if(action==='delete')openModal({type:'confirm',title:'Hapus produk',name,message:`Hapus ${name}?`,success:'Produk berhasil dihapus'})}
  return <div className="module-page"><div className="inventory-kpis"><div><Package /><span><small>Total produk</small><strong>284</strong></span></div><div><Sparkles /><span><small>Stok menipis</small><strong>8 produk</strong></span></div><div><RefreshCcw /><span><small>Opname bulan ini</small><strong>3 aktivitas</strong></span></div></div><div className="module-tabs inventory-tabs">{tabs.map(t=><button className={tab===t?'active':''} onClick={()=>setTab(t)} key={t}>{t}</button>)}</div><div className="data-card"><div className="data-toolbar"><label><Search /><input placeholder={`Cari data ${tab.toLowerCase()}`} /></label><button><ListFilter /> Semua kategori <ChevronDown /></button><button><RefreshCcw /> Refresh</button><button><Download /> Export</button><button className="primary" onClick={addProduct}><Plus /> Tambah {tab}</button></div>{tab==='Produk'?<div className="data-table inventory-table"><div className="data-row data-head"><span>Produk</span><span>Kategori</span><span>Stok</span><span>Status</span><span>Aksi</span></div>{inventoryRows.map(([sku,name,cat,stock,status])=><div className="data-row" key={sku}><span><i className="table-thumb"></i><b>{name}<small>{sku}</small></b></span><span>{cat}</span><span><b>{stock}</b></span><span><em className={status==='Menipis'?'warning':''}>{status}</em></span><span><RowActions onAction={(a)=>action(name,a)} /></span></div>)}</div>:<div className="data-table inventory-subtable"><div className="data-row data-head"><span>Reference</span><span>Data</span><span>Qty / Status</span><span>Tanggal</span><span>Aksi</span></div>{[['REF-202608-001',`${tab} Kopi Susu`,'24 pcs','20 Agu 2026'],['REF-202608-002',`${tab} Matcha`,'12 pcs','19 Agu 2026'],['REF-202608-003',`${tab} Kemasan`,'Aktif','18 Agu 2026']].map(r=><div className="data-row" key={r[0]}>{r.map(v=><span key={v}>{v}</span>)}<span><RowActions onAction={(a)=>action(r[1],a)} /></span></div>)}</div>}<div className="table-footer"><span>Menampilkan 1–5 dari 284 data</span><div><button disabled>←</button><b>1</b><button>2</button><button>3</button><button>→</button></div></div></div></div>
}

function OutletPage({ openModal }) {
  const [tab, setTab] = useState('Promo & Diskon')
  const tabs = ['Konfigurasi', 'Tax & Service', 'Item Outlet', 'Payment', 'Kasir', 'Promo & Diskon', 'Paket', 'Catatan Orderan', 'Waiter']
  const add=()=>openModal({type:'form',title:`Tambah ${tab}`,kicker:'PENGATURAN OUTLET',size:'wide',image:['Item Outlet','Paket'].includes(tab),aspect:4/3,fields:[{name:'name',label:`Nama ${tab}`,required:true},{name:'code',label:'Kode',placeholder:'OUT-001'},{name:'value',label:'Nilai / Harga',type:'number'},{name:'status',label:'Status',type:'select',options:['Aktif','Nonaktif']},{name:'note',label:'Catatan',type:'textarea',wide:true}],success:`${tab} berhasil ditambahkan`})
  const rowAction=(name,a)=>a==='delete'?openModal({type:'confirm',title:`Hapus ${tab}`,message:`Apakah Anda yakin ingin menghapus ${name}?`,success:`${tab} berhasil dihapus`}):a==='detail'?openModal({type:'detail',title:`Detail ${tab}`,name,initials:name.slice(0,2).toUpperCase(),data:{Outlet:'Kemang',Status:'Aktif',Dibuat:'20 Agustus 2026'}}):add()
  const demoRows={Konfigurasi:[['CFG-01','Jam operasional','08:00–22:00']], 'Tax & Service':[['TAX-11','PPN','11%'],['SRV-05','Service charge','5%']], 'Item Outlet':[['ITM-001','Kopi Susu Aren','Rp 22.000'],['ITM-002','Matcha Latte','Rp 26.000']],Payment:[['PAY-01','QRIS','Aktif'],['PAY-02','Cash','Aktif']],Kasir:[['USR-01','Rina Kasir','Aktif']],Paket:[['PKT-01','Paket Berdua','Rp 78.000']], 'Catatan Orderan':[['NOTE-01','Tidak pedas','Aktif']],Waiter:[['WTR-01','Dimas','Shift pagi']]}
  const rows=demoRows[tab]||[]
  return <div className="module-page"><div className="module-title"><button onClick={()=>openModal({type:'form',title:'Tambah outlet',kicker:'OUTLET',size:'wide',image:true,fields:[{name:'name',label:'Nama outlet'},{name:'code',label:'Kode outlet'},{name:'manager',label:'Manager'},{name:'phone',label:'Telepon'},{name:'address',label:'Alamat',type:'textarea',wide:true}],success:'Outlet berhasil ditambahkan'})}><Plus /> Tambah outlet</button></div><div className="settings-card"><div className="settings-tabs">{tabs.map(t=><button className={tab===t?'active':''} onClick={()=>setTab(t)} key={t}>{t}</button>)}</div>{tab==='Promo & Diskon'?<><div className="subtabs"><button className="active">Potongan belanja</button><button>Promo item</button><button>Diskon</button></div><div className="data-toolbar"><button className="primary" onClick={add}><Plus /> Tambah promo</button><button><Download /> Export</button></div><div className="data-table promo-table with-actions"><div className="data-row data-head"><span>Kode promo</span><span>Nama promo</span><span>Tanggal mulai</span><span>Status</span><span>Aksi</span></div>{[['PRO-260801','Promo Kemerdekaan','01 Agustus 2026'],['PRO-260724','Paket Hemat Berdua','24 Juli 2026'],['PRO-260615','Diskon Member Gold','15 Juni 2026']].map(r=><div className="data-row" key={r[0]}><span><b>{r[0]}</b></span><span>{r[1]}</span><span>{r[2]}</span><span><em>Aktif</em></span><span><RowActions onAction={(a)=>rowAction(r[1],a)} /></span></div>)}</div></>:<><div className="setting-demo-head"><div><h3>{tab}</h3><p>Demo pengaturan {tab.toLowerCase()} untuk outlet terpilih.</p></div><button onClick={add}><Plus /> Tambah data</button></div><div className="data-table outlet-demo-table"><div className="data-row data-head"><span>Kode</span><span>Nama / Pengaturan</span><span>Nilai</span><span>Status</span><span>Aksi</span></div>{rows.map(r=><div className="data-row" key={r[0]}><span><b>{r[0]}</b></span><span>{r[1]}</span><span>{r[2]}</span><span><em>Aktif</em></span><span><RowActions onAction={(a)=>rowAction(r[1],a)} /></span></div>)}</div></>}</div></div>
}

function AccessPage({ openModal, notify }) {
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

function BackupPage({ openModal, notify }) {
  const [tab, setTab] = useState('backup')
  const backups = [['backup_20260820_0200.sql', '20 Agu 2026 · 02:00', '148,2 MB'], ['backup_20260819_0200.sql', '19 Agu 2026 · 02:00', '146,8 MB'], ['backup_20260818_0200.sql', '18 Agu 2026 · 02:00', '145,5 MB']]
  const action = (row, type) => {
    if (type === 'detail') openModal({ type:'detail', title:'Detail backup', name:row[0], initials:'SQL', data:{ Waktu:row[1], Ukuran:row[2], Status:'Selesai', Tipe:'Seluruh tabel SQL' } })
    if (type === 'edit') notify(`Unduhan ${row[0]} disiapkan`, 'info')
    if (type === 'cancel') openModal({ type:'confirm', title:'Restore database', message:`Restore seluruh tabel dari ${row[0]}?`, description:'Tampilan ini adalah simulasi frontend. Tidak ada database yang benar-benar diubah.', success:'Simulasi restore berhasil' })
    if (type === 'delete') openModal({ type:'confirm', title:'Hapus backup', message:`Hapus ${row[0]}?`, success:'Backup berhasil dihapus dari tampilan demo' })
  }
  return <div className="module-page"><div className="module-title"><button onClick={() => notify('Backup demo berhasil dibuat','success')}><CloudUpload /> Buat backup</button></div><div className="module-tabs"><button className={tab === 'backup' ? 'active' : ''} onClick={() => setTab('backup')}><Database /> Backup & Restore</button><button className={tab === 'schedule' ? 'active' : ''} onClick={() => setTab('schedule')}><CalendarClock /> Jadwal Backup</button></div>{tab === 'backup' ? <div className="backup-layout"><div className="backup-status"><span><HardDriveDownload /></span><div><small>Backup terakhir</small><strong>20 Agustus 2026, 02:00 WIB</strong><p>Seluruh tabel SQL · 148,2 MB · Selesai</p></div><em><Check /> Aman</em></div><div className="data-card"><div className="card-heading"><div><h3>Riwayat backup</h3><p>Restore memulihkan tabel SQL pada titik waktu terpilih.</p></div></div><div className="data-table backup-table"><div className="data-row data-head"><span>Nama file</span><span>Waktu</span><span>Ukuran</span><span>Status</span><span>Aksi</span></div>{backups.map(r => <div className="data-row" key={r[0]}><span><Database /><b>{r[0]}</b></span><span>{r[1]}</span><span>{r[2]}</span><span><em>Selesai</em></span><span><RowActions extended onAction={(a)=>action(r,a)} /></span></div>)}</div></div></div> : <div className="schedule-card"><div><CalendarClock /><span><h3>Backup otomatis</h3><p>Jalankan backup sesuai waktu yang ditentukan.</p></span><label className="switch"><input type="checkbox" defaultChecked /><i></i></label></div><div className="schedule-fields"><label>Frekuensi<select defaultValue="daily"><option value="daily">Setiap hari</option><option>Setiap minggu</option></select></label><label>Waktu<input type="time" defaultValue="02:00" /></label><label>Retensi<select defaultValue="30"><option value="30">30 hari</option><option>90 hari</option></select></label></div><button className="save-button" onClick={()=>notify('Jadwal backup tersimpan','success')}>Simpan jadwal</button></div>}</div>
}

function DeletedPage({ openModal, notify }) {
  const [tab, setTab] = useState('soft')
  const rows = tab === 'soft' ? [['Produk', 'Es Kopi Pandan', 'Admin Demo', '19 Agu 2026'], ['Pelanggan', 'Dimas Pratama', 'Manager Outlet', '18 Agu 2026'], ['Transaksi', '#INV-0981', 'Admin Demo', '17 Agu 2026']] : [['Transaksi', '#INV-0712', 'System', '02 Agu 2026'], ['Produk', 'Menu Musiman 2025', 'Admin Demo', '28 Jul 2026']]
  const action = (row, type) => {
    if (type === 'detail') openModal({ type:'detail', title:'Detail data terhapus', name:row[1], initials:row[0].slice(0,2).toUpperCase(), data:{ Tabel:row[0], Dihapus_oleh:row[2], Waktu:row[3], Jenis:tab === 'soft' ? 'Soft delete' : 'Hard delete' } })
    if (type === 'edit' && tab === 'soft') openModal({ type:'confirm', title:'Restore data', message:`Pulihkan ${row[1]}?`, description:'Data akan dikembalikan ke tabel asal pada simulasi frontend.', success:'Data berhasil dipulihkan' })
    if (type === 'delete' && tab === 'soft') openModal({ type:'confirm', title:'Delete permanen', message:`Hapus permanen ${row[1]}?`, description:'Data akan masuk ke tab hard delete pada tampilan demo.', success:'Data dipindahkan ke hard delete' })
    if (type === 'edit' && tab === 'hard') notify('Hard delete tidak dapat dipulihkan','warning')
  }
  return <div className="module-page"><div className="module-tabs"><button className={tab === 'soft' ? 'active' : ''} onClick={() => setTab('soft')}><RotateCcw /> Soft delete</button><button className={tab === 'hard' ? 'active' : ''} onClick={() => setTab('hard')}><Trash2 /> Hard delete</button></div><div className="data-card"><div className="data-toolbar"><label><Search /><input placeholder="Cari data terhapus" /></label><button><ListFilter /> Semua tabel <ChevronDown /></button></div><div className="data-table deleted-table"><div className="data-row data-head"><span>Tabel</span><span>Data</span><span>Oleh</span><span>Waktu</span><span>Aksi</span></div>{rows.map(r => <div className="data-row" key={r[1]}><span><b>{r[0]}</b></span><span>{r[1]}</span><span>{r[2]}</span><span>{r[3]}</span><span><RowActions onAction={(a)=>action(r,a)} /></span></div>)}</div></div></div>
}

function LogsPage({ openModal, notify }) {
  const logs = [['14:32:08', 'Admin Demo', 'LOGIN', 'Masuk ke dashboard', '103.21.80.14'], ['14:29:41', 'Manager Outlet', 'UPDATE', 'Mengubah stok Susu UHT', '103.21.80.18'], ['14:21:12', 'Kasir 01', 'CREATE', 'Membuat transaksi #INV-1042', '103.21.80.22'], ['13:58:09', 'Admin Demo', 'BACKUP', 'Backup database manual', '103.21.80.14'], ['13:44:53', 'Manager Outlet', 'RESTORE', 'Memulihkan produk terhapus', '103.21.80.18']]
  const detail = (row) => openModal({ type:'detail', title:'Detail aktivitas', name:row[2], initials:row[1].slice(0,2).toUpperCase(), data:{ Waktu:row[0], Pengguna:row[1], Aktivitas:row[2], Detail:row[3], IP_Address:row[4] } })
  return <div className="module-page"><div className="log-kpis"><div><Activity /><span><small>Aktivitas hari ini</small><strong>1.284</strong></span></div><div><Users /><span><small>Pengguna aktif</small><strong>18</strong></span></div><div><ShieldCheck /><span><small>Aktivitas mencurigakan</small><strong>0</strong></span></div></div><div className="data-card"><div className="data-toolbar"><label><Search /><input placeholder="Cari aktivitas" /></label><button><CalendarClock /> Hari ini</button><button><ListFilter /> Semua aktivitas <ChevronDown /></button><button onClick={()=>notify('Export log demo disiapkan','info')}><Download /> Export log</button></div><div className="data-table log-table with-actions"><div className="data-row data-head"><span>Waktu</span><span>Pengguna</span><span>Aktivitas</span><span>Detail</span><span>IP Address</span><span>Aksi</span></div>{logs.map(r => <div className="data-row" key={r[0]}><span><Clock3 />{r[0]}</span><span><b>{r[1]}</b></span><span><em className={`log-${r[2].toLowerCase()}`}>{r[2]}</em></span><span>{r[3]}</span><span>{r[4]}</span><span><RowActions onAction={(a)=>a==='detail'?detail(r):notify('Log aktivitas bersifat read-only','warning')} /></span></div>)}</div></div></div>
}

const entityConfigs = {
  '/app/payment': { name:'Payment', icon:CreditCard, stats:[['Total Payment','Rp 48,6 jt'],['Successful','1.248'],['Pending','24'],['Failed / Refund','12']], columns:['Invoice','Customer','Method','Total','Status'], rows:[['INV-20260820-001','Andi Wijaya','QRIS','Rp 162.000','Paid'],['INV-20260820-002','Sarah Putri','Cash','Rp 84.000','Paid'],['INV-20260820-003','Kevin Lim','Debit','Rp 126.000','Pending']] },
  '/app/membership': { name:'Membership', icon:Users, image:true, stats:[['Total Member','1.284'],['Member Aktif','864'],['Member Baru','48'],['Total Points','284.600']], columns:['Member ID','Nama','Level','Point','Status'], rows:[['MBR-001','Andi Wijaya','Gold','1.240','Aktif'],['MBR-002','Sarah Putri','Platinum','2.860','Aktif'],['MBR-003','Kevin Lim','Silver','640','Aktif']] },
  '/app/users': { name:'User', icon:UserRound, image:true, stats:[['Total User','18'],['Active','16'],['Inactive','2'],['Online','8']], columns:['Username','Nama','Role','Outlet','Status'], rows:[['rina.kasir','Rina Maharani','Kasir','Kemang','Aktif'],['doni.manager','Doni Saputra','Manager','Cilandak','Aktif'],['siti.stock','Siti Aminah','Staff Gudang','Kemang','Aktif']] },
  '/app/accounting': { name:'Akuntansi & Pembukuan', icon:BookOpen, stats:[['Pendapatan','Rp 48,6 jt'],['Pengeluaran','Rp 11,4 jt'],['Laba Bersih','Rp 18,4 jt'],['Piutang / Hutang','Rp 4,8 jt']], columns:['Reference','Kategori','Deskripsi','Nominal','Status'], rows:[['FIN-001','Pendapatan','Penjualan outlet','Rp 48.600.000','Posted'],['FIN-002','Operasional','Listrik & internet','Rp 2.400.000','Posted'],['FIN-003','Gaji','Payroll Agustus','Rp 8.200.000','Pending']] },
  '/app/transactions': { name:'Transaksi', icon:ReceiptText, stats:[['Hari ini','128'],['Paid','116'],['Pending','8'],['Refund','4']], columns:['Invoice','Customer','Outlet','Total','Status'], rows:[['INV-20260820-001','Andi Wijaya','Kemang','Rp 162.000','Paid'],['INV-20260820-002','Sarah Putri','Cilandak','Rp 84.000','Paid'],['INV-20260820-003','Kevin Lim','Kemang','Rp 126.000','Pending']] },
  '/app/orders': { name:'Taking Order', icon:FileText, stats:[['Order aktif','24'],['Dapur','12'],['Siap diantar','8'],['Selesai','186']], columns:['Order','Customer','Tipe','Total','Status'], rows:[['ORD-042','Meja 08','Dine in','Rp 162.000','Diproses'],['ORD-041','Sarah Putri','Takeaway','Rp 84.000','Siap'],['ORD-040','Meja 03','QR Order','Rp 126.000','Baru']] },
}

function EntityPage({ route, openModal }) {
  const config=entityConfigs[route]||entityConfigs['/app/payment']
  const Icon=config.icon
  const formFields=[{name:'name',label:`Nama ${config.name}`,required:true},{name:'email',label:'Email',type:'email'},{name:'phone',label:'Telepon'},{name:'status',label:'Status',type:'select',options:['Aktif','Nonaktif','Pending']},{name:'description',label:'Catatan',type:'textarea',wide:true}]
  const add=()=>openModal({type:'form',title:`Tambah ${config.name}`,kicker:'TAMBAH DATA',size:'wide',image:config.image,imageLabel:config.name==='Membership'?'Foto member':'Avatar user',fields:formFields,success:`${config.name} berhasil ditambahkan`})
  const act=(row,action)=>{if(action==='detail')openModal({type:'detail',title:`Detail ${config.name}`,name:row[1],initials:String(row[1]).slice(0,2).toUpperCase(),data:Object.fromEntries(config.columns.map((c,i)=>[c,row[i]]))});if(action==='edit')add();if(action==='cancel')openModal({type:'confirm',title:`Batalkan ${config.name}`,message:`Batalkan ${row[0]}?`,description:'Status data akan diubah menjadi dibatalkan.',success:`${config.name} dibatalkan`});if(action==='delete')openModal({type:'confirm',title:`Hapus ${config.name}`,message:`Apakah Anda yakin ingin menghapus ${row[0]}?`,success:`${config.name} berhasil dihapus`})}
  return <div className="module-page"><div className="entity-stats">{config.stats.map(([n,v],i)=><div key={n}><span className={`metric-icon m-${i}`}><Icon /></span><small>{n}</small><strong>{v}</strong></div>)}</div><div className="data-card"><div className="data-toolbar"><label><Search /><input placeholder={`Cari ${config.name.toLowerCase()}`} /></label><button><CalendarClock /> Tanggal <ChevronDown /></button><button><Building2 /> Outlet <ChevronDown /></button><button><ListFilter /> Filter <ChevronDown /></button><button><Download /> Export <ChevronDown /></button><button className="primary" onClick={add}><Plus /> Tambah data</button></div><div className="data-table entity-table" style={{'--columns':config.columns.length}}><div className="data-row data-head">{config.columns.map(c=><span key={c}>{c}</span>)}<span>Aksi</span></div>{config.rows.map(row=><div className="data-row" key={row[0]}>{row.map((value,i)=><span key={`${row[0]}-${i}`}>{i===0?<b>{value}</b>:i===row.length-1?<em className={['Pending','Nonaktif','Failed'].includes(value)?'warning':''}>{value}</em>:value}</span>)}<span><RowActions extended onAction={(a)=>act(row,a)} /></span></div>)}</div><div className="table-footer"><span>Menampilkan 1–3 dari 128 data</span><div><button disabled>←</button><b>1</b><button>2</button><button>→</button></div></div></div></div>
}

function SettingsPage({ openModal, notify }) {
  const [tab,setTab]=useState('General')
  const [categories,setCategories]=useState([['CAT-01','Kopi','Minuman berbasis kopi','12','Aktif'],['CAT-02','Makanan','Menu makanan utama','18','Aktif'],['CAT-03','Snack','Camilan dan pastry','9','Aktif']])
  const [menus,setMenus]=useState([['MNU-01','Kopi Susu Aren','Kopi','Rp 22.000','Aktif'],['MNU-02','Matcha Latte','Minuman','Rp 26.000','Aktif'],['MNU-03','Croissant Butter','Snack','Rp 18.000','Aktif']])
  const tabs=['General','Kategori','Menu POS','POS Setting','Receipt','Notification','Appearance']
  const addCategory=()=>openModal({type:'form',title:'Tambah kategori',kicker:'SETTING KATEGORI',image:true,imageLabel:'Icon kategori',aspect:1,fields:[{name:'name',label:'Nama kategori',required:true},{name:'description',label:'Deskripsi',type:'textarea',wide:true},{name:'status',label:'Status',type:'select',options:['Aktif','Nonaktif']}],success:'Kategori berhasil ditambahkan',onConfirm:(data)=>setCategories(rows=>[[`CAT-0${rows.length+1}`,data.name,data.description||'-','0',data.status],...rows])})
  const addMenu=()=>openModal({type:'form',title:'Tambah menu POS',kicker:'SETTING MENU',size:'wide',image:true,imageLabel:'Gambar menu',aspect:4/3,fields:[{name:'name',label:'Nama menu',required:true},{name:'category',label:'Kategori',type:'select',options:['Kopi','Minuman','Makanan','Snack']},{name:'price',label:'Harga',type:'number'},{name:'order',label:'Sort order',type:'number'},{name:'description',label:'Deskripsi',type:'textarea',wide:true},{name:'status',label:'Status',type:'select',options:['Aktif','Nonaktif']}],success:'Menu berhasil ditambahkan',onConfirm:(data)=>setMenus(rows=>[[`MNU-0${rows.length+1}`,data.name,data.category,`Rp ${Number(data.price||0).toLocaleString('id-ID')}`,data.status],...rows])})
  const action=(type,row,a)=>{if(a==='detail')openModal({type:'detail',title:`Detail ${type}`,name:row[1],initials:row[1].slice(0,2).toUpperCase(),data:{Kode:row[0],Nama:row[1],Status:row.at(-1)}});if(a==='edit')(type==='kategori'?addCategory:addMenu)();if(a==='delete')openModal({type:'confirm',title:`Hapus ${type}`,message:`Hapus ${row[1]}?`,success:`${type} berhasil dihapus`,onConfirm:()=>type==='kategori'?setCategories(r=>r.filter(x=>x[0]!==row[0])):setMenus(r=>r.filter(x=>x[0]!==row[0]))})}
  return <div className="module-page settings-page"><div className="module-title"><button onClick={()=>notify('Pengaturan berhasil disimpan','success')}><Save /> Simpan</button></div><div className="settings-layout"><aside>{tabs.map(t=><button className={tab===t?'active':''} onClick={()=>setTab(t)} key={t}>{t}</button>)}</aside><section>{tab==='General'&&<div className="setting-form"><div className="setting-section-title"><h3>Informasi bisnis</h3><p>Informasi utama yang tampil pada aplikasi dan struk.</p></div><ImageUploaderWithCrop label="Logo bisnis" aspect={1} value="" onChange={()=>notify('Logo berhasil di-crop','success')} /><div className="crud-fields"><label>Nama Bisnis<input defaultValue="BukaNota Coffee" /></label><label>Telepon<input defaultValue="021 555 0199" /></label><label>Email<input defaultValue="hello@bukanota.id" /></label><label>Currency<select><option>IDR — Rupiah</option></select></label><label>Timezone<select><option>Asia/Jakarta</option></select></label><label>Language<select><option>Bahasa Indonesia</option></select></label><label className="wide">Alamat<textarea defaultValue="Jl. Kemang Raya No. 18, Jakarta Selatan" /></label></div></div>}{tab==='Kategori'&&<CrudSettingTable title="Setting kategori" description="Kelola kategori yang tampil pada POS." button="Tambah kategori" rows={categories} columns={['Kode','Nama kategori','Deskripsi','Jumlah item','Status']} onAdd={addCategory} onAction={(r,a)=>action('kategori',r,a)} />}{tab==='Menu POS'&&<CrudSettingTable title="Setting menu POS" description="Tambah menu, upload gambar, crop, dan atur urutan." button="Tambah menu" rows={menus} columns={['Kode','Nama menu','Kategori','Harga','Status']} onAdd={addMenu} onAction={(r,a)=>action('menu',r,a)} />}{tab==='POS Setting'&&<ToggleSettings title="Pengaturan Point of Sale" items={['Tax 11%','Service charge 5%','Auto print receipt','Allow discount','Allow refund','Stock validation']} />}{tab==='Receipt'&&<div className="receipt-setting"><div><ToggleSettings title="Elemen struk" items={['Tampilkan logo','Tampilkan customer','Tampilkan kasir','Tampilkan pajak']} /></div><div className="receipt-preview"><Logo /><h4>BukaNota Coffee</h4><p>Jl. Kemang Raya No. 18</p><hr/><span>2 × Kopi Susu <b>44.000</b></span><span>1 × Croissant <b>18.000</b></span><hr/><strong>Total <b>Rp 62.000</b></strong><small>Terima kasih sudah berkunjung</small></div></div>}{tab==='Notification'&&<ToggleSettings title="Notifikasi" items={['Low stock','Transaksi baru','Backup success','Failed payment','User login']} />}{tab==='Appearance'&&<div className="appearance-options"><h3>Tampilan aplikasi</h3>{['Light','Dark','System'].map((t,i)=><button className={i===0?'active':''} key={t}><span className={`theme-thumb ${t.toLowerCase()}`}></span><b>{t}</b><small>{i===2?'Ikuti perangkat':`Gunakan tema ${t.toLowerCase()}`}</small></button>)}</div>}</section></div></div>
}

function CrudSettingTable({ title,description,button,rows,columns,onAdd,onAction }) {
  return <div><div className="setting-demo-head"><div><h3>{title}</h3><p>{description}</p></div><button onClick={onAdd}><Plus />{button}</button></div><div className="data-toolbar"><label><Search /><input placeholder={`Cari ${title.toLowerCase()}`} /></label><button><RefreshCcw /> Refresh</button><button><Download /> Export</button></div><div className="data-table settings-crud-table"><div className="data-row data-head">{columns.map(c=><span key={c}>{c}</span>)}<span>Aksi</span></div>{rows.map(r=><div className="data-row" key={r[0]}>{r.map((v,i)=><span key={`${r[0]}-${i}`}>{i===0?<b>{v}</b>:i===r.length-1?<em>{v}</em>:v}</span>)}<span><RowActions onAction={(a)=>onAction(r,a)} /></span></div>)}</div></div>
}

function ToggleSettings({ title,items }) {
  return <div className="toggle-settings"><h3>{title}</h3><p>Aktifkan atau nonaktifkan konfigurasi sesuai kebutuhan operasional.</p>{items.map((item,i)=><label key={item}><span><b>{item}</b><small>Pengaturan frontend untuk {item.toLowerCase()}.</small></span><input type="checkbox" defaultChecked={i<4}/><i></i></label>)}</div>
}

function ProfilePage({ notify }) {
  const [tab,setTab]=useState('Personal Information')
  const [photo,setPhoto]=useState('')
  const tabs=['Personal Information','Security','Preferences','Login Activity']
  return <div className="module-page"><div className="profile-hero"><span>{photo?<img src={photo} alt="Admin Demo"/>:'AD'}</span><div><h2>Admin Demo</h2><p>Super Admin · Outlet Kemang</p></div><em>Online</em></div><div className="profile-tabs">{tabs.map(t=><button className={tab===t?'active':''} onClick={()=>setTab(t)} key={t}>{t}</button>)}</div><div className="profile-card">{tab==='Security'?<div className="setting-form"><div className="setting-section-title"><h3>Ubah password</h3><p>Password pada demo hanya disimpan sementara.</p></div><div className="crud-fields"><label>Current Password<input type="password" /></label><label>New Password<input type="password" /></label><label>Confirm Password<input type="password" /></label></div><button className="save-button" onClick={()=>notify('Password demo berhasil diperbarui','success')}>Simpan password</button></div>:tab==='Login Activity'?<div className="data-table login-table"><div className="data-row data-head"><span>Device</span><span>Lokasi</span><span>Waktu</span><span>Status</span></div>{[['Chrome · Windows','Jakarta, Indonesia','Sekarang','Aktif'],['Safari · iPhone','Jakarta, Indonesia','18 Agu 2026','Selesai']].map(r=><div className="data-row" key={r[2]}>{r.map((v,i)=><span key={v}>{i===3?<em>{v}</em>:v}</span>)}</div>)}</div>:tab==='Preferences'?<ToggleSettings title="Preferensi" items={['Notifikasi email','Notifikasi WhatsApp','Mode ringkas','Suara POS']} />:<div className="setting-form"><div className="setting-section-title"><h3>Informasi personal</h3><p>Perbarui data profile yang digunakan di aplikasi.</p></div><ImageUploaderWithCrop label="Foto profile" aspect={1} value={photo} onChange={(v)=>{setPhoto(v);notify('Foto profile berhasil diperbarui','success')}} /><div className="crud-fields"><label>Nama<input defaultValue="Admin Demo"/></label><label>Email<input defaultValue="admin@gmail.com"/></label><label>Telepon<input defaultValue="0812 3456 7890"/></label><label>Tanggal lahir<input type="date" defaultValue="1990-08-20"/></label><label className="wide">Alamat<textarea defaultValue="Jakarta Selatan"/></label></div><button className="save-button" onClick={()=>notify('Profile berhasil diperbarui','success')}>Simpan profile</button></div>}</div></div>
}

function NotFoundPage({ navigate }) {
  return <div className="not-found"><Logo/><div className="not-found-visual"><span>4</span><i><Search /></i><span>4</span></div><h1>Halaman tidak ditemukan</h1><p>Alamat yang Anda buka tidak tersedia atau sudah dipindahkan.</p><div><button onClick={()=>navigate('/')}><ArrowLeft /> Kembali ke landing page</button><button onClick={()=>navigate('/app/dashboard')}>Buka dashboard <ArrowRight /></button></div><small>Error 404 · BukaNota</small></div>
}

function App() {
  const [route, setRoute] = useState(location.pathname)
  const [loginOpen, setLoginOpen] = useState(false)
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState(null)
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('bukanota-demo-auth') === '1')
  const [cart, setCart] = useState([{ name: 'Kopi Susu Aren', price: 22000, qty: 2 }, { name: 'Croissant', price: 18000, qty: 1 }])
  const [meja, setMeja] = useState(null)
  useEffect(() => { const onPop = () => setRoute(location.pathname); addEventListener('popstate', onPop); return () => removeEventListener('popstate', onPop) }, [])
  const navigate = (path) => { history.pushState({}, '', path); setRoute(path); scrollTo({ top: 0, behavior: 'smooth' }) }
  const login = () => { sessionStorage.setItem('bukanota-demo-auth', '1'); setLoggedIn(true); setLoginOpen(false); navigate('/app/dashboard') }
  const logout = () => { sessionStorage.removeItem('bukanota-demo-auth'); setLoggedIn(false); navigate('/') }
  const notify = (message, type = 'success') => setToast({ id: Date.now(), message, type })
  const openModal = (config) => setModal({ ...config, id: Date.now() })
  const overlays = <>{modal && <AppModal key={modal.id} modal={modal} onClose={() => setModal(null)} notify={notify} />}<Toast toast={toast} onClose={() => setToast(null)} /></>
  const publicRoutes = ['/']
  const appRoutes = ['/app/dashboard','/app/pos','/app/checkout','/app/payment','/app/membership','/app/inventory','/app/accounting','/app/users','/app/outlet','/app/logs','/app/backup','/app/access','/app/settings','/app/profile','/app/deleted','/app/transactions','/app/orders']
  if (!publicRoutes.includes(route) && !appRoutes.includes(route)) return <NotFoundPage navigate={navigate} />
  if (route.startsWith('/app/') && !loggedIn) return <><LandingPage onLogin={() => setLoginOpen(true)} navigate={navigate} />{loginOpen && <LoginModal onClose={() => setLoginOpen(false)} onSuccess={login} />}</>
  if (route === '/app/pos' && loggedIn) return <><PosPage navigate={navigate} openModal={openModal} notify={notify} cart={cart} setCart={setCart} meja={meja} setMeja={setMeja} />{overlays}</>
  if (route === '/app/checkout' && loggedIn) return <><CheckoutPage navigate={navigate} openModal={openModal} notify={notify} cart={cart} setCart={setCart} meja={meja} />{overlays}</>
  if (route.startsWith('/app/') && loggedIn) {
    let page = entityConfigs[route] ? <EntityPage route={route} openModal={openModal} /> : null
    if (route === '/app/dashboard') page = <DashboardPage navigate={navigate} />
    if (route === '/app/transactions') page = <TransaksiPage navigate={navigate} openModal={openModal} notify={notify} />
    if (route === '/app/inventory') page = <InventoryPage openModal={openModal} />
    if (route === '/app/outlet') page = <OutletPage openModal={openModal} />
    if (route === '/app/access') page = <AccessPage openModal={openModal} notify={notify} />
    if (route === '/app/backup') page = <BackupPage openModal={openModal} notify={notify} />
    if (route === '/app/deleted') page = <DeletedPage openModal={openModal} notify={notify} />
    if (route === '/app/logs') page = <LogsPage openModal={openModal} notify={notify} />
    if (route === '/app/settings') page = <SettingsPage openModal={openModal} notify={notify} />
    if (route === '/app/profile') page = <ProfilePage notify={notify} />
    return <><AdminShell route={route} navigate={navigate} onLogout={logout}>{page}</AdminShell>{overlays}</>
  }
  return <><LandingPage onLogin={() => setLoginOpen(true)} navigate={navigate} />{loginOpen && <LoginModal onClose={() => setLoginOpen(false)} onSuccess={login} />}</>
}

export default App

import { useEffect, useState } from 'react'
import {
  ArrowRight, BookOpen, Building2, Check, ChevronDown, ChevronRight, Coffee, CreditCard, Crown, FileText, Gift, Heart, Menu, Minus, Package, Plus, ReceiptText, ShieldCheck, ShoppingBag, ShoppingCart, Smartphone, Store, Truck, Users, UtensilsCrossed, WalletCards, X,
} from 'lucide-react'
import Logo from '../components/Logo'
import AnimatedVisual from '../components/AnimatedVisual'

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

export default function LandingPage({ onLogin, navigate }) {
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
      <section className="section service-section" id="operations"><div className="container"><div className="section-heading centered narrow"><h2>Alur sederhana dari depan hingga belakang.</h2></div><div className="service-tabs" role="tablist">{serviceTabs.map(({ id, label, icon: Icon }) => <button className={activeTab === id ? 'active' : ''} onClick={() => setActiveTab(id)} key={id}><Icon /><span>{label}</span></button>)}</div><div className="service-content"><div className="service-copy"><span className="number-label">FITUR BUKANOTA</span><h3>{activeService.title}</h3><p>{activeService.copy}</p><ul>{activeService.bullets.map(b => <li key={b}><Check />{b}</li>)}</ul><button className="outline-button" onClick={() => navigate('/pos')}>Buka tampilan POS <ArrowRight /></button></div><div className="service-visual"><AnimatedVisual key={activeService.id} type={activeService.id} compact /></div></div></div></section>
      <section className="section dashboard-section"><div className="container"><div className="section-heading split light"><div><h2>Lihat kondisi bisnis tanpa menunggu laporan.</h2></div><p>Penjualan, transaksi, dan performa outlet diperbarui dalam satu tampilan yang mudah dibaca.</p></div><AnimatedVisual type="dashboard" /></div></section>
      <section className="section stock-section"><div className="container two-col"><div className="product-copy"><h2>Tahu apa yang tersedia. Sebelum pelanggan bertanya.</h2><p>Pantau bahan baku dan produk, lakukan opname, serta lacak perpindahan antar outlet.</p><ul><li><Check />Stok detail per outlet dan gudang</li><li><Check />Opname, produksi, dan bill of material</li><li><Check />Peringatan stok minimum</li></ul><button className="text-button" onClick={() => navigate('/inventory')}>Buka halaman inventori <ArrowRight /></button></div><AnimatedVisual type="stock" /></div></section>
      <section className="section loyalty-section"><div className="container two-col reverse"><div className="loyalty-preview"><div className="member-card"><span>BUKANOTA <Crown /></span><small>MEMBER</small><strong>1.240</strong><p>Poin tersedia</p><div><b>RA</b><span><strong>Raisa Amelia</strong><small>Gold Member</small></span></div></div><div className="reward-card"><div><Gift /><span><small>Reward aktif</small><strong>Gratis Kopi Susu</strong></span></div><b>1.000 poin</b><button>Tukar reward</button></div></div><div className="product-copy"><h2>Buat pelanggan punya alasan untuk kembali.</h2><p>Bangun program loyalitas yang mudah dipakai tim dan menarik untuk pelanggan.</p><div className="mini-features"><div><Gift /><span><strong>Promo fleksibel</strong><small>Diskon, bundling, dan hadiah item.</small></span></div><div><Heart /><span><strong>Poin & membership</strong><small>Reward berdasarkan kebiasaan pelanggan.</small></span></div></div></div></div></section>
      <section className="section finance-section"><div className="container two-col"><div className="product-copy"><h2>Angka yang lebih mudah dimengerti.</h2><p>Bergerak dari transaksi menuju gambaran keuangan yang utuh tanpa merapikan data berulang kali.</p><div className="report-links"><a href="#pricing">Laba rugi & neraca <ChevronRight /></a><a href="#pricing">Kas, bank, hutang & piutang <ChevronRight /></a><a href="#pricing">Jurnal & biaya operasional <ChevronRight /></a></div></div><AnimatedVisual type="books" /></div></section>
      <section className="section pricing-section" id="pricing"><div className="container"><div className="section-heading centered narrow"><h2>Pilih paket yang tumbuh bersama bisnis.</h2><p>Mulai dengan kebutuhan hari ini. Tingkatkan kapan saja.</p><div className="billing-toggle"><button className={!annual ? 'active' : ''} onClick={() => setAnnual(false)}>Bulanan</button><button className={annual ? 'active' : ''} onClick={() => setAnnual(true)}>Tahunan <em>Hemat 20%</em></button></div></div><div className="pricing-grid">{plans.map(plan => <article className={plan.popular ? 'popular' : ''} key={plan.name}>{plan.popular && <span className="popular-label">PALING POPULER</span>}<h3>{plan.name}</h3><p>{plan.desc}</p><div className="price">{plan.price === 'Hubungi' ? <strong className="contact-price">Hubungi kami</strong> : <><small>Rp</small><strong>{annual ? plan.price : Math.round(Number(plan.price) * 1.2)}</strong><span>rb<br />/bulan</span></>}</div><button onClick={onLogin}>{plan.name === 'Business' ? 'Hubungi kami' : 'Coba gratis'}</button><ul>{plan.features.map(f => <li key={f}><Check />{f}</li>)}</ul></article>)}</div></div></section>
      <section className="section faq-section" id="faq"><div className="container faq-grid"><div className="faq-intro"><h2>Pertanyaan yang sering ditanyakan.</h2><p>Belum menemukan jawaban? Tim kami siap membantu kebutuhan bisnis Anda.</p></div><div className="faq-list">{faqs.map(([q, a], i) => <article className={openFaq === i ? 'open' : ''} key={q}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{q}</span>{openFaq === i ? <Minus /> : <Plus />}</button><div><p>{a}</p></div></article>)}</div></div></section>
    </main>
    <footer><div className="container footer-grid"><div className="footer-brand"><Logo light /><p>Sistem manajemen bisnis yang membantu usaha Indonesia tumbuh lebih rapi.</p></div><div><h3>Layanan</h3>{serviceTabs.map(s => <a key={s.id} href="#operations" onClick={() => setActiveTab(s.id)}>{s.label}</a>)}</div><div><h3>Solusi bisnis</h3>{industries.slice(0, 5).map(i => <a key={i.name} href="#solutions">{i.name}</a>)}</div><div><h3>Perusahaan</h3><a href="#pricing">Harga</a><a href="#faq">FAQ</a><a href="#faq">Hubungi kami</a></div></div><div className="container footer-bottom"><span>© 2026 BukaNota. Seluruh hak dilindungi.</span><span>Produk dari PT Meta Digital Informasi</span></div></footer>
  </div>
}
import '../styles/landing.css'

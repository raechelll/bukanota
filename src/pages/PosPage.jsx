import { useMemo, useState } from 'react'
import {
  ArrowLeft, Ban, Clock3, History, Minus, Pencil, Plus, Printer, ReceiptText, Search, Star, Users, Utensils, Wallet, X,
} from 'lucide-react'
import calcTotals from '../utils/calcTotals'
import '../styles/pos.css'

const CATEGORIES = ['Semua', 'Kopi', 'Makanan', 'Minuman']
const FILTERS = [
  { id: 'all', label: 'Semua' },
  { id: 'favorite', label: 'Favorit' },
  { id: 'promo', label: 'Promo' },
]
const FAVORITES_INIT = ['Kopi Susu Aren', 'Croissant', 'Matcha Latte']
const MEMBERS = [
  ['Budi Santoso', '0812-1111-2222'],
  ['Siti Rahma', '0813-3333-4444'],
  ['Andi Wijaya', '0815-5555-6666'],
  ['Sarah Putri', '0817-7777-8888'],
  ['Kevin Lim', '0819-9999-0000'],
]
const OTHER_ORDERS = [
  ['#INV-20260820-005', 'Meja 05', 96000],
  ['#INV-20260820-006', 'Sarah Putri · Takeaway', 54000],
  ['#INV-20260820-007', 'Meja 02', 128000],
]
const PROMOS = new Set(['Matcha Latte', 'Nasi Goreng'])

const posProducts = [
  ['Kopi Susu Aren', 'Kopi', 22000, 'KS', 'https://akcdn.detik.net.id/community/media/visual/2024/10/16/es-kopi-susu-gula-aren.jpeg?w=650'], ['Americano', 'Kopi', 18000, 'AM'], ['Matcha Latte', 'Minuman', 26000, 'ML', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbmlzV5cenuuSYMnMYxRBp2K7U9TTQOn_I6C9QTUnUFhT3-J5rz4AIDD7z&s=10'], ['Chocolate', 'Minuman', 24000, 'CH'], ['Rice Bowl Ayam', 'Makanan', 32000, 'RB', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPhimlPgWyuzBmtKAQL5IlUvEoF7Qwc1FH8Sxj_vZe0A&s=10'], ['Croissant', 'Makanan', 18000, 'CR', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp-m_xQvcEUOMX4mIQQ-k1ZnCz_FVYCbqDJUvDfSp7gQ&s=10'], ['Nasi Goreng', 'Makanan', 28000, 'NG', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUpPoLpIHF21YLKglSy9XC3GxvuP6w7v4JKyimYdu-uA&s=10'], ['Es Teh Lemon', 'Minuman', 16000, 'TL', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd7C1CrwrV6yYlIPPcspjPsS4BKHCvr1UPhp_iUjf-RQ&s=10'],
]

const fmt = (n) => new Intl.NumberFormat('id-ID').format(n)

export default function PosPage({ navigate, openModal, notify, cart, setCart, meja, setMeja }) {
  const [category, setCategory] = useState('Semua')
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [orderTab, setOrderTab] = useState('Orderan')
  const [member, setMember] = useState(null)
  const [memberQuery, setMemberQuery] = useState('')
  const [memberOpen, setMemberOpen] = useState(false)
  const [splitOpen, setSplitOpen] = useState(false)
  const [splitMode, setSplitMode] = useState('item')
  const [picked, setPicked] = useState([])
  const [people, setPeople] = useState(2)
  const [joinPicked, setJoinPicked] = useState([])
  const [joinOpen, setJoinOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [favorites, setFavorites] = useState(() => new Set(FAVORITES_INIT))

  const toggleFavorite = (name) => setFavorites(prev => {
    const next = new Set(prev)
    next.has(name) ? next.delete(name) : next.add(name)
    return next
  })
  const add = ([name, , price]) => {
    const first = !cart.length
    setCart(items => { const found = items.find(i => i.name === name); return found ? items.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i) : [...items, { name, price, qty: 1 }] })
    if (first) setDrawerOpen(true)
  }
  const qty = (name, amount) => setCart(items => items.map(i => i.name === name ? { ...i, qty: Math.max(0, i.qty + amount) } : i).filter(i => i.qty > 0))
  const removeItem = (name) => setCart(items => items.filter(i => i.name !== name))
  const { total, tax, service, rounding, finalTotal } = calcTotals(cart)
  const totalQty = cart.reduce((s, i) => s + i.qty, 0)

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posProducts.filter(p => {
      const okCat = category === 'Semua' || p[1] === category
      const okFilter = filter === 'all' || (filter === 'favorite' && favorites.has(p[0])) || (filter === 'promo' && PROMOS.has(p[0]))
      const okQuery = !q || p[0].toLowerCase().includes(q)
      return okCat && okFilter && okQuery
    })
  }, [category, filter, query, favorites])
  const grouped = filter === 'all' && !query.trim()
  const favItems = shown.filter(p => favorites.has(p[0]))
  const otherItems = shown.filter(p => !favorites.has(p[0]))
  const filters = FILTERS.map(f => ({ ...f, count: f.id === 'all' ? posProducts.length : f.id === 'favorite' ? favorites.size : PROMOS.size }))

  const card = (p) => {
    const fav = favorites.has(p[0])
    const inCart = cart.find(i => i.name === p[0])
    return <div className="product-card" role="button" tabIndex={0} key={p[0]}
      onClick={() => add(p)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); add(p) } }}
    >
      <div className="product-card-top">
        {p[4] ? <img className="product-photo" src={p[4]} alt={p[0]} loading="lazy" /> : <span className="product-avatar"><Utensils size={20} /></span>}
        {inCart && <span className="card-qty">{inCart.qty}×</span>}
        <button type="button" className={`star-btn ${fav ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleFavorite(p[0]) }}
          aria-label={fav ? `Hapus ${p[0]} dari favorit` : `Tambah ${p[0]} ke favorit`}
        ><Star size={15} /></button>
      </div>
      <div className="product-card-body">
        <span className="product-name">{p[0]}</span>
        <span className="product-price">Rp {fmt(p[2])}</span>
      </div>
    </div>
  }

  const tableModal = () => openModal({ type: 'form', title: 'Pilih meja', kicker: 'ORDERAN', fields: [{ name: 'meja', label: 'Nomor meja (boleh dikosongkan)', type: 'select', options: ['Tanpa meja', 'Meja 01', 'Meja 02', 'Meja 03', 'Meja 04', 'Meja 05', 'Meja 06', 'Meja 07', 'Meja 08'] }], success: 'Meja berhasil dipilih', onConfirm: (data) => setMeja(data.meja === 'Tanpa meja' ? null : data.meja) })
  const discountModal = () => openModal({ type: 'form', title: 'Tambah discount', kicker: 'PROMO', fields: [{ name: 'type', label: 'Tipe discount', type: 'select', options: ['Persentase','Nominal','Promo code'] }, { name: 'value', label: 'Nilai', placeholder: '10 atau 25000' }, { name: 'code', label: 'Kode promo', placeholder: 'HEMAT20', wide: true }], success: 'Discount berhasil diterapkan' })

  return <div className="pos-page">
    <header className="pos-page-header"><button className="back-button" onClick={() => navigate('/transactions')}><ArrowLeft /> Kembali</button><div><strong>Point of Sale</strong><span><i></i>Outlet Kemang · Kasir Utama</span></div><div className="pos-header-actions"><button onClick={() => notify('Riwayat transaksi dibuka', 'info')}><History /> Riwayat</button><button onClick={() => notify('Transaksi berhasil di-hold', 'success')}><Clock3 /> Hold</button></div></header>
    <main className="pos-main">
      <section className="pos-menu" aria-label="Menu produk">
        <div className="menu-title"><h1>Menu Makanan &amp; Minuman</h1></div>
        <div className="menu-search">
          <Search size={17} />
          <input type="text" placeholder="Cari menu..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Cari menu" />
          {query && <button type="button" className="search-clear" onClick={() => setQuery('')} aria-label="Bersihkan pencarian"><X size={15} /></button>}
        </div>
        <div className="category-tabs" role="tablist" aria-label="Kategori menu">
          {CATEGORIES.map(c => <button key={c} type="button" role="tab" aria-selected={category === c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c}</button>)}
        </div>
        <div className="filter-row" aria-label="Filter menu">
          {filters.map(f => <button key={f.id} type="button" className={`chip ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>
            <span>{f.label}</span><span className="chip-count">{f.count}</span>
          </button>)}
        </div>

        {shown.length ? <>
          {grouped && favItems.length > 0 && <div className="menu-group">
            <div className="menu-group-head"><Star size={14} /><span>Menu Favorit</span><span className="menu-group-count">{favItems.length}</span></div>
            <div className="menu-grid">{favItems.map(card)}</div>
          </div>}
          <div className="menu-group">
            {grouped && favItems.length > 0 && <div className="menu-group-head"><span>Menu Lainnya</span></div>}
            <div className="menu-grid">{(grouped ? otherItems : shown).map(card)}</div>
          </div>
        </> : <p className="empty-state">Tidak ada menu yang cocok.</p>}
      </section>

      <aside className={`pos-order ${drawerOpen ? 'open' : ''}`} aria-label="Ringkasan pesanan">
        <div className="order-head">
          <div className="order-tabs" role="tablist" aria-label="Panel pesanan">
            <button type="button" role="tab" aria-selected={orderTab === 'Orderan'} className={orderTab === 'Orderan' ? 'active' : ''} onClick={() => setOrderTab('Orderan')}>Orderan {totalQty ? `(${totalQty})` : ''}</button>
            <button type="button" role="tab" aria-selected={orderTab === 'Detail'} className={orderTab === 'Detail' ? 'active' : ''} onClick={() => setOrderTab('Detail')}>Detail</button>
          </div>
          <button type="button" className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Tutup"><X size={18} /></button>
        </div>

        {orderTab === 'Detail' ? <div className="order-detail">
          <div className="detail-row"><span>No. Order</span><strong>#INV-20260820-004</strong></div>
          <div className="detail-row"><span>Tipe pesanan</span><strong>{meja ? 'Dine in' : 'Takeaway'}</strong></div>
          <div className="detail-row"><span>Meja</span><strong className="detail-meja">{meja || 'Tanpa meja'}<button type="button" onClick={tableModal} aria-label="Ubah meja"><Pencil size={13} /></button></strong></div>
          <div className="detail-row"><span>Member</span><strong className="detail-member">
            <div className="member-combo">
              {member
                ? <span className="member-chip"><b>{member[0]}</b><small>{member[1]}</small><button type="button" aria-label="Hapus member" onClick={() => setMember(null)}><X size={12} /></button></span>
                : <input value={memberQuery} placeholder="Cari nama / no. HP member" onFocus={() => setMemberOpen(true)} onChange={(e) => { setMemberQuery(e.target.value); setMemberOpen(true) }} />}
              {memberOpen && !member && <div className="member-list">{MEMBERS.filter(m => { const n = memberQuery.trim().toLowerCase(); return !n || m[0].toLowerCase().includes(n) || m[1].includes(n) }).map(m => <button type="button" key={m[0]} onClick={() => { setMember(m); setMemberOpen(false); setMemberQuery('') }}><b>{m[0]}</b><small>{m[1]}</small></button>)}{!MEMBERS.some(m => { const n = memberQuery.trim().toLowerCase(); return !n || m[0].toLowerCase().includes(n) || m[1].includes(n) }) && <span className="member-none">Member tidak ditemukan</span>}</div>}
            </div>
          </strong></div>
          <div className="detail-row"><span>Kasir</span><strong>Kasir Utama</strong></div>
          <div className="detail-row"><span>Waktu</span><strong>Hari ini · 13:24</strong></div>
          <div className="detail-row"><span>Total item</span><strong>{totalQty} item</strong></div>
          <div className="detail-row"><span>Status pembayaran</span><strong className="unpaid">Belum dibayar</strong></div>
        </div> : <div className="order-body">
          <div className="order-table">
            <div className="order-table-head">
              <span className="th-no">No</span><span className="th-item">Item</span><span className="th-qty">Qty</span><span className="th-total">Total</span>
            </div>
            {cart.length ? <div className="order-table-body">
              {cart.map((item, index) => <div key={item.name} className="order-row">
                <span className="td-no">{index + 1}</span>
                <span className="td-item">
                  <span className="td-name">{item.name}</span>
                  <button type="button" className="icon-btn danger td-remove" onClick={() => removeItem(item.name)} aria-label={`Hapus ${item.name}`}><X size={14} /></button>
                </span>
                <span className="td-qty"><div className="stepper">
                  <button type="button" onClick={() => qty(item.name, -1)} aria-label={`Kurangi ${item.name}`}><Minus size={13} /></button>
                  <span className="stepper-value">{item.qty}</span>
                  <button type="button" onClick={() => qty(item.name, 1)} aria-label={`Tambah ${item.name}`}><Plus size={13} /></button>
                </div></span>
                <span className="td-total">{fmt(item.price * item.qty)}</span>
              </div>)}
            </div> : <div className="empty-order">
              <ReceiptText size={28} />
              <p>Belum ada item di pesanan</p>
              <span>Pilih produk untuk memulai transaksi.</span>
            </div>}
          </div>
          <div className="order-totals">
            <div className="total-row"><span>Subtotal ({cart.length} Item)</span><strong>{fmt(total)}</strong></div>
            <div className="total-row"><span>Diskon</span><button type="button" className="total-add" onClick={discountModal}>Tambah</button></div>
            <div className="total-row"><span>Tax (11%)</span><strong>{fmt(tax)}</strong></div>
            <div className="total-row"><span>Service (5%)</span><strong>{fmt(service)}</strong></div>
            <div className="total-row muted"><span>Pembulatan</span><strong>{rounding > 0 ? `+${fmt(rounding)}` : fmt(rounding)}</strong></div>
            <div className="total-row grand"><span>Total Tagihan</span><strong>Rp{fmt(finalTotal)}</strong></div>
          </div>
        </div>}

        <div className="order-actions">
          <div className="action-grid">
            <button type="button" className="btn" onClick={() => { setJoinPicked([]); setJoinOpen(true) }}><Users size={16} /> Join Bill</button>
            <button type="button" className="btn" onClick={() => { setPicked([]); setSplitMode('item'); setSplitOpen(true) }}><ReceiptText size={16} /> Split Bill</button>
            <button type="button" className="btn" onClick={() => notify('Bill dikirim ke printer', 'success')}><Printer size={16} /> Print Bill</button>
            <button type="button" className="btn danger-text" onClick={() => { setCart([]); notify('Order dibatalkan', 'info') }}><Ban size={16} /> Cancel Order</button>
          </div>
          <button type="button" className="btn pay" disabled={!cart.length} onClick={() => navigate('/checkout')}>
            <Wallet size={18} />
            <span>Bayar Rp{fmt(finalTotal)}</span>
          </button>
        </div>
      </aside>
    </main>

    <button type="button" className="mobile-order-bar" onClick={() => setDrawerOpen(v => !v)} aria-label="Buka ringkasan pesanan">
      <ReceiptText size={18} />
      <span>Orderan</span>
      <strong>Rp{fmt(finalTotal)}</strong>
    </button>

    {splitOpen && <div className="app-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && setSplitOpen(false)}>
      <div className="app-modal wide" role="dialog" aria-modal="true">
        <div className="app-modal-header"><div><h3>Split Bill</h3><p>#INV-20260820-004 · {meja || 'Takeaway'}</p></div><button onClick={() => setSplitOpen(false)}><X /></button></div>
        <div className="split-tabs">
          <button type="button" className={splitMode === 'item' ? 'active' : ''} onClick={() => setSplitMode('item')}>Pilih item</button>
          <button type="button" className={splitMode === 'even' ? 'active' : ''} onClick={() => setSplitMode('even')}>Bagi rata</button>
        </div>
        {splitMode === 'item' ? <div className="split-body">
          <div className="split-items">
            {cart.length ? cart.map((i) => <label key={i.name} className="split-item">
              <input type="checkbox" checked={picked.includes(i.name)} onChange={(e) => setPicked(p => e.target.checked ? [...p, i.name] : p.filter(n => n !== i.name))} />
              <section><b>{i.name}</b><small>{i.qty} × Rp{fmt(i.price)}</small></section>
              <strong>Rp{fmt(i.qty * i.price)}</strong>
            </label>) : <p className="split-empty">Belum ada item di order ini.</p>}
          </div>
          <aside className="split-summary">
            <h4>Ringkasan bill terpisah</h4>
            {cart.filter(i => picked.includes(i.name)).map(i => <div key={i.name} className="total-row"><span>{i.qty} × {i.name}</span><strong>{fmt(i.qty * i.price)}</strong></div>)}
            {!picked.length && <p className="split-hint">Centang item untuk dimasukkan ke bill terpisah.</p>}
            <div className="total-row grand"><span>Subtotal</span><strong>Rp{fmt(cart.filter(i => picked.includes(i.name)).reduce((s, i) => s + i.qty * i.price, 0))}</strong></div>
          </aside>
        </div>
          : <div className="split-even">
            <div className="people-stepper">
              <button type="button" onClick={() => setPeople(p => Math.max(2, p - 1))} aria-label="Kurangi orang"><Minus size={15} /></button>
              <b>{people} orang</b>
              <button type="button" onClick={() => setPeople(p => Math.min(10, p + 1))} aria-label="Tambah orang"><Plus size={15} /></button>
            </div>
            <div className="total-row"><span>Total tagihan</span><strong>Rp{fmt(finalTotal)}</strong></div>
            <div className="total-row grand"><span>Per orang</span><strong>Rp{fmt(Math.ceil(finalTotal / people / 100) * 100)}</strong></div>
          </div>}
        <div className="app-modal-footer">
          <button onClick={() => setSplitOpen(false)}>Batal</button>
          <button className="primary" disabled={splitMode === 'item' && (!picked.length || !cart.length)} onClick={() => { notify(splitMode === 'item' ? `Bill terpisah dibuat untuk ${picked.length} item` : `Bill dibagi rata untuk ${people} orang`, 'success'); setSplitOpen(false) }}>Proses split</button>
        </div>
      </div>
    </div>}

    {joinOpen && <div className="app-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && setJoinOpen(false)}>
      <div className="app-modal" role="dialog" aria-modal="true">
        <div className="app-modal-header"><div><h3>Join Bill</h3><p>Pilih orderan lain untuk digabung ke #INV-20260820-004</p></div><button onClick={() => setJoinOpen(false)}><X /></button></div>
        <div className="join-list">
          {OTHER_ORDERS.map(([inv, who, amt]) => <label key={inv} className="split-item">
            <input type="checkbox" checked={joinPicked.includes(inv)} onChange={(e) => setJoinPicked(p => e.target.checked ? [...p, inv] : p.filter(x => x !== inv))} />
            <section><b>{who}</b><small>{inv}</small></section>
            <strong>Rp{fmt(amt)}</strong>
          </label>)}
        </div>
        <div className="app-modal-footer">
          <button onClick={() => setJoinOpen(false)}>Batal</button>
          <button className="primary" disabled={!joinPicked.length} onClick={() => { notify(`${joinPicked.length} orderan berhasil digabung`, 'success'); setJoinOpen(false) }}>Gabungkan</button>
        </div>
      </div>
    </div>}
  </div>
}

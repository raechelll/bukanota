import { useState } from 'react'
import {
  ArrowLeft, ArrowRight, Ban, Clock3, FileText, History, Minus, Plus, Printer, ReceiptText, Search, UtensilsCrossed,
} from 'lucide-react'
import calcTotals from '../utils/calcTotals'

const posProducts = [
  ['Kopi Susu Aren', 'Kopi', 22000, 'KS', 'https://akcdn.detik.net.id/community/media/visual/2024/10/16/es-kopi-susu-gula-aren.jpeg?w=650'], ['Americano', 'Kopi', 18000, 'AM'], ['Matcha Latte', 'Minuman', 26000, 'ML', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbmlzV5cenuuSYMnMYxRBp2K7U9TTQOn_I6C9QTUnUFhT3-J5rz4AIDD7z&s=10'], ['Chocolate', 'Minuman', 24000, 'CH'], ['Rice Bowl Ayam', 'Makanan', 32000, 'RB', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPhimlPgWyuzBmtKAQL5IlUvEoF7Qwc1FH8Sxj_vZe0A&s=10'], ['Croissant', 'Makanan', 18000, 'CR', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp-m_xQvcEUOMX4mIQQ-k1ZnCz_FVYCbqDJUvDfSp7gQ&s=10'], ['Nasi Goreng', 'Makanan', 28000, 'NG', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUpPoLpIHF21YLKglSy9XC3GxvuP6w7v4JKyimYdu-uA&s=10'], ['Es Teh Lemon', 'Minuman', 16000, 'TL', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd7C1CrwrV6yYlIPPcspjPsS4BKHCvr1UPhp_iUjf-RQ&s=10'],
]

export default function PosPage({ navigate, openModal, notify, cart, setCart, meja, setMeja }) {
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
import '../styles/pos.css'

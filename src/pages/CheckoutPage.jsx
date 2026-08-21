import { useState } from 'react'
import {
  ArrowLeft, Building2, Check, CircleDollarSign, Clock3, CreditCard, Grid2X2, Landmark, QrCode, ReceiptText, Smartphone,
} from 'lucide-react'
import calcTotals from '../utils/calcTotals'
import '../styles/pos.css'
import '../styles/checkout.css'

const METHODS = [
  { id: 'Tunai', desc: 'Bayar langsung di kasir', icon: CircleDollarSign },
  { id: 'QRIS', desc: 'Scan kode QRIS', icon: QrCode },
  { id: 'E-Wallet', desc: 'GoPay, OVO, DANA', icon: Smartphone },
  { id: 'Kartu Debit', desc: 'Gesek atau tap kartu', icon: CreditCard },
  { id: 'Kartu Kredit', desc: 'Visa, Mastercard, JCB', icon: CreditCard },
  { id: 'Transfer Bank', desc: 'BCA, Mandiri, BRI, BNI', icon: Landmark },
]

const fmt = (n) => new Intl.NumberFormat('id-ID').format(n)

export default function CheckoutPage({ navigate, notify, cart, setCart, meja }) {
  const [method, setMethod] = useState(null)
  const [cash, setCash] = useState('')
  const [done, setDone] = useState(false)
  const { total, tax, service, rounding, finalTotal } = calcTotals(cart)
  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const orderNo = '#INV-20260820-004'
  const cashValue = Number(cash.replace(/[^0-9]/g, '')) || 0
  const change = cashValue - finalTotal
  const selected = METHODS.find(m => m.id === method)
  const canConfirm = method && (method !== 'Tunai' || cashValue >= finalTotal)

  if (!cart.length && !done) return <div className="pos-page">
    <header className="pos-page-header"><button className="back-button" onClick={()=>navigate('/app/pos')}><ArrowLeft /> Kembali</button><div><strong>Pembayaran</strong><span><i></i>Outlet Kemang · Kasir Utama</span></div><div className="pos-header-actions"><button onClick={()=>notify('Order disimpan sebagai pending', 'info')}><Clock3 /> Pending</button></div></header>
    <main className="pay-empty">
      <ReceiptText size={30} />
      <p>Belum ada orderan untuk dibayar.</p>
      <button className="btn-solid" onClick={()=>navigate('/app/pos')}>Buat orderan di kasir POS</button>
    </main>
  </div>

  if (done) return <div className="pos-page">
    <header className="pos-page-header"><button className="back-button" onClick={()=>navigate('/app/pos')}><ArrowLeft /> Kembali</button><div><strong>Pembayaran</strong><span><i></i>Outlet Kemang · Kasir Utama</span></div><div className="pos-header-actions"><button onClick={()=>notify('Struk dikirim ke printer', 'success')}><ReceiptText /> Struk</button></div></header>
    <main className="pay-done">
      <span className="pay-check"><Check size={30} strokeWidth={2.2} /></span>
      <h1>Pembayaran Berhasil</h1>
      <p className="pay-done-total">Rp{fmt(finalTotal)}</p>
      <p className="pay-done-method">{selected?.name} · {orderNo}</p>
      {method === 'Tunai' && <p className="pay-done-change">Kembalian Rp{fmt(change)}</p>}
      <button className="btn-solid" onClick={()=>navigate('/app/transactions')}>Lihat riwayat transaksi</button>
    </main>
  </div>

  return <div className="pos-page">
    <header className="pos-page-header"><button className="back-button" onClick={()=>navigate('/app/pos')}><ArrowLeft /> Kembali</button><div><strong>Pembayaran</strong><span><i></i>Outlet Kemang · Kasir Utama</span></div><div className="pos-header-actions"><button onClick={()=>notify('Order disimpan sebagai pending', 'info')}><Clock3 /> Pending</button></div></header>
    <main className="pay-main">
      <section className="pay-summary" aria-label="Ringkasan pesanan">
        <div className="pay-summary-head">
          <h1>Pembayaran</h1>
          <p>{meja || 'Tanpa meja'} · {totalItems} item</p>
        </div>
        <div className="pay-lines">{cart.map(item => <div key={item.name} className="pay-line">
          <span className="pay-line-name">{item.name}</span>
          <span className="pay-line-qty">{item.qty} x {fmt(item.price)}</span>
          <span className="pay-line-total">{fmt(item.price * item.qty)}</span>
        </div>)}</div>
        <div className="pay-totals">
          <div className="pay-total-row"><span>Subtotal ({cart.length} item)</span><strong>{fmt(total)}</strong></div>
          <div className="pay-total-row"><span>Tax (11%)</span><strong>{fmt(tax)}</strong></div>
          <div className="pay-total-row"><span>Service (5%)</span><strong>{fmt(service)}</strong></div>
          <div className="pay-total-row muted"><span>Pembulatan</span><strong>{rounding > 0 ? `+${fmt(rounding)}` : fmt(rounding)}</strong></div>
          <div className="pay-total-row grand"><span>Total Tagihan</span><strong>Rp{fmt(finalTotal)}</strong></div>
        </div>
      </section>
      <section className="pay-panel" aria-label="Metode pembayaran">
        <h2>Metode Pembayaran</h2>
        <div className="pay-methods">{METHODS.map(({ id, desc, icon: Icon }) => <button
          type="button" key={id}
          className={`pay-method ${method === id ? 'active' : ''}`}
          onClick={() => setMethod(id)}
          aria-pressed={method === id}
        >
          <span className="pay-method-icon"><Icon size={20} /></span>
          <span className="pay-method-info"><strong>{id}</strong><span>{desc}</span></span>
          <span className="pay-method-radio" aria-hidden="true" />
        </button>)}</div>

        {method === 'Tunai' && <div className="pay-cash">
          <label htmlFor="cash-input">Uang diterima</label>
          <div className="cash-input-wrap">
            <span className="cash-prefix">Rp</span>
            <input
              id="cash-input" type="text" inputMode="numeric" placeholder="0"
              value={cash}
              onChange={(e) => setCash(e.target.value.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, ''))}
            />
            <button type="button" className="cash-exact" onClick={() => setCash(String(finalTotal))}>Uang Pas</button>
          </div>
          {cashValue > 0 && cashValue < finalTotal && <p className="cash-note">Uang diterima kurang dari total tagihan.</p>}
          {cashValue >= finalTotal && <p className="cash-change">Kembalian <strong>Rp{fmt(change)}</strong></p>}
        </div>}

        <button
          type="button" className="btn-pay"
          disabled={!canConfirm}
          onClick={() => { setCart([]); setDone(true); notify('Pembayaran berhasil diproses', 'success') }}
        >
          <span>Bayar Rp{fmt(finalTotal)}</span>
          {selected && <span className="btn-pay-method">{selected.name}</span>}
        </button>
      </section>
    </main>
  </div>
}

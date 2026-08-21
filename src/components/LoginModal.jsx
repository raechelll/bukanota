import { useState } from 'react'
import {
  ArrowLeft, ArrowRight, Check, Eye, EyeOff, LockKeyhole, Mail, MessageCircle, X,
} from 'lucide-react'
import Logo from './Logo'

export default function LoginModal({ onClose, onSuccess }) {
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
import '../styles/login.css'

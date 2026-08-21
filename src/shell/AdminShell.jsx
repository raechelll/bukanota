import { useEffect, useState } from 'react'
import '../styles/admin.css'
import '../styles/tables.css'
import {
  Activity, Bell, BookOpen, Building2, Check, ChevronDown, ChevronRight, CreditCard, Database, Grid2X2, LogOut, Menu, Package, Search, Settings2, ShoppingCart, Trash2, UserCog, UserRound, Users, X,
} from 'lucide-react'
import Logo from '../components/Logo'
import useHoverPopover from '../components/useHoverPopover'

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

export default function AdminShell({ route, navigate, onLogout, children }) {
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

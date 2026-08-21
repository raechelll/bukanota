import { useEffect, useState } from 'react'
import LandingPage from './pages/LandingPage'
import LoginModal from './components/LoginModal'
import PosPage from './pages/PosPage'
import CheckoutPage from './pages/CheckoutPage'
import NotFoundPage from './pages/NotFoundPage'
import AdminShell from './shell/AdminShell'
import DashboardPage from './pages/DashboardPage'
import TransaksiPage from './pages/TransaksiPage'
import InventoryPage from './pages/InventoryPage'
import OutletPage from './pages/OutletPage'
import AccessPage from './pages/AccessPage'
import BackupPage from './pages/BackupPage'
import DeletedPage from './pages/DeletedPage'
import LogsPage from './pages/LogsPage'
import SettingsPage from './pages/SettingsPage'
import CatalogSettingsPage from './pages/CatalogSettingsPage'
import ProfilePage from './pages/ProfilePage'
import EntityPage from './pages/EntityPage'
import entityConfigs from './pages/entityConfigs'
import AppModal from './components/AppModal'
import Toast from './components/Toast'

function App() {
  const [route, setRoute] = useState(() => { const p = location.pathname; return p === '/app' || p === '/app/' ? '/' : p.startsWith('/app/') ? p.slice(4) : p })
  const [loginOpen, setLoginOpen] = useState(false)
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState(null)
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('bukanota-demo-auth') === '1')
  const [cart, setCart] = useState([{ name: 'Kopi Susu Aren', price: 22000, qty: 2 }, { name: 'Croissant', price: 18000, qty: 1 }])
  const [meja, setMeja] = useState(null)
  useEffect(() => { const onPop = () => { const p = location.pathname; setRoute(p === '/app' || p === '/app/' ? '/' : p.startsWith('/app/') ? p.slice(4) : p) }; addEventListener('popstate', onPop); return () => removeEventListener('popstate', onPop) }, [])
  const navigate = (path) => { history.pushState({}, '', path); setRoute(path); scrollTo({ top: 0, behavior: 'smooth' }) }
  const login = () => { sessionStorage.setItem('bukanota-demo-auth', '1'); setLoggedIn(true); setLoginOpen(false); navigate('/dashboard') }
  const logout = () => { sessionStorage.removeItem('bukanota-demo-auth'); setLoggedIn(false); navigate('/') }
  const notify = (message, type = 'success') => setToast({ id: Date.now(), message, type })
  const openModal = (config) => setModal({ ...config, id: Date.now() })
  const overlays = <>{modal && <AppModal key={modal.id} modal={modal} onClose={() => setModal(null)} notify={notify} />}<Toast toast={toast} onClose={() => setToast(null)} /></>
  const publicRoutes = ['/']
  const appRoutes = ['/dashboard','/pos','/checkout','/payment','/membership','/inventory','/accounting','/users','/outlet','/logs','/backup','/access','/settings','/profile','/deleted','/transactions','/orders','/categories','/menu']
  if (!publicRoutes.includes(route) && !appRoutes.includes(route) && !route.startsWith('/outlet/')) return <NotFoundPage navigate={navigate} />
  if (route.startsWith('/') && !loggedIn) return <><LandingPage onLogin={() => setLoginOpen(true)} navigate={navigate} />{loginOpen && <LoginModal onClose={() => setLoginOpen(false)} onSuccess={login} />}</>
  if (route === '/pos' && loggedIn) return <><PosPage navigate={navigate} openModal={openModal} notify={notify} cart={cart} setCart={setCart} meja={meja} setMeja={setMeja} />{overlays}</>
  if (route === '/checkout' && loggedIn) return <><CheckoutPage navigate={navigate} openModal={openModal} notify={notify} cart={cart} setCart={setCart} meja={meja} />{overlays}</>
  if (route.startsWith('/') && loggedIn) {
    let page = entityConfigs[route] ? <EntityPage route={route} openModal={openModal} notify={notify} /> : null
    if (route === '/dashboard') page = <DashboardPage navigate={navigate} />
    if (route === '/transactions') page = <TransaksiPage navigate={navigate} openModal={openModal} notify={notify} />
    if (route === '/inventory') page = <InventoryPage openModal={openModal} />
    if (route === '/outlet' || route.startsWith('/outlet/')) page = <OutletPage route={route} openModal={openModal} navigate={navigate} />
    if (route === '/categories') page = <CatalogSettingsPage kind="kategori" openModal={openModal} notify={notify} />
    if (route === '/menu') page = <CatalogSettingsPage kind="menu" openModal={openModal} notify={notify} />
    if (route === '/access') page = <AccessPage openModal={openModal} notify={notify} />
    if (route === '/backup') page = <BackupPage openModal={openModal} notify={notify} />
    if (route === '/deleted') page = <DeletedPage openModal={openModal} notify={notify} />
    if (route === '/logs') page = <LogsPage openModal={openModal} notify={notify} />
    if (route === '/settings') page = <SettingsPage openModal={openModal} notify={notify} />
    if (route === '/profile') page = <ProfilePage notify={notify} />
    return <><AdminShell route={route} navigate={navigate} onLogout={logout}>{page}</AdminShell>{overlays}</>
  }
  return <><LandingPage onLogin={() => setLoginOpen(true)} navigate={navigate} />{loginOpen && <LoginModal onClose={() => setLoginOpen(false)} onSuccess={login} />}</>
}

export default App
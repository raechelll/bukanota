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
import ProfilePage from './pages/ProfilePage'
import EntityPage from './pages/EntityPage'
import entityConfigs from './pages/entityConfigs'
import AppModal from './components/AppModal'
import Toast from './components/Toast'

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
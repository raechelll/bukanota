
export default function Logo({ light = false }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="/" onClick={(e) => { if (location.pathname === '/') return; e.preventDefault(); history.pushState({}, '', '/'); dispatchEvent(new PopStateEvent('popstate')) }} aria-label="BukaNota - Beranda"><span className="brand-mark"><i></i><i></i><i></i><b>n</b></span><span>BUKA<span>NOTA</span></span></a>
}

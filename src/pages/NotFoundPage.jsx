import {
  ArrowLeft, ArrowRight, Search,
} from 'lucide-react'
import Logo from '../components/Logo'

export default function NotFoundPage({ navigate }) {
  return <div className="not-found"><Logo/><div className="not-found-visual"><span>4</span><i><Search /></i><span>4</span></div><h1>Halaman tidak ditemukan</h1><p>Alamat yang Anda buka tidak tersedia atau sudah dipindahkan.</p><div><button onClick={()=>navigate('/')}><ArrowLeft /> Kembali ke landing page</button><button onClick={()=>navigate('/app/dashboard')}>Buka dashboard <ArrowRight /></button></div><small>Error 404 · BukaNota</small></div>
}

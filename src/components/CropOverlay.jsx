import { useEffect, useState } from 'react'
import {
  Crop, RefreshCcw, RotateCw, X, ZoomIn,
} from 'lucide-react'

export default function CropOverlay({ src, aspect = 1, onClose, onSave }) {
  const [zoom, setZoom] = useState(1)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [rotation, setRotation] = useState(0)
  useEffect(() => { const escape = (e) => e.key === 'Escape' && onClose(); addEventListener('keydown', escape); return () => removeEventListener('keydown', escape) }, [onClose])
  const crop = () => {
    const image = new Image()
    image.onload = () => {
      const width = aspect === 1 ? 600 : 800
      const height = Math.round(width / aspect)
      const canvas = document.createElement('canvas')
      canvas.width = width; canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#eef3f8'; ctx.fillRect(0, 0, width, height)
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight) * zoom
      ctx.translate(width / 2 + (x / 320) * width, height / 2 + (y / 320) * height)
      ctx.rotate(rotation * Math.PI / 180)
      ctx.scale(scale, scale)
      ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2)
      onSave(canvas.toDataURL('image/jpeg', .9))
    }
    image.src = src
  }
  return <div className="crop-overlay" role="dialog" aria-modal="true"><div className="crop-modal"><div className="app-modal-header"><div><span>CROP GAMBAR</span><h3>Sesuaikan area gambar</h3></div><button onClick={onClose}><X /></button></div><div className={`crop-stage ${aspect !== 1 ? 'landscape' : ''}`}><img src={src} alt="Pratinjau crop" style={{ transform: `translate(${x}px, ${y}px) scale(${zoom}) rotate(${rotation}deg)` }} /><i></i></div><div className="crop-controls"><label>Zoom <span><ZoomIn /><input type="range" min="1" max="3" step=".05" value={zoom} onChange={e => setZoom(Number(e.target.value))} /></span></label><label>Posisi horizontal <input type="range" min="-80" max="80" value={x} onChange={e => setX(Number(e.target.value))} /></label><label>Posisi vertikal <input type="range" min="-80" max="80" value={y} onChange={e => setY(Number(e.target.value))} /></label></div><div className="crop-actions"><button onClick={() => { setZoom(1); setX(0); setY(0); setRotation(0) }}><RefreshCcw /> Reset</button><button onClick={() => setRotation(r => (r + 90) % 360)}><RotateCw /> Putar</button><span></span><button onClick={onClose}>Batal</button><button className="primary" onClick={crop}><Crop /> Crop & simpan</button></div></div></div>
}
import '../styles/modal.css'

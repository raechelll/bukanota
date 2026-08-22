import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Crop, Minus, Plus, RefreshCcw, RotateCw, X,
} from 'lucide-react'

export default function CropOverlay({ src, aspect = 1, onClose, onSave }) {
  const stageRef = useRef(null)
  const dragRef = useRef(null)
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [box, setBox] = useState({ x: 0, y: 0, w: 0, h: 0 })

  const clampZoom = (z) => Math.min(4, Math.max(1, Math.round(z * 20) / 20))

  const centerBox = useCallback(() => {
    const stage = stageRef.current
    if (!stage) return
    const { width, height } = stage.getBoundingClientRect()
    let w = width * .8
    let h = w / aspect
    if (h > height * .8) { h = height * .8; w = h * aspect }
    setBox({ x: (width - w) / 2, y: (height - h) / 2, w, h })
  }, [aspect])

  useLayoutEffect(() => {
    centerBox()
    addEventListener('resize', centerBox)
    return () => removeEventListener('resize', centerBox)
  }, [centerBox])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const onWheel = (e) => { e.preventDefault(); setZoom(z => clampZoom(z - Math.sign(e.deltaY) * .15)) }
    stage.addEventListener('wheel', onWheel, { passive: false })
    return () => stage.removeEventListener('wheel', onWheel)
  }, [])

  useEffect(() => { const escape = (e) => e.key === 'Escape' && onClose(); addEventListener('keydown', escape); return () => removeEventListener('keydown', escape) }, [onClose])

  const onPointerDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const mode = e.currentTarget.dataset.mode
    const stage = stageRef.current.getBoundingClientRect()
    dragRef.current = { mode, px: e.clientX, py: e.clientY, start: box, stage }
    const move = (ev) => {
      const d = dragRef.current
      if (!d) return
      const dx = ev.clientX - d.px
      const dy = ev.clientY - d.py
      const b = d.start
      const r = d.stage
      if (d.mode === 'move') {
        setBox({ ...b, x: Math.min(Math.max(b.x + dx, 0), r.width - b.w), y: Math.min(Math.max(b.y + dy, 0), r.height - b.h) })
      } else {
        const anchorX = d.mode.includes('w') ? b.x + b.w : b.x
        const anchorY = d.mode.startsWith('n') ? b.y + b.h : b.y
        const maxW = d.mode.includes('w') ? anchorX : r.width - anchorX
        const maxH = d.mode.startsWith('n') ? anchorY : r.height - anchorY
        let w = Math.min(Math.max(d.mode.includes('w') ? b.w - dx : b.w + dx, 48), maxW)
        let h = w / aspect
        if (h > maxH) { h = maxH; w = h * aspect }
        setBox({ x: d.mode.includes('w') ? anchorX - w : anchorX, y: d.mode.startsWith('n') ? anchorY - h : anchorY, w, h })
      }
    }
    const up = () => { dragRef.current = null; removeEventListener('pointermove', move); removeEventListener('pointerup', up) }
    addEventListener('pointermove', move)
    addEventListener('pointerup', up)
  }

  const reset = () => { centerBox(); setRotation(0); setZoom(1) }
  const crop = () => {
    const stage = stageRef.current.getBoundingClientRect()
    const image = new Image()
    image.onload = () => {
      const outW = aspect === 1 ? 600 : 800
      const outH = Math.round(outW / aspect)
      const tmp = document.createElement('canvas')
      tmp.width = Math.round(stage.width); tmp.height = Math.round(stage.height)
      const tctx = tmp.getContext('2d')
      tctx.fillStyle = '#eef3f8'; tctx.fillRect(0, 0, tmp.width, tmp.height)
      const scale = Math.max(tmp.width / image.naturalWidth, tmp.height / image.naturalHeight) * zoom
      tctx.translate(tmp.width / 2, tmp.height / 2)
      tctx.rotate(rotation * Math.PI / 180)
      tctx.scale(scale, scale)
      tctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2)
      const canvas = document.createElement('canvas')
      canvas.width = outW; canvas.height = outH
      canvas.getContext('2d').drawImage(tmp, box.x, box.y, box.w, box.h, 0, 0, outW, outH)
      onSave(canvas.toDataURL('image/jpeg', .9))
    }
    image.src = src
  }
  return <div className="crop-overlay" role="dialog" aria-modal="true"><div className="crop-modal"><div className="app-modal-header"><div><h3>Sesuaikan area gambar</h3><p>Tarik titik sudut untuk mengatur area crop.</p></div><button onClick={onClose} aria-label="Tutup"><X /></button></div><div className={`crop-stage ${aspect !== 1 ? 'landscape' : ''}`} ref={stageRef}><img src={src} alt="Pratinjau crop" draggable={false} style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }} /><span className="crop-frame" data-mode="move" style={{ left: box.x, top: box.y, width: box.w, height: box.h }} onPointerDown={onPointerDown}><b data-mode="nw" onPointerDown={onPointerDown}></b><b data-mode="ne" onPointerDown={onPointerDown}></b><b data-mode="sw" onPointerDown={onPointerDown}></b><b data-mode="se" onPointerDown={onPointerDown}></b></span></div><div className="crop-actions"><span className="crop-zoom"><button onClick={() => setZoom(z => clampZoom(z - .25))} aria-label="Perkecil gambar"><Minus /></button><output>{Math.round(zoom * 100)}%</output><button onClick={() => setZoom(z => clampZoom(z + .25))} aria-label="Perbesar gambar"><Plus /></button></span><span></span><button onClick={reset}><RefreshCcw /> Reset</button><button onClick={() => setRotation(r => (r + 90) % 360)}><RotateCw /> Putar</button><button onClick={onClose}>Batal</button><button className="primary" onClick={crop}><Crop /> Crop &amp; simpan</button></div></div></div>
}
import '../styles/modal.css'

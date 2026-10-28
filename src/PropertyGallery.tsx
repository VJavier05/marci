import { useEffect, useRef, useState } from 'react'
import gallery1 from './assets/images/gallery/1.jpeg'
import gallery2 from './assets/images/gallery/2.jpeg'
import gallery3 from './assets/images/gallery/3.jpeg'
import gallery4 from './assets/images/gallery/4.jpeg'
import gallery5 from './assets/images/gallery/5.jpeg'

const photos = [
  { src: gallery1, title: '', space: '', alt: 'The Oakwood Residence' },
  { src: gallery2, title: '', space: '', alt: 'Palm Springs Retreat' },
  { src: gallery3, title: '', space: '', alt: 'The Highland House' },
  { src: gallery4, title: '', space: '', alt: 'Serenity at Westlake' },
  { src: gallery5, title: '', space: '', alt: 'The Vista Collection' },
]

function GalleryIcon({ type }: { type: 'expand' | 'grid' | 'next' | 'previous' | 'close' }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {type === 'grid' ? <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>
      : type === 'expand' ? <path d="M8 4H4v4m12-4h4v4M4 16v4h4m8 0h4v-4" />
      : type === 'close' ? <path d="m6 6 12 12M6 18 18 6" />
      : type === 'previous' ? <path d="M20 12H4m6-6-6 6 6 6" />
      : <path d="M4 12h16m-6-6 6 6-6 6" />}
  </svg>
}

export default function PropertyGallery() {
  const [active, setActive] = useState<number | null>(null)
  const [frame, setFrame] = useState(0)
  const pointerStart = useRef<number | null>(null)
  const suppressClick = useRef(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const current = active === null ? null : photos[active]
  const move = (direction: number) => setActive(index => index === null ? null : (index + direction + photos.length) % photos.length)
  const browse = (index: number) => setFrame((index + photos.length) % photos.length)

  useEffect(() => {
    const element = dialog.current
    if (active === null || !element) return
    if (!element.open) element.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [active])

  return <>
    <div className="reel-heading">
      <div><span className="overline">A DIFFERENT POINT OF VIEW</span><h2>Some places deserve<br />a closer look<span>.</span></h2></div>
      <div className="reel-heading-aside"><p>Let the pictures take you there.<br />Slow down. Look around. Imagine what’s next.</p><button className="text-link" onClick={() => setActive(frame)}>Open the photo collection <GalleryIcon type="expand" /></button></div>
    </div>
    <div className="reel-meta"><span><span className="green-dot" /> FEATURED PROPERTIES</span><span>05 HOMES / EXCEPTIONAL LIVING</span></div>
    <div className="photo-reel" role="region" aria-roledescription="carousel" aria-label="Photo journal — use arrow keys or swipe to browse" tabIndex={0} onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); browse(frame + (e.key === 'ArrowRight' ? 1 : -1)) } }} onPointerDown={e => { if (e.isPrimary && e.button === 0) pointerStart.current = e.clientX }} onPointerCancel={() => { pointerStart.current = null }} onPointerLeave={() => { pointerStart.current = null }} onPointerUp={e => {
      if (pointerStart.current === null) return
      const distance = e.clientX - pointerStart.current
      pointerStart.current = null
      if (Math.abs(distance) > 40) {
        suppressClick.current = true
        browse(frame + (distance < 0 ? 1 : -1))
        window.setTimeout(() => { suppressClick.current = false }, 0)
      }
    }}>
      {photos.map((photo, index) => {
        const offset = (index - frame + photos.length) % photos.length
        const position = offset === 0 ? 'is-current' : offset === 1 ? 'is-next' : offset === photos.length - 1 ? 'is-previous' : 'is-hidden'
        return <figure className={`reel-frame ${position}`} key={photo.src} aria-hidden={position === 'is-hidden'}>
        <button className="reel-photo" tabIndex={position === 'is-hidden' ? -1 : 0} onClick={() => { if (!suppressClick.current) { if (index === frame) setActive(index); else browse(index) } }} aria-label={index === frame ? `Open photo ${index + 1}: ${photo.title}` : `Show photo ${index + 1}: ${photo.title}`}>
          <img src={photo.src} alt={photo.alt} loading="lazy" draggable={false} />
          <span className="reel-image-wash" />
          <span className="reel-frame-number">{String(index + 1).padStart(2, '0')} <span>/ 05</span></span>
          <span className="reel-open"><GalleryIcon type="expand" /></span>
          <span className="reel-image-title">{photo.title}<span>{photo.space}</span></span>
        </button>
      </figure>})}
    </div>
    <div className="reel-navigation">
      <div className="reel-position" aria-live="polite"><strong>{String(frame + 1).padStart(2, '0')}</strong><span>/ {String(photos.length).padStart(2, '0')}</span><span className="reel-position-line" /></div>
      <div className="reel-dots" aria-label="Browse gallery photos">{photos.map((photo, index) => <button key={photo.src} className={frame === index ? 'is-active' : ''} aria-label={`Show photo ${index + 1}`} aria-current={frame === index ? 'true' : undefined} onClick={() => browse(index)} />)}</div>
      <div className="reel-arrows"><span>SWIPE TO DISCOVER</span><button className="icon-button" aria-label="Browse previous photo" onClick={() => browse(frame - 1)}><GalleryIcon type="previous" /></button><button className="icon-button" aria-label="Browse next photo" onClick={() => browse(frame + 1)}><GalleryIcon type="next" /></button></div>
    </div>
    <p className="reel-disclaimer">Browse our featured property listings above.</p>
    {current && <dialog ref={dialog} className="gallery-lightbox" aria-labelledby="gallery-lightbox-title" onClose={() => setActive(null)} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close() }} onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); move(1) } if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1) } }}>
      <div className="gallery-lightbox-shell">
        <header className="gallery-lightbox-header"><div><span className="overline">FEATURED PROPERTIES</span><h3 id="gallery-lightbox-title">{current.title}</h3></div><div><span aria-live="polite">{String(active! + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span><button className="icon-button" aria-label="Close photo viewer" onClick={() => dialog.current?.close()} autoFocus><GalleryIcon type="close" /></button></div></header>
        <div className="gallery-lightbox-stage"><button className="icon-button gallery-previous" aria-label="Previous photo" onClick={() => move(-1)}><GalleryIcon type="previous" /></button><img src={current.src} alt={current.alt} loading="lazy" /><button className="icon-button gallery-next" aria-label="Next photo" onClick={() => move(1)}><GalleryIcon type="next" /></button></div>
        <div className="gallery-lightbox-footer"><span>{current.space}</span><span>Use ← → to explore · Esc to close</span></div>
        <div className="gallery-thumbnails" aria-label="Choose a photo">{photos.map((photo, i) => <button key={photo.src} className={active === i ? 'is-active' : ''} aria-label={`Show ${photo.title}`} aria-pressed={active === i} onClick={() => setActive(i)}><img src={photo.src} alt="" loading="lazy" /></button>)}</div>
      </div>
    </dialog>}
  </>
}

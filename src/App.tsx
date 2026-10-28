import { useEffect, useRef, useState } from 'react'
import hero2 from './assets/images/hero2.jpeg'
import ridgeRealty from './assets/images/logos/ridge-realty.png'
import equalHousing from './assets/images/logos/equal-housing.png'
import realtorLogo from './assets/images/logos/realtor.jpg'
import pahrumpChamber from './assets/images/logos/pahrump-chamber.jpg'
import marciMetzger from './assets/images/marci-metzger.jpg'
import house1 from './assets/images/house-1.jpeg'
import house2 from './assets/images/house-2.jpg'
import house3 from './assets/images/house-3.jpeg'
import house6 from './assets/images/house-6.jpg'
import land from './assets/images/land.jpeg'

function useReveal() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.dataset.visible = '1'; obs.disconnect() }
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref as React.RefObject<any>
}

function StatItem({ value, prefix, suffix, label }: { value: number; prefix: string; suffix: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      const duration = 1800
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current = Math.min(current + increment, value)
        setCount(current)
        if (current >= value) clearInterval(timer)
      }, duration / steps)
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])
  const display = Number.isInteger(value) ? Math.round(count) : count.toFixed(1)
  return <div ref={ref}><strong>{prefix}{display}{suffix}</strong><span>{label}</span></div>
}
import PropertyGallery from './PropertyGallery'
import OurServices from './OurServices'
import FooterSocials from './FooterSocials'
import ContactSection from './ContactSection'

const emptyFilters = { type: 'All', location: '', bedrooms: '', baths: '', minPrice: '', maxPrice: '' }

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <><path d="M4 12h15M13 5l7 7-7 7" /></>,
    diagonal: <><path d="M5 19 19 5M5 5h14v14" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.3" /></>,
    bed: <><path d="M3 18v-8m18 8v-8M3 14h18M5 14V7h14v7M8 11h3m2 0h3" /></>,
    bath: <><path d="M3 12h18l-2 7H5l-2-7Zm3 7v2m12-2v2M6 12V5a2 2 0 0 1 4 0v1" /></>,
    area: <><path d="M4 9V4h5m6 0h5v5m0 6v5h-5M9 20H4v-5M4 4l5 5m11-5-5 5M4 20l5-5m11 5-5-5" /></>,
    heart: <path d="m12 20-8-8C-2 5 7 0 12 7c5-7 14-2 8 5l-8 8Z" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    home: <><path d="m3 11 9-8 9 8M6 9v12h12V9M10 21v-7h4v7" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    search: <><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.arrow}</svg>
}

const properties = [
  { id: 1, name: 'The Oakwood Residence', location: 'Austin, TX', address: '1248 Oakwood Drive, Austin, TX', price: 875000, beds: 4, baths: 3, area: '2,840', image: house1, type: 'House' },
  { id: 2, name: 'Palm Springs Retreat', location: 'Palm Springs, CA', address: '86 Desert Vista Lane, Palm Springs, CA', price: 1250000, beds: 4, baths: 4, area: '3,250', image: house2, type: 'Villa' },
  { id: 3, name: 'The Highland House', location: 'Austin, TX', address: '725 Highland Avenue, Austin, TX', price: 945000, beds: 5, baths: 4, area: '3,120', image: house3, type: 'House' },
  { id: 4, name: 'Serenity at Westlake', location: 'Austin, TX', address: '210 Westlake Court, Austin, TX', price: 1480000, beds: 5, baths: 4, area: '3,680', image: house1, type: 'Villa' },
  { id: 5, name: 'The Vista Collection', location: 'Palm Springs, CA', address: '942 Vista Ridge, Palm Springs, CA', price: 1125000, beds: 3, baths: 3, area: '2,650', image: house2, type: 'Villa' },
  { id: 6, name: 'Garden Grove Estate', location: 'Miami, FL', address: '58 Garden Grove, Miami, FL', price: 795000, beds: 4, baths: 3, area: '2,480', image: house6, type: 'House' },
]
type Property = (typeof properties)[number]
const money = (n: number) => '$' + n.toLocaleString('en-US')
const questions = [
  ['What types of properties do you sell?', 'We specialize in thoughtfully selected residential properties, from welcoming family homes and contemporary apartments to exceptional villas. Whether you’re a first-time buyer or looking for your next chapter, we’ll help you find a place that feels like you.'],
  ['How do I know if a property is a good investment?', 'We look beyond the listing. Our team evaluates local market trends, neighborhood growth, comparable sales, rental potential, and the condition of each home to help you make an informed, confident decision.'],
  ['Do I need to hire a real estate agent?', 'You don’t have to navigate the market alone. A dedicated agent helps you discover the right properties, understand pricing, negotiate terms, and handle the paperwork from your first viewing to closing day.'],
  ['What’s the process for buying a property?', 'We start with a conversation about your needs and budget, help you get pre-approved, arrange viewings, and guide your offer. Once accepted, we coordinate inspections, financing, and closing so every step feels clear.'],
  ['Can I tour a property before purchasing?', 'Absolutely. Select any property and request a private tour. We can arrange an in-person walkthrough or a live virtual viewing at a time that works for you.'],
]
const reviews = [
  { quote: 'Working with this team was a pleasure. They understood our vision and helped us find a property that exceeded our expectations. We couldn’t have done it without them!', name: 'James & Sarah Mitchell', role: 'Happy homeowners in Austin', initials: 'JM' },
  { quote: 'From our very first conversation to the moment we got our keys, everything felt effortless. The attention to detail and genuine care made all the difference.', name: 'Emily Richardson', role: 'First-time homebuyer', initials: 'ER' },
  { quote: 'We weren’t just looking for a house. We were looking for a new beginning. Evergreen listened, understood, and found the perfect place for our next chapter.', name: 'David & Anna Chen', role: 'Happy homeowners in Miami', initials: 'DC' },
]

export default function App() {
  const [activeType, setActiveType] = useState('All')
  const [location, setLocation] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [baths, setBaths] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [filters, setFilters] = useState(emptyFilters)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [review, setReview] = useState(0)
  const [selected, setSelected] = useState<Property | null>(null)
  const [contact, setContact] = useState(false)
  const [sent, setSent] = useState(false)
  const [menu, setMenu] = useState(false)
  const [searched, setSearched] = useState(false)
  const revealLogos = useReveal()
  const revealIntro = useReveal()
  const revealAbout = useReveal()
  const revealNeighborhood = useReveal()
  const revealProperties = useReveal()
  const revealFaq = useReveal()
  const revealTestimonials = useReveal()
  const revealCta = useReveal()
  const revealFooter = useReveal()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setSelected(null); setContact(false) } }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = selected || contact ? 'hidden' : ''
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [selected, contact])
  const visible = properties.filter(p =>
  (filters.type === 'All' || p.type === filters.type) &&
  (!filters.location || p.location === filters.location) &&
  (!filters.bedrooms || p.beds >= Number(filters.bedrooms)) &&
  (!filters.baths || p.baths >= Number(filters.baths)) &&
  (!filters.minPrice || p.price >= Number(filters.minPrice)) &&
  (!filters.maxPrice || p.price <= Number(filters.maxPrice))
)
const search = () => {
  setFilters({ type: activeType, location, bedrooms, baths, minPrice, maxPrice })
  setSearched(true)
  document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })
}
const reset = () => {
  setFilters(emptyFilters)
  setActiveType('All'); setLocation(''); setBedrooms(''); setBaths(''); setMinPrice(''); setMaxPrice(''); setSortBy('')
  setSearched(false)
}
  const openContact = () => {
    setContact(false)
    setSelected(null)
    document.getElementById('contact')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  return (
    <main>
      <section className="hero" id="home">
        <img className="hero-image" src={hero2} alt="Contemporary white villa with warm interiors and a private swimming pool" />
        <div className="hero-shade" />
        <header className="header">
          <a href="#home" className="brand" aria-label="Marci Metzger Homes">Marci Metzger Homes</a>
          <nav className={menu ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
            {[['Home', '#home'], ['Listings', '#'], ['About', '#'], ['Testimonials', '#']].map(([label, href], i) => <a className={i === 0 ? 'active' : ''} key={label} href={href} onClick={() => setMenu(false)}>{label}</a>)}
          </nav>
          <button className="button lime header-contact" onClick={openContact}>Let’s talk <Icon name="diagonal" size={15} /></button>
          <button className="mobile-menu icon-button" aria-label="Toggle menu" onClick={() => setMenu(!menu)}><Icon name={menu ? 'close' : 'menu'} /></button>
        </header>
        <div className="hero-content">
          <div className="hero-title">
            <h1>Build Your Future,<br />One Property at a Time.</h1>
          </div>
          <div className="hero-description"><span className="small-line" /><p>More than a place to live.<br />A place to belong. Discover exceptional homes, thoughtfully chosen for you.</p></div>
        </div>
        <div className="search-panel">
          <div className="search-heading"><h2>Search Listings</h2><span>A new beginning starts here <Icon name="diagonal" size={15} /></span></div>
          <div className="search-fields">
            <label>Location
              <select value={location} onChange={e => setLocation(e.target.value)}>
                <option value="">Choose a location</option>
                <option>Austin, TX</option><option>Palm Springs, CA</option><option>Miami, FL</option>
              </select>
            </label>
            <label>Type
              <select value={activeType === 'All' ? '' : activeType} onChange={e => setActiveType(e.target.value || 'All')}>
                <option value="">Property type</option><option>House</option><option>Villa</option>
              </select>
            </label>
            <label>Bedrooms
              <select value={bedrooms} onChange={e => setBedrooms(e.target.value)}>
                <option value="">Any bedrooms</option>
                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}+ bedrooms</option>)}
              </select>
            </label>
            <label>Baths
              <select value={baths} onChange={e => setBaths(e.target.value)}>
                <option value="">Any baths</option>
                {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}+ baths</option>)}
              </select>
            </label>
            <label>Sort by
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="">Default order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="beds-desc">Most bedrooms</option>
              </select>
            </label>
          </div>
          <div className="search-bottom">
            <label className="price-range-label">Price range
              <div className="range-inputs">
                <input type="number" min="0" inputMode="numeric" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                <span>–</span>
                <input type="number" min="0" inputMode="numeric" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
              </div>
            </label>
            <button className="button dark" onClick={search}>Search properties <Icon name="search" size={15} /></button>
          </div>
      </div>
      </section>

      <section className="realtor-logos reveal" ref={revealLogos} aria-label="Real estate organizations and community">
        <div className="realtor-logo-row">
          <img src={ridgeRealty} alt="The Ridge Realty Group" width={300} height={300} loading="lazy" />
          <img src={equalHousing} alt="Equal Housing Opportunity" width={299} height={300} loading="lazy" />
          <img src={realtorLogo} alt="Realtor" width={335} height={300} loading="lazy" />
          <img src={pahrumpChamber} alt="Pahrump Valley Chamber of Commerce" width={300} height={300} loading="lazy" />
        </div>
      </section>

      <section className="realtor-intro reveal" ref={revealIntro} aria-labelledby="realtor-title">
        <div className="realtor-portrait">
          <img src={marciMetzger} alt="Marci Metzger, Realtor with The Ridge Realty Group" width={900} height={1351} loading="lazy" />
          <span className="realtor-photo-label"><span className="green-dot" /> Your Pahrump Realtor</span>
        </div>
        <div className="realtor-copy">
          <span className="overline">MEET YOUR REALTOR</span>
          <h2 id="realtor-title">A familiar face.<br />A trusted guide.</h2>
          <p className="realtor-description">Behind every great move is someone who understands what matters to you. Meet Marci Metzger—a Realtor for nearly three decades, helping you navigate your next chapter with confidence.</p>
          <div className="realtor-identity">
            <div><h3>Marci Metzger</h3><span>The Ridge Realty Group · Pahrump, Nevada</span></div>
            <span className="realtor-monogram" aria-hidden="true">MM</span>
          </div>
          <div className="realtor-actions">
            <a className="button dark" href="tel:+12069196886">Let’s talk about your next move <Icon name="diagonal" size={16} /></a>
            <a className="realtor-phone" href="tel:+12069196886">(206) 919-6886<span>A personal conversation starts here.</span></a>
          </div>
        </div>
      </section>

      <section className="section about reveal" id="about" ref={revealAbout}>
        <div className="section-heading"><div><span className="overline">GET IT SOLD</span><h2>Don’t just list it.<br />Get it sold.</h2><p>We helped nearly 90 clients in 2021 and closed $28.5 million in sales.<br />Our clients deserve our best—and we work to make our best better every year.</p></div><div className="about-caption"><div className="mini-homes"><Icon name="home" size={24} /></div><p>Marci Metzger<br />The Ridge Realty Group<br />Your Pahrump real estate team.</p></div></div>
        <div className="about-grid">
          <div className="about-photo"><img src={house1} alt="Illustrative modern residential home surrounded by greenery" loading="lazy" /><span className="image-label"><span className="green-dot" /> Nearly 90 clients helped in 2021.</span></div>
          <div className="philosophy"><span className="section-number">01 / FOR SELLERS</span><h3>Don’t just list it.<br />Get it SOLD!</h3><p>We exhaust every avenue to ensure our listings are at the fingertips of every possible buyer, getting you top dollar for your home.</p><a className="text-link" href="tel:+12069196886">Let’s sell your home <Icon name="arrow" size={17} /></a></div>
          <div className="featured-small"><img src={house3} alt="Illustrative contemporary home with spacious balconies" loading="lazy" /><div><span className="overline">GUIDE TO BUYERS</span><p>Nobody knows the market like we do. Enjoy having a pro at your service. Market analysis, upgrades lists, contractors on speed dial, and more!</p><a className="button dark small" href="tel:+12069196886">Talk to Marci <Icon name="diagonal" size={13} /></a></div></div>
        </div>
        <div className="stats"><StatItem value={90} prefix="~" suffix="" label="Clients helped in 2021" /><StatItem value={28.5} prefix="$" suffix="M" label="Sales closed in 2021" /><StatItem value={30} prefix="~" suffix="" label="Years as a Realtor" /><StatItem value={100} prefix="" suffix="%" label="Pahrump market expertise" /></div>
      </section>

      <section className="neighborhood reveal" ref={revealNeighborhood}>
        <div className="map-art" aria-label="Map showing office at 3190 HW-160, Suite F, Pahrump, Nevada 89048">
          <iframe
            title="Office location"
            src="https://www.google.com/maps?q=3190+NV-160+Suite+F,+Pahrump,+NV+89048&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a className="map-bubble" href="https://maps.google.com/?q=3190+NV-160+Suite+F,+Pahrump,+NV+89048" target="_blank" rel="noopener noreferrer">3190 HW-160, Suite F <span>↗</span></a>
        </div>
        <div className="neighborhood-copy"><span className="overline">LOVE WHERE YOU LIVE</span><h2>The right home.<br />The right neighborhood.</h2><p>Find more than a beautiful home. Discover local favorites, welcoming communities, and a lifestyle that feels just right.</p><button className="button dark" onClick={() => { setLocation('Austin, TX'); setFilters({ ...emptyFilters, location: 'Austin, TX' }); setSearched(true); document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' }) }}>Explore our neighborhoods <Icon name="diagonal" size={15} /></button></div>
      </section>

      <section className="section properties reveal" id="properties" ref={revealProperties}>
        <PropertyGallery />
        {searched && <div className="results-bar"><span>{visible.length} {visible.length === 1 ? 'home' : 'homes'} found{filters.location ? ` in ${filters.location}` : ''}</span><button onClick={reset}>Clear filters <Icon name="close" size={14} /></button></div>}
        {searched && <div className="gallery-search-results">{visible.map(p => <button key={p.id} onClick={() => setSelected(p)}><img src={p.image} alt={p.name} loading="lazy" /><span>{p.name}<small>{p.location} · {money(p.price)}</small></span><Icon name="diagonal" size={17} /></button>)}</div>}
        {searched && !visible.length && <div className="empty-state"><Icon name="search" size={35} /><h3>Your perfect match is still out there.</h3><p>Try a different location or price range to see more homes.</p><button className="button dark" onClick={reset}>Explore all homes <Icon name="arrow" size={16} /></button></div>}
      </section>

      <OurServices />

      <section className="section faq reveal" id="faq" ref={revealFaq}>
        <div className="section-heading"><div><span className="overline">A LITTLE CLARITY GOES A LONG WAY</span><h2>Good questions.<br />Honest answers.</h2></div><p>Big decisions come with questions. We’re here to<br className="desktop-break" /> make every step feel a little more simple,<br className="desktop-break" /> and a lot more human.</p></div>
        <div className="faq-list">{questions.map(([q, a], i) => <div className={`faq-item ${openFaq === i ? 'is-open' : ''}`} key={q}><button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} aria-controls={`answer-${i}`}><span>{q}</span><span className="faq-toggle">{openFaq === i ? '−' : '+'}</span></button><div className="faq-answer" id={`answer-${i}`} aria-hidden={openFaq !== i}><div className="faq-answer-inner"><p>{a}</p><img src={hero2} alt="A home designed for a fresh start" loading="lazy" /></div></div></div>)}</div>
      </section>

      <section className="section testimonials reveal" id="testimonials" ref={revealTestimonials}>
        <div className="section-heading"><div><span className="overline">REAL PEOPLE. REMARKABLE STORIES.</span><h2>A few words from<br />our happy homeowners.</h2></div><div className="review-count"><div className="avatars"><span>JS</span><span>ER</span><span>DC</span></div><p><strong>500+ happy clients</strong><span>and counting.</span></p></div></div>
        <div className="testimonial-slider"><button className="icon-button" aria-label="Previous testimonial" onClick={() => setReview((review + 2) % 3)}><span className="reverse"><Icon name="arrow" /></span></button><div className="testimonial-card"><div className="testimonial-visual"><div className="testimonial-initials">{reviews[review].initials}</div><span>HOME IS A FEELING.</span><Icon name="home" size={46} /></div><div className="testimonial-copy"><span className="quote-mark">“</span><blockquote>{reviews[review].quote}</blockquote><strong>{reviews[review].name}</strong><p>{reviews[review].role}</p></div></div><button className="icon-button" aria-label="Next testimonial" onClick={() => setReview((review + 1) % 3)}><Icon name="arrow" /></button></div>
        <div className="slider-dots">{reviews.map((_, i) => <button key={i} aria-label={`Show testimonial ${i + 1}`} className={review === i ? 'current' : ''} onClick={() => setReview(i)} />)}</div>
      </section>

      <section className="cta reveal" ref={revealCta}><img src={land} alt="An exceptional contemporary home with an inviting pool" loading="lazy" /><div className="cta-shade" /><div className="cta-content"><span className="overline">YOUR NEXT CHAPTER STARTS HERE</span><h2>Let’s make your dream<br />home a reality.</h2><p>A little guidance. A world of possibilities.</p><button className="button lime" onClick={openContact}>Let’s find your home <Icon name="diagonal" size={16} /></button></div></section>
      <ContactSection />
      <footer className="footer reveal" ref={revealFooter}><FooterSocials /><div className="footer-nav"><div><a href="#home">Home</a><a href="#properties">Listings</a><a href="#about">About</a><a href="#testimonials">Testimonials</a></div><a href="#home" className="brand dark-brand">Marci Metzger Homes</a><div><a href="#faq">FAQs</a><button onClick={openContact}>Contact</button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Evergreen Real Estate. All rights reserved.</span><span>Thoughtfully connected. Naturally home.</span></div></footer>

      {(selected || contact) && <div className="modal-backdrop" onClick={() => { setSelected(null); setContact(false) }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e => e.stopPropagation()}><button className="modal-close icon-button" aria-label="Close dialog" onClick={() => { setSelected(null); setContact(false) }}><Icon name="close" /></button>{selected ? <><img className="modal-photo" src={selected.image} alt={selected.name} loading="lazy" /><div className="modal-content"><span className="overline">A PLACE TO CALL YOUR OWN</span><h2 id="modal-title">{selected.name}</h2><p className="modal-address"><Icon name="pin" size={16} />{selected.address}</p><strong className="modal-price">{money(selected.price)}</strong><div className="modal-features"><span><Icon name="bed" />{selected.beds} bedrooms</span><span><Icon name="bath" />{selected.baths} bathrooms</span><span><Icon name="area" />{selected.area} sqft</span></div><p>Thoughtfully designed for effortless everyday living. Discover beautiful light-filled spaces, refined finishes, and room for all the moments that matter.</p><button className="button dark" onClick={openContact}>Request a private tour <Icon name="arrow" size={17} /></button></div></> : <div className="modal-content contact-content">{sent ? <div className="sent-state"><span className="success-icon"><Icon name="check" size={30} /></span><h2 id="modal-title">Your next chapter is calling.</h2><p>Your inquiry is ready. To speak with our team directly, call us or send an email below.</p><a className="button dark" href="mailto:hello@evergreen.example">Open your email <Icon name="arrow" size={17} /></a><a href="tel:+15125550148">+1 (512) 555-0148</a></div> : <><span className="overline">GOOD BEGINNINGS START WITH HELLO</span><h2 id="modal-title">Let’s find your place.</h2><p>Tell us a little about what you’re looking for.</p><form onSubmit={e => { e.preventDefault(); setSent(true) }}><label>Your name<input name="name" placeholder="Full name" required autoComplete="name" /></label><label>Email address<input name="email" type="email" placeholder="you@example.com" required autoComplete="email" /></label><label>What does your next chapter look like?<textarea name="message" placeholder="Your ideal location, home, and timing…" rows={3} required /></label><p className="form-note">This is a preview inquiry form. No information is stored or sent.</p><button className="button dark" type="submit">Start the conversation <Icon name="arrow" size={17} /></button></form></>}</div>}</section></div>}
    </main>
  )
}

import { useEffect, useRef, useState } from 'react'
import s1 from './assets/images/s1.jpeg'
import house6 from './assets/images/house-6.jpg'
import s3 from './assets/images/s3.jpeg'

const services = [
  {
    title: 'Real Estate Done Right',
    label: 'YOUR NEXT CHAPTER',
    copy: 'Nervous about your property adventure? Don’t be. Whether you’re getting ready to buy or sell your residence, looking at investment properties, or just curious about the markets, our team ensures you get the best experience possible.',
    tags: ['Buying', 'Selling', 'Investing'],
    image: s1,
    alt: 'Contemporary residential architecture surrounded by greenery',
    action: 'Let’s talk about your next move',
  },
  {
    title: 'Commercial & Residential',
    label: 'POSSIBILITIES, BIG & SMALL',
    copy: 'Large or small, condo or mansion, we can find it and get it at the price that’s right. Fixer-uppers? Luxury? We can help with all of it. We live, work, and play in this community—and we’re happy to help you find where to put your hard-earned dollars.',
    tags: ['Homes', 'Commercial', 'Investment properties'],
    image: house6,
    alt: 'Modern white residence with a swimming pool',
    action: 'Find the right opportunity',
  },
  {
    title: 'Rely on Expertise',
    label: 'CLARITY AT EVERY STEP',
    copy: 'If you have questions about affordability, credit, and loan options, trust us to connect you with the right people to get the answers you need in a timely fashion. We make sure you feel confident and educated every step of the way.',
    tags: ['Affordability', 'Credit', 'Loan options'],
    image: s3,
    alt: 'Open desert landscape with mountains along the horizon',
    action: 'Get the guidance you need',
  },
]

function Arrow({ down = false }: { down?: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{down ? <path d="M12 4v16m-6-6 6 6 6-6" /> : <path d="M5 19 19 5M5 5h14v14" />}</svg>
}

export default function OurServices() {
  const [active, setActive] = useState(0)
  const stack = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let request = 0
    const update = () => {
      request = 0
      const cards = stack.current?.children
      if (!cards) return
      let next = 0
      Array.from(cards).forEach((card, index) => {
        if (card.getBoundingClientRect().top <= window.innerHeight * .5) next = index
      })
      setActive(next)
    }
    const schedule = () => { if (!request) request = window.requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.cancelAnimationFrame(request)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return <section className="services-section" id="services" aria-labelledby="services-title">
    <div className="services-layout">
      <div className="services-intro">
        <span className="overline">OUR SERVICES</span>
        <h2 id="services-title">Your next move.<br /><span>Our full attention.</span></h2>
        <p>More than a transaction. A partnership built around you, your goals, and what comes next.</p>
        <nav className="services-index" aria-label="Our services">
          {services.map((service, index) => <a key={service.title} className={active === index ? 'is-active' : ''} href={`#service-${index + 1}`} aria-current={active === index ? 'step' : undefined}><span>{String(index + 1).padStart(2, '0')}</span><span>{service.title}</span><span className="service-index-dot" /></a>)}
        </nav>
        <div className="services-scroll-cue"><span><Arrow down /></span><p>SCROLL TO EXPLORE<br /><strong>A little guidance goes a long way.</strong></p></div>
        <div className="services-signoff">Marci Metzger<span>The Ridge Realty Group · Pahrump, NV</span></div>
      </div>
      <div className="services-stack" ref={stack}>
        {services.map((service, index) => <article id={`service-${index + 1}`} className={`service-stack-card ${index < active ? 'is-past' : ''}`} key={service.title}>
          <div className="service-card-copy">
            <div className="service-card-top"><span className="overline">{service.label}</span><span className="service-card-number">{String(index + 1).padStart(2, '0')}<span> / 03</span></span></div>
            <h3>{service.title}</h3>
            <p>{service.copy}</p>
            <div className="service-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            <a className="service-card-action" href="tel:+12069196886">{service.action}<span><Arrow /></span></a>
          </div>
          <div className="service-card-visual"><img src={service.image} alt={service.alt} loading="lazy" /><span className="service-visual-mark" aria-hidden="true"><Arrow /></span><span className="service-visual-caption">A MORE PERSONAL<br />WAY TO MOVE.</span></div>
        </article>)}
      </div>
    </div>
  </section>
}

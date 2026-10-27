import { useState } from 'react'

const directions = 'https://www.google.com/maps/search/?api=1&query=3190+HW-160+Suite+F+Pahrump+Nevada+89048'

function ContactIcon({ type }: { type: 'arrow' | 'pin' | 'clock' | 'phone' | 'message' | 'check' }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {type === 'arrow' ? <path d="M5 19 19 5M5 5h14v14" />
      : type === 'pin' ? <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.3" /></>
      : type === 'clock' ? <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>
      : type === 'message' ? <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>
      : type === 'check' ? <path d="m5 12 4 4L19 6" />
      : <path d="m7 3 3 5-2 2a15 15 0 0 0 6 6l2-2 5 3-1 3c-.3 1-1 1-2 1C10 20 4 14 3 6c0-1 0-1.7 1-2l3-1Z" />}
  </svg>
}

export default function ContactSection() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  return <section className="contact-section" id="contact" aria-labelledby="contact-section-title">
    <div className="contact-section-heading">
      <div><span className="overline">CALL OR VISIT</span><h2 id="contact-section-title">Your next chapter<br />starts with <span>hello.</span></h2></div>
      <p>Buying, selling, or just exploring your options?<br />Let's talk about what comes next.<br /><strong>Marci Metzger · The Ridge Realty Group</strong></p>
    </div>
    <div className="contact-section-grid">
      <div className="contact-office-card">
        <div className="contact-card-heading"><span className="overline">A REAL CONVERSATION. A PERSONAL APPROACH.</span><span className="contact-card-mark" aria-hidden="true">MM</span></div>
        <span className="contact-detail-label">GIVE MARCI A CALL</span>
        <a className="contact-main-phone" href="tel:+12069196886">(206) 919-6886<span><ContactIcon type="phone" /></span></a>
        <p className="contact-phone-note">A little guidance can make all the difference.</p>
        <div className="contact-office-details">
          <div><span className="contact-detail-icon"><ContactIcon type="pin" /></span><div><span className="contact-detail-label">COME SAY HELLO</span><a href={directions} target="_blank" rel="noopener noreferrer">3190 HW-160, Suite F<br />Pahrump, Nevada 89048</a><p>United States</p></div></div>
          <div><span className="contact-detail-icon"><ContactIcon type="clock" /></span><div><span className="contact-detail-label">OFFICE HOURS</span><p className="contact-hours">Open daily<br /><strong>8:00 am – 7:00 pm</strong></p><p>Appointments outside office hours available upon request.</p></div></div>
        </div>
        <div className="contact-badges">
          <span><span className="green-dot" /> Local knowledge. Personal attention.</span>
          <span>Nearly 30 years of experience.</span>
        </div>
      </div>

      <div className="contact-form-card">
        {sent ? (
          <div className="contact-sent">
            <span className="contact-sent-icon"><ContactIcon type="check" /></span>
            <h3>Message received!</h3>
            <p>Thanks for reaching out. Marci will be in touch with you shortly.</p>
            <button className="button dark" onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }) }}>Send another message</button>
          </div>
        ) : (
          <>
            <div className="contact-form-heading">
              <span className="overline">SEND A MESSAGE</span>
              <h3>Let's start the<br />conversation.</h3>
              <p>Fill out the form and Marci will get back to you as soon as possible.</p>
            </div>
            <form className="contact-form" onSubmit={e => { e.preventDefault(); setSent(true) }}>
              <div className="contact-form-row">
                <label>Your name<input value={form.name} onChange={set('name')} placeholder="Full name" required autoComplete="name" /></label>
                <label>Email address<input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required autoComplete="email" /></label>
              </div>
              <label>Phone number<input type="tel" value={form.phone} onChange={set('phone')} placeholder="(000) 000-0000" autoComplete="tel" /></label>
              <label>Your message<textarea value={form.message} onChange={set('message')} placeholder="Tell Marci about your ideal home, timeline, or any questions you have…" rows={4} required /></label>
              <div className="contact-form-footer">
                <p className="form-note">This is a preview form. No data is stored or sent.</p>
                <button className="button dark" type="submit">Send message <ContactIcon type="arrow" /></button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
    <div className="contact-section-bottom"><span><span className="green-dot" /> Local knowledge. Personal attention.</span><a href="tel:+12069196886">Let's make your next move a good one. <ContactIcon type="arrow" /></a></div>
  </section>
}

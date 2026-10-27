const socials = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/MarciHomes/',
    icon: <path d="M13.8 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.4H7.6v3.2h2.8V21h3.4Z" />,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/marcimetzger_theridge/',
    icon: <g fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" /></g>,
  },
  {
    name: 'Yelp',
    url: 'https://www.yelp.com/biz/xr3yQN_m2SgO0R_7S6p62w',
    icon: <path d="m11.5 10.4-3-7.3c-.2-.5 0-.9.5-1l3.5-.7c.6-.1.9.2.9.8l-.4 7.8c0 .8-1.2 1.2-1.5.4Zm3.2.2 4.4-3.2c.5-.3.9-.2 1.1.3l1.2 3c.2.5 0 .9-.6 1l-5.4.7c-.9.1-1.4-1.2-.7-1.8Zm.5 3.8 5 1.9c.5.2.7.6.3 1.1l-2 2.6c-.3.4-.8.4-1.1-.1l-3.3-4.3c-.5-.7.3-1.5 1.1-1.2Zm-3.3 2.1.1 5.1c0 .6-.4.8-.9.6l-3.1-1.3c-.5-.2-.6-.6-.2-1l3-4.1c.5-.7 1.1-.2 1.1.7ZM8.6 14l-5.1.7c-.6.1-.9-.2-.8-.7l.6-3.3c.1-.5.5-.7 1-.4l4.6 2.1c.8.4.5 1.5-.3 1.6Z" />,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/marci-metzger-30642496/',
    icon: <><circle cx="5.5" cy="5" r="2" /><path d="M3.7 8.5h3.6V21H3.7V8.5Zm6 0h3.5v1.7c.5-1 1.6-2 3.5-2 3.7 0 4.3 2.4 4.3 5.5V21h-3.6v-6.5c0-1.6 0-3.5-2.1-3.5s-2.4 1.7-2.4 3.4V21H9.7V8.5Z" /></>,
  },
]

export default function FooterSocials() {
  return <div className="footer-socials">
    <div><span className="overline">LET’S STAY CONNECTED</span><p>A little closer to your next chapter.</p></div>
    <nav className="footer-social-links" aria-label="Social media">
      {socials.map(social => <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`Marci Metzger on ${social.name} (opens in a new tab)`} title={social.name}><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{social.icon}</svg></a>)}
    </nav>
  </div>
}

import { Link } from 'react-router-dom'
import { Instagram, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react'
import LogoSvg from '../../../logo.svg'

const footerLinks = {
  quickLinks: [
    { name: 'About Us', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
  ],
  connect: [
    { name: 'Join Us', path: '/join' },
    { name: 'Partner With Us', path: '/partner' },
    { name: 'Contact', path: '/contact' },
  ],
}

const socialLinks = [
  { icon: Instagram, label: 'Instagram', url: 'https://instagram.com/rac_punecity_fortune' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/company/rac-punecity-fortune' },
  { icon: Youtube, label: 'YouTube', url: 'https://youtube.com/@RotaractClubofPuneCityFortune' },
]

function Footer() {
  return (
    <footer className="bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#C9A84C" strokeWidth="1"/>
          <circle cx="100" cy="100" r="60" fill="none" stroke="#C9A84C" strokeWidth="1"/>
          <circle cx="100" cy="100" r="40" fill="none" stroke="#C9A84C" strokeWidth="1"/>
          <circle cx="100" cy="100" r="20" fill="none" stroke="#C9A84C" strokeWidth="1"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <img src={LogoSvg} alt="RAC Logo" className="w-10 h-10 object-contain" />
              </div>
              <span className="text-white font-semibold">RAC Pune City Fortune</span>
            </Link>
            <p className="text-secondary-light text-sm mb-4">
              Carrying the Legacy of Swarajya
            </p>
            <p className="text-secondary-muted text-xs">
              Rotaract Club under Rotary International District 3131
            </p>
          </div>

          <div>
            <h4 className="text-gold font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-secondary-light text-sm hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              {footerLinks.connect.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-secondary-light text-sm hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-secondary-light text-sm">
                  Pune, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:info@racpuncityfortune.org" className="text-secondary-light text-sm hover:text-primary transition-colors">
                  info@racpunecityfortune.org
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+919999999999" className="text-secondary-light text-sm hover:text-primary transition-colors">
                  +91 99999 99999
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-mid">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary-mid flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
            <p className="text-secondary-muted text-xs text-center">
              Rotary International District 3131 | Zone 6 | Pune, Maharashtra
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
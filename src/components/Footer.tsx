import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/lib/i18n/config';
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '@/images/logo-nobg.png';

type Dictionary = {
  nav: {
    home: string;
    services: string;
    about: string;
    faq: string;
    contact: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    services: string;
    followUs: string;
    rights: string;
    privacy: string;
    terms: string;
  };
  contact: {
    address: string;
  };
};

export default function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="mc-footer">
      <div className="mc-footer-container">
        <div className="mc-footer-grid">
          {/* Company Info */}
          <div className="mc-footer-company">
            <Link href={`/${lang}`} className="mc-footer-logo-wrap" aria-label="Mr Clean+ home">
              <Image src={logo} alt="Mr Clean+ logo" width={240} height={84} className="mc-footer-logo" />
            </Link>
            <p className="mc-footer-description">
              {dict.footer.description}
            </p>
            <div className="mc-footer-contact-list">
              <div className="mc-footer-contact-item">
                <FaPhone className="mc-footer-icon" />
                <a href="tel:+15144319741" className="mc-footer-link hover:text-white transition-colors">+1(514)431-9741</a>
              </div>
              <div className="mc-footer-contact-item">
                <FaEnvelope className="mc-footer-icon" />
                <a href="mailto:info@mrcleanplus.ca" className="mc-footer-link hover:text-white transition-colors">info@mrcleanplus.ca</a>
              </div>
              <div className="mc-footer-contact-item">
                <FaMapMarkerAlt className="mc-footer-icon" />
                <span>{dict.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mc-footer-heading">{dict.footer.quickLinks}</h3>
            <ul className="mc-footer-links-list">
              <li>
                <Link href={`/${lang}`} className="mc-footer-link">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="mc-footer-link">
                  {dict.nav.services}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="mc-footer-link">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/faq`} className="mc-footer-link">
                  {dict.nav.faq}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="mc-footer-link">
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mc-footer-heading">{dict.footer.followUs}</h3>
            <div className="mc-footer-socials">
              <a href="https://www.facebook.com/MrCleanPlus/?utm_source=ig&utm_medium=social&utm_content=link_in_bio" className="mc-footer-social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.instagram.com/monsieurcleanplus/" className="mc-footer-social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mc-footer-bottom">
          <p className="mc-footer-rights">{dict.footer.rights}</p>
          <div className="mc-footer-legal-links">
            <Link href={`/${lang}/privacy-policy`} className="mc-footer-link mc-footer-link-small">
              {dict.footer.privacy}
            </Link>
            <Link href={`/${lang}/terms`} className="mc-footer-link mc-footer-link-small">
              {dict.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

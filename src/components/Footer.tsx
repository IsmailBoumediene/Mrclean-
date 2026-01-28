import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

type Dictionary = {
  nav: {
    home: string;
    services: string;
    about: string;
    careers: string;
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
};

export default function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold text-primary-400">Keep</span>
              <span className="text-3xl font-bold text-accent-400">Clean</span>
            </div>
            <p className="text-gray-400 mb-4">
              {dict.footer.description}
            </p>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center gap-2">
                <FaPhone className="text-primary-400" />
                <span>(514) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-primary-400" />
                <span>info@keepclean.ca</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary-400" />
                <span>Montreal, QC</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{dict.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}`} className="text-gray-400 hover:text-white transition-colors">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="text-gray-400 hover:text-white transition-colors">
                  {dict.nav.services}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="text-gray-400 hover:text-white transition-colors">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/careers`} className="text-gray-400 hover:text-white transition-colors">
                  {dict.nav.careers}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-gray-400 hover:text-white transition-colors">
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{dict.footer.followUs}</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">{dict.footer.rights}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              {dict.footer.privacy}
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              {dict.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

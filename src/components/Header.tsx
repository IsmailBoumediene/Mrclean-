'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import LanguageSwitcher from './LanguageSwitcher';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import logo from '@/images/logo-nobg.png';

type Dictionary = {
  nav: {
    home: string;
    services: string;
    about: string;
    faq: string;
    contact: string;
  };
  common: {
    getQuote: string;
  };
  services: {
    residential: { title: string };
    airbnb: { title: string };
    commercial: { title: string };
    moveRenovation: { title: string };
    airbnbCleaning: { title: string };
    staffing: { title: string };
  };
};

export default function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/faq`, label: dict.nav.faq },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  const homeItem = { href: `/${lang}`, label: dict.nav.home };

  const mobileNavItems = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/faq`, label: dict.nav.faq },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  const serviceItems = [
    { href: `/${lang}/services#service-regular-cleaning`, label: dict.services.residential.title },
    { href: `/${lang}/services#service-deep-cleaning`, label: dict.services.airbnb.title },
    { href: `/${lang}/services#service-commercial`, label: dict.services.commercial.title },
    { href: `/${lang}/services#service-move-renovation`, label: dict.services.moveRenovation.title },
    { href: `/${lang}/services#service-airbnb-cleaning`, label: dict.services.airbnbCleaning.title },
    { href: `/${lang}/services#service-staffing`, label: dict.services.staffing.title },
  ];

  const isActive = (href: string) => pathname === href;
  const isServicesActive = pathname === `/${lang}/services`;

  return (
    <header className="mc-header">
      <nav className="mc-header-nav">
        <div className="mc-header-row">
          {/* Logo */}
          <Link href={`/${lang}`} className="mc-header-logo-link" aria-label="Mr Clean+ home">
            <Image src={logo} alt="Mr Clean+ logo" width={220} height={200} className="mc-header-logo-image" priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="mc-header-desktop-menu">
            <Link
              href={homeItem.href}
              className={`mc-header-nav-link ${
                isActive(homeItem.href)
                  ? 'mc-header-nav-link-active'
                  : 'mc-header-nav-link-inactive'
              }`}
            >
              {homeItem.label}
            </Link>

            <div className="mc-header-services-dropdown">
              <Link
                href={`/${lang}/services`}
                className={`mc-header-nav-link ${
                  isServicesActive
                    ? 'mc-header-nav-link-active'
                    : 'mc-header-nav-link-inactive'
                }`}
              >
                {dict.nav.services}
              </Link>
              <div className="mc-header-services-dropdown-menu">
                {serviceItems.map((item) => (
                  <Link key={item.href} href={item.href} className="mc-header-services-dropdown-link">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mc-header-nav-link ${
                  isActive(item.href)
                    ? 'mc-header-nav-link-active'
                    : 'mc-header-nav-link-inactive'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side - CTA and Language Switcher */}
          <div className="mc-header-actions">
            <Link
              href={`/${lang}/consult`}
              className="mc-header-cta"
            >
              {dict.common.getQuote}
            </Link>
            <LanguageSwitcher currentLocale={lang} />
          </div>

          {/* Mobile menu button */}
          <Link
            href={`/${lang}/consult`}
            className="mc-header-mobile-inline-cta"
          >
            {dict.common.getQuote}
          </Link>

          <button
            className="mc-header-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="mc-header-mobile-menu">
            {mobileNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mc-header-mobile-link ${
                  isActive(item.href)
                    ? 'mc-header-mobile-link-active'
                    : 'mc-header-mobile-link-inactive'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mc-header-mobile-actions">
              <div className="mc-header-mobile-switcher">
                <LanguageSwitcher currentLocale={lang} />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

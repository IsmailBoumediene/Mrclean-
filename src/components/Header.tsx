'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import LanguageSwitcher from './LanguageSwitcher';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

type Dictionary = {
  nav: {
    home: string;
    services: string;
    about: string;
    careers: string;
    contact: string;
  };
  common: {
    getQuote: string;
  };
};

export default function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/careers`, label: dict.nav.careers },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">Keep</span>
            <span className="text-2xl font-bold text-accent-600">Clean</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side - CTA and Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href={`/${lang}/contact`}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              {dict.common.getQuote}
            </Link>
            <LanguageSwitcher currentLocale={lang} />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 px-4 text-sm font-medium ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 px-4 space-y-3">
              <Link
                href={`/${lang}/contact`}
                className="block w-full bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {dict.common.getQuote}
              </Link>
              <div className="flex justify-center">
                <LanguageSwitcher currentLocale={lang} />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

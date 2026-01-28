'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale, localeNames } from '@/lib/i18n/config';
import { FaGlobe } from 'react-icons/fa';
import { useState } from 'react';

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (newLocale: Locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Switch language"
      >
        <FaGlobe className="text-lg" />
        <span className="font-medium">{localeNames[currentLocale]}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <Link
            href={switchLocale('fr')}
            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            🇫🇷 Français
          </Link>
          <Link
            href={switchLocale('en')}
            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            🇬🇧 English
          </Link>
        </div>
      )}
    </div>
  );
}

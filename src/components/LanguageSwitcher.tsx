'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale, localeNames } from '@/lib/i18n/config';
import { useState } from 'react';

function FlagIcon({ locale }: { locale: Locale }) {
  if (locale === 'fr') {
    return (
      <svg viewBox="0 0 24 16" className="mc-lang-flag" aria-label="Quebec flag" role="img">
        <rect width="24" height="16" fill="#0055a4" />
        <rect x="10" y="0" width="4" height="16" fill="#ffffff" />
        <rect x="0" y="6" width="24" height="4" fill="#ffffff" />
        <g fill="#ffffff">
          <rect x="3.2" y="2.2" width="1.2" height="1.2" />
          <rect x="19.6" y="2.2" width="1.2" height="1.2" />
          <rect x="3.2" y="12.6" width="1.2" height="1.2" />
          <rect x="19.6" y="12.6" width="1.2" height="1.2" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 16" className="mc-lang-flag" aria-label="Canada flag" role="img">
      <rect width="24" height="16" fill="#ffffff" />
      <rect x="0" y="0" width="6" height="16" fill="#d80621" />
      <rect x="18" y="0" width="6" height="16" fill="#d80621" />
      <path
        fill="#d80621"
        d="M12 3.1l.6 1.2 1.3-.4-.7 1.2 1 .8-1.3.2.2 1.3-1.1-.6-1.1.6.2-1.3-1.3-.2 1-.8-.7-1.2 1.3.4zM12 7.2l1.1 1.1-.8.2v1.2h-.6V8.5l-.8-.2z"
      />
    </svg>
  );
}

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
    <div className="mc-lang-switcher">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mc-lang-switcher-trigger"
        aria-label="Switch language"
      >
        <span className="mc-lang-switcher-label">
          <FlagIcon locale={currentLocale} />
          {localeNames[currentLocale]}
        </span>
      </button>
      
      {isOpen && (
        <div className="mc-lang-switcher-menu">
          <Link
            href={switchLocale('fr')}
            className="mc-lang-switcher-option"
            onClick={() => setIsOpen(false)}
          >
            <FlagIcon locale="fr" />
            FR
          </Link>
          <Link
            href={switchLocale('en')}
            className="mc-lang-switcher-option"
            onClick={() => setIsOpen(false)}
          >
            <FlagIcon locale="en" />
            EN
          </Link>
        </div>
      )}
    </div>
  );
}

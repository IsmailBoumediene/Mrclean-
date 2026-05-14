'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ScrollToServicesBtn from '@/components/ScrollToServicesBtn';
import chambreBeforeAfter from '@/images/Chambre avant_apres.png';
import chambreBeforeAfterMobile from '@/images/Chambre avant_apres_mobile.png';
import frigoBeforeAfter from '@/images/Frigo avant_apres.png';
import frigoBeforeAfterMobile from '@/images/Frigo avant apres_mobile.png';
import fourBeforeAfter from '@/images/Four avant_apres.png';
import fourBeforeAfterMobile from '@/images/Four avant_apres_mobile.png';
import canaperBeforeAfter from '@/images/Canaper avant_apres.png';
import cuisineBeforeAfter from '@/images/Cuisine avant_apres.png';
import cuisineBeforeAfterMobile from '@/images/Cuisine avant_apres_mobile.png';
import lavaboBeforeAfter from '@/images/Lavabo avant_apres.png';
import lavaboBeforeAfterMobile from '@/images/Lavabo avant_apres_mobile.png';

const heroImages = [
  chambreBeforeAfter.src,
  frigoBeforeAfter.src,
  fourBeforeAfter.src,
  canaperBeforeAfter.src,
  cuisineBeforeAfter.src,
  lavaboBeforeAfter.src,
];

const mobileHeroImages = [
  chambreBeforeAfterMobile.src,
  frigoBeforeAfterMobile.src,
  fourBeforeAfterMobile.src,
  canaperBeforeAfter.src,
  cuisineBeforeAfterMobile.src,
  lavaboBeforeAfterMobile.src,
];

type HomeHeroCarouselProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  images?: string[];
  intervalMs?: number;
  promoHeadline?: string;
  promoTagline?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
};

export default function HomeHeroCarousel({
  title,
  subtitle,
  ctaLabel,
  images,
  intervalMs = 5000,
  promoHeadline,
  promoTagline,
  primaryCtaLabel,
  primaryCtaHref,
}: HomeHeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const activeImages = images && images.length > 0 ? images : isMobile ? mobileHeroImages : heroImages;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const updateIsMobile = (event?: MediaQueryListEvent) => {
      setIsMobile(event ? event.matches : mediaQuery.matches);
    };

    updateIsMobile();
    mediaQuery.addEventListener('change', updateIsMobile);

    return () => mediaQuery.removeEventListener('change', updateIsMobile);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(mediaQuery.matches);
    updateMotion();
    mediaQuery.addEventListener('change', updateMotion);
    return () => mediaQuery.removeEventListener('change', updateMotion);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentIndex((current) => (current + 1) % activeImages.length);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [activeImages.length, intervalMs, reducedMotion]);

  return (
    <section
      className="mc-hero"
      role="region"
      aria-label="Hero"
    >
      {activeImages.map((image, index) => (
        <div
          key={image}
          className={`mc-hero-bg ${index === currentIndex ? 'is-active' : ''}`}
          style={{ backgroundImage: `url('${image}')` }}
          aria-hidden="true"
        />
      ))}

      <div className="mc-hero-overlay" />

      <div className="mc-hero-content-wrap">
        <div className="mc-hero-content">
          {promoHeadline && (
            <div className="mc-hero-promo" role="note">
              <span className="mc-hero-promo-badge" aria-hidden="true">
                <span className="mc-hero-promo-pct">20%</span>
                <span className="mc-hero-promo-pct-label">OFF</span>
              </span>
              <span className="mc-hero-promo-text">
                <strong>{promoHeadline}</strong>
                {promoTagline && <span className="mc-hero-promo-tagline">{promoTagline}</span>}
              </span>
            </div>
          )}
          <h1 className="mc-page-hero-title">{title}</h1>
          <p className="mc-page-hero-subtitle">{subtitle}</p>
          <div className="mc-hero-actions">
            {primaryCtaLabel && primaryCtaHref ? (
              <Link href={primaryCtaHref} className="mc-hero-cta">
                {primaryCtaLabel}
              </Link>
            ) : null}
            <ScrollToServicesBtn
              label={ctaLabel}
              className={primaryCtaLabel ? 'mc-hero-cta-ghost' : 'mc-hero-cta'}
            />
          </div>
        </div>
      </div>

      <div className="mc-hero-dots" role="tablist" aria-label="Hero slides">
        {activeImages.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`mc-hero-dot ${index === currentIndex ? 'is-active' : ''}`}
            aria-label={`Slide ${index + 1} of ${activeImages.length}`}
            aria-current={index === currentIndex ? 'true' : undefined}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}

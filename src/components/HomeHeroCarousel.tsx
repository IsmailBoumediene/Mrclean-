'use client';

import { useEffect, useState } from 'react';
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
};

export default function HomeHeroCarousel({
  title,
  subtitle,
  ctaLabel,
  images,
  intervalMs = 5000,
}: HomeHeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
    const interval = window.setInterval(() => {
      setCurrentIndex((current) => (current + 1) % activeImages.length);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [activeImages.length, intervalMs]);

  return (
    <section
      className="relative h-[560px] overflow-hidden text-white"
      style={{
        backgroundImage: `url('${activeImages[currentIndex]}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-slate-900/45" />

      <div
        className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-center"
        style={{ paddingBlock: 'clamp(2.8125rem, 4vw, 9.875rem)' }}
      >
        <div
          className="text-center max-w-3xl mx-auto w-full"
          style={{ background: 'rgba(76, 92, 99, 0.58)', padding: 'clamp(1.875rem, 4vw, 2.8125rem)' }}
        >
          <h1 className="mc-page-hero-title mb-6 hero-fade-in-title">{title}</h1>
          <p className="mc-page-hero-subtitle mb-8 text-primary-100 hero-fade-in-subtitle">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ScrollToServicesBtn
              label={ctaLabel}
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
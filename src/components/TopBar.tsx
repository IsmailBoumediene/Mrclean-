'use client';

import { useEffect, useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

type Dictionary = {
  topBar: {
    callText: string;
    callTextLine2: string;
    phone: string;
    slides: Array<{
      text: string;
      durationMs: number;
    }>;
  };
};

export default function TopBar({ dict }: { dict: Dictionary }) {
  const slides = dict.topBar.slides;
  const [currentSlide, setCurrentSlide] = useState(0);

  const renderSlideText = (text: string) => {
    return text.split(/(\d+%)/g).map((part, index) => {
      if (/^\d+%$/.test(part)) {
        const highlightClass = part === '20%'
          ? 'mc-topbar-percent-highlight mc-topbar-percent-zoom'
          : 'mc-topbar-percent-highlight';

        return (
          <span key={index} className={highlightClass}>
            {part}
          </span>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const currentDuration = Math.max(500, slides[currentSlide]?.durationMs ?? 1500);
    const timeoutId = window.setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, currentDuration);

    return () => window.clearTimeout(timeoutId);
  }, [currentSlide, slides]);

  return (
    <div className="mc-topbar">
      <div className="mc-topbar-container">
        {/* Left side - Call info */}
        <div className="mc-topbar-call">
          <span className="mc-topbar-call-text mc-topbar-line-1">{dict.topBar.callText}</span>
          <span className="mc-topbar-call-text mc-topbar-line-2">{dict.topBar.callTextLine2}</span>
          <a href="tel:+15144319741" className="mc-topbar-phone mc-topbar-line-3" aria-label={`Appeler ${dict.topBar.phone}`}>
            <FaPhoneAlt className="mc-topbar-phone-icon" aria-hidden="true" />
            {dict.topBar.phone}
          </a>
        </div>

        <div className="mc-topbar-slider" aria-live="polite">
          <p key={currentSlide} className="mc-topbar-slide-text">
            {renderSlideText(slides[currentSlide]?.text ?? '')}
          </p>
        </div>
      </div>
    </div>
  );
}

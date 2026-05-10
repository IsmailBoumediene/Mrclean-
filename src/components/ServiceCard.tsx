import { ReactNode } from 'react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: ReactNode;
  backgroundImage?: string;
  backgroundPosition?: string;
  showDetails?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function ServiceCard({
  title,
  description,
  features,
  icon,
  backgroundImage,
  backgroundPosition = 'center',
  showDetails = true,
  ctaLabel,
  ctaHref,
}: ServiceCardProps) {
  const cardStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.65) 100%), url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition,
        backgroundRepeat: 'no-repeat',
      }
    : undefined;

  return (
    <div className="mc-service-card" style={cardStyle}>
      <div className="mc-service-card-icon">{icon}</div>
      <h3 className="mc-service-card-title">{title}</h3>
      {showDetails && (
        <>
          <p className="mc-service-card-description">{description}</p>
          <ul className="mc-service-card-features">
            {features.map((feature, index) => (
              <li key={index} className="mc-service-card-feature-item">
                <span className="mc-service-card-check">✓</span>
                <span className="mc-service-card-feature-text">{feature}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      {ctaHref && ctaLabel && (
        ctaHref.includes('#') ? (
          <a href={ctaHref} className="mc-service-card-cta" aria-label={`${ctaLabel}: ${title}`}>
            {ctaLabel}
          </a>
        ) : (
          <Link href={ctaHref} className="mc-service-card-cta" aria-label={`${ctaLabel}: ${title}`}>
            {ctaLabel}
          </Link>
        )
      )}
    </div>
  );
}

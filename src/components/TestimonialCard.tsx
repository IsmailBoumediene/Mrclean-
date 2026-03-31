interface TestimonialCardProps {
  name: string;
  text: string;
  service: string;
}

export default function TestimonialCard({ name, text, service }: TestimonialCardProps) {
  return (
    <div className="mc-testimonial-card">
      <div className="mc-testimonial-stars">
        {[...Array(5)].map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
      <p className="mc-testimonial-text">&ldquo;{text}&rdquo;</p>
      <div className="mc-testimonial-author-block">
        <p className="mc-testimonial-author">{name}</p>
        <p className="mc-testimonial-service">{service}</p>
      </div>
    </div>
  );
}

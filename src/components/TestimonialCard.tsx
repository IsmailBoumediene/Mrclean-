interface TestimonialCardProps {
  name: string;
  text: string;
  service: string;
}

export default function TestimonialCard({ name, text, service }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-1 mb-4 text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic">&ldquo;{text}&rdquo;</p>
      <div className="border-t pt-4">
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{service}</p>
      </div>
    </div>
  );
}

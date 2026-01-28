import { ReactNode } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: ReactNode;
}

export default function ServiceCard({ title, description, features, icon }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="text-primary-600 mb-4 text-4xl">{icon}</div>
      <h3 className="text-2xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-accent-500 mt-1">✓</span>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

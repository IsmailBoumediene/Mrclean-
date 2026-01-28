'use client';

import { useState, FormEvent } from 'react';

type ContactFormDict = {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  selectService: string;
  residential: string;
  commercial: string;
  airbnb: string;
  staffing: string;
  message: string;
  submit: string;
  success: string;
  error: string;
};

export default function ContactForm({ dict }: { dict: ContactFormDict }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formState);
      setStatus('success');
      setFormState({ name: '', email: '', phone: '', serviceType: '', message: '' });
      
      setTimeout(() => setStatus('idle'), 5000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          {dict.name}
        </label>
        <input
          type="text"
          id="name"
          required
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          {dict.email}
        </label>
        <input
          type="email"
          id="email"
          required
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          {dict.phone}
        </label>
        <input
          type="tel"
          id="phone"
          value={formState.phone}
          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
          {dict.serviceType}
        </label>
        <select
          id="serviceType"
          required
          value={formState.serviceType}
          onChange={(e) => setFormState({ ...formState, serviceType: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">{dict.selectService}</option>
          <option value="residential">{dict.residential}</option>
          <option value="commercial">{dict.commercial}</option>
          <option value="airbnb">{dict.airbnb}</option>
          <option value="staffing">{dict.staffing}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          {dict.message}
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {dict.success}
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {dict.error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? '...' : dict.submit}
      </button>
    </form>
  );
}

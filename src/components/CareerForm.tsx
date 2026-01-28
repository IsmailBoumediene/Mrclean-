'use client';

import { useState, FormEvent } from 'react';

type CareerFormDict = {
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  availability: string;
  message: string;
  submit: string;
  success: string;
  error: string;
};

export default function CareerForm({ dict }: { dict: CareerFormDict }) {
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    availability: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate form submission
    setTimeout(() => {
      console.log('Career application submitted:', formState);
      setStatus('success');
      setFormState({ fullName: '', email: '', phone: '', experience: '', availability: '', message: '' });
      
      setTimeout(() => setStatus('idle'), 5000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          {dict.fullName}
        </label>
        <input
          type="text"
          id="fullName"
          required
          value={formState.fullName}
          onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
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
          required
          value={formState.phone}
          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
          {dict.experience}
        </label>
        <textarea
          id="experience"
          rows={3}
          value={formState.experience}
          onChange={(e) => setFormState({ ...formState, experience: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
          {dict.availability}
        </label>
        <input
          type="text"
          id="availability"
          placeholder="e.g., Full-time, Part-time, Weekends"
          value={formState.availability}
          onChange={(e) => setFormState({ ...formState, availability: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
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

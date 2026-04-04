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
  airbnbCleaning: string;
  staffing: string;
  moveRenovation: string;
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
    <form onSubmit={handleSubmit} className="mc-form mc-form-contact">
      <div className="mc-form-field">
        <label htmlFor="name" className="mc-form-label">
          {dict.name}
        </label>
        <input
          type="text"
          id="name"
          required
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          className="mc-form-control"
        />
      </div>

      <div className="mc-form-field">
        <label htmlFor="email" className="mc-form-label">
          {dict.email}
        </label>
        <input
          type="email"
          id="email"
          required
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          className="mc-form-control"
        />
      </div>

      <div className="mc-form-field">
        <label htmlFor="phone" className="mc-form-label">
          {dict.phone}
        </label>
        <input
          type="tel"
          id="phone"
          value={formState.phone}
          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
          className="mc-form-control"
        />
      </div>

      <div className="mc-form-field">
        <label htmlFor="serviceType" className="mc-form-label">
          {dict.serviceType}
        </label>
        <select
          id="serviceType"
          required
          value={formState.serviceType}
          onChange={(e) => setFormState({ ...formState, serviceType: e.target.value })}
          className="mc-form-control"
        >
          <option value="">{dict.selectService}</option>
          <option value="residential">{dict.residential}</option>
          <option value="commercial">{dict.commercial}</option>
          <option value="airbnb">{dict.airbnb}</option>
          <option value="airbnbCleaning">{dict.airbnbCleaning}</option>
          <option value="staffing">{dict.staffing}</option>
          <option value="moveRenovation">{dict.moveRenovation}</option>
        </select>
      </div>

      <div className="mc-form-field">
        <label htmlFor="message" className="mc-form-label">
          {dict.message}
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          className="mc-form-control"
        />
      </div>

      {status === 'success' && (
        <div className="mc-form-alert mc-form-alert-success">
          {dict.success}
        </div>
      )}

      {status === 'error' && (
        <div className="mc-form-alert mc-form-alert-error">
          {dict.error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mc-form-submit"
      >
        {status === 'loading' ? '...' : dict.submit}
      </button>
    </form>
  );
}

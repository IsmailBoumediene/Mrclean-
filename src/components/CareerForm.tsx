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
    <form onSubmit={handleSubmit} className="mc-form mc-form-career">
      <div className="mc-form-field">
        <label htmlFor="fullName" className="mc-form-label">
          {dict.fullName}
        </label>
        <input
          type="text"
          id="fullName"
          required
          value={formState.fullName}
          onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
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
          required
          value={formState.phone}
          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
          className="mc-form-control"
        />
      </div>

      <div className="mc-form-field">
        <label htmlFor="experience" className="mc-form-label">
          {dict.experience}
        </label>
        <textarea
          id="experience"
          rows={3}
          value={formState.experience}
          onChange={(e) => setFormState({ ...formState, experience: e.target.value })}
          className="mc-form-control"
        />
      </div>

      <div className="mc-form-field">
        <label htmlFor="availability" className="mc-form-label">
          {dict.availability}
        </label>
        <input
          type="text"
          id="availability"
          placeholder="e.g., Full-time, Part-time, Weekends"
          value={formState.availability}
          onChange={(e) => setFormState({ ...formState, availability: e.target.value })}
          className="mc-form-control"
        />
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

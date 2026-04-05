'use client';

import { ChangeEvent, FormEvent, useRef, useState } from 'react';

type ConsultFormDict = {
  companyName: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  city: string;
  postalCode: string;
  housingType: string;
  housingTypeOptions: {
    twoHalf: string;
    threeHalf: string;
    fourHalf: string;
    fiveHalf: string;
    condo: string;
    house: string;
  };
  floors: string;
  bedrooms: string;
  services: string;
  serviceOptions: {
    residential: string;
    commercial: string;
    airbnb: string;
    deepCleaning: string;
    moveRenovation: string;
    staffing: string;
  };
  visitPreference: string;
  visitPreferenceOptions: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
  };
  frequency: string;
  frequencyOptions: {
    oneTime: string;
    weekly: string;
    biweekly: string;
    monthly: string;
  };
  oneTimeVisitsPerWeek: string;
  photos: string;
  photosAction: string;
  photosChoiceTitle: string;
  photosOptionUpload: string;
  photosOptionCamera: string;
  photosOptionCancel: string;
  photosHelp: string;
  photosErrorMax: string;
  additionalInfo: string;
  submit: string;
  success: string;
  error: string;
};

type FormState = {
  companyName: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  city: string;
  postalCode: string;
  housingType: string;
  floors: string;
  bedrooms: string;
  services: string[];
  visitPreference: string[];
  frequency: string;
  oneTimeVisitsPerWeek: string;
  additionalInfo: string;
};

export default function ConsultForm({ dict }: { dict: ConsultFormDict }) {
  const [formState, setFormState] = useState<FormState>({
    companyName: '',
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    city: '',
    postalCode: '',
    housingType: '',
    floors: '',
    bedrooms: '',
    services: [],
    visitPreference: [],
    frequency: '',
    oneTimeVisitsPerWeek: '',
    additionalInfo: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [photos, setPhotos] = useState<File[]>([]);
  const [photosError, setPhotosError] = useState('');
  const [showMobilePhotoOptions, setShowMobilePhotoOptions] = useState(false);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const toggleService = (value: string) => {
    setFormState((prev) => {
      const exists = prev.services.includes(value);
      return {
        ...prev,
        services: exists ? prev.services.filter((s) => s !== value) : [...prev.services, value],
      };
    });
  };

  const toggleVisitPreference = (value: string) => {
    setFormState((prev) => {
      const exists = prev.visitPreference.includes(value);
      return {
        ...prev,
        visitPreference: exists
          ? prev.visitPreference.filter((d) => d !== value)
          : [...prev.visitPreference, value],
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(key, v));
        } else {
          formData.append(key, value);
        }
      });
      photos.forEach((photo) => {
        formData.append('photos', photo);
      });
      formData.append('subject', 'Demande de soumission - Mrcleanplus.ca');
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setStatus('success');
        setPhotos([]);
        setPhotosError('');
        setFormState({
          companyName: '',
          lastName: '',
          firstName: '',
          email: '',
          phone: '',
          city: '',
          postalCode: '',
          housingType: '',
          floors: '',
          bedrooms: '',
          services: [],
          visitPreference: [],
          frequency: '',
          oneTimeVisitsPerWeek: '',
          additionalInfo: '',
        });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handlePhotosChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (files.length === 0) {
      return;
    }

    const nextPhotos = [...photos, ...files];

    if (nextPhotos.length > 3) {
      setPhotos(nextPhotos.slice(0, 3));
      setPhotosError(dict.photosErrorMax);
      e.target.value = '';
      return;
    }

    setPhotos(nextPhotos);
    setPhotosError('');
    e.target.value = '';
  };

  const openPhotoPicker = () => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      setShowMobilePhotoOptions(true);
      return;
    }

    galleryInputRef.current?.click();
  };

  const openGalleryPicker = () => {
    setShowMobilePhotoOptions(false);
    galleryInputRef.current?.click();
  };

  const openCameraPicker = () => {
    setShowMobilePhotoOptions(false);
    cameraInputRef.current?.click();
  };

  const serviceEntries = [
    ['residential', dict.serviceOptions.residential],
    ['deepCleaning', dict.serviceOptions.deepCleaning],
    ['commercial', dict.serviceOptions.commercial],
    ['moveRenovation', dict.serviceOptions.moveRenovation],
    ['airbnb', dict.serviceOptions.airbnb],
    ['staffing', dict.serviceOptions.staffing],
  ] as const;

  const visitPreferenceEntries = [
    ['monday', dict.visitPreferenceOptions.monday],
    ['tuesday', dict.visitPreferenceOptions.tuesday],
    ['wednesday', dict.visitPreferenceOptions.wednesday],
    ['thursday', dict.visitPreferenceOptions.thursday],
    ['friday', dict.visitPreferenceOptions.friday],
    ['saturday', dict.visitPreferenceOptions.saturday],
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="mc-form">
      {status === 'success' && (
        <div className="mc-form-success">Votre demande a été envoyée.</div>
      )}
      {status === 'error' && (
        <div className="mc-form-error">Erreur lors de l'envoi de la demande.</div>
      )}
      <div className="mc-form-field">
        <label htmlFor="companyName" className="mc-form-label">{dict.companyName}</label>
        <input
          id="companyName"
          type="text"
          value={formState.companyName}
          onChange={(e) => setFormState({ ...formState, companyName: e.target.value })}
          className="mc-form-control"
        />
      </div>

      <div className="mc-form-field">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mc-form-field-inline">
            <label htmlFor="lastName" className="mc-form-label">{dict.lastName}</label>
            <input
              id="lastName"
              type="text"
              required
              value={formState.lastName}
              onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
              className="mc-form-control"
            />
          </div>
          <div className="mc-form-field-inline">
            <label htmlFor="firstName" className="mc-form-label">{dict.firstName}</label>
            <input
              id="firstName"
              type="text"
              required
              value={formState.firstName}
              onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
              className="mc-form-control"
            />
          </div>
        </div>
      </div>

      <div className="mc-form-field">
        <label htmlFor="email" className="mc-form-label">{dict.email}</label>
        <input
          id="email"
          type="email"
          required
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          className="mc-form-control"
        />
      </div>

      <div className="mc-form-field">
        <label htmlFor="phone" className="mc-form-label">{dict.phone}</label>
        <input
          id="phone"
          type="tel"
          value={formState.phone}
          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
          className="mc-form-control"
        />
      </div>

      <div className="mc-form-field">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mc-form-field-inline">
            <label htmlFor="city" className="mc-form-label">{dict.city}</label>
            <input
              id="city"
              type="text"
              value={formState.city}
              onChange={(e) => setFormState({ ...formState, city: e.target.value })}
              className="mc-form-control"
            />
          </div>
          <div className="mc-form-field-inline">
            <label htmlFor="postalCode" className="mc-form-label">{dict.postalCode}</label>
            <input
              id="postalCode"
              type="text"
              value={formState.postalCode}
              onChange={(e) => setFormState({ ...formState, postalCode: e.target.value })}
              className="mc-form-control"
            />
          </div>
        </div>
      </div>

      <div className="mc-form-field">
        <span className="mc-form-label">{dict.services}</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {serviceEntries.map(([value, label]) => (
            <label key={value} className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                checked={formState.services.includes(value)}
                onChange={() => toggleService(value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mc-form-field">
        <label htmlFor="housingType" className="mc-form-label">{dict.housingType}</label>
        <select
          id="housingType"
          value={formState.housingType}
          onChange={(e) => setFormState({ ...formState, housingType: e.target.value })}
          className="mc-form-control"
        >
          <option value="">--</option>
          <option value="twoHalf">{dict.housingTypeOptions.twoHalf}</option>
          <option value="threeHalf">{dict.housingTypeOptions.threeHalf}</option>
          <option value="fourHalf">{dict.housingTypeOptions.fourHalf}</option>
          <option value="fiveHalf">{dict.housingTypeOptions.fiveHalf}</option>
          <option value="condo">{dict.housingTypeOptions.condo}</option>
          <option value="house">{dict.housingTypeOptions.house}</option>
        </select>
      </div>

      {(formState.housingType === 'condo' || formState.housingType === 'house') && (
        <div className="mc-form-field">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mc-form-field-inline">
            <label htmlFor="floors" className="mc-form-label">{dict.floors}</label>
            <input
              id="floors"
              type="number"
              min={1}
              value={formState.floors}
              onChange={(e) => setFormState({ ...formState, floors: e.target.value })}
              className="mc-form-control"
            />
          </div>
          <div className="mc-form-field-inline">
            <label htmlFor="bedrooms" className="mc-form-label">{dict.bedrooms}</label>
            <input
              id="bedrooms"
              type="number"
              min={0}
              value={formState.bedrooms}
              onChange={(e) => setFormState({ ...formState, bedrooms: e.target.value })}
              className="mc-form-control"
            />
          </div>
          </div>
        </div>
      )}

      <div className="mc-form-field">
        <span className="mc-form-label">{dict.visitPreference}</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 justify-items-center md:flex md:flex-wrap md:justify-start md:justify-items-stretch">
          {visitPreferenceEntries.map(([value, label]) => (
            <label key={value} className="inline-flex items-center gap-1.5 text-gray-700">
              <input
                type="checkbox"
                checked={formState.visitPreference.includes(value)}
                onChange={() => toggleVisitPreference(value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mc-form-field">
        <label htmlFor="frequency" className="mc-form-label">{dict.frequency}</label>
        <select
          id="frequency"
          value={formState.frequency}
          onChange={(e) => {
            const nextFrequency = e.target.value;
            setFormState({
              ...formState,
              frequency: nextFrequency,
              oneTimeVisitsPerWeek: nextFrequency === 'oneTime' ? formState.oneTimeVisitsPerWeek : '',
            });
          }}
          className="mc-form-control"
        >
          <option value="">--</option>
          <option value="oneTime">{dict.frequencyOptions.oneTime}</option>
          <option value="weekly">{dict.frequencyOptions.weekly}</option>
          <option value="biweekly">{dict.frequencyOptions.biweekly}</option>
          <option value="monthly">{dict.frequencyOptions.monthly}</option>
        </select>
      </div>

      {formState.frequency === 'oneTime' && (
        <div className="mc-form-field">
          <label htmlFor="oneTimeVisitsPerWeek" className="mc-form-label">{dict.oneTimeVisitsPerWeek}</label>
          <input
            id="oneTimeVisitsPerWeek"
            type="number"
            min={1}
            required
            value={formState.oneTimeVisitsPerWeek}
            onChange={(e) => setFormState({ ...formState, oneTimeVisitsPerWeek: e.target.value })}
            className="mc-form-control"
          />
        </div>
      )}

      <div className="mc-form-field">
        <span className="mc-form-label">{dict.photos}</span>
        <input
          id="photos-gallery"
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotosChange}
          className="mc-photo-upload-input"
          ref={galleryInputRef}
        />
        <input
          id="photos-camera"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handlePhotosChange}
          className="mc-photo-upload-input"
          ref={cameraInputRef}
        />
        <div className="mc-photo-upload-grid">
          {photos.map((photo, idx) => (
            <div key={idx} className="mc-photo-preview">
              <img
                src={URL.createObjectURL(photo)}
                alt={photo.name}
                className="mc-photo-preview-img"
                style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #ccc' }}
              />
              <button
                type="button"
                className="mc-photo-remove-btn"
                aria-label="Supprimer l&apos;image"
                onClick={() => {
                  setPhotos(photos.filter((_, i) => i !== idx));
                }}
                style={{ display: 'block', margin: '4px auto 0', color: '#b91c1c', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Supprimer
              </button>
              <div className="mc-photo-preview-name" style={{ fontSize: 12, textAlign: 'center', marginTop: 2 }}>{photo.name}</div>
            </div>
          ))}
          {photos.length < 3 &&
            Array.from({ length: 3 - photos.length }).map((_, slotIndex) => (
              <button
                key={slotIndex}
                type="button"
                onClick={openPhotoPicker}
                className="mc-photo-upload-trigger"
              >
                <span className="mc-photo-upload-plus">+</span>
                <span className="mc-photo-upload-action">{dict.photosAction}</span>
              </button>
            ))}
        </div>
        {showMobilePhotoOptions && (
          <div className="mc-photo-sheet" role="dialog" aria-modal="true" aria-label={dict.photosChoiceTitle}>
            <button
              type="button"
              className="mc-photo-sheet-backdrop"
              onClick={() => setShowMobilePhotoOptions(false)}
              aria-label={dict.photosOptionCancel}
            />
            <div className="mc-photo-sheet-panel">
              <p className="mc-photo-sheet-title">{dict.photosChoiceTitle}</p>
              <button type="button" className="mc-photo-sheet-button" onClick={openGalleryPicker}>
                {dict.photosOptionUpload}
              </button>
              <button type="button" className="mc-photo-sheet-button" onClick={openCameraPicker}>
                {dict.photosOptionCamera}
              </button>
              <button
                type="button"
                className="mc-photo-sheet-button mc-photo-sheet-button-cancel"
                onClick={() => setShowMobilePhotoOptions(false)}
              >
                {dict.photosOptionCancel}
              </button>
            </div>
          </div>
        )}
        <p className="text-sm text-gray-500 mt-2">{dict.photosHelp}</p>
        {photosError && <p className="text-sm text-red-600 mt-1">{photosError}</p>}
        {photos.length > 0 && (
          <p className="text-sm text-gray-700 mt-1">{photos.length}/3</p>
        )}
      </div>

      <div className="mc-form-field">
        <label htmlFor="additionalInfo" className="mc-form-label">{dict.additionalInfo}</label>
        <textarea
          id="additionalInfo"
          rows={4}
          value={formState.additionalInfo}
          onChange={(e) => setFormState({ ...formState, additionalInfo: e.target.value })}
          className="mc-form-control"
        />
      </div>

      {status === 'success' && <div className="mc-form-alert mc-form-alert-success">{dict.success}</div>}
      {status === 'error' && <div className="mc-form-alert mc-form-alert-error">{dict.error}</div>}

      <button type="submit" disabled={status === 'loading'} className="mc-form-submit">
        {status === 'loading' ? '...' : dict.submit}
      </button>
    </form>
  );
}

'use client';

import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';

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
  services: string;
  visitPreference: string[];
  frequency: string;
  oneTimeVisitsPerWeek: string;
  additionalInfo: string;
};

// Compress an image file to max 1200px and JPEG 0.7 quality to reduce upload size
function compressImage(file: File, maxWidth = 1200, quality = 0.7): Promise<File> {
  return new Promise((resolve) => {
    // If file is already small (< 500KB), skip compression
    if (file.size < 500 * 1024) {
      resolve(file);
      return;
    }
    // Use FileReader instead of createObjectURL for better Android compatibility
    const reader = new FileReader();
    reader.onload = () => {
      const img = document.createElement('img');
      img.onload = () => {
        try {
          const scale = img.width > maxWidth ? maxWidth / img.width : 1;
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext('2d');
          if (!ctx) { resolve(file); return; }
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            (blob) => {
              if (blob && blob.size > 0) {
                resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }));
              } else {
                resolve(file);
              }
            },
            'image/jpeg',
            quality,
          );
        } catch {
          resolve(file);
        }
      };
      img.onerror = () => resolve(file);
      img.src = reader.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

export default function ConsultForm({ dict }: { dict: ConsultFormDict }) {
  const [formState, setFormState] = useState<FormState>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('consultFormState');
      if (saved) {
        try { return JSON.parse(saved); } catch { /* ignore */ }
      }
    }
    return {
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
      services: '',
      visitPreference: [],
      frequency: '',
      oneTimeVisitsPerWeek: '',
      additionalInfo: '',
    };
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<{ city?: string; postalCode?: string; lastName?: string; firstName?: string; email?: string }>({});
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [photosError, setPhotosError] = useState('');
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Refs pour scroll automatique sur erreur
  const lastNameRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);

  // Persist form state to sessionStorage so it survives camera reload on mobile
  useEffect(() => {
    sessionStorage.setItem('consultFormState', JSON.stringify(formState));
  }, [formState]);

  // Create stable blob URLs for photo previews and revoke old ones to free memory
  useEffect(() => {
    const urls = photos.map((p) => URL.createObjectURL(p));
    setPhotoUrls(urls);
    return () => { urls.forEach((u) => URL.revokeObjectURL(u)); };
  }, [photos]);

  // toggleService removed: now using radio buttons for services

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
    // Validate required fields
    const errors: { city?: string; postalCode?: string; lastName?: string; firstName?: string; email?: string } = {};
    if (!formState.lastName.trim()) {
      errors.lastName = 'Champ obligatoire.';
    }
    if (!formState.firstName.trim()) {
      errors.firstName = 'Champ obligatoire.';
    }
    if (!formState.email.trim()) {
      errors.email = 'Champ obligatoire.';
    }
    if (!formState.city.trim()) {
      errors.city = 'Champ obligatoire.';
    }
    if (!formState.postalCode.trim()) {
      errors.postalCode = 'Champ obligatoire.';
    } else {
      // Validation stricte du code postal canadien (format A1A 1A1 ou A1A1A1)
      const postalCode = formState.postalCode.trim().toUpperCase().replace(/\s+/g, '');
      const postalCodeRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\d[ABCEGHJ-NPRSTV-Z]\d$/;
      if (!postalCodeRegex.test(postalCode)) {
        errors.postalCode = 'Veuillez entrer un code postal canadien valide (ex: A1A 1A1 ).';
      }
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      // Scroll au premier champ en erreur
      const order = ['lastName', 'firstName', 'email', 'city', 'postalCode'];
      for (const key of order) {
        if (errors[key as keyof typeof errors]) {
          const refMap: Record<string, React.RefObject<HTMLInputElement>> = {
            lastName: lastNameRef,
            firstName: firstNameRef,
            email: emailRef,
            city: cityRef,
            postalCode: postalCodeRef,
          };
          const ref = refMap[key];
          if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            ref.current.focus();
          }
          break;
        }
      }
      setStatus('idle');
      return;
    }
    setStatus('loading');
    try {
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        if (key === 'postalCode') {
          // Toujours envoyer le code postal en majuscules et sans espaces
          const formatted = typeof value === 'string' ? value.trim().toUpperCase().replace(/\s+/g, '') : String(value);
          formData.append(key, formatted);
        } else if (Array.isArray(value)) {
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
        sessionStorage.removeItem('consultFormState');
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
          services: '',
          visitPreference: [],
          frequency: '',
          oneTimeVisitsPerWeek: '',
          additionalInfo: '',
        });
        setFieldErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handlePhotosChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // Grab files immediately — on Android the input can be cleared after async work
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    const rawFiles = Array.from(fileList);
    // Reset input right away so the same file can be re-selected
    e.target.value = '';

    // Compress images to reduce size (max 1200px, JPEG 70%)
    const compressed = await Promise.all(rawFiles.map((f) => compressImage(f)));

    setPhotos((prev) => {
      const nextPhotos = [...prev, ...compressed];
      if (nextPhotos.length > 3) {
        setPhotosError(dict.photosErrorMax);
        return nextPhotos.slice(0, 3);
      }
      setPhotosError('');
      return nextPhotos;
    });
  };

  const openPhotoPicker = () => {
    // On mobile, show a choice sheet (Camera or Gallery)
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      setShowPhotoOptions(true);
      return;
    }
    // On desktop, open file picker directly
    galleryInputRef.current?.click();
  };

  const openGalleryPicker = () => {
    setShowPhotoOptions(false);
    galleryInputRef.current?.click();
  };

  const openCameraPicker = () => {
    setShowPhotoOptions(false);
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
        <div className="mc-form-success">{dict.success}</div>
      )}
      {status === 'error' && (
        <div className="mc-form-error">Erreur lors de l&apos;envoi de la demande.</div>
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
              ref={lastNameRef}
              value={formState.lastName}
              onChange={(e) => {
                setFormState({ ...formState, lastName: e.target.value });
                if (fieldErrors.lastName) setFieldErrors((prev) => ({ ...prev, lastName: undefined }));
              }}
              className={`mc-form-control${fieldErrors.lastName ? ' border-red-500 focus:border-red-500' : ''}`}
              aria-invalid={!!fieldErrors.lastName}
              aria-describedby={fieldErrors.lastName ? 'lastName-error' : undefined}
              style={fieldErrors.lastName ? { borderColor: '#ef4444', borderWidth: 2 } : {}}
            />
            <span
              id="lastName-error"
              className="text-red-500 text-xs mt-1 block"
              style={{ minHeight: '18px', visibility: fieldErrors.lastName ? 'visible' : 'hidden' }}
            >
              {fieldErrors.lastName || ' '}
            </span>
          </div>
          <div className="mc-form-field-inline">
            <label htmlFor="firstName" className="mc-form-label">{dict.firstName}</label>
            <input
              id="firstName"
              type="text"
              required
              ref={firstNameRef}
              value={formState.firstName}
              onChange={(e) => {
                setFormState({ ...formState, firstName: e.target.value });
                if (fieldErrors.firstName) setFieldErrors((prev) => ({ ...prev, firstName: undefined }));
              }}
              className={`mc-form-control${fieldErrors.firstName ? ' border-red-500 focus:border-red-500' : ''}`}
              aria-invalid={!!fieldErrors.firstName}
              aria-describedby={fieldErrors.firstName ? 'firstName-error' : undefined}
              style={fieldErrors.firstName ? { borderColor: '#ef4444', borderWidth: 2 } : {}}
            />
            <span
              id="firstName-error"
              className="text-red-500 text-xs mt-1 block"
              style={{ minHeight: '18px', visibility: fieldErrors.firstName ? 'visible' : 'hidden' }}
            >
              {fieldErrors.firstName || ' '}
            </span>
          </div>
        </div>
      </div>

      <div className="mc-form-field">
        <label htmlFor="email" className="mc-form-label">{dict.email}</label>
        <input
          id="email"
          type="email"
          required
          ref={emailRef}
          value={formState.email}
          onChange={(e) => {
            setFormState({ ...formState, email: e.target.value });
            if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
          }}
          className={`mc-form-control${fieldErrors.email ? ' border-red-500 focus:border-red-500' : ''}`}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
          style={fieldErrors.email ? { borderColor: '#ef4444', borderWidth: 2 } : {}}
        />
        <span
          id="email-error"
          className="text-red-500 text-xs mt-1 block"
          style={{ minHeight: '18px', visibility: fieldErrors.email ? 'visible' : 'hidden' }}
        >
          {fieldErrors.email || ' '}
        </span>
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
              required
              ref={cityRef}
              value={formState.city}
              onChange={(e) => {
                setFormState({ ...formState, city: e.target.value });
                if (fieldErrors.city) setFieldErrors((prev) => ({ ...prev, city: undefined }));
              }}
              className={`mc-form-control${fieldErrors.city ? ' border-red-500 focus:border-red-500' : ''}`}
              aria-invalid={!!fieldErrors.city}
              aria-describedby={fieldErrors.city ? 'city-error' : undefined}
              style={fieldErrors.city ? { borderColor: '#ef4444', borderWidth: 2 } : {}}
            />
            <span
              id="city-error"
              className="text-red-500 text-xs mt-1 block"
              style={{ minHeight: '18px', visibility: fieldErrors.city ? 'visible' : 'hidden' }}
            >
              {fieldErrors.city || ' '}
            </span>
          </div>
          <div className="mc-form-field-inline">
            <label htmlFor="postalCode" className="mc-form-label">{dict.postalCode}</label>
            <input
              id="postalCode"
              type="text"
              required
              ref={postalCodeRef}
              value={formState.postalCode}
              onChange={(e) => {
                setFormState({ ...formState, postalCode: e.target.value });
                if (fieldErrors.postalCode) setFieldErrors((prev) => ({ ...prev, postalCode: undefined }));
              }}
              className={`mc-form-control${fieldErrors.postalCode ? ' border-red-500 focus:border-red-500' : ''}`}
              aria-invalid={!!fieldErrors.postalCode}
              aria-describedby={fieldErrors.postalCode ? 'postalCode-error' : undefined}
              style={fieldErrors.postalCode ? { borderColor: '#ef4444', borderWidth: 2 } : {}}
            />
            <span
              id="postalCode-error"
              className="text-red-500 text-xs mt-1 block"
              style={{ minHeight: '18px', visibility: fieldErrors.postalCode ? 'visible' : 'hidden' }}
            >
              {fieldErrors.postalCode || ' '}
            </span>
          </div>
        </div>
      </div>

      <div className="mc-form-field">
        <span className="mc-form-label">{dict.services}</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {serviceEntries.map(([value, label]) => (
            <label key={value} className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="services"
                value={value}
                checked={formState.services === value}
                onChange={() => setFormState((prev) => ({ ...prev, services: value }))}
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
          accept="image/*,image/heic,image/heif,image/webp"
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
            <div key={idx} className="mc-photo-preview" style={{ width: '100%', height: '100%', position: 'relative', borderRadius: 8, border: '1px solid #ccc', overflow: 'hidden', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {photoUrls[idx] && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={photoUrls[idx]}
                alt={photo.name}
                className="mc-photo-preview-img"
                style={{ objectFit: 'cover', width: '100%', height: '100%', display: 'block' }}
              />
              )}
              <button
                type="button"
                className="mc-photo-remove-btn"
                aria-label="Supprimer l'image"
                onClick={() => {
                  setPhotos(photos.filter((_, i) => i !== idx));
                }}
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 20,
                  height: 20,
                  border: 'none',
                  background: 'rgba(255,255,255,0.7)',
                  color: '#b91c1c',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: 16,
                  cursor: 'pointer',
                  zIndex: 2,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
                }}
              >
                ×
              </button>
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
        {showPhotoOptions && (
          <div className="mc-photo-sheet" role="dialog" aria-modal="true" aria-label={dict.photosChoiceTitle}>
            <button
              type="button"
              className="mc-photo-sheet-backdrop"
              onClick={() => setShowPhotoOptions(false)}
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
                onClick={() => setShowPhotoOptions(false)}
              >
                {dict.photosOptionCancel}
              </button>
            </div>
          </div>
        )}
        <p className="text-sm text-gray-500 mt-2">{dict.photosHelp}</p>
        {photosError && <p className="text-sm text-red-600 mt-1">{photosError}</p>}
        {photos.length > 0 && (
          <div className="mc-photo-names-list" style={{ marginTop: 6 }}>
            {photos.map((photo, idx) => (
              <div key={idx} style={{ fontSize: 12, color: '#444', textAlign: 'left', wordBreak: 'break-all', marginBottom: 2 }}>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>{idx + 1}-</span> {photo.name}
              </div>
            ))}
          </div>
        )}
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

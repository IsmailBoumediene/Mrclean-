'use client';

type Props = {
  label: string;
  className?: string;
};

export default function ScrollToServicesBtn({ label, className }: Props) {
  function handleClick() {
    const el = document.getElementById('services');
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      style={{ border: 'none' }}
    >
      {label}
    </button>
  );
}

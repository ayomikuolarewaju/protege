export default function Logo({ light = false }: { light?: boolean }) {
  const main = light ? 'text-white' : 'text-ink';
  return (
    <span className="flex items-center gap-3">
      <svg width="38" height="42" viewBox="0 0 38 42" aria-hidden="true">
        <path d="M2 40V19C2 9.6 9.6 2 19 2s17 7.6 17 17v21z" fill={light ? '#fff' : '#1C2674'} />
        <path d="M10 40V20c0-5 4-9 9-9s9 4 9 9v20z" fill={light ? '#1C2674' : '#F3F5FA'} />
        <circle cx="19" cy="25" r="4" fill="#D93A52" />
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-[1.35rem] font-extrabold tracking-tight ${main}`}>Protege</span>
        <span className={`mt-1 block text-[.8rem] font-medium ${light ? 'text-white/70' : 'text-indigo'}`}>Schools</span>
      </span>
    </span>
  );
}

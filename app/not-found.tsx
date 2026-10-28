import Link from 'next/link';
export default function NotFound() {
  return <section className="container-shell grid min-h-[60vh] place-items-center py-20 text-center"><div>
    <div className="arch mx-auto h-24 w-20 bg-indigo" aria-hidden="true" />
    <h1 className="mt-8 font-display text-4xl font-extrabold">This page wandered off.</h1>
    <p className="mt-4 text-ink/70">We couldn’t find what you were looking for. Head back home and try again.</p>
    <Link href="/" className="btn btn-ink mt-8">Back to home</Link>
  </div></section>;
}

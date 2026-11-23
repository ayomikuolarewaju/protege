import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { media } from '@/lib/media';

const values = [
  { title: 'Curious by nature', text: 'We encourage children to ask questions, explore ideas, and discover how the world works.' },
  { title: 'Known and supported', text: 'A caring community where every learner is seen, encouraged, and treated with respect.' },
  { title: 'Ready for tomorrow', text: 'We nurture creativity, confidence, communication, and the courage to try something new.' },
];
const highlights = [
  { title: 'A joyful start', text: 'Welcoming classrooms and thoughtful guidance help children feel at home.' },
  { title: 'Learning that lasts', text: 'Meaningful activities connect strong foundations with real-world curiosity.' },
  { title: 'Room to flourish', text: 'We celebrate progress, individuality, and the small wins that build confidence.' },
];
const glimpses = [
  { src: '/images/gallery/computer-lab.jpg', alt: 'Pupils working on laptops in the computer lab with their teachers', h: 'h-[340px] sm:h-[420px]', pos: '50% 50%', caption: 'Computer lab' },
  { src: '/images/gallery/spelling-medals.jpg', alt: 'Pupils celebrating with medals beside the Spell Africa banner', h: 'h-[400px] sm:h-[500px]', pos: '50% 50%', caption: 'Spelling medals' },
  { src: '/images/gallery/music-lesson.jpg', alt: 'Pupils learning to play a keyboard in a music lesson', h: 'h-[340px] sm:h-[420px]', pos: '58% 50%', caption: 'Music lesson' },
];

export default function HomePage() {
  return <>
    {/* Hero */}
    <section className="adire relative text-white">
      <div className="container-shell grid items-center gap-12 pb-24 pt-14 lg:grid-cols-[1.05fr_.95fr] lg:pb-28 lg:pt-20">
        <div className="max-w-2xl">
          <h1 className="font-display text-[2.9rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-[5rem]">Big dreams begin with little steps.</h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-white/80">At Protege Schools, we nurture curious minds, kind hearts, and confident learners, one discovery at a time.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">Enquire about admission <ArrowRight size={17} /></Link>
            <Link href="/gallery" className="btn btn-line">See life at Protege</Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] pb-10 pl-10 sm:pl-16">
          <div className="rise arch overflow-hidden bg-white/10 shadow-soft">
            <img src={media.hero} alt="Protege pupils in school polos posing in front of a vibrant painted mural" width={607} height={1080} fetchPriority="high" className="h-[430px] w-full object-cover object-top sm:h-[560px]" />
          </div>
          <div className="rise rise-2 arch absolute bottom-0 left-0 w-[40%] overflow-hidden border-[6px] border-indigo bg-indigo">
            <img src={media.heroSmall} alt="Graduands in blue celebrating at the annual awards and graduation ceremony" width={960} height={1280} className="h-[190px] w-full object-cover object-[50%_30%] sm:h-[240px]" />
          </div>
          <div className="settle absolute right-[-6px] top-10 grid h-28 w-28 place-items-center rounded-full bg-hibiscus text-center font-display text-[.95rem] font-bold leading-tight shadow-soft sm:right-[-22px] sm:h-32 sm:w-32">Dream.<br />Believe.<br />Achieve.</div>
        </div>
      </div>
      <div className="arch-edge absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>

    {/* Belief */}
    <section className="section-pad">
      <div className="container-shell grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <h2 className="font-display text-3xl font-bold leading-[1.15] sm:text-[2.6rem]">Children thrive when they feel safe enough to wonder, supported enough to try, and confident enough to grow.</h2>
          <p className="mt-6 max-w-lg leading-8 text-ink/70">That is the Protege difference: more than a school, a place to become.</p>
        </div>
        <ul className="border-t border-ink/15">
          {values.map(v => (
            <li key={v.title} className="grid gap-1 border-b border-ink/15 py-7 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <h3 className="font-display text-xl font-bold text-indigo">{v.title}</h3>
              <p className="leading-7 text-ink/70">{v.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Glimpse */}
    <section className="relative overflow-hidden bg-mist pb-24 pt-20">
      <div className="adire-soft pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-shell relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl font-display text-3xl font-bold leading-tight sm:text-5xl">Every day is a chance to discover something wonderful.</h2>
          <Link href="/gallery" className="btn btn-line-dark">Visit our gallery <ArrowRight size={17} /></Link>
        </div>
        <div className="mt-14 grid grid-cols-1 items-end gap-6 sm:grid-cols-3">
          {glimpses.map(g => (
            <figure key={g.caption}>
              <div className="arch overflow-hidden bg-indigo/10"><img src={g.src} alt={g.alt} loading="lazy" style={{ objectPosition: g.pos }} className={`${g.h} w-full object-cover`} /></div>
              <figcaption className="mt-4 font-display text-lg font-semibold">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>

    {/* Video */}
    <section className="section-pad">
      <div className="container-shell grid items-center gap-12 md:grid-cols-[auto_1fr] md:gap-20">
        <div className="arch mx-auto w-full max-w-[320px] overflow-hidden bg-ink shadow-soft">
          <video src={media.lab_video} poster={media.lab_poster} controls playsInline preload="metadata" className="aspect-[9/16] w-full object-cover" aria-label="Pupils carrying out a science experiment in the laboratory" />
        </div>
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">Learning you can see, touch and try.</h2>
          <p className="mt-5 leading-8 text-ink/70">In the laboratory, pupils don’t just read about science. They pour, mix and measure for themselves, with teachers close by to guide every step.</p>
          <Link href="/gallery" className="btn btn-ink mt-8">See more moments <ArrowRight size={17} /></Link>
        </div>
      </div>
    </section>

    {/* Highlights */}
    <section className="section-pad">
      <div className="container-shell">
        <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight sm:text-5xl">Small moments. Lifelong possibilities.</h2>
        <p className="mt-5 max-w-xl leading-8 text-ink/70">From the first question to the proudest achievement, every step forward deserves to be celebrated.</p>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {highlights.map((h, i) => (
            <article key={h.title} className={`arch px-8 pb-10 pt-24 ${i === 1 ? 'bg-indigo text-white md:mt-12' : 'bg-white'}`}>
              <h3 className="font-display text-2xl font-bold">{h.title}</h3>
              <p className={`mt-3 leading-7 ${i === 1 ? 'text-white/75' : 'text-ink/70'}`}>{h.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* Call to action */}
    <section className="adire-red relative text-white">
      <div className="container-shell flex flex-col items-start gap-10 py-20 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-5xl">Your child’s next chapter could begin here.</h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-white/90">Have a question or want to learn more about Protege Schools? We’d love to hear from you.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn bg-white text-ink hover:bg-ink hover:text-white">Send an enquiry <ArrowRight size={17} /></Link>
          <a href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2340000000000').replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="btn btn-line"><MessageCircle size={17} /> WhatsApp us</a>
        </div>
      </div>
    </section>
  </>;
}

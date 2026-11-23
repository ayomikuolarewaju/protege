export default function PageHero({ title, text }: { title: string; text: string }) {
  return (
    <section className="adire relative text-white">
      <div className="container-shell pb-24 pt-16 sm:pt-20">
        <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">{text}</p>
      </div>
      <div className="arch-edge absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}

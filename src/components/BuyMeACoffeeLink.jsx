import { Coffee } from 'lucide-react';

export const BUY_ME_A_COFFEE_URL = 'https://buymeacoffee.com/maestrakandy';

const labels = {
  header: 'Apoyar a Maestra Kandy en Buy Me a Coffee',
  inline: 'Invitar un café a Maestra Kandy en Buy Me a Coffee',
  footer: 'Buy Me a Coffee de Maestra Kandy',
};

function CoffeeIcon({ className = '', size = 18 }) {
  return <Coffee className={className} size={size} aria-hidden="true" />;
}

function BuyMeACoffeeLink({ variant = 'inline', className = '' }) {
  if (variant === 'header') {
    return (
      <a
        href={BUY_ME_A_COFFEE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.header}
        className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-gold/35 bg-gold/18 px-3 py-2 text-sm font-black text-forest shadow-sm transition hover:border-forest/30 hover:bg-forest hover:text-cream focus:outline-none focus:ring-4 focus:ring-gold/35 ${className}`}
      >
        <CoffeeIcon size={16} />
        <span>Apóyame</span>
      </a>
    );
  }

  if (variant === 'footer') {
    return (
      <a
        href={BUY_ME_A_COFFEE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.footer}
        className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-earth/20 px-4 py-2 text-forest transition hover:border-forest/35 hover:bg-gold/15 focus:outline-none focus:ring-4 focus:ring-gold/35 ${className}`}
      >
        <CoffeeIcon size={16} />
        <span>Buy Me a Coffee</span>
      </a>
    );
  }

  return (
    <section className={`section-pad bg-cream ${className}`} aria-label="Apoyo solidario al proyecto">
      <div className="mx-auto max-w-5xl rounded-[1.4rem] border border-earth/15 bg-clay/55 p-5 shadow-soft sm:p-7 lg:p-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="section-kicker text-terracotta">Apoyo solidario</p>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-forest sm:text-4xl">Invitar un café al proyecto</h2>
            <p className="mt-3 max-w-3xl leading-8 text-earth">
              Este proyecto educativo se sostiene con tiempo, investigación y mucho amor por la enseñanza. Si deseas
              apoyar la creación de más recursos para maestras, maestros, estudiantes y familias, puedes invitarme un
              café.
            </p>
          </div>
          <a
            href={BUY_ME_A_COFFEE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels.inline}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-black text-cream shadow-soft transition hover:bg-ink focus:outline-none focus:ring-4 focus:ring-gold/35"
          >
            <CoffeeIcon />
            <span>Invitar un café</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default BuyMeACoffeeLink;

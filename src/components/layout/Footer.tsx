import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-content mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="font-serif text-2xl tracking-[3px]">
              品品 Café
            </Link>
            <p className="mt-4 text-[13px] text-white/60 tracking-wide">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-[13px] tracking-[1.5px] uppercase text-white/60 hover:text-warm-gold transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-[13px] tracking-[1.5px] uppercase text-white/60 hover:text-warm-gold transition-colors">
                  {t('nav.menu')}
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-[13px] tracking-[1.5px] uppercase text-white/60 hover:text-warm-gold transition-colors">
                  {t('nav.locations')}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-[13px] tracking-[1.5px] uppercase text-white/60 hover:text-warm-gold transition-colors">
                  {t('nav.news')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[13px] tracking-[1.5px] uppercase text-white/60 hover:text-warm-gold transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social */}
          <div>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/pinpin_eggcake/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-white/60 hover:text-warm-gold transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/pinpineggcake/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-white/60 hover:text-warm-gold transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-white/40 tracking-wide">
            {t('footer.rights', { year: String(year) })}
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-[11px] text-white/40 tracking-wide hover:text-white/60 transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="/terms" className="text-[11px] text-white/40 tracking-wide hover:text-white/60 transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

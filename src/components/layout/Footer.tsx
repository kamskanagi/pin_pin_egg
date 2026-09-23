import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { TextLink } from '@/components/ui/TextLink';
import { WavyDivider } from '@/components/ui/WavyDivider';
import { navItems } from './navItems';

const socialLinks = [
  { label: 'LINE', href: 'https://line.me/R/ti/p/@pinpincafe' },
  { label: 'Instagram', href: 'https://www.instagram.com/pinpin_eggcake/' },
  { label: 'Facebook', href: 'https://www.facebook.com/pinpineggcake/' },
] as const;

const linkClass =
  'text-[13px] tracking-[1.5px] uppercase text-white/60 underline-offset-8 decoration-dotted decoration-warm-gold-light/60 transition-colors hover:text-white hover:underline';

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-content mx-auto px-6 md:px-12 pt-20 pb-10">
        {/* Brand statement */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:items-end">
          <Link href="/" className="md:col-span-7 flex items-baseline gap-3">
            <span className="font-serif-tc text-5xl md:text-6xl font-light tracking-[6px]">品品</span>
            <span className="font-serif italic text-5xl md:text-6xl font-light">Café</span>
          </Link>
          <p className="md:col-span-5 font-serif italic text-2xl font-light text-warm-gold-light md:text-right">
            {t('footer.tagline')}
          </p>
        </div>

        <WavyDivider className="my-12 text-warm-gold-light/30" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-16">
          <nav aria-label={t('footer.nav_label')}>
            <p className="font-serif italic text-2xl font-light mb-5">{t('footer.explore')}</p>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className={linkClass}>
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-serif italic text-2xl font-light mb-5">{t('footer.follow')}</p>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-serif italic text-2xl font-light mb-5">{t('footer.visit')}</p>
            <p className="text-sm text-white/60 leading-relaxed mb-5">{t('footer.visit_body')}</p>
            <TextLink href="/locations" tone="light">
              {t('footer.find_store')}
            </TextLink>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dotted border-white/15 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-white/40 tracking-wide">
            {t('footer.rights', { year: String(year) })}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[11px] text-white/40 tracking-wide hover:text-white/70 transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href="/terms" className="text-[11px] text-white/40 tracking-wide hover:text-white/70 transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

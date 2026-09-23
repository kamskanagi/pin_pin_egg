import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui/PageIntro';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ContactTabs } from '@/components/contact/ContactTabs';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('page_title'),
    description: t('meta_description'),
  };
}

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <PageIntro label={t('page_label')} title={t('page_title')} intro={t('intro')} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
          {/* Form area */}
          <div className="lg:col-span-2">
            <ContactTabs />
          </div>

          {/* Sidebar */}
          <div>
            <ScrollReveal delay={0.2}>
              <div className="lg:border-l lg:border-warm-gold/20 lg:pl-10 space-y-10">
                <div>
                  <p className="font-serif italic text-2xl text-charcoal mb-4">
                    {t('social')}
                  </p>
                  <div className="space-y-2">
                    <a
                      href="https://line.me/R/ti/p/@pinpincafe"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-charcoal-muted underline decoration-dotted decoration-warm-gold/40 underline-offset-4 hover:text-warm-gold transition-colors"
                    >
                      {tCommon('follow_line')} — @pinpincafe
                    </a>
                    <a
                      href="https://www.instagram.com/pinpin_eggcake/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-charcoal-muted underline decoration-dotted decoration-warm-gold/40 underline-offset-4 hover:text-warm-gold transition-colors"
                    >
                      Instagram — @pinpin_eggcake
                    </a>
                    <a
                      href="https://www.facebook.com/pinpineggcake/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-charcoal-muted underline decoration-dotted decoration-warm-gold/40 underline-offset-4 hover:text-warm-gold transition-colors"
                    >
                      Facebook — 品品 CAFÉ
                    </a>
                  </div>
                </div>

                <div>
                  <p className="font-serif italic text-2xl text-charcoal mb-4">
                    {t('email')}
                  </p>
                  <a
                    href="mailto:hello@pinpincafe.com"
                    className="text-sm text-charcoal-muted underline decoration-dotted decoration-warm-gold/40 underline-offset-4 hover:text-warm-gold transition-colors"
                  >
                    hello@pinpincafe.com
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { ReactNode } from 'react';
import { MaskedHeading } from '@/components/ui/MaskedHeading';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface MenuPageLayoutProps {
  label: string;
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  children: ReactNode;
}

/** Menu sub-page shell: sticky intro column with image on the left, price list on the right. */
export function MenuPageLayout({ label, title, tagline, image, imageAlt, children }: MenuPageLayoutProps) {
  return (
    <div className="bg-paper pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-content mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs tracking-[4px] uppercase text-warm-gold mb-4">{label}</p>
            <MaskedHeading
              as="h1"
              text={title}
              className="font-serif italic text-4xl md:text-5xl font-light leading-[1.05] [:lang(ja)_&]:leading-[1.3] [:lang(zh-TW)_&]:leading-[1.3] mb-5"
            />
            <ScrollReveal>
              <p className="text-charcoal-muted leading-relaxed mb-8 max-w-sm">{tagline}</p>
            </ScrollReveal>
            <ParallaxImage
              src={image}
              alt={imageAlt}
              aspect="aspect-[4/5]"
              sizes="(max-width: 1024px) 100vw, 340px"
              priority
              className="rounded-sm hidden sm:block"
            />
          </div>
        </aside>

        <div className="lg:col-span-8 lg:pt-2">{children}</div>
      </div>
    </div>
  );
}

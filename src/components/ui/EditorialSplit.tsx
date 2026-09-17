import type { ReactNode } from 'react';
import { MaskedHeading } from '@/components/ui/MaskedHeading';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TextLink } from '@/components/ui/TextLink';

interface EditorialSplitProps {
  label?: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  caption?: ReactNode;
  link?: { href: string; label: string };
  headingLevel?: 'h2' | 'h3';
}

/**
 * Three-column editorial section: heading and intro on the left, a tall image in
 * the center, and a caption with a text link anchored low on the right.
 * Stacks heading → image → caption below `md`.
 */
export function EditorialSplit({
  label,
  title,
  intro,
  image,
  imageAlt,
  caption,
  link,
  headingLevel = 'h2',
}: EditorialSplitProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 py-16 md:py-24">
      <div className="md:col-span-4 md:self-center">
        {label && (
          <p className="font-serif-tc text-sm tracking-[3px] text-warm-gold mb-3">{label}</p>
        )}
        <MaskedHeading
          as={headingLevel}
          text={title}
          className="font-serif text-4xl md:text-5xl md:[:lang(ja)_&]:text-[34px] md:[:lang(zh-TW)_&]:text-[34px] font-light leading-[1.05] [:lang(ja)_&]:leading-[1.3] [:lang(zh-TW)_&]:leading-[1.3] mb-6"
        />
        <ScrollReveal>
          <p className="text-charcoal-muted leading-relaxed max-w-sm">{intro}</p>
        </ScrollReveal>
      </div>

      <div className="md:col-span-4">
        <ParallaxImage
          src={image}
          alt={imageAlt}
          aspect="aspect-[3/4]"
          sizes="(max-width: 768px) 100vw, 360px"
          className="rounded-sm"
        />
      </div>

      {(caption || link) && (
        <ScrollReveal delay={0.15} className="md:col-span-4 md:self-end">
          {caption && <div className="text-charcoal-muted leading-relaxed mb-5 max-w-xs">{caption}</div>}
          {link && <TextLink href={link.href}>{link.label}</TextLink>}
        </ScrollReveal>
      )}
    </div>
  );
}

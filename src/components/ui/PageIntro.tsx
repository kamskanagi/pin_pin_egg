import { MaskedHeading } from '@/components/ui/MaskedHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface PageIntroProps {
  label: string;
  title: string;
  intro?: string;
}

/**
 * Left-aligned editorial page header: label, italic masked title, optional
 * intro, hairline rule. Title and intro stack so the intro reads as the title's
 * lede rather than a small sentence floating off to the right.
 */
export function PageIntro({ label, title, intro }: PageIntroProps) {
  return (
    <header className="mb-14 md:mb-20">
      <p className="text-xs tracking-[4px] uppercase text-warm-gold-dark mb-4">{label}</p>
      <MaskedHeading
        as="h1"
        text={title}
        className="max-w-[18ch] [:lang(ja)_&]:max-w-none [:lang(zh-TW)_&]:max-w-none text-balance font-serif italic text-5xl md:text-7xl md:[:lang(ja)_&]:text-6xl md:[:lang(zh-TW)_&]:text-6xl font-light leading-[1.05] [:lang(ja)_&]:leading-[1.3] [:lang(zh-TW)_&]:leading-[1.3]"
      />
      {intro && (
        <ScrollReveal delay={0.15}>
          <p className="mt-6 md:mt-8 max-w-[52ch] text-lg leading-relaxed text-charcoal-light">{intro}</p>
        </ScrollReveal>
      )}
      <div className="mt-10 md:mt-14 border-t border-charcoal/10" />
    </header>
  );
}

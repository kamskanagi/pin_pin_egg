import { MaskedHeading } from '@/components/ui/MaskedHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { WavyDivider } from '@/components/ui/WavyDivider';

interface PageIntroProps {
  label: string;
  title: string;
  intro?: string;
}

/** Left-aligned editorial page header: label, italic masked title, optional intro, wavy rule. */
export function PageIntro({ label, title, intro }: PageIntroProps) {
  return (
    <header className="mb-14 md:mb-20">
      <p className="text-xs tracking-[4px] uppercase text-warm-gold mb-4">{label}</p>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 md:items-end">
        <MaskedHeading
          as="h1"
          text={title}
          className="md:col-span-7 font-serif italic text-5xl md:text-6xl font-light leading-[1.05] [:lang(ja)_&]:leading-[1.3] [:lang(zh-TW)_&]:leading-[1.3]"
        />
        {intro && (
          <ScrollReveal delay={0.15} className="md:col-span-5">
            <p className="text-charcoal-muted leading-relaxed max-w-md">{intro}</p>
          </ScrollReveal>
        )}
      </div>
      <WavyDivider className="mt-10 md:mt-14" />
    </header>
  );
}

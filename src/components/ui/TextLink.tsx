import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';

type TextLinkTone = 'dark' | 'light';

interface TextLinkProps {
  href: string;
  children: string;
  tone?: TextLinkTone;
  className?: string;
}

/** Uppercase underlined link with a nudging arrow. Absolute `http(s)` URLs open in a new tab. */
export function TextLink({ href, children, tone = 'dark', className }: TextLinkProps) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn('group inline-flex', className)}>
        <TextLinkLabel tone={tone}>{children}</TextLinkLabel>
      </a>
    );
  }

  return (
    <Link href={href} className={cn('group inline-flex', className)}>
      <TextLinkLabel tone={tone}>{children}</TextLinkLabel>
    </Link>
  );
}

interface TextLinkLabelProps {
  children: string;
  tone?: TextLinkTone;
}

/**
 * The visual label on its own, for use inside a larger clickable parent that
 * already owns the link and the `group` class (e.g. a whole row wrapped in `Link`).
 */
export function TextLinkLabel({ children, tone = 'dark' }: TextLinkLabelProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-[13px] tracking-[1.5px] uppercase underline decoration-dotted underline-offset-8 transition-colors duration-300',
        tone === 'dark'
          ? 'text-charcoal decoration-warm-gold/50 group-hover:text-warm-gold group-hover:decoration-warm-gold'
          : 'text-white decoration-warm-gold-light/60 group-hover:text-warm-gold-light group-hover:decoration-warm-gold-light'
      )}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </span>
  );
}

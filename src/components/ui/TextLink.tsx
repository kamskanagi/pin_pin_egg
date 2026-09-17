import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';

interface TextLinkProps {
  href: string;
  children: string;
  className?: string;
}

/** Uppercase underlined link with a nudging arrow. */
export function TextLink({ href, children, className }: TextLinkProps) {
  return (
    <Link href={href} className={cn('group inline-flex', className)}>
      <TextLinkLabel>{children}</TextLinkLabel>
    </Link>
  );
}

/**
 * The visual label on its own, for use inside a larger clickable parent that
 * already owns the link and the `group` class (e.g. a whole row wrapped in `Link`).
 */
export function TextLinkLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] tracking-[1.5px] uppercase text-charcoal underline decoration-dotted decoration-warm-gold/50 underline-offset-8 transition-colors duration-300 group-hover:text-warm-gold group-hover:decoration-warm-gold">
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </span>
  );
}

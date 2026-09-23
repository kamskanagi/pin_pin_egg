export const navItems = [
  { href: '/about', key: 'about' },
  { href: '/menu', key: 'menu' },
  { href: '/locations', key: 'locations' },
  { href: '/news', key: 'news' },
  { href: '/contact', key: 'contact' },
] as const;

/** Whether `href` is the current section, given a locale-less pathname. */
export function isActiveHref(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

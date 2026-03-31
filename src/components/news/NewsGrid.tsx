'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { NewsCard } from './NewsCard';
import type { PlaceholderNewsPost } from '@/lib/placeholder-data';

interface NewsGridProps {
  posts: PlaceholderNewsPost[];
}

export function NewsGrid({ posts }: NewsGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-charcoal-muted">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post, i) => (
        <ScrollReveal key={post.slug} delay={i * 0.1}>
          <NewsCard post={post} />
        </ScrollReveal>
      ))}
    </div>
  );
}

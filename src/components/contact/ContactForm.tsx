'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { contactSchema, type ContactFormData } from '@/lib/schemas/contact';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Zod messages are keys under contact.errors (see src/lib/schemas/contact.ts)
  const tError = (key?: string) => (key ? t(`errors.${key}`) : '');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'general', ...data }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-accent-matcha/10 p-8 text-center">
        <p className="text-accent-matcha font-medium">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
          {t('name')}
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={cn(
            'w-full rounded-sm border bg-white px-4 py-3 text-sm outline-none transition-colors',
            errors.name ? 'border-accent-coral' : 'border-charcoal/15 focus:border-warm-gold'
          )}
        />
        {errors.name && <p className="mt-1 text-xs text-accent-coral">{tError(errors.name.message)}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
          {t('email')}
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={cn(
            'w-full rounded-sm border bg-white px-4 py-3 text-sm outline-none transition-colors',
            errors.email ? 'border-accent-coral' : 'border-charcoal/15 focus:border-warm-gold'
          )}
        />
        {errors.email && <p className="mt-1 text-xs text-accent-coral">{tError(errors.email.message)}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-2">
          {t('subject')}
        </label>
        <input
          id="subject"
          type="text"
          {...register('subject')}
          className={cn(
            'w-full rounded-sm border bg-white px-4 py-3 text-sm outline-none transition-colors',
            errors.subject ? 'border-accent-coral' : 'border-charcoal/15 focus:border-warm-gold'
          )}
        />
        {errors.subject && <p className="mt-1 text-xs text-accent-coral">{tError(errors.subject.message)}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
          {t('message')}
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className={cn(
            'w-full rounded-sm border bg-white px-4 py-3 text-sm outline-none transition-colors resize-y',
            errors.message ? 'border-accent-coral' : 'border-charcoal/15 focus:border-warm-gold'
          )}
        />
        {errors.message && <p className="mt-1 text-xs text-accent-coral">{tError(errors.message.message)}</p>}
      </div>

      {status === 'error' && (
        <p className="text-sm text-accent-coral">{t('error')}</p>
      )}

      <Button type="submit" variant="solid" disabled={status === 'submitting'}>
        {status === 'submitting' ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { franchiseSchema, type FranchiseFormData } from '@/lib/schemas/contact';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function FranchiseForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FranchiseFormData>({
    resolver: zodResolver(franchiseSchema),
  });

  const onSubmit = async (data: FranchiseFormData) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'franchise', ...data }),
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

  const inputClass = (hasError: boolean) =>
    cn(
      'w-full rounded-sm border bg-white px-4 py-3 text-sm outline-none transition-colors',
      hasError ? 'border-accent-coral' : 'border-charcoal/15 focus:border-warm-gold'
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-charcoal mb-2">
            {t('company')}
          </label>
          <input id="companyName" type="text" {...register('companyName')} className={inputClass(!!errors.companyName)} />
          {errors.companyName && <p className="mt-1 text-xs text-accent-coral">{errors.companyName.message}</p>}
        </div>

        <div>
          <label htmlFor="contactPerson" className="block text-sm font-medium text-charcoal mb-2">
            {t('name')}
          </label>
          <input id="contactPerson" type="text" {...register('contactPerson')} className={inputClass(!!errors.contactPerson)} />
          {errors.contactPerson && <p className="mt-1 text-xs text-accent-coral">{errors.contactPerson.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="franchise-email" className="block text-sm font-medium text-charcoal mb-2">
            {t('email')}
          </label>
          <input id="franchise-email" type="email" {...register('email')} className={inputClass(!!errors.email)} />
          {errors.email && <p className="mt-1 text-xs text-accent-coral">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
            {t('phone')}
          </label>
          <input id="phone" type="tel" {...register('phone')} className={inputClass(!!errors.phone)} />
          {errors.phone && <p className="mt-1 text-xs text-accent-coral">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-charcoal mb-2">
            {t('country')}
          </label>
          <input id="country" type="text" {...register('country')} className={inputClass(!!errors.country)} />
          {errors.country && <p className="mt-1 text-xs text-accent-coral">{errors.country.message}</p>}
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-charcoal mb-2">
            {t('budget')}
          </label>
          <input id="budget" type="text" {...register('budget')} className={inputClass(false)} />
        </div>
      </div>

      <div>
        <label htmlFor="franchise-message" className="block text-sm font-medium text-charcoal mb-2">
          {t('message')}
        </label>
        <textarea
          id="franchise-message"
          rows={5}
          {...register('message')}
          className={cn(inputClass(!!errors.message), 'resize-y')}
        />
        {errors.message && <p className="mt-1 text-xs text-accent-coral">{errors.message.message}</p>}
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

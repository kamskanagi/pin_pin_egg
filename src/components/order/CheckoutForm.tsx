'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/lib/i18n/navigation';
import { checkoutSchema, type CheckoutFormData } from '@/lib/schemas/order';
import { Button } from '@/components/ui/Button';
import { cn, formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/order/CartContext';

const einvoiceOptions = [
  { key: 'donate', labelKey: 'einvoice_donate' },
  { key: 'mobile_carrier', labelKey: 'einvoice_mobile_carrier' },
  { key: 'business', labelKey: 'einvoice_business' },
] as const;

export function CheckoutForm() {
  const t = useTranslations('order');
  const router = useRouter();
  const { storeId, slot, items, totalTwd } = useCart();
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { einvoiceType: 'donate' },
  });

  const einvoiceType = watch('einvoiceType');
  const tError = (key?: string) => (key ? t(`errors.${key}`) : '');

  const onSubmit = async (data: CheckoutFormData) => {
    setSubmitError(false);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeId, slot, items, customer: data }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error ?? 'order_failed');
      // Cart clears on the confirmation page once the order is confirmed loaded —
      // clearing here would empty the cart while still mounted on /order/checkout,
      // which re-triggers this page's own empty-cart redirect and races the navigation.
      router.push(`/order/${body.token}`);
    } catch {
      setSubmitError(true);
    }
  };

  const inputClass = (hasError: boolean) =>
    cn(
      'w-full rounded-sm border bg-white px-4 py-3 text-sm outline-none transition-colors',
      hasError ? 'border-accent-coral' : 'border-charcoal/15 focus:border-warm-gold'
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <label htmlFor="checkout-name" className="block text-sm font-medium text-charcoal mb-2">
          {t('name')}
        </label>
        <input id="checkout-name" type="text" {...register('name')} className={inputClass(!!errors.name)} />
        {errors.name && <p className="mt-1 text-xs text-accent-coral">{tError(errors.name.message)}</p>}
      </div>

      <div>
        <label htmlFor="checkout-phone" className="block text-sm font-medium text-charcoal mb-2">
          {t('phone')}
        </label>
        <input
          id="checkout-phone"
          type="tel"
          placeholder="09XXXXXXXX"
          {...register('phone')}
          className={inputClass(!!errors.phone)}
        />
        {errors.phone && <p className="mt-1 text-xs text-accent-coral">{tError(errors.phone.message)}</p>}
      </div>

      <div>
        <p className="block text-sm font-medium text-charcoal mb-2">{t('einvoice_label')}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {einvoiceOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setValue('einvoiceType', opt.key, { shouldValidate: true })}
              className={cn(
                'rounded-sm px-4 py-2 text-[13px] transition-all duration-300 border',
                einvoiceType === opt.key
                  ? 'bg-charcoal text-white border-charcoal'
                  : 'text-charcoal-muted border-charcoal/10 hover:border-charcoal/30'
              )}
            >
              {t(opt.labelKey)}
            </button>
          ))}
        </div>
        {einvoiceType !== 'donate' && (
          <input
            type="text"
            placeholder={
              einvoiceType === 'mobile_carrier'
                ? t('einvoice_carrier_placeholder')
                : t('einvoice_business_placeholder')
            }
            {...register('einvoiceValue')}
            className={inputClass(!!errors.einvoiceValue)}
          />
        )}
        {errors.einvoiceValue && (
          <p className="mt-1 text-xs text-accent-coral">{tError(errors.einvoiceValue.message)}</p>
        )}
      </div>

      <div className="rounded-sm bg-cream-dark/60 p-4">
        <p className="text-xs font-medium tracking-[2px] uppercase text-charcoal-light mb-1">
          {t('payment_method_label')}
        </p>
        <p className="text-sm text-charcoal-muted">{t('payment_note')}</p>
      </div>

      {submitError && <p className="text-sm text-accent-coral">{t('order_error')}</p>}

      <Button type="submit" variant="gold" disabled={isSubmitting} className="text-center">
        {isSubmitting ? t('submitting_order') : `${t('submit_order')} · ${formatPrice(totalTwd)}`}
      </Button>
    </form>
  );
}

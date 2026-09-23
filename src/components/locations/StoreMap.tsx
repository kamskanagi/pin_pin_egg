'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { PlaceholderStore } from '@/lib/placeholder-data';
import { colors } from '@/lib/theme';

interface StoreMapProps {
  stores: PlaceholderStore[];
  activeCountry: string;
}

export function StoreMap({ stores, activeCountry }: StoreMapProps) {
  const t = useTranslations('locations');
  const tCommon = useTranslations('common');
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const filteredStores = activeCountry === 'all'
    ? stores
    : stores.filter((s) => s.country === activeCountry);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey || !mapRef.current) {
      setMapError(true);
      return;
    }

    async function initMap() {
      try {
        const { Loader } = await import('@googlemaps/js-api-loader');
        const loader = new Loader({
          apiKey: apiKey!,
          version: 'weekly',
        });

        const mapsLib = await loader.importLibrary('maps');
        const markerLib = await loader.importLibrary('marker');

        const bounds = new mapsLib.LatLngBounds();
        filteredStores.forEach((s) => bounds.extend({ lat: s.lat, lng: s.lng }));

        const map = new mapsLib.Map(mapRef.current!, {
          center: bounds.getCenter(),
          zoom: 6,
          styles: [
            { featureType: 'all', elementType: 'labels.text.fill', stylers: [{ color: colors.charcoal.muted }] },
            { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: colors['warm-gold'].light }] },
            { featureType: 'landscape', elementType: 'geometry.fill', stylers: [{ color: colors.cream.DEFAULT }] },
          ],
          disableDefaultUI: true,
          zoomControl: true,
        });

        map.fitBounds(bounds, 60);

        filteredStores.forEach((store) => {
          const pin = document.createElement('div');
          pin.style.width = '16px';
          pin.style.height = '16px';
          pin.style.borderRadius = '50%';
          pin.style.backgroundColor = colors['warm-gold'].DEFAULT;
          pin.style.border = '3px solid white';
          pin.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';

          new (markerLib as { AdvancedMarkerElement: new (opts: Record<string, unknown>) => unknown }).AdvancedMarkerElement({
            map,
            position: { lat: store.lat, lng: store.lng },
            title: store.nameEn,
            content: pin,
          });
        });

        setMapLoaded(true);
      } catch {
        setMapError(true);
      }
    }

    initMap();
  }, [filteredStores]);

  if (mapError) {
    // Graceful fallback without API key
    return (
      <div className="aspect-[21/9] rounded-sm bg-cream-dark flex items-center justify-center mb-12">
        <div className="text-center">
          <span className="font-serif-tc text-4xl text-charcoal-muted/20 block mb-2">📍</span>
          <p className="text-sm text-charcoal-muted">
            {t('map_store_count', { count: filteredStores.length })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-12">
      <div
        ref={mapRef}
        className="aspect-[21/9] rounded-sm overflow-hidden bg-cream-dark"
      />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center rounded-sm bg-cream-dark">
          <span className="text-sm text-charcoal-muted animate-pulse">{tCommon('loading')}</span>
        </div>
      )}
    </div>
  );
}

'use client';

import dynamic from 'next/dynamic';
import { AcquereurPublic } from '@/lib/types';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-200 rounded-lg flex items-center justify-center w-full h-full min-h-[400px]">
      <p className="text-gray-600">Chargement de la carte...</p>
    </div>
  )
});

interface MapWrapperProps {
  acquereurs: AcquereurPublic[];
  compact?: boolean;
}

export default function MapWrapper({ acquereurs, compact = false }: MapWrapperProps) {
  return <MapComponent acquereurs={acquereurs} compact={compact} />;
}

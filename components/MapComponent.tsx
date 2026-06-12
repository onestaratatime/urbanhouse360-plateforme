'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AcquereurPublic, TIMING_COLORS, TYPE_PROJET_LABELS, TIMING_LABELS, TYPE_BIEN_LABELS } from '@/lib/types';
import { getQuartierBySlug, getJitteredCoords } from '@/lib/quartiers';

// Fix pour les icônes Leaflet avec Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  acquereurs: AcquereurPublic[];
  compact?: boolean;
}

// Fonction pour créer une icône moderne style Google Maps
function createPersonIcon(color: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 48" fill="none" width="45" height="60">
      <defs>
        <filter id="shadow-${color}" x="-4" y="-4" width="44" height="56">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity="0.4"/>
        </filter>
      </defs>

      <!-- Pin principal avec gradient -->
      <g filter="url(#shadow-${color})">
        <path d="M18 0C8.1 0 0 8.1 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.1 27.9 0 18 0z"
              fill="${color}"/>
        <path d="M18 2C9.2 2 2 9.2 2 18c0 12 16 27 16 27s16-15 16-27C34 9.2 26.8 2 18 2z"
              fill="url(#grad-${color})"/>
      </g>

      <!-- Cercle blanc intérieur plus grand -->
      <circle cx="18" cy="18" r="12" fill="white" opacity="0.98"/>

      <!-- Icône maison moderne -->
      <g transform="translate(18, 18)">
        <path d="M-6 -3L0 -7L6 -3V5H-6V-3Z" fill="${color}" opacity="0.9"/>
        <rect x="-2" y="0" width="4" height="5" fill="${color}"/>
        <rect x="-5" y="-1" width="2.5" height="2.5" fill="white" opacity="0.7"/>
        <rect x="2.5" y="-1" width="2.5" height="2.5" fill="white" opacity="0.7"/>
      </g>

      <defs>
        <linearGradient id="grad-${color}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.85" />
        </linearGradient>
      </defs>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: 'custom-marker-modern',
    iconSize: [45, 60],
    iconAnchor: [22.5, 60],
    popupAnchor: [0, -60],
  });
}

export default function MapComponent({ acquereurs, compact = false }: MapComponentProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`bg-warm-200 rounded-lg flex items-center justify-center ${compact ? 'h-96' : 'h-screen'}`}>
        <p className="text-warm-800">Chargement de la carte...</p>
      </div>
    );
  }

  // Centre de Toulouse
  const center: [number, number] = [43.6045, 1.4442];

  // Générer tous les marqueurs (un par quartier pour chaque acquéreur)
  const markers = acquereurs.flatMap(acquereur =>
    acquereur.quartiers.map(quartierSlug => {
      const quartier = getQuartierBySlug(quartierSlug);
      if (!quartier) return null;

      const coords = getJitteredCoords(quartier.coords, acquereur.id + quartierSlug);
      const color = TIMING_COLORS[acquereur.timing];

      return {
        id: `${acquereur.id}-${quartierSlug}`,
        coords,
        color,
        acquereur,
        quartier
      };
    }).filter(Boolean)
  );

  return (
    <div className={`relative ${compact ? 'h-96' : 'h-screen'} w-full rounded-lg overflow-hidden`}>
      <MapContainer
        center={center}
        zoom={compact ? 11 : 12}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={!compact}
        zoomControl={!compact}
      >
        {/* Style moderne similaire à Google Maps avec CartoDB Positron */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />

        {markers.map(marker => marker && (
          <Marker
            key={marker.id}
            position={marker.coords}
            icon={createPersonIcon(marker.color)}
          >
            <Popup maxWidth={300} className="custom-popup">
              <div className="p-1">
                <h3 className="font-bold text-lg mb-3 text-gray-900 border-b border-warm-200 pb-2">
                  Acquéreur potentiel
                </h3>

                <div className="space-y-2 text-sm"  style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <div>
                    <span className="font-semibold">Quartier :</span> {marker.quartier.nom}
                  </div>

                  <div>
                    <span className="font-semibold">Type de projet :</span><br />
                    {TYPE_PROJET_LABELS[marker.acquereur.type_projet]}
                  </div>

                  <div>
                    <span className="font-semibold">Timing :</span><br />
                    <span style={{ color: marker.color }}>
                      {TIMING_LABELS[marker.acquereur.timing]}
                    </span>
                  </div>

                  <div>
                    <span className="font-semibold">Type de bien :</span><br />
                    {marker.acquereur.types_bien.map(t => TYPE_BIEN_LABELS[t]).join(', ')}
                  </div>

                  {marker.acquereur.surface_min && (
                    <div>
                      <span className="font-semibold">Surface min :</span> {marker.acquereur.surface_min} m²
                    </div>
                  )}

                  {marker.acquereur.pieces_min && (
                    <div>
                      <span className="font-semibold">Pièces min :</span> T{marker.acquereur.pieces_min}
                    </div>
                  )}

                  {marker.acquereur.budget_max && (
                    <div>
                      <span className="font-semibold">Budget max :</span> {marker.acquereur.budget_max.toLocaleString('fr-FR')} €
                    </div>
                  )}

                  {marker.acquereur.criteres_indispensables && marker.acquereur.criteres_indispensables.length > 0 && (
                    <div>
                      <span className="font-semibold">Critères indispensables :</span><br />
                      {marker.acquereur.criteres_indispensables.join(', ')}
                      {marker.acquereur.criteres_indispensables_autre && `, ${marker.acquereur.criteres_indispensables_autre}`}
                    </div>
                  )}

                  {marker.acquereur.criteres_secondaires && (
                    <div>
                      <span className="font-semibold">Critères secondaires :</span><br />
                      {marker.acquereur.criteres_secondaires}
                    </div>
                  )}

                  {marker.acquereur.description_projet && (
                    <div>
                      <span className="font-semibold">Description du projet :</span><br />
                      {marker.acquereur.description_projet}
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Légende moderne */}
      <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-xl p-4 z-[1000] border border-warm-200 backdrop-blur-sm bg-opacity-95">
        <h4 className="font-bold mb-3 text-sm text-gray-900 border-b border-warm-200 pb-2">Timing du projet</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: TIMING_COLORS.court_terme }} />
            <span className="text-warm-900">Court terme (&lt; 6 mois)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: TIMING_COLORS.moyen_terme }} />
            <span className="text-warm-900">Moyen terme (6-18 mois)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: TIMING_COLORS.long_terme }} />
            <span className="text-warm-900">Long terme (&gt; 18 mois)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

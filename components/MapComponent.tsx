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

// Fonction pour créer une icône de personne avec couleur moderne
function createPersonIcon(color: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" fill="none" width="40" height="52">
      <!-- Pin moderne avec ombre -->
      <g filter="url(#shadow)">
        <path d="M16 0C7.2 0 0 7.2 0 16c0 8.8 16 26 16 26s16-17.2 16-26C32 7.2 24.8 0 16 0z"
              fill="${color}"/>
      </g>
      <!-- Cercle intérieur blanc -->
      <circle cx="16" cy="16" r="11" fill="white" opacity="0.95"/>
      <!-- Icône de personne -->
      <path d="M16 11c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm0 10c2 0 6 1 6 3v1H10v-1c0-2 4-3 6-3z"
            fill="${color}"/>
      <defs>
        <filter id="shadow" x="-2" y="-2" width="36" height="46">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
        </filter>
      </defs>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: 'custom-marker-modern',
    iconSize: [40, 52],
    iconAnchor: [20, 52],
    popupAnchor: [0, -52],
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

'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AcquereurPublic, TIMING_COLORS, TYPE_PROJET_LABELS, TIMING_LABELS, TYPE_BIEN_LABELS, PROFIL_EMOJIS, PROFIL_LABELS } from '@/lib/types';
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

// Fonction pour obtenir l'emoji du profil choisi par l'acquéreur
function getProfileEmoji(acquereur: AcquereurPublic): string {
  return PROFIL_EMOJIS[acquereur.profil];
}

// Fonction pour créer une icône avec emoji
function createPersonIcon(color: string, emoji: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 52" fill="none" width="40" height="52">
      <defs>
        <filter id="shadow-${color.replace('#', '')}" x="-4" y="-4" width="48" height="60">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity="0.3"/>
        </filter>
      </defs>

      <!-- Pin moderne arrondi -->
      <g filter="url(#shadow-${color.replace('#', '')})">
        <path d="M20 0C11.7 0 5 6.7 5 15c0 11.25 15 30 15 30s15-18.75 15-30C35 6.7 28.3 0 20 0z"
              fill="${color}"/>
        <circle cx="20" cy="15" r="11" fill="white" opacity="0.95"/>
      </g>

      <!-- Emoji au centre -->
      <text x="20" y="19" text-anchor="middle" font-size="14" fill="black">${emoji}</text>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: 'custom-marker-person',
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
      const emoji = getProfileEmoji(acquereur);

      return {
        id: `${acquereur.id}-${quartierSlug}`,
        coords,
        color,
        emoji,
        acquereur,
        quartier
      };
    }).filter(Boolean)
  );

  return (
    <div className={`relative ${compact ? 'h-96' : 'h-screen'} w-full rounded-lg overflow-hidden`}>
      <MapContainer
        center={center}
        zoom={compact ? 11 : 13}
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
            icon={createPersonIcon(marker.color, marker.emoji)}
          >
            <Popup maxWidth={300} className="custom-popup">
              <div className="p-1">
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  Acquéreur potentiel
                </h3>

                {/* Phrase d'accroche humaine en premier */}
                {marker.acquereur.phrase_accroche && (
                  <div className="mb-3 p-2 bg-olive-50 rounded-lg border-l-4 border-olive-500">
                    <p className="text-sm italic text-olive-800 font-medium">
                      "{marker.acquereur.phrase_accroche}"
                    </p>
                  </div>
                )}

                <div className="space-y-2 text-sm border-t border-warm-200 pt-2"  style={{ maxHeight: '300px', overflowY: 'auto' }}>
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

                  {marker.acquereur.criteres_principaux && marker.acquereur.criteres_principaux.length > 0 && (
                    <div>
                      <span className="font-semibold">Critères indispensables :</span><br />
                      {marker.acquereur.criteres_principaux.join(', ')}
                      {marker.acquereur.criteres_principaux_autre && `, ${marker.acquereur.criteres_principaux_autre}`}
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
      <div className="absolute bottom-20 right-4 bg-white rounded-xl shadow-xl p-4 z-[1000] border border-warm-200 backdrop-blur-sm bg-opacity-95 max-w-xs">
        <h4 className="font-bold mb-3 text-sm text-gray-900 border-b border-warm-200 pb-2">Carte des recherches immobilières</h4>

        {/* Profils */}
        <div className="mb-4">
          <h5 className="font-semibold text-xs text-gray-700 mb-2">Profils</h5>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base">{PROFIL_EMOJIS.individuel}</span>
              <span className="text-warm-900">{PROFIL_LABELS.individuel}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base">{PROFIL_EMOJIS.couple}</span>
              <span className="text-warm-900">{PROFIL_LABELS.couple}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base">{PROFIL_EMOJIS.famille}</span>
              <span className="text-warm-900">{PROFIL_LABELS.famille}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base">{PROFIL_EMOJIS.investisseur}</span>
              <span className="text-warm-900">{PROFIL_LABELS.investisseur}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base">{PROFIL_EMOJIS.residence_secondaire}</span>
              <span className="text-warm-900">{PROFIL_LABELS.residence_secondaire}</span>
            </div>
          </div>
        </div>

        {/* Timing */}
        <div>
          <h5 className="font-semibold text-xs text-gray-700 mb-2">Timing</h5>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: TIMING_COLORS.court_terme }} />
              <span className="text-warm-900">Immédiat</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: TIMING_COLORS.moyen_terme }} />
              <span className="text-warm-900">6-12 mois</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: TIMING_COLORS.long_terme }} />
              <span className="text-warm-900">1 an+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { TOUTES_LOCALISATIONS, Quartier } from '@/lib/quartiers';

interface LocalisationSelectorProps {
  selectedLocalisations: string[];
  onChange: (localisations: string[]) => void;
  autreLocalisation?: string;
  onAutreLocalisationChange?: (value: string) => void;
}

export default function LocalisationSelector({
  selectedLocalisations,
  onChange,
  autreLocalisation = '',
  onAutreLocalisationChange
}: LocalisationSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les localisations selon le terme de recherche
  const filteredLocalisations = useMemo(() => {
    if (!searchTerm) return TOUTES_LOCALISATIONS;

    const term = searchTerm.toLowerCase();
    return TOUTES_LOCALISATIONS.filter(loc =>
      loc.nom.toLowerCase().includes(term) ||
      loc.secteur.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Grouper par secteur
  const groupedLocalisations = useMemo(() => {
    const grouped: Record<string, Quartier[]> = {};

    filteredLocalisations.forEach(loc => {
      if (!grouped[loc.secteur]) {
        grouped[loc.secteur] = [];
      }
      grouped[loc.secteur].push(loc);
    });

    return grouped;
  }, [filteredLocalisations]);

  const toggleLocalisation = (slug: string) => {
    if (selectedLocalisations.includes(slug)) {
      onChange(selectedLocalisations.filter(s => s !== slug));
    } else {
      onChange([...selectedLocalisations, slug]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section 1: Recherche rapide */}
      <div className="bg-olive-50 border border-olive-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-olive-800 mb-2 flex items-center gap-2">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Recherche rapide
        </h3>
        <p className="text-xs text-olive-700 mb-3">
          Tapez pour trouver rapidement un quartier ou une ville
        </p>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ex: Capitole, Blagnac, Saint-Cyprien..."
            className="w-full px-4 py-3 border-2 border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 pl-10 bg-white"
          />
          <svg className="absolute left-3 top-3.5 h-5 w-5 text-olive-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Sélections actuelles - toujours visible */}
      <div className="bg-white border-2 border-olive-400 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-olive-800 mb-2">
          {selectedLocalisations.length > 0
            ? `${selectedLocalisations.length} localisation${selectedLocalisations.length > 1 ? 's' : ''} sélectionnée${selectedLocalisations.length > 1 ? 's' : ''}`
            : 'Aucune localisation sélectionnée'
          }
        </h4>
        {selectedLocalisations.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedLocalisations.map(slug => {
              const loc = TOUTES_LOCALISATIONS.find(l => l.slug === slug);
              if (!loc) return null;

              return (
                <span
                  key={slug}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-olive-100 text-olive-800 rounded-full text-sm font-medium border border-olive-300"
                >
                  {loc.nom}
                  <button
                    type="button"
                    onClick={() => toggleLocalisation(slug)}
                    className="hover:text-olive-900 ml-1"
                    aria-label={`Retirer ${loc.nom}`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">
            Utilisez la recherche ci-dessus ou la liste ci-dessous pour ajouter des localisations
          </p>
        )}
      </div>

      {/* Section 2: Sélection avancée */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <svg className="h-5 w-5 text-olive-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <h3 className="text-sm font-semibold text-gray-800">
            Ou sélectionnez dans la liste complète
          </h3>
        </div>
        <p className="text-xs text-gray-600 mb-3">
          Parcourez toutes les localisations disponibles par secteur
        </p>

        <div className="max-h-80 overflow-y-auto border-2 border-gray-200 rounded-lg bg-white">
          {Object.entries(groupedLocalisations).map(([secteur, localisations]) => (
            <div key={secteur} className="border-b border-gray-100 last:border-b-0">
              <div className="bg-gray-50 px-4 py-2.5 font-semibold text-sm text-gray-700 sticky top-0 border-b border-gray-200">
                {secteur}
              </div>
              <div className="p-2">
                {localisations.map(loc => (
                  <label
                    key={loc.slug}
                    className="flex items-center gap-3 p-2.5 hover:bg-olive-50 rounded cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedLocalisations.includes(loc.slug)}
                      onChange={() => toggleLocalisation(loc.slug)}
                      className="w-4 h-4 text-olive-600 rounded focus:ring-2 focus:ring-olive-500"
                    />
                    <span className="text-sm text-gray-900">{loc.nom}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {filteredLocalisations.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Aucune localisation trouvée pour "{searchTerm}"
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Autre localisation */}
      {onAutreLocalisationChange && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Localisation non listée ?
          </h3>
          <p className="text-xs text-gray-600 mb-3">
            Si votre commune n'apparaît pas dans la liste, tapez-la ici
          </p>
          <input
            type="text"
            value={autreLocalisation}
            onChange={(e) => onAutreLocalisationChange(e.target.value)}
            placeholder="Ex: Saint-Jory, Montastruc, Verfeil..."
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 bg-white"
          />
        </div>
      )}
    </div>
  );
}

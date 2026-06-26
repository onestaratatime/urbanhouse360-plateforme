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
    <div className="space-y-4">
      {/* Barre de recherche */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un quartier ou une ville..."
          className="w-full px-4 py-3 border border-warm-300 rounded-lg focus:ring-2 focus:ring-brick-500 focus:border-transparent pl-10"
        />
        <svg className="absolute left-3 top-3.5 h-5 w-5 text-warm-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Sélections actuelles */}
      {selectedLocalisations.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedLocalisations.map(slug => {
            const loc = TOUTES_LOCALISATIONS.find(l => l.slug === slug);
            if (!loc) return null;

            return (
              <span
                key={slug}
                className="inline-flex items-center gap-1 px-3 py-1 bg-brick-100 text-brick-700 rounded-full text-sm"
              >
                {loc.nom}
                <button
                  type="button"
                  onClick={() => toggleLocalisation(slug)}
                  className="hover:text-brick-900"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Liste des localisations par secteur */}
      <div className="max-h-96 overflow-y-auto border border-warm-200 rounded-lg">
        {Object.entries(groupedLocalisations).map(([secteur, localisations]) => (
          <div key={secteur} className="border-b border-warm-100 last:border-b-0">
            <div className="bg-warm-50 px-4 py-2 font-semibold text-sm text-warm-800 sticky top-0">
              {secteur}
            </div>
            <div className="p-2">
              {localisations.map(loc => (
                <label
                  key={loc.slug}
                  className="flex items-center gap-3 p-2 hover:bg-warm-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedLocalisations.includes(loc.slug)}
                    onChange={() => toggleLocalisation(loc.slug)}
                    className="w-4 h-4 text-brick-600 rounded focus:ring-2 focus:ring-brick-500"
                  />
                  <span className="text-sm text-gray-900">{loc.nom}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {filteredLocalisations.length === 0 && (
          <div className="p-8 text-center text-warm-600">
            Aucune localisation trouvée pour "{searchTerm}"
          </div>
        )}
      </div>

      {/* Champ "Autre localisation" */}
      {onAutreLocalisationChange && (
        <div className="pt-4 border-t border-warm-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Autre localisation (si non trouvée dans la liste)
          </label>
          <input
            type="text"
            value={autreLocalisation}
            onChange={(e) => onAutreLocalisationChange(e.target.value)}
            placeholder="Ex: Saint-Jory, Montastruc, etc."
            className="w-full px-4 py-2 border border-warm-300 rounded-lg focus:ring-2 focus:ring-brick-500 focus:border-transparent"
          />
          <p className="mt-1 text-xs text-warm-600">
            💡 Tapez le nom de votre commune si elle n'apparaît pas dans la liste
          </p>
        </div>
      )}

      {/* Aide */}
      <p className="text-xs text-warm-600">
        💡 Vous pouvez sélectionner plusieurs quartiers et villes
      </p>
    </div>
  );
}

'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openSecteurs, setOpenSecteurs] = useState<Record<string, boolean>>({});
  const searchRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown de suggestions au clic extérieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Suggestions de recherche (autocomplete) — limitées pour ne pas noyer l'utilisateur
  const suggestions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];
    return TOUTES_LOCALISATIONS
      .filter(loc =>
        loc.nom.toLowerCase().includes(term) ||
        loc.secteur.toLowerCase().includes(term)
      )
      .slice(0, 8);
  }, [searchTerm]);

  // Grouper toutes les localisations par secteur (pour l'accordéon)
  const secteurs = useMemo(() => {
    const grouped: Record<string, Quartier[]> = {};
    TOUTES_LOCALISATIONS.forEach(loc => {
      if (!grouped[loc.secteur]) grouped[loc.secteur] = [];
      grouped[loc.secteur].push(loc);
    });
    return grouped;
  }, []);

  const toggleLocalisation = (slug: string) => {
    if (selectedLocalisations.includes(slug)) {
      onChange(selectedLocalisations.filter(s => s !== slug));
    } else {
      onChange([...selectedLocalisations, slug]);
    }
  };

  const addLocalisation = (slug: string) => {
    if (!selectedLocalisations.includes(slug)) {
      onChange([...selectedLocalisations, slug]);
    }
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const toggleSecteur = (secteur: string) => {
    setOpenSecteurs(prev => ({ ...prev, [secteur]: !prev[secteur] }));
  };

  // Nombre de sélections par secteur (pour le badge)
  const countInSecteur = (localisations: Quartier[]) =>
    localisations.filter(l => selectedLocalisations.includes(l.slug)).length;

  const allSelectedInSecteur = (localisations: Quartier[]) =>
    localisations.every(l => selectedLocalisations.includes(l.slug));

  const toggleAllSecteur = (localisations: Quartier[]) => {
    const slugs = localisations.map(l => l.slug);
    if (allSelectedInSecteur(localisations)) {
      // Tout décocher dans ce secteur
      onChange(selectedLocalisations.filter(s => !slugs.includes(s)));
    } else {
      // Tout cocher dans ce secteur
      const merged = new Set([...selectedLocalisations, ...slugs]);
      onChange(Array.from(merged));
    }
  };

  return (
    <div className="space-y-4">
      {/* Barre de recherche avec autocomplete */}
      <div className="relative" ref={searchRef}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Tapez le nom d'un quartier ou d'une ville…"
          className="w-full px-4 py-3 border-2 border-olive-400 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 pl-10 text-base"
        />
        <svg className="absolute left-3 top-3.5 h-5 w-5 text-olive-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        {/* Dropdown de suggestions */}
        {showSuggestions && searchTerm.trim() && (
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto">
            {suggestions.length > 0 ? (
              suggestions.map(loc => {
                const isSelected = selectedLocalisations.includes(loc.slug);
                return (
                  <button
                    key={loc.slug}
                    type="button"
                    onClick={() => addLocalisation(loc.slug)}
                    className={`flex items-center justify-between w-full px-4 py-2.5 text-left hover:bg-olive-50 ${
                      isSelected ? 'bg-olive-50' : ''
                    }`}
                  >
                    <span className="text-sm text-gray-900">
                      {loc.nom}
                      <span className="text-gray-400 ml-2">· {loc.secteur}</span>
                    </span>
                    {isSelected ? (
                      <span className="text-xs text-olive-700 font-medium">✓ ajouté</span>
                    ) : (
                      <span className="text-olive-600 text-lg leading-none">+</span>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500">
                Aucun résultat. Utilisez « Autre localisation » plus bas.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sélections actuelles */}
      {selectedLocalisations.length > 0 && (
        <div className="bg-olive-50 border border-olive-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-olive-800">
              {selectedLocalisations.length} zone{selectedLocalisations.length > 1 ? 's' : ''} sélectionnée{selectedLocalisations.length > 1 ? 's' : ''}
            </span>
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-xs text-olive-700 hover:text-olive-900 underline"
            >
              Tout effacer
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedLocalisations.map(slug => {
              const loc = TOUTES_LOCALISATIONS.find(l => l.slug === slug);
              if (!loc) return null;
              return (
                <span
                  key={slug}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-olive-300 text-olive-800 rounded-full text-sm"
                >
                  {loc.nom}
                  <button
                    type="button"
                    onClick={() => toggleLocalisation(slug)}
                    className="hover:text-olive-900"
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
        </div>
      )}

      {/* Parcours par secteur (accordéon) */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Ou parcourez par secteur :</p>
        <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 overflow-hidden">
          {Object.entries(secteurs).map(([secteur, localisations]) => {
            const count = countInSecteur(localisations);
            const isOpen = openSecteurs[secteur];
            return (
              <div key={secteur}>
                <button
                  type="button"
                  onClick={() => toggleSecteur(secteur)}
                  className="flex items-center justify-between w-full px-4 py-3 bg-white hover:bg-gray-50 text-left"
                >
                  <span className="flex items-center gap-2 font-medium text-sm text-gray-800">
                    <svg
                      className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {secteur}
                  </span>
                  {count > 0 && (
                    <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 bg-olive-600 text-white text-xs font-semibold rounded-full">
                      {count}
                    </span>
                  )}
                </button>

                {isOpen && (
                  <div className="bg-gray-50 px-2 pb-2">
                    <button
                      type="button"
                      onClick={() => toggleAllSecteur(localisations)}
                      className="text-xs text-olive-700 hover:text-olive-900 underline px-2 py-1.5"
                    >
                      {allSelectedInSecteur(localisations)
                        ? `Tout décocher (${secteur})`
                        : `Tout sélectionner (${secteur})`}
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {localisations.map(loc => (
                        <label
                          key={loc.slug}
                          className="flex items-center gap-3 p-2 hover:bg-olive-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedLocalisations.includes(loc.slug)}
                            onChange={() => toggleLocalisation(loc.slug)}
                            className="w-4 h-4 text-olive-600 rounded focus:ring-olive-500"
                          />
                          <span className="text-sm text-gray-900">{loc.nom}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Autre localisation */}
      {onAutreLocalisationChange && (
        <div>
          <label className="block text-sm text-gray-700 mb-2">
            Autre localisation (si non listée)
          </label>
          <input
            type="text"
            value={autreLocalisation}
            onChange={(e) => onAutreLocalisationChange(e.target.value)}
            placeholder="Ex: Saint-Jory, Montastruc, Verfeil..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
          />
        </div>
      )}
    </div>
  );
}

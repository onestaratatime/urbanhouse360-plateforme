'use client';

import { QUARTIERS_PAR_SECTEUR } from '@/lib/quartiers';
import { useState } from 'react';

interface QuartiersSelectorProps {
  selectedQuartiers: string[];
  onChange: (quartiers: string[]) => void;
}

export default function QuartiersSelector({ selectedQuartiers, onChange }: QuartiersSelectorProps) {
  const [expandedSecteurs, setExpandedSecteurs] = useState<string[]>([]);

  const toggleSecteur = (secteur: string) => {
    setExpandedSecteurs(prev =>
      prev.includes(secteur)
        ? prev.filter(s => s !== secteur)
        : [...prev, secteur]
    );
  };

  const toggleQuartier = (slug: string) => {
    onChange(
      selectedQuartiers.includes(slug)
        ? selectedQuartiers.filter(q => q !== slug)
        : [...selectedQuartiers, slug]
    );
  };

  return (
    <div className="space-y-3">
      {Object.entries(QUARTIERS_PAR_SECTEUR).map(([secteur, quartiers]) => (
        <div key={secteur} className="border-2 border-warm-300 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSecteur(secteur)}
            className="w-full px-4 py-3 bg-warm-100 hover:bg-warm-200 flex justify-between items-center text-left font-medium text-gray-900 transition-colors"
          >
            <span>{secteur}</span>
            <span className="text-brick-600 text-xl font-bold">
              {expandedSecteurs.includes(secteur) ? '−' : '+'}
            </span>
          </button>

          {expandedSecteurs.includes(secteur) && (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white">
              {quartiers.map(quartier => (
                <label
                  key={quartier.slug}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-warm-50 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedQuartiers.includes(quartier.slug)}
                    onChange={() => toggleQuartier(quartier.slug)}
                    className="w-4 h-4 text-brick-600 rounded focus:ring-2 focus:ring-brick-500 border-warm-400"
                  />
                  <span className="text-sm text-gray-800">{quartier.nom}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      {selectedQuartiers.length > 0 && (
        <div className="mt-4 p-4 bg-forest-50 rounded-lg border-2 border-forest-200">
          <p className="text-sm font-bold text-forest-900 mb-3">
            ✓ Quartiers sélectionnés ({selectedQuartiers.length}) :
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedQuartiers.map(slug => {
              const quartier = Object.values(QUARTIERS_PAR_SECTEUR)
                .flat()
                .find(q => q.slug === slug);
              return quartier ? (
                <span
                  key={slug}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm border-2 border-forest-300 text-forest-900 font-medium"
                >
                  {quartier.nom}
                  <button
                    type="button"
                    onClick={() => toggleQuartier(slug)}
                    className="text-brick-600 hover:text-brick-700 font-bold text-lg ml-1"
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

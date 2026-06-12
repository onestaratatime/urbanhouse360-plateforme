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
        <div key={secteur} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSecteur(secteur)}
            className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex justify-between items-center text-left font-medium"
          >
            <span>{secteur}</span>
            <span className="text-gray-500">
              {expandedSecteurs.includes(secteur) ? '−' : '+'}
            </span>
          </button>

          {expandedSecteurs.includes(secteur) && (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quartiers.map(quartier => (
                <label
                  key={quartier.slug}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedQuartiers.includes(quartier.slug)}
                    onChange={() => toggleQuartier(quartier.slug)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm">{quartier.nom}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      {selectedQuartiers.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-2">
            Quartiers sélectionnés ({selectedQuartiers.length}) :
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedQuartiers.map(slug => {
              const quartier = Object.values(QUARTIERS_PAR_SECTEUR)
                .flat()
                .find(q => q.slug === slug);
              return quartier ? (
                <span
                  key={slug}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm border border-blue-200"
                >
                  {quartier.nom}
                  <button
                    type="button"
                    onClick={() => toggleQuartier(slug)}
                    className="text-blue-600 hover:text-blue-800 font-bold"
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

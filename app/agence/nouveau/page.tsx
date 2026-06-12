'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QuartiersSelector from '@/components/QuartiersSelector';
import {
  TypeProjet,
  Timing,
  TypeBien,
  TYPE_PROJET_LABELS,
  TIMING_LABELS,
  TYPE_BIEN_LABELS,
  CRITERES_INDISPENSABLES_OPTIONS,
  PIECES_OPTIONS,
  FormulaireInscription
} from '@/lib/types';
import Link from 'next/link';

export default function NouveauAcquereurPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormulaireInscription>({
    prenom: '',
    email: '',
    telephone: '',
    consentement_contact: true,
    quartiers: [],
    precision_localisation: '',
    type_projet: 'residence_principale',
    timing: 'moyen_terme',
    types_bien: [],
    profil: 'couple',
    surface_min: undefined,
    pieces_min: undefined,
    budget_max: undefined,
    criteres_indispensables: [],
    criteres_indispensables_autre: '',
    criteres_secondaires: '',
    description_projet: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/agence/acquereurs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de l\'ajout');
      }

      router.push('/agence');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = formData.prenom && formData.email && formData.telephone &&
    formData.quartiers.length > 0 && formData.types_bien.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/agence" className="text-blue-600 hover:text-blue-700 text-sm mb-4 inline-block">
          ← Retour à l'espace agence
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Ajouter un acquéreur
        </h1>
        <p className="text-gray-600 mb-8">
          Saisie manuelle d'un acquéreur par l'agence
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-8">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Coordonnées */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Coordonnées</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={e => setFormData({ ...formData, prenom: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={e => setFormData({ ...formData, telephone: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.consentement_contact}
                onChange={e => setFormData({ ...formData, consentement_contact: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">Consentement de contact</span>
            </label>
          </div>

          {/* Localisation */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Localisation</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quartiers <span className="text-red-500">*</span>
              </label>
              <QuartiersSelector
                selectedQuartiers={formData.quartiers}
                onChange={quartiers => setFormData({ ...formData, quartiers })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Précisions
              </label>
              <input
                type="text"
                value={formData.precision_localisation}
                onChange={e => setFormData({ ...formData, precision_localisation: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Projet */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Projet</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de projet <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type_projet}
                  onChange={e => setFormData({ ...formData, type_projet: e.target.value as TypeProjet })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(TYPE_PROJET_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timing <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.timing}
                  onChange={e => setFormData({ ...formData, timing: e.target.value as Timing })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(TIMING_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de bien <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {Object.entries(TYPE_BIEN_LABELS).map(([value, label]) => (
                  <label key={value} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.types_bien.includes(value as TypeBien)}
                      onChange={e => {
                        const types = e.target.checked
                          ? [...formData.types_bien, value as TypeBien]
                          : formData.types_bien.filter(t => t !== value);
                        setFormData({ ...formData, types_bien: types });
                      }}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Critères */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Critères</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surface min (m²)
                </label>
                <input
                  type="number"
                  value={formData.surface_min || ''}
                  onChange={e => setFormData({ ...formData, surface_min: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pièces min
                </label>
                <select
                  value={formData.pieces_min || ''}
                  onChange={e => setFormData({ ...formData, pieces_min: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-</option>
                  {PIECES_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget max (€)
                </label>
                <input
                  type="number"
                  value={formData.budget_max || ''}
                  onChange={e => setFormData({ ...formData, budget_max: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Critères indispensables
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {CRITERES_INDISPENSABLES_OPTIONS.map(opt => (
                  <label key={opt.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.criteres_indispensables?.includes(opt.value)}
                      onChange={e => {
                        const criteres = e.target.checked
                          ? [...(formData.criteres_indispensables || []), opt.value]
                          : (formData.criteres_indispensables || []).filter(c => c !== opt.value);
                        setFormData({ ...formData, criteres_indispensables: criteres });
                      }}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Autres critères indispensables
              </label>
              <input
                type="text"
                value={formData.criteres_indispensables_autre}
                onChange={e => setFormData({ ...formData, criteres_indispensables_autre: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Critères secondaires
              </label>
              <textarea
                value={formData.criteres_secondaires}
                onChange={e => setFormData({ ...formData, criteres_secondaires: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description du projet
              </label>
              <textarea
                value={formData.description_projet}
                onChange={e => setFormData({ ...formData, description_projet: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Link
              href="/agence"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Ajout en cours...' : 'Ajouter l\'acquéreur'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

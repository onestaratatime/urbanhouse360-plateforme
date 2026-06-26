'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LocalisationSelector from '@/components/LocalisationSelector';
import {
  TypeProjet,
  NatureProjet,
  Timing,
  TypeBien,
  Profil,
  CriterePrincipal,
  TYPE_PROJET_LABELS,
  NATURE_PROJET_LABELS,
  TIMING_LABELS,
  TYPE_BIEN_LABELS,
  PROFIL_LABELS,
  CRITERES_PRINCIPAUX_OPTIONS,
  PIECES_OPTIONS,
  FormulaireInscription
} from '@/lib/types';
import Link from 'next/link';

export default function InscriptionPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormulaireInscription>({
    prenom: '',
    email: '',
    telephone: '',
    consentement_contact: false,
    quartiers: [],
    precision_localisation: '',
    autre_localisation: '',
    type_projet: 'residence_principale',
    timing: 'moyen_terme',
    types_bien: [],
    profil: 'couple',
    surface_min: undefined,
    pieces_min: undefined,
    budget_max: undefined,
    criteres_principaux: [],
    criteres_principaux_autre: '',
    criteres_secondaires: '',
    description_projet: '',
    phrase_accroche: ''
  });

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.quartiers || formData.quartiers.length === 0) {
      errors.quartiers = 'Veuillez sélectionner au moins un quartier';
    }

    if (!formData.types_bien || formData.types_bien.length === 0) {
      errors.types_bien = 'Veuillez sélectionner au moins un type de bien';
    }

    if (!formData.prenom || formData.prenom.trim() === '') {
      errors.prenom = 'Le prénom est obligatoire';
    }

    if (!formData.email || formData.email.trim() === '') {
      errors.email = 'L\'email est obligatoire';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email invalide';
    }

    if (!formData.telephone || formData.telephone.trim() === '') {
      errors.telephone = 'Le téléphone est obligatoire';
    }

    if (!formData.consentement_contact) {
      errors.consentement = 'Vous devez accepter d\'être recontacté';
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    // Validation côté client
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Veuillez corriger les erreurs dans le formulaire');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/acquereurs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription');
      }

      router.push('/inscription/confirmation');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage + ' (Vérifiez que la base de données est configurée)');
    } finally {
      setLoading(false);
    }
  };

  const canGoToNextStep = () => {
    switch (step) {
      case 1:
        return formData.quartiers.length > 0;
      case 2:
        return true; // Profil selection is optional, can be skipped
      case 3:
        return formData.types_bien.length > 0;
      case 4:
        return true; // Critères are all optional
      case 5:
        return formData.prenom && formData.email && formData.telephone && formData.consentement_contact;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-warm-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-forest-600 hover:text-forest-700 text-sm mb-4 inline-block font-medium">
            ← Retour à l'accueil
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Inscription gratuite
          </h1>
          <p className="text-warm-800">
            Décrivez votre recherche et apparaissez anonymement sur la carte des acquéreurs
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3, 4, 5].map(s => (
              <div
                key={s}
                className={`flex-1 h-2 mx-1 rounded-full transition-colors ${
                  s <= step ? 'bg-brick-500' : 'bg-warm-300'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Localisation</span>
            <span>Profil</span>
            <span>Projet</span>
            <span>Critères</span>
            <span>Coordonnées</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Step 1: Localisation */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Où recherchez-vous ?</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sélectionnez un ou plusieurs quartiers ou villes <span className="text-red-500">*</span>
                </label>
                <LocalisationSelector
                  selectedLocalisations={formData.quartiers}
                  onChange={quartiers => setFormData({ ...formData, quartiers })}
                  autreLocalisation={formData.autre_localisation}
                  onAutreLocalisationChange={value => setFormData({ ...formData, autre_localisation: value })}
                />
                {fieldErrors.quartiers && (
                  <p className="mt-2 text-sm text-red-600">⚠️ {fieldErrors.quartiers}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Précisions (rue, secteur précis...) — optionnel
                </label>
                <input
                  type="text"
                  value={formData.precision_localisation}
                  onChange={e => setFormData({ ...formData, precision_localisation: e.target.value })}
                  className="w-full px-4 py-2 border border-warm-300 rounded-lg focus:ring-2 focus:ring-brick-500 focus:border-transparent"
                  placeholder="Ex: Proche métro, secteur calme..."
                />
              </div>
            </div>
          )}

          {/* Step 2: Profil */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Votre profil</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Quel est votre profil ? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {Object.entries(PROFIL_LABELS).map(([value, label]) => (
                    <label key={value} className="flex items-center space-x-3 p-3 border border-warm-300 rounded-lg cursor-pointer hover:bg-warm-50">
                      <input
                        type="radio"
                        name="profil"
                        value={value}
                        checked={formData.profil === value}
                        onChange={e => setFormData({ ...formData, profil: e.target.value as Profil })}
                        className="w-4 h-4 text-brick-600 focus:ring-2 focus:ring-brick-500"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Projet */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Votre projet</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Type de projet <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {Object.entries(TYPE_PROJET_LABELS).map(([value, label]) => (
                    <label key={value} className="flex items-center space-x-3 p-3 border border-warm-300 rounded-lg cursor-pointer hover:bg-warm-50">
                      <input
                        type="radio"
                        name="type_projet"
                        value={value}
                        checked={formData.type_projet === value}
                        onChange={e => setFormData({ ...formData, type_projet: e.target.value as TypeProjet })}
                        className="w-4 h-4 text-brick-600 focus:ring-2 focus:ring-brick-500"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Nature du projet — optionnel
                </label>
                <div className="space-y-2">
                  {Object.entries(NATURE_PROJET_LABELS).map(([value, label]) => (
                    <label key={value} className="flex items-center space-x-3 p-3 border border-warm-300 rounded-lg cursor-pointer hover:bg-warm-50">
                      <input
                        type="radio"
                        name="nature_projet"
                        value={value}
                        checked={formData.nature_projet === value}
                        onChange={e => setFormData({ ...formData, nature_projet: e.target.value as NatureProjet })}
                        className="w-4 h-4 text-brick-600 focus:ring-2 focus:ring-brick-500"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Timing du projet <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {Object.entries(TIMING_LABELS).map(([value, label]) => (
                    <label key={value} className="flex items-center space-x-3 p-3 border border-warm-300 rounded-lg cursor-pointer hover:bg-warm-50">
                      <input
                        type="radio"
                        name="timing"
                        value={value}
                        checked={formData.timing === value}
                        onChange={e => setFormData({ ...formData, timing: e.target.value as Timing })}
                        className="w-4 h-4 text-brick-600 focus:ring-2 focus:ring-brick-500"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                {formData.timing === 'long_terme' && (
                  <p className="mt-2 text-sm text-gray-600">
                    💡 Le long terme vous ouvre des propositions dans le neuf
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Type de bien recherché <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {Object.entries(TYPE_BIEN_LABELS).map(([value, label]) => (
                    <label key={value} className="flex items-center space-x-3 p-3 border border-warm-300 rounded-lg cursor-pointer hover:bg-warm-50">
                      <input
                        type="checkbox"
                        checked={formData.types_bien.includes(value as TypeBien)}
                        onChange={e => {
                          const types = e.target.checked
                            ? [...formData.types_bien, value as TypeBien]
                            : formData.types_bien.filter(t => t !== value);
                          setFormData({ ...formData, types_bien: types });
                        }}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                {fieldErrors.types_bien && (
                  <p className="mt-2 text-sm text-red-600">⚠️ {fieldErrors.types_bien}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Critères */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Vos critères</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surface minimum (m²)
                  </label>
                  <input
                    type="number"
                    value={formData.surface_min || ''}
                    onChange={e => setFormData({ ...formData, surface_min: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="w-full px-4 py-2 border border-warm-300 rounded-lg focus:ring-2 focus:ring-brick-500 focus:border-transparent"
                    placeholder="Ex: 60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de pièces minimum
                  </label>
                  <select
                    value={formData.pieces_min || ''}
                    onChange={e => setFormData({ ...formData, pieces_min: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="w-full px-4 py-2 border border-warm-300 rounded-lg focus:ring-2 focus:ring-brick-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner</option>
                    {PIECES_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget maximum (€)
                </label>
                <input
                  type="number"
                  value={formData.budget_max || ''}
                  onChange={e => setFormData({ ...formData, budget_max: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="w-full px-4 py-2 border border-warm-300 rounded-lg focus:ring-2 focus:ring-brick-500 focus:border-transparent"
                  placeholder="Ex: 300000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Critères principaux
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CRITERES_PRINCIPAUX_OPTIONS.map(opt => (
                    <label key={opt.value} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.criteres_principaux?.includes(opt.value)}
                        onChange={e => {
                          const criteres = e.target.checked
                            ? [...(formData.criteres_principaux || []), opt.value]
                            : (formData.criteres_principaux || []).filter(c => c !== opt.value);
                          setFormData({ ...formData, criteres_principaux: criteres });
                        }}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Autres critères principaux
                </label>
                <input
                  type="text"
                  value={formData.criteres_principaux_autre}
                  onChange={e => setFormData({ ...formData, criteres_principaux_autre: e.target.value })}
                  className="w-full px-4 py-2 border border-warm-300 rounded-lg focus:ring-2 focus:ring-brick-500 focus:border-transparent"
                  placeholder="Ex: Double vitrage, fibre..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Critères secondaires
                </label>
                <textarea
                  value={formData.criteres_secondaires}
                  onChange={e => setFormData({ ...formData, criteres_secondaires: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-warm-300 rounded-lg focus:ring-2 focus:ring-brick-500 focus:border-transparent"
                  placeholder="Ex: Luminosité, calme, nombre d'enfants, lieu de travail, mode de transport..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description de votre projet
                </label>
                <textarea
                  value={formData.description_projet}
                  onChange={e => setFormData({ ...formData, description_projet: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-warm-300 rounded-lg focus:ring-2 focus:ring-brick-500 focus:border-transparent"
                  placeholder="Ex: Maison familiale, partie professionnelle, gîte..."
                />
              </div>

              {/* Phrase d'accroche */}
              <div className="bg-olive-50 border border-olive-300 rounded-lg p-4">
                <label className="block text-sm font-semibold text-olive-800 mb-2">
                  Phrase d'accroche de votre recherche <span className="text-olive-600">(optionnel mais recommandé)</span>
                </label>
                <p className="text-xs text-olive-700 mb-3 leading-relaxed">
                  Cette phrase sera visible par les propriétaires sur la carte. Elle donne une dimension humaine à votre recherche.
                  <br /><strong>Exemple :</strong> "Couple expatrié, achat immédiat pour retour fin 2025 à Toulouse"
                  <br /><strong>⚠️ Ne mettez aucune donnée personnelle</strong> (nom, email, téléphone)
                </p>
                <textarea
                  value={formData.phrase_accroche}
                  onChange={e => setFormData({ ...formData, phrase_accroche: e.target.value })}
                  rows={2}
                  maxLength={150}
                  className="w-full px-4 py-2 border-2 border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 bg-white"
                  placeholder="Ex: Couple expatrié, achat immédiat pour retour fin 2025 à Toulouse"
                />
                {formData.phrase_accroche && (
                  <p className="text-xs text-olive-600 mt-1">
                    {formData.phrase_accroche.length}/150 caractères
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Coordonnées */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Vos coordonnées</h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-900">
                  <strong>Pourquoi ces informations ?</strong> Pour vous envoyer une sélection de biens
                  correspondant à vos critères et des alertes sur vos quartiers. Vos coordonnées restent
                  confidentielles. Seul votre profil de recherche anonymisé apparaît sur la carte.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={e => setFormData({ ...formData, prenom: e.target.value })}
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    fieldErrors.prenom ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {fieldErrors.prenom && (
                  <p className="mt-1 text-sm text-red-600">⚠️ {fieldErrors.prenom}</p>
                )}
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
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    fieldErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-600">⚠️ {fieldErrors.email}</p>
                )}
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
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    fieldErrors.telephone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {fieldErrors.telephone && (
                  <p className="mt-1 text-sm text-red-600">⚠️ {fieldErrors.telephone}</p>
                )}
              </div>

              <div>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentement_contact}
                    onChange={e => setFormData({ ...formData, consentement_contact: e.target.checked })}
                    required
                    className="w-4 h-4 mt-1 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    J'accepte d'être recontacté par UrbanHouse360 et de recevoir des sélections de biens
                    et alertes sur mes zones de recherche <span className="text-red-500">*</span>
                  </span>
                </label>
                {fieldErrors.consentement && (
                  <p className="mt-2 text-sm text-red-600">⚠️ {fieldErrors.consentement}</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Précédent
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={!canGoToNextStep()}
                className="px-6 py-2 bg-brick-500 text-white rounded-lg hover:bg-brick-600 disabled:bg-warm-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canGoToNextStep() || loading}
                className="px-6 py-2 bg-brick-500 text-white rounded-lg hover:bg-brick-600 disabled:bg-warm-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
              >
                {loading ? 'Inscription en cours...' : 'M\'inscrire gratuitement'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

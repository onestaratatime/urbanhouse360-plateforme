'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FormulaireProprietaire() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    adresse: '',
    prenom: '',
    nom: '',
    email: '',
    telephone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/proprietaires', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription');
      }

      // Rediriger vers une page de confirmation ou afficher un message de succès
      router.push('/proprietaire/confirmation');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute bottom-6 right-6 w-96 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-warm-200 p-6 z-[1000]">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Propriétaire ?
          </h3>
          <p className="text-sm text-warm-700 mt-1">
            Découvrez les acquéreurs qui recherchent <span className="font-medium">votre bien</span> sans le mettre en vente
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-900">
            ✓ Sans engagement<br />
            ✓ Données strictement confidentielles<br />
            ✓ Accès immédiat aux acquéreurs à proximité
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Adresse du bien"
            value={formData.adresse}
            onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-warm-300 rounded-lg focus:ring-2 focus:ring-brick-500 focus:border-transparent"
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-warm-300 rounded-lg focus:ring-2 focus:ring-brick-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              placeholder="Nom"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-warm-300 rounded-lg focus:ring-2 focus:ring-brick-500 focus:border-transparent"
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-warm-300 rounded-lg focus:ring-2 focus:ring-brick-500 focus:border-transparent"
            required
          />
          <input
            type="tel"
            placeholder="Téléphone"
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-warm-300 rounded-lg focus:ring-2 focus:ring-brick-500 focus:border-transparent"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2.5 bg-brick-500 text-white rounded-lg hover:bg-brick-600 font-medium shadow-md hover:shadow-lg transition-all text-sm disabled:bg-warm-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Envoi en cours...' : 'Voir les acquéreurs à proximité'}
          </button>

          <p className="text-xs text-warm-600 text-center">
            Vos informations ne seront jamais partagées
          </p>
        </form>
      </div>
    </div>
  );
}

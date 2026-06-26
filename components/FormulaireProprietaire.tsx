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
    <div className="absolute bottom-6 right-6 w-96 max-h-[calc(100vh-100px)] overflow-y-auto bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-warm-200 p-5 z-[1000]">
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-olive-800">
            Propriétaire ?
          </h3>
          <p className="text-sm text-olive-700 mt-1 font-medium">
            Découvrez les acquéreurs qui recherchent des biens similaires au vôtre, sans le mettre en vente
          </p>
        </div>

        <div className="bg-olive-100 border-2 border-olive-500 rounded-lg p-3">
          <p className="text-xs text-olive-900 font-semibold leading-relaxed">
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

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <input
            type="text"
            placeholder="Adresse du bien"
            value={formData.adresse}
            onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-olive-400 rounded-lg focus:ring-2 focus:ring-olive-600 focus:border-olive-600"
            required
          />
          <input
            type="text"
            placeholder="Prénom"
            value={formData.prenom}
            onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-olive-400 rounded-lg focus:ring-2 focus:ring-olive-600 focus:border-olive-600"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-olive-400 rounded-lg focus:ring-2 focus:ring-olive-600 focus:border-olive-600"
            required
          />
          <input
            type="tel"
            placeholder="Téléphone"
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-olive-400 rounded-lg focus:ring-2 focus:ring-olive-600 focus:border-olive-600"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-olive-600 text-white rounded-lg hover:bg-olive-700 font-bold shadow-lg hover:shadow-xl transition-all text-sm disabled:bg-warm-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Envoi en cours...' : 'Voir les acquéreurs à proximité'}
          </button>

          <p className="text-xs text-olive-600 text-center pt-1">
            🔒 Vos informations ne seront jamais partagées sans votre accord
          </p>
        </form>
      </div>
    </div>
  );
}

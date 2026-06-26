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
    <div className="absolute bottom-6 right-6 w-96 max-h-[calc(100vh-100px)] overflow-y-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 z-[1000]">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-olive-700">
            Propriétaire ?
          </h3>
          <p className="text-sm text-olive-600 mt-1 font-light">
            Découvrez les acquéreurs qui recherchent des biens similaires au vôtre, sans le mettre en vente
          </p>
        </div>

        <div className="bg-olive-50 rounded-lg p-3">
          <p className="text-xs text-olive-700 font-light leading-relaxed">
            ✓ Sans engagement<br />
            ✓ Données strictement confidentielles<br />
            ✓ Accès aux acquéreurs à proximité
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
            className="w-full px-4 py-2.5 text-sm bg-olive-50/50 border border-olive-200 rounded-lg focus:outline-none focus:border-olive-400 focus:bg-white transition-colors"
            required
          />
          <input
            type="text"
            placeholder="Prénom"
            value={formData.prenom}
            onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
            className="w-full px-4 py-2.5 text-sm bg-olive-50/50 border border-olive-200 rounded-lg focus:outline-none focus:border-olive-400 focus:bg-white transition-colors"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 text-sm bg-olive-50/50 border border-olive-200 rounded-lg focus:outline-none focus:border-olive-400 focus:bg-white transition-colors"
            required
          />
          <input
            type="tel"
            placeholder="Téléphone"
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
            className="w-full px-4 py-2.5 text-sm bg-olive-50/50 border border-olive-200 rounded-lg focus:outline-none focus:border-olive-400 focus:bg-white transition-colors"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-olive-600 text-white rounded-lg hover:bg-olive-700 font-medium shadow-md hover:shadow-lg transition-all text-sm disabled:bg-olive-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Envoi en cours...' : 'Voir les acquéreurs à proximité'}
          </button>

          <p className="text-xs text-olive-500 text-center font-light">
            🔒 Vos informations ne seront jamais partagées sans votre accord
          </p>
        </form>
      </div>
    </div>
  );
}

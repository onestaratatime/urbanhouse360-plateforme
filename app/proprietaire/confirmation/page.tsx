import Link from 'next/link';

export default function ProprietaireConfirmation() {
  return (
    <div className="min-h-screen bg-warm-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        {/* Icône de succès */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Titre */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Demande enregistrée !
        </h1>

        {/* Message de confirmation */}
        <p className="text-warm-800 mb-6">
          Merci pour votre confiance. Nous avons bien reçu votre demande.
        </p>

        {/* Prochaines étapes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
          <h2 className="text-sm font-semibold text-blue-900 mb-3">
            Prochaines étapes :
          </h2>
          <ul className="space-y-2 text-sm text-blue-900">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Nous analysons les acquéreurs actifs à proximité de votre bien</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Vous recevrez un email dans les 24-48h avec les profils correspondants</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Toutes vos données restent strictement confidentielles</span>
            </li>
          </ul>
        </div>

        {/* Boutons d'action */}
        <div className="space-y-3">
          <Link
            href="/carte"
            className="block w-full px-6 py-3 bg-brick-500 text-white rounded-lg hover:bg-brick-600 transition-all font-medium shadow-md hover:shadow-lg"
          >
            Voir la carte des acquéreurs
          </Link>
          <Link
            href="/"
            className="block w-full px-6 py-3 border border-warm-300 text-warm-700 rounded-lg hover:bg-warm-50 transition-all font-medium"
          >
            Retour à l'accueil
          </Link>
        </div>

        {/* Note de réassurance */}
        <p className="mt-6 text-xs text-warm-600">
          🔒 Vos informations personnelles ne seront jamais partagées avec des tiers
        </p>
      </div>
    </div>
  );
}

import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-warm-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 md:p-12 text-center border border-warm-200">
        <div className="mb-6">
          <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Inscription réussie !
          </h1>
          <p className="text-lg text-warm-800 mb-6">
            Votre profil anonymisé est maintenant visible sur la carte des acquéreurs.
          </p>
        </div>

        <div className="bg-forest-50 border border-forest-200 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-semibold text-forest-900 mb-3">Et maintenant ?</h2>
          <ul className="space-y-2 text-sm text-forest-800">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Votre profil apparaît sur la carte, visible par les vendeurs et notre agence</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Vous recevrez des sélections de biens correspondant à vos critères</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Des alertes vous seront envoyées sur les nouveautés dans vos quartiers</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>UrbanHouse360 vous accompagne dans votre recherche</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/carte"
            className="px-8 py-3 bg-brick-500 text-white rounded-lg hover:bg-brick-600 font-medium shadow-md hover:shadow-lg transition-all"
          >
            Voir la carte des acquéreurs
          </Link>
          <Link
            href="/"
            className="px-8 py-3 border-2 border-warm-400 text-warm-900 rounded-lg hover:bg-warm-50 font-medium transition-all"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

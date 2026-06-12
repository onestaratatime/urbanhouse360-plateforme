import { supabase } from '@/lib/supabase';
import { AcquereurPublic, Vente } from '@/lib/types';
import Link from 'next/link';
import MapWrapper from '@/components/MapWrapper';
import { getQuartierBySlug } from '@/lib/quartiers';

async function getAcquereurs(): Promise<AcquereurPublic[]> {
  const { data, error } = await supabase
    .from('acquereurs_publics')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching acquereurs:', error);
    return [];
  }

  return data || [];
}

async function getVentes(): Promise<Vente[]> {
  const { data, error } = await supabase
    .from('ventes')
    .select('*')
    .order('date_vente', { ascending: false })
    .limit(6);

  if (error) {
    console.error('Error fetching ventes:', error);
    return [];
  }

  return data || [];
}

export const revalidate = 60; // Revalider toutes les 60 secondes

export default async function Home() {
  const acquereurs = await getAcquereurs();
  const ventes = await getVentes();

  // Calculer les chiffres clés
  const nbQuartiers = new Set(acquereurs.flatMap(a => a.quartiers)).size;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-warm-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Votre future maison vous cherche aussi
            </h1>
            <p className="text-xl md:text-2xl text-warm-800 mb-8">
              Inscrivez votre recherche, apparaissez anonymement sur la carte, et recevez des biens
              correspondant à vos critères avant tout le monde
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inscription"
                className="px-8 py-4 bg-brick-500 text-white rounded-lg hover:bg-brick-600 font-medium text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Je m'inscris gratuitement
              </Link>
              <Link
                href="/carte"
                className="px-8 py-4 border-2 border-forest-500 text-forest-700 rounded-lg hover:bg-forest-50 font-medium text-lg transition-all"
              >
                Voir la carte des acquéreurs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Aperçu de la carte */}
      <section className="py-16 bg-warm-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              La demande en temps réel
            </h2>
            <p className="text-xl text-warm-800">
              Visualisez où se trouvent les acquéreurs potentiels sur Toulouse et sa périphérie
            </p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-xl">
            <MapWrapper acquereurs={acquereurs} compact={true} />
          </div>

          <div className="text-center mt-8">
            <Link
              href="/carte"
              className="inline-block px-6 py-3 bg-forest-500 text-white rounded-lg hover:bg-forest-600 font-medium shadow-md hover:shadow-lg transition-all"
            >
              Explorer la carte complète
            </Link>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brick-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brick-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Décrivez votre recherche
              </h3>
              <p className="text-warm-800">
                Remplissez le formulaire en quelques minutes : quartiers, type de bien, budget, critères...
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-forest-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Apparaissez anonymement
              </h3>
              <p className="text-warm-800">
                Votre profil s'affiche sur la carte. Vos coordonnées restent confidentielles.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brick-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brick-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Recevez des biens et alertes
              </h3>
              <p className="text-warm-800">
                UrbanHouse360 vous envoie les biens correspondants et vous alerte sur vos quartiers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="py-16 bg-gradient-to-r from-brick-500 to-brick-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">{acquereurs.length}</div>
              <div className="text-xl text-brick-50">
                Acquéreur{acquereurs.length > 1 ? 's' : ''} actif{acquereurs.length > 1 ? 's' : ''}
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">{nbQuartiers}</div>
              <div className="text-xl text-brick-50">
                Quartier{nbQuartiers > 1 ? 's' : ''} couvert{nbQuartiers > 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Réassurance */}
      <section className="py-16 bg-warm-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md border border-warm-200">
              <div className="w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Anonymat garanti
              </h3>
              <p className="text-warm-800">
                Vos coordonnées ne sont jamais publiées sur la carte. Seul votre profil de recherche
                anonymisé est visible.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md border border-warm-200">
              <div className="w-12 h-12 bg-brick-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brick-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                UrbanHouse360
              </h3>
              <p className="text-warm-800">
                Votre agence immobilière de confiance sur Toulouse et sa périphérie.
                Expert local depuis plusieurs années, nous vous accompagnons dans votre projet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-gradient-to-r from-forest-500 to-forest-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à trouver votre bien idéal ?
          </h2>
          <p className="text-xl mb-8 text-forest-50">
            Rejoignez les acquéreurs déjà inscrits et recevez des biens avant tout le monde
          </p>
          <Link
            href="/inscription"
            className="inline-block px-8 py-4 bg-white text-forest-700 rounded-lg hover:bg-warm-50 font-medium text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Je m'inscris gratuitement
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 UrbanHouse360 - Agence immobilière à Toulouse
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <Link href="/carte" className="hover:text-white">
              Carte des acquéreurs
            </Link>
            <Link href="/inscription" className="hover:text-white">
              S'inscrire
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

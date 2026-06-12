import { supabase } from '@/lib/supabase';
import { AcquereurPublic } from '@/lib/types';
import Link from 'next/link';
import MapWrapper from '@/components/MapWrapper';

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

export const revalidate = 60;

export default async function Home() {
  const acquereurs = await getAcquereurs();
  const nbQuartiers = new Set(acquereurs.flatMap(a => a.quartiers)).size;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation minimaliste */}
      <nav className="absolute top-0 left-0 right-0 z-[2000] bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="text-2xl font-light tracking-wide text-olive-700">
            UrbanHouse360
          </div>
          <Link
            href="/inscription"
            className="px-8 py-3 bg-olive-600 text-white rounded-full hover:bg-olive-700 transition-all duration-300 font-light tracking-wide"
          >
            S'inscrire
          </Link>
        </div>
      </nav>

      {/* Section Hero - Carte pleine hauteur avec encart élégant */}
      <section className="relative h-screen">
        {/* Carte en arrière-plan fixe */}
        <div className="absolute inset-0 z-0">
          <MapWrapper acquereurs={acquereurs} compact={false} />
        </div>

        {/* Overlay léger pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-olive-900/10 z-10"></div>

        {/* Encart élégant centré */}
        <div className="relative z-[1000] h-full flex items-center justify-center px-4">
          <div className="max-w-xl bg-white/95 backdrop-blur-sm p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
            {/* Titre accrocheur */}
            <h1 className="text-5xl font-light text-olive-800 mb-8 leading-tight">
              Trouvez votre lieu de vie idéal à Toulouse
            </h1>

            {/* Les 3 étapes avec un design épuré */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-olive-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-olive-600 text-sm font-medium">1</span>
                </div>
                <p className="text-olive-700 font-light leading-relaxed">
                  Quartiers, budget, type de bien en quelques clics
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-olive-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-olive-600 text-sm font-medium">2</span>
                </div>
                <p className="text-olive-700 font-light leading-relaxed">
                  Votre profil devient visible, vos coordonnées restent privées
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-olive-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-olive-600 text-sm font-medium">3</span>
                </div>
                <p className="text-olive-700 font-light leading-relaxed">
                  Nous vous contactons avec les biens qui matchent
                </p>
              </div>
            </div>

            {/* Bouton CTA unique */}
            <Link
              href="/inscription"
              className="block w-full text-center px-8 py-4 bg-olive-600 text-white rounded-full hover:bg-olive-700 transition-all duration-300 font-light tracking-wide text-lg shadow-md hover:shadow-lg"
            >
              S'inscrire
            </Link>

            {/* Statistiques minimalistes */}
            <div className="mt-8 pt-8 border-t border-olive-100">
              <div className="flex justify-center space-x-8 text-sm text-olive-600">
                <span className="font-light">
                  <span className="font-normal">{acquereurs.length}</span> acquéreurs
                </span>
                <span className="text-olive-300">•</span>
                <span className="font-light">
                  <span className="font-normal">{nbQuartiers}</span> quartiers
                </span>
                <span className="text-olive-300">•</span>
                <span className="font-light">100% gratuit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="absolute bottom-0 left-0 right-0 z-[1000] bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-olive-600 font-light">
              © 2024 UrbanHouse360 - Toulouse
            </p>
            <div className="flex space-x-8 text-sm">
              <Link href="/carte" className="text-olive-600 hover:text-olive-800 transition-colors font-light">
                Carte
              </Link>
              <Link href="/inscription" className="text-olive-600 hover:text-olive-800 transition-colors font-light">
                Inscription
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

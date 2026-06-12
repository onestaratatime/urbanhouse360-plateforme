import { supabase } from '@/lib/supabase';
import { AcquereurPublic } from '@/lib/types';
import MapWrapper from '@/components/MapWrapper';
import Link from 'next/link';

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

export const revalidate = 60; // Revalider toutes les 60 secondes

export default async function CartePage() {
  const acquereurs = await getAcquereurs();

  return (
    <div className="relative h-screen">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[1000] bg-white shadow-md border-b border-warm-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-brick-600 transition-colors">
              UrbanHouse360
            </Link>
            <p className="text-sm text-warm-700 mt-1">
              {acquereurs.length} acquéreur{acquereurs.length > 1 ? 's' : ''} actif{acquereurs.length > 1 ? 's' : ''}
            </p>
          </div>

          <Link
            href="/inscription"
            className="px-6 py-2 bg-brick-500 text-white rounded-lg hover:bg-brick-600 font-medium shadow-md hover:shadow-lg transition-all"
          >
            Je m'inscris
          </Link>
        </div>
      </div>

      {/* Carte */}
      <div className="pt-20 h-screen">
        <MapWrapper acquereurs={acquereurs} compact={false} />
      </div>

      {/* Message si aucun acquéreur */}
      {acquereurs.length === 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-8 text-center z-[1000] border border-warm-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Soyez le premier !
          </h2>
          <p className="text-warm-800 mb-6">
            Aucun acquéreur n'est encore inscrit. Soyez le premier à apparaître sur la carte.
          </p>
          <Link
            href="/inscription"
            className="inline-block px-8 py-3 bg-brick-500 text-white rounded-lg hover:bg-brick-600 font-medium shadow-md hover:shadow-lg transition-all"
          >
            M'inscrire gratuitement
          </Link>
        </div>
      )}
    </div>
  );
}

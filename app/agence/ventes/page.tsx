import { redirect } from 'next/navigation';
import { isAgenceAuthenticated } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { Vente } from '@/lib/types';
import Link from 'next/link';
import { getQuartierBySlug } from '@/lib/quartiers';

async function getVentes(): Promise<Vente[]> {
  const { data, error } = await supabaseAdmin
    .from('ventes')
    .select('*')
    .order('date_vente', { ascending: false });

  if (error) {
    console.error('Error fetching ventes:', error);
    return [];
  }

  return data || [];
}

export default async function VentesPage() {
  const isAuth = await isAgenceAuthenticated();

  if (!isAuth) {
    redirect('/agence/login');
  }

  const ventes = await getVentes();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Espace Agence</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4 mb-6">
          <Link
            href="/agence"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            Acquéreurs
          </Link>
          <Link
            href="/agence/nouveau"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            + Nouvel acquéreur
          </Link>
          <Link
            href="/agence/ventes"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
          >
            Ventes récentes
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Ventes récentes ({ventes.length})
          </h2>
          <Link
            href="/agence/ventes/nouvelle"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            + Nouvelle vente
          </Link>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date de vente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Quartier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Surface
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Délai
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ventes.map(vente => {
                  const quartier = getQuartierBySlug(vente.quartier);
                  return (
                    <tr key={vente.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vente.date_vente
                          ? new Date(vente.date_vente).toLocaleDateString('fr-FR')
                          : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="font-medium">
                          {quartier?.nom || vente.quartier}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {quartier?.secteur}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {vente.type_bien}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vente.surface ? `${vente.surface} m²` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vente.afficher_prix && vente.prix ? (
                          <div>
                            <div className="font-medium">
                              {vente.prix.toLocaleString('fr-FR')} €
                            </div>
                            <div className="text-xs text-green-600">
                              Affiché publiquement
                            </div>
                          </div>
                        ) : vente.prix ? (
                          <div>
                            <div className="font-medium">
                              {vente.prix.toLocaleString('fr-FR')} €
                            </div>
                            <div className="text-xs text-gray-500">
                              Non affiché
                            </div>
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vente.delai_vente_jours ? `${vente.delai_vente_jours} jours` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link
                          href={`/agence/ventes/${vente.id}`}
                          className="text-blue-600 hover:text-blue-800 mr-4"
                        >
                          Modifier
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {ventes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Aucune vente enregistrée
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

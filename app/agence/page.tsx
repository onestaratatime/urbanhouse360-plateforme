import { redirect } from 'next/navigation';
import { isAgenceAuthenticated } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { AcquereurComplet } from '@/lib/types';
import Link from 'next/link';
import { getQuartierBySlug } from '@/lib/quartiers';

async function getAcquereurs(): Promise<AcquereurComplet[]> {
  const { data, error } = await supabaseAdmin
    .from('acquereurs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching acquereurs:', error);
    return [];
  }

  return data || [];
}

export default async function AgencePage() {
  const isAuth = await isAgenceAuthenticated();

  if (!isAuth) {
    redirect('/agence/login');
  }

  const acquereurs = await getAcquereurs();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Espace Agence</h1>
            <p className="text-sm text-gray-600">UrbanHouse360</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Voir le site public
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4 mb-6">
          <Link
            href="/agence"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
          >
            Acquéreurs
          </Link>
          <Link
            href="/agence/nouveau"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            + Nouvel acquéreur
          </Link>
          <Link
            href="/agence/ventes"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            Ventes récentes
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold text-gray-900">{acquereurs.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Actifs</p>
            <p className="text-2xl font-bold text-green-600">
              {acquereurs.filter(a => a.actif).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Formulaire</p>
            <p className="text-2xl font-bold text-blue-600">
              {acquereurs.filter(a => a.source === 'formulaire').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Agence</p>
            <p className="text-2xl font-bold text-purple-600">
              {acquereurs.filter(a => a.source === 'agence').length}
            </p>
          </div>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quartiers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {acquereurs.map(acquereur => (
                  <tr key={acquereur.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(acquereur.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="font-medium">{acquereur.prenom}</div>
                      <div className="text-gray-500">{acquereur.email}</div>
                      <div className="text-gray-500">{acquereur.telephone}</div>
                      {acquereur.consentement_contact && (
                        <span className="text-xs text-green-600">✓ Consent</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-xs">
                        {acquereur.quartiers.slice(0, 3).map(slug => {
                          const q = getQuartierBySlug(slug);
                          return q ? q.nom : slug;
                        }).join(', ')}
                        {acquereur.quartiers.length > 3 && ` +${acquereur.quartiers.length - 3}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="space-y-1">
                        <div>{acquereur.type_projet.replace('_', ' ')}</div>
                        <div className="text-gray-500">{acquereur.timing.replace('_', ' ')}</div>
                        <div className="text-gray-500">
                          {acquereur.types_bien.join(', ')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {acquereur.budget_max ? (
                        <div>{acquereur.budget_max.toLocaleString('fr-FR')} €</div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                      {acquereur.surface_min && (
                        <div className="text-gray-500">{acquereur.surface_min} m²</div>
                      )}
                      {acquereur.pieces_min && (
                        <div className="text-gray-500">T{acquereur.pieces_min}+</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        acquereur.source === 'formulaire'
                          ? 'bg-blue-100 text-blue-800'
                          : acquereur.source === 'agence'
                          ? 'bg-purple-100 text-purple-800'
                          : acquereur.source === 'claude_code'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {acquereur.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        acquereur.actif
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {acquereur.actif ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/agence/acquereur/${acquereur.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Détails
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {acquereurs.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Aucun acquéreur pour le moment
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

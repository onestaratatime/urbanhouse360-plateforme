import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { FormulaireInscription } from '@/lib/types';
import { isAgenceAuthenticated } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Vérifier l'authentification
    const isAuth = await isAgenceAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const data: FormulaireInscription = await request.json();

    // Validation
    if (!data.prenom || !data.email || !data.telephone) {
      return NextResponse.json(
        { error: 'Les coordonnées sont obligatoires' },
        { status: 400 }
      );
    }

    if (!data.quartiers || data.quartiers.length === 0) {
      return NextResponse.json(
        { error: 'Au moins un quartier doit être sélectionné' },
        { status: 400 }
      );
    }

    if (!data.types_bien || data.types_bien.length === 0) {
      return NextResponse.json(
        { error: 'Au moins un type de bien doit être sélectionné' },
        { status: 400 }
      );
    }

    // Insertion avec service_role pour l'agence
    const { data: insertedData, error } = await supabaseAdmin
      .from('acquereurs')
      .insert({
        test: false,
        source: 'agence',
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone,
        consentement_contact: data.consentement_contact,
        quartiers: data.quartiers,
        precision_localisation: data.precision_localisation || null,
        type_projet: data.type_projet,
        timing: data.timing,
        types_bien: data.types_bien,
        surface_min: data.surface_min || null,
        pieces_min: data.pieces_min || null,
        budget_max: data.budget_max || null,
        criteres_principaux: data.criteres_principaux || null,
        criteres_principaux_autre: data.criteres_principaux_autre || null,
        criteres_secondaires: data.criteres_secondaires || null,
        description_projet: data.description_projet || null,
        actif: true
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: insertedData.id });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

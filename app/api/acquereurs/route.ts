import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { FormulaireInscription } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const data: FormulaireInscription = await request.json();

    // Validation basique
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

    if (!data.consentement_contact) {
      return NextResponse.json(
        { error: 'Le consentement est obligatoire' },
        { status: 400 }
      );
    }

    // Insertion dans Supabase
    const { data: insertedData, error } = await supabase
      .from('acquereurs')
      .insert({
        source: 'direct',
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

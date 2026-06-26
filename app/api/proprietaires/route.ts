import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validation basique
    if (!data.adresse || !data.prenom || !data.email || !data.telephone) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires' },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Insérer dans la base de données
    const { data: insertedData, error } = await supabase
      .from('proprietaires')
      .insert({
        adresse: data.adresse,
        prenom: data.prenom,
        nom: data.nom || null, // Optionnel - garde le champ en DB mais non requis
        email: data.email,
        telephone: data.telephone,
        source: 'formulaire',
        actif: true,
        statut: 'nouveau'
      })
      .select()
      .single();

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: insertedData },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

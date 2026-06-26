/**
 * Cron job pour maintenir Supabase actif
 *
 * Ce endpoint est appelé automatiquement par Vercel toutes les 6 jours
 * pour empêcher Supabase Free de se mettre en pause (inactivité > 7 jours)
 *
 * Configuration dans vercel.json
 */

import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  // Vérifier que la requête vient bien de Vercel Cron
  const authHeader = request.headers.get('authorization');

  // En production, Vercel ajoute un header Authorization avec CRON_SECRET
  // En développement, on accepte toutes les requêtes
  if (process.env.NODE_ENV === 'production') {
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  try {
    console.log('🔄 Cron: Keeping Supabase alive...');

    // Faire une simple requête pour "réveiller" la base
    const { data, error } = await supabase
      .from('acquereurs_publics')
      .select('id')
      .limit(1);

    if (error) {
      console.error('❌ Cron: Error keeping Supabase alive:', error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }

    console.log('✅ Cron: Supabase is alive!');

    return NextResponse.json({
      success: true,
      message: 'Supabase kept alive successfully',
      timestamp: new Date().toISOString(),
      recordsChecked: data?.length || 0
    });

  } catch (error: any) {
    console.error('❌ Cron: Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

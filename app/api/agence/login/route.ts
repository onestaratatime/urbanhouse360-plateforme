import { NextResponse } from 'next/server';
import { setAgenceAuth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === process.env.AGENCE_PASSWORD) {
      await setAgenceAuth();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Mot de passe incorrect' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

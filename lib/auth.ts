import { cookies } from 'next/headers';

export const AGENCE_COOKIE_NAME = 'agence_auth';

export async function isAgenceAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AGENCE_COOKIE_NAME);
  return authCookie?.value === 'authenticated';
}

export async function setAgenceAuth() {
  const cookieStore = await cookies();
  cookieStore.set(AGENCE_COOKIE_NAME, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 7 jours
  });
}

export async function clearAgenceAuth() {
  const cookieStore = await cookies();
  cookieStore.delete(AGENCE_COOKIE_NAME);
}

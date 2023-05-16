import { JWTPayload, jwtVerify } from 'jose';

export function getJwtSecretKey(): Uint8Array {
  const secret: string = process.env.NEXT_PUBLIC_JWT_SECRET_KEY ?? '';

  if (!secret) {
    throw new Error('JWT Secret key is not matched');
  }

  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload }: { payload: JWTPayload } = await jwtVerify(token, getJwtSecretKey());

    return payload;
  } catch (error) {
    return null;
  }
}

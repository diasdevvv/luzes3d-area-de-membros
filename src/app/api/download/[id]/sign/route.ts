import { NextResponse } from 'next/server';
import crypto from 'crypto';

const SECRET = 'aether-secret-key-12345';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await params for Next.js 15+ asynchronous routing
  const { id } = await params;

  // Check Authorization header for mock premium login validation
  const authHeader = request.headers.get('Authorization');
  const isPremium = authHeader === 'Bearer AETHER_PRO_KEY';

  if (!isPremium) {
    return NextResponse.json(
      { error: 'Não autorizado. Por favor, faça login com seu código premium na aba "Sobre".' },
      { status: 401 }
    );
  }

  const timestamp = Date.now();
  const dataToSign = `${id}:${timestamp}`;
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(dataToSign)
    .digest('hex');

  // Token is timestamp.signature
  const token = `${timestamp}.${signature}`;

  return NextResponse.json({
    downloadUrl: `/api/download/${id}?token=${token}`
  });
}

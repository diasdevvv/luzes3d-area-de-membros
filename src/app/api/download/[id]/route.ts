import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import modelsDataRaw from '@/data/models.json';
import { printableBasesData } from '@/data/basesData';

const SECRET = 'aether-secret-key-12345';
const EXPIRATION_MS = 5 * 60 * 1000;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return new Response('Acesso negado: Assinatura de download ausente.', { status: 403 });
  }

  try {
    const [timestampStr, signature] = token.split('.');
    const timestamp = parseInt(timestampStr);

    if (isNaN(timestamp) || Date.now() - timestamp > EXPIRATION_MS || Date.now() < timestamp - 60000) {
      return new Response('Acesso negado: Link de download expirado ou com hora inválida.', { status: 403 });
    }

    const dataToSign = `${id}:${timestamp}`;
    const expectedSignature = crypto
      .createHmac('sha256', SECRET)
      .update(dataToSign)
      .digest('hex');

    if (signature !== expectedSignature) {
      return new Response('Acesso negado: Assinatura de download inválida.', { status: 403 });
    }

    const zipPath = path.join(process.cwd(), 'public', 'downloads', `${id}.zip`);

    if (!fs.existsSync(zipPath)) {
      return new Response('Arquivo ZIP não encontrado no servidor.', { status: 404 });
    }

    const model = (modelsDataRaw as any[]).find(m => m.id === id);
    const baseItem = printableBasesData.find(b => b.id === id);
    const cleanModelName = baseItem?.nome || model?.nome || model?.slug || `download-${id}`;

    const asciiFileName = `${cleanModelName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]/g, '_')}.zip`;

    const encodedFileName = encodeURIComponent(`${cleanModelName}.zip`)
      .replace(/['()]/g, escape)
      .replace(/\*/g, '%2A');

    const zipBuffer = fs.readFileSync(zipPath);

    return new Response(new Uint8Array(zipBuffer), {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${asciiFileName}"; filename*=UTF-8''${encodedFileName}`,
        'Content-Length': zipBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('ZIP Download error:', error);
    return new Response('Erro interno do servidor ao servir arquivo ZIP.', { status: 500 });
  }
}

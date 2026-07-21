import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import JSZip from 'jszip';
import modelsDataRaw from '@/data/models.json';
import { printableBasesData } from '@/data/basesData';

const SECRET = 'aether-secret-key-12345';
const EXPIRATION_MS = 5 * 60 * 1000; // 5 minutes expiration window

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await params for Next.js 15+ compatibility
  const { id } = await params;

  // Extract the signed token from the URL query parameters
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return new Response('Acesso negado: Assinatura de download ausente.', { status: 403 });
  }

  try {
    const [timestampStr, signature] = token.split('.');
    const timestamp = parseInt(timestampStr);

    // Validate timestamp sanity and check expiration
    if (isNaN(timestamp) || Date.now() - timestamp > EXPIRATION_MS || Date.now() < timestamp - 60000) {
      return new Response('Acesso negado: Link de download expirado ou com hora inválida.', { status: 403 });
    }

    // Verify cryptographic signature integrity
    const dataToSign = `${id}:${timestamp}`;
    const expectedSignature = crypto
      .createHmac('sha256', SECRET)
      .update(dataToSign)
      .digest('hex');

    if (signature !== expectedSignature) {
      return new Response('Acesso negado: Assinatura de download inválida.', { status: 403 });
    }

    // Find in models or printable bases
    const model = (modelsDataRaw as any[]).find(m => m.id === id);
    const baseItem = printableBasesData.find(b => b.id === id);

    let folderPath = "";
    let cleanModelName = "";

    if (baseItem) {
      folderPath = path.join(process.cwd(), 'public', 'bases imprimiveis', baseItem.pastaOriginal);
      cleanModelName = baseItem.nome;
    } else if (model) {
      const folderName = model.pastaOriginal;
      const baseTopLuminarias = path.join(process.cwd(), 'public', 'top luminarias');

      if (folderName) {
        folderPath = path.join(baseTopLuminarias, folderName);
      }

      if (!folderPath || !fs.existsSync(folderPath)) {
        const availableFolders = fs.readdirSync(baseTopLuminarias);
        const matched = availableFolders.find(f => 
          f.toLowerCase() === folderName?.toLowerCase() || 
          f.toLowerCase().includes(model.slug?.toLowerCase() || '')
        );
        if (matched) {
          folderPath = path.join(baseTopLuminarias, matched);
        }
      }
      cleanModelName = model.nome || model.slug || `luminaria-${id}`;
    }

    if (!folderPath || !fs.existsSync(folderPath)) {
      return new Response('Erro no servidor: Pasta do modelo 3D não localizada no disco.', { status: 404 });
    }

    // Create a new JSZip archive instance
    const zip = new JSZip();

    // Recursively add all files in folderPath to zip archive
    function addFilesToZip(dir: string, zipFolder: JSZip) {
      const list = fs.readdirSync(dir);
      for (const item of list) {
        if (item === '.DS_Store' || item.startsWith('._')) continue; // skip system trash
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
          const subZip = zipFolder.folder(item);
          if (subZip) {
            addFilesToZip(itemPath, subZip);
          }
        } else {
          const fileData = fs.readFileSync(itemPath);
          zipFolder.file(item, fileData);
        }
      }
    }

    addFilesToZip(folderPath, zip);

    // Generate in-memory ZIP buffer
    const zipBuffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });

    const zipFileName = `${cleanModelName}.zip`;

    // Safe ASCII fallback for legacy headers
    const asciiFileName = `${cleanModelName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]/g, '_')}.zip`;

    // RFC 6266 UTF-8 encoded filename
    const encodedFileName = encodeURIComponent(zipFileName)
      .replace(/['()]/g, escape)
      .replace(/\*/g, '%2A');

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
    return new Response('Erro interno do servidor ao gerar arquivo ZIP.', { status: 500 });
  }
}

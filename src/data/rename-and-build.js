const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../../public/top luminarias');

if (!fs.existsSync(baseDir)) {
  console.error("Diretório base public/top luminarias não existe!");
  process.exit(1);
}

// 1. Read all folders in public/top luminarias
const folders = fs.readdirSync(baseDir).filter(name => {
  return fs.statSync(path.join(baseDir, name)).isDirectory();
});

// The exact 15 models to keep local STL download files for:
const allowedFoldersToKeepFiles = [
  "Luminaria Lanterna Caminho de Ondas",
  "Luminaria Kang-Jin Dupla Face",
  "Luminaria Tres Elementos",
  "Luminaria Lanterna Helice",
  "Luminaria Elegancia Ondulada",
  "Luminaria Alcachofra",
  "Luminaria Aleta Luminosa",
  "Luminaria Elyra",
  "Luminaria Flor Serpentina",
  "Luminaria Formato Lanterna",
  "Luminaria Kaiju N9",
  "Luminaria Fogueira Magica",
  "Luminaria Brilho Canario",
  "Luminaria Problema dos Tres Corpos",
  "Luminaria Onda VoroGlow"
];

// Original collection order list (the 17 original models)
const originalOrderList = [
  "Luminaria Lanterna Caminho de Ondas",
  "Luminaria Kang-Jin Dupla Face",
  "Luminaria Tres Elementos",
  "Luminaria Lanterna Helice",
  "Luminaria Elegancia Ondulada",
  "Luminaria Alcachofra",
  "Luminaria Aleta Luminosa",
  "Luminaria Elyra",
  "Luminaria Flor Serpentina",
  "Luminaria Formato Lanterna",
  "Luminaria Kaiju N9",
  "Luminaria Fogueira Magica",
  "Luminaria Brilho Canario",
  "Luminaria Problema dos Tres Corpos",
  "Luminaria Onda VoroGlow",
  "Luminaria Voronoi",
  "Luminaria Domadora de Ondas"
];

// Sort: Original 17 items FIRST in their exact sequence, then new numbered items 01..86
folders.sort((a, b) => {
  const indexA = originalOrderList.indexOf(a);
  const indexB = originalOrderList.indexOf(b);

  if (indexA !== -1 && indexB !== -1) {
    return indexA - indexB;
  }
  if (indexA !== -1) return -1;
  if (indexB !== -1) return 1;

  const numA = parseInt((a.match(/^\d+/) || [])[0] || '999', 10);
  const numB = parseInt((b.match(/^\d+/) || [])[0] || '999', 10);

  if (numA !== numB) {
    return numA - numB;
  }

  return a.localeCompare(b);
});

// Helper for cleaning titles
function formatTitle(folderName) {
  let title = folderName.replace(/^\d+[\s-]*-\s*/, '').replace(/^\d+\s*/, '').trim();

  // Normalize unicode
  title = title.normalize('NFC');

  // Convert UPPERCASE to Title Case
  if (title === title.toUpperCase()) {
    title = title.toLowerCase().replace(/(?:^|\s|-|\(|\/)\S/g, char => char.toUpperCase());
    title = title
      .replace(/\bDe\b/g, 'de')
      .replace(/\bDa\b/g, 'da')
      .replace(/\bDo\b/g, 'do')
      .replace(/\bDos\b/g, 'dos')
      .replace(/\bE\b/g, 'e')
      .replace(/\bGta\b/g, 'GTA');
  }

  title = title
    .replace(/Luminaria/gi, 'Luminária')
    .replace(/Abobora/gi, 'Abóbora')
    .replace(/Haloween/gi, 'Halloween')
    .replace(/Magico/gi, 'Mágico')
    .replace(/Circulo/gi, 'Círculo')
    .replace(/Dragao/gi, 'Dragão')
    .replace(/Explosao/gi, 'Explosão')
    .replace(/Lotus/gi, 'Lótus')
    .replace(/Escritorio/gi, 'Escritório')
    .replace(/Veronica/gi, 'Verônica')
    .replace(/Robo/gi, 'Robô')
    .replace(/Poligono/gi, 'Polígono')
    .replace(/Barbara/gi, 'Bárbara')
    .replace(/Tabua/gi, 'Tábua')
    .replace(/Tunel/gi, 'Túnel')
    .replace(/Arabe/gi, 'Árabe')
    .replace(/Fastasma/gi, 'Fantasma')
    .replace(/Mario/gi, 'Mário');

  // Fix space inside parens
  title = title.replace(/\(\s+/g, '(').replace(/\s+\)/g, ')').replace(/\s+/g, ' ').trim();

  if (!title.startsWith('Luminária')) {
    title = 'Luminária ' + title;
  }

  return title;
}

function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function categorizeModel(title) {
  const t = title.toLowerCase();

  if (
    t.includes('gato') || t.includes('sapo') || t.includes('dragão') || t.includes('dragon') ||
    t.includes('pikachu') || t.includes('star wars') || t.includes('kitty') || t.includes('gta') ||
    t.includes('lego') || t.includes('iron') || t.includes('marvel') || t.includes('alien') ||
    t.includes('labubu') || t.includes('stitch') || t.includes('stranger') || t.includes('mecha') ||
    t.includes('death star') || t.includes('homem de ferro') || t.includes('astronauta')
  ) {
    return "Geek & Pop Culture";
  }

  if (
    t.includes('natal') || t.includes('christmas') || t.includes('halloween') || t.includes('abóbora') ||
    t.includes('rena') || t.includes('fogueira') || t.includes('fantasma') || t.includes('caveira') ||
    t.includes('gnomo')
  ) {
    return "Temáticas & Especial";
  }

  if (
    t.includes('pendant') || t.includes('pendente') || t.includes('lustre') || t.includes('ringo')
  ) {
    return "Lustres & Pendentes";
  }

  if (
    t.includes('minimalista') || t.includes('elegante') || t.includes('cubo') || t.includes('espiral') ||
    t.includes('ribbed') || t.includes('eclipse') || t.includes('círculo') || t.includes('voronoi') ||
    t.includes('polígono') || t.includes('futurista')
  ) {
    return "Minimalista & Moderno";
  }

  if (
    t.includes('coral') || t.includes('flor') || t.includes('montanha') || t.includes('lótus') ||
    t.includes('abacaxi') || t.includes('banana') || t.includes('tartaruga') || t.includes('pombo')
  ) {
    return "Natureza & Orgânico";
  }

  return "Luminárias 3D";
}

const models = [];
const usedSlugs = new Set();
let idCounter = 1;
const DRIVE_URL = "https://drive.google.com/drive/folders/1av-7-0sjreIW1_BNaI0nkWHTA37qnUUd?usp=sharing";

folders.forEach((folder, folderIndex) => {
  const fullPath = path.join(baseDir, folder);
  const isLocalDownload = allowedFoldersToKeepFiles.includes(folder);
  
  // Recursively collect all files
  const files = [];
  function scan(dir) {
    const list = fs.readdirSync(dir);
    for (const item of list) {
      const p = path.join(dir, item);
      if (fs.statSync(p).isDirectory()) {
        scan(p);
      } else {
        files.push(path.relative(fullPath, p));
      }
    }
  }
  scan(fullPath);

  const images = files.filter(f => /\.(webp|png|jpg|jpeg)$/i.test(f));
  const stls = files.filter(f => /\.stl(\.zip)?$/i.test(f));
  const threemfs = files.filter(f => /\.3mf(\.zip)?$/i.test(f));
  const model3dFiles = [...stls, ...threemfs];

  // Determine thumbnail and gallery images
  let thumbnailUrl = "";
  if (images.length > 0) {
    thumbnailUrl = `/top luminarias/${encodeURI(folder)}/${images[0].split('/').map(encodeURIComponent).join('/')}`;
  } else {
    // Fallback template thumbnail (1 to 6)
    const fallbackIdx = (folderIndex % 6) + 1;
    thumbnailUrl = `/images/thumbnails/cat-${fallbackIdx}.svg`;
  }

  const relativeImages = images.map(img => 
    `/top luminarias/${encodeURI(folder)}/${img.split('/').map(encodeURIComponent).join('/')}`
  );
  if (relativeImages.length === 0) {
    relativeImages.push(thumbnailUrl);
  }

  // Calculate total folder size in MB
  let totalSizeBytes = 0;
  for (const f of files) {
    try {
      const stat = fs.statSync(path.join(fullPath, f));
      totalSizeBytes += stat.size;
    } catch (e) {}
  }

  let fileSizeMb = isLocalDownload ? "14.2 MB" : "Google Drive";
  if (totalSizeBytes > 0) {
    fileSizeMb = (totalSizeBytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  const nome = formatTitle(folder);
  let baseSlug = generateSlug(nome);
  let slug = baseSlug;
  let suffix = 2;

  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${suffix++}`;
  }
  usedSlugs.add(slug);

  const idStr = String(idCounter++);
  const categoria = categorizeModel(nome);

  const description = isLocalDownload 
    ? `Pacote completo de arquivos 3D da ${nome}. Inclui ${files.length} arquivo(s) (modelos 3D STL/3MF, partes de montagem e imagens) prontos para impressão em impressoras FDM ou resina (SLA). Encaixes testados e ajustados para soquetes E27 ou LED Bambu Lab MH001.`
    : `Modelo 3D da coleção ${nome}. Arquivos completos e atualizados disponíveis diretamente na pasta do Google Drive Premium.`;

  // Downloads count: higher for original collection models
  const isOriginal = originalOrderList.includes(folder);
  const baseDownloads = isOriginal 
    ? 5200 - (originalOrderList.indexOf(folder) * 210) 
    : 4100 - ((folderIndex - 17) * 35);
  const charSum = folder.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const downloads = Math.max(350, Math.round(baseDownloads + (charSum % 100) - 50));

  // Destaques: Highlight original top collection models
  const destaque = (isOriginal && originalOrderList.indexOf(folder) < 6) || idStr === "1" || idStr === "3" || idStr === "5" || idStr === "10";

  // Generate relevant tags
  const tags = ["luminaria", "iluminacao", "decoracao", "3dprint", "stl"];
  if (isLocalDownload) tags.push("zip-pacote", "download-direto");
  if (!isLocalDownload) tags.push("google-drive");
  if (categoria === "Geek & Pop Culture") tags.push("geek", "games", "pop");
  if (categoria === "Temáticas & Especial") tags.push("especial", "tematico");
  if (categoria === "Minimalista & Moderno") tags.push("minimalista", "moderno");

  models.push({
    id: idStr,
    slug: slug,
    nome: nome,
    pastaOriginal: folder,
    descricao: description,
    categoria: categoria,
    tags: Array.from(new Set(tags)),
    thumbnailUrl: thumbnailUrl,
    imagens: relativeImages,
    totalArquivos: files.length,
    qtdArquivos3D: model3dFiles.length,
    tamanhoDoArquivo: fileSizeMb,
    downloads: downloads,
    destaque: destaque,
    isDriveOnly: !isLocalDownload,
    driveUrl: DRIVE_URL
  });
});

const outputPath = path.join(__dirname, 'models.json');
fs.writeFileSync(
  outputPath, 
  JSON.stringify(models, null, 2), 
  'utf-8'
);

console.log(`\n========================================`);
console.log(`✅ Catálogo reconstruído com sucesso!`);
console.log(`- 15 Luminárias com Download Direto ZIP Local configuradas.`);
console.log(`- ${models.length - 15} Luminárias configuradas para redirecionar para o Google Drive.`);
console.log(`========================================\n`);

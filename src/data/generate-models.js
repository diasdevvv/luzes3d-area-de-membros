const fs = require('fs');
const path = require('path');

const categories = [
  "Luminárias 3D",
  "Decoração",
  "Geek & Games",
  "Organização",
  "Artístico",
  "Utilidades"
];

const adjectives = [
  "Futurista", "Orgânico", "Geométrico", "Minimalista", "Industrial", 
  "Vintage", "Cyberpunk", "Abstrato", "Ergonômico", "Espiral", 
  "Paramétrico", "Clássico", "Nórdico", "Gótico", "Art Déco"
];

const types = {
  "Luminárias 3D": [
    "Luminária LED", "Luz de Cabeceira", "Pendente Espacial", "Lustre Origami", 
    "Abajur Hexagonal", "Lanterna Mágica", "Painel Difusor", "Cúpula de Mesa"
  ],
  "Decoração": [
    "Vaso Canelado", "Centro de Mesa", "Escultura de Parede", "Porta-Velas Espiral", 
    "Quadro Relevo 3D", "Cachepot Facetado", "Suporte para Plantas", "Adorno de Estante"
  ],
  "Geek & Games": [
    "Action Figure", "Suporte para Headset", "Busto Colecionável", "Porta-Cartucho Switch", 
    "Miniatura RPG", "Réplica Espada", "Organizador de Dados", "Suporte para Controle"
  ],
  "Organização": [
    "Organizador de Cabos", "Porta-Canetas Modular", "Gaveteiro de Mesa", "Gancho Multiuso", 
    "Suporte de Celular", "Porta-Chaves Magnético", "Organizador de Gavetas", "Dispenser de Fita"
  ],
  "Artístico": [
    "Busto Clássico", "Escultura Orgânica", "Mão de Pose", "Máscara Decorativa", 
    "Torso Abstrato", "Crânio Geométrico", "Relevo Topográfico", "Estátua Contemplativa"
  ],
  "Utilidades": [
    "Espremedor Cítrico", "Funil Dobrável", "Porta-Copos Térmico", "Fecho de Embalagem", 
    "Suporte de Notebook", "Saboneteira Drenável", "Pino de Prateleira", "Abridor Multiuso"
  ]
};

const tagsMap = {
  "Luminárias 3D": ["luminaria", "luz", "iluminacao", "led", "decor", "quarto", "sala"],
  "Decoração": ["decoracao", "design", "vaso", "planta", "moderno", "estilo", "sala"],
  "Geek & Games": ["geek", "games", "pop", "setup", "gamer", "suporte", "colecionavel"],
  "Organização": ["organizacao", "escritorio", "mesa", "pratico", "utilidade", "suporte"],
  "Artístico": ["arte", "escultura", "busto", "anatomia", "abstrato", "exclusivo"],
  "Utilidades": ["utilidades", "cozinha", "ferramenta", "pratico", "dia-a-dia", "impressao-facil"]
};

function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const models = [];

for (let i = 1; i <= 200; i++) {
  const cat = categories[i % categories.length];
  const typeList = types[cat];
  const type = typeList[Math.floor(Math.random() * typeList.length)];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  
  const idStr = String(i);
  const name = `${type} ${adj}`;
  const slug = `${generateSlug(name)}-${idStr}`;
  
  // File size between 2.5 MB and 48.0 MB
  const fileSize = (2.5 + Math.random() * 45.5).toFixed(1) + " MB";
  
  // Highlight around 15% of the models
  const destaque = i % 7 === 0;
  
  // Description mock text
  const descricao = `Este modelo 3D de ${name} foi projetado especificamente para impressão 3D por deposição de material fundido (FDM) ou resina (SLA). O arquivo STL está otimizado com tolerâncias perfeitas, permitindo montagem suave (quando aplicável) e dispensando suportes de impressão na maioria das orientações padrão. Ideal para transformar seu ambiente com um toque de design ${adj.toLowerCase()} de alta qualidade.`;
  
  // Custom tag list
  const baseTags = tagsMap[cat];
  const uniqueTags = new Set(["stl", "3dprint", ...baseTags]);
  while (uniqueTags.size < 5) {
    uniqueTags.add(adjectives[Math.floor(Math.random() * adjectives.length)].toLowerCase());
  }
  
  // Thumbnail mapping. We will use a standard index to reuse beautiful generated placeholder images.
  // We'll have about 6 distinctive thumbnails, one for each category, to make loading and rendering look clean.
  const thumbIndex = (i % 6) + 1;
  const thumbnailUrl = `/images/thumbnails/cat-${thumbIndex}.webp`;
  
  models.push({
    id: idStr,
    slug: slug,
    nome: name,
    descricao: descricao,
    categoria: cat,
    tags: Array.from(uniqueTags),
    thumbnailUrl: thumbnailUrl,
    stlUrl: `/api/download/${idStr}`,
    tamanhoDoArquivo: fileSize,
    destaque: destaque
  });
}

const outputDir = __dirname; // This is src/data since we write inside src/data/

fs.writeFileSync(
  path.join(outputDir, 'models.json'), 
  JSON.stringify(models, null, 2), 
  'utf-8'
);

console.log("Programmatically generated 200 models successfully in src/data/models.json!");

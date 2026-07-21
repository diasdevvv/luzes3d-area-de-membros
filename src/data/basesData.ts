export interface PrintableBase {
  id: string;
  slug: string;
  nome: string;
  pastaOriginal: string;
  descricao: string;
  categoria: string;
  socketType: 'E27' | 'E14' | 'LED' | 'E26/E27';
  thumbnailUrl: string;
  imagens: string[];
  totalArquivos: number;
  qtdArquivos3D: number;
  tamanhoDoArquivo: string;
  downloads: number;
  destaque: boolean;
  compatibilidade: string;
}

export const printableBasesData: PrintableBase[] = [
  {
    id: "base-e27-moon",
    slug: "base-e27-soquete-luminaria",
    nome: "Base Soquete E27 para Luminárias 3D",
    pastaOriginal: "E27 socket Base for Moon Lamp by LeHa Design",
    descricao: "Base imprimível projetada para encaixe perfeito de soquete elétrico padrão E27. Compatível com todas as luminárias 3D da coleção. Inclui canal para cabo de energia e trava de segurança.",
    categoria: "Bases E27",
    socketType: "E27",
    thumbnailUrl: "/bases imprimiveis/E27 socket Base for Moon Lamp by LeHa Design/Preview.webp",
    imagens: [
      "/bases imprimiveis/E27 socket Base for Moon Lamp by LeHa Design/Preview.webp",
      "/bases imprimiveis/E27 socket Base for Moon Lamp by LeHa Design/Preview 2.webp",
      "/bases imprimiveis/E27 socket Base for Moon Lamp by LeHa Design/preview 3.webp",
      "/bases imprimiveis/E27 socket Base for Moon Lamp by LeHa Design/preview 4.webp",
      "/bases imprimiveis/E27 socket Base for Moon Lamp by LeHa Design/preview 5.webp"
    ],
    totalArquivos: 7,
    qtdArquivos3D: 2,
    tamanhoDoArquivo: "0.9 MB",
    downloads: 3840,
    destaque: true,
    compatibilidade: "Soquete Padrão E27 + Cabo Bivolt"
  },
  {
    id: "base-e14-compacta",
    slug: "base-e14-soquete-compacta",
    nome: "Base Soquete E14 (Compacta)",
    pastaOriginal: "E14 Base",
    descricao: "Base especial com rosca e trava para soquetes E14 menores. Perfeita para luminárias de cabeceira compactas e lâmpadas vela LED.",
    categoria: "Bases E14",
    socketType: "E14",
    thumbnailUrl: "/bases imprimiveis/E14 Base/2024-05-27_79d16702a3e54.webp",
    imagens: [
      "/bases imprimiveis/E14 Base/2024-05-27_79d16702a3e54.webp",
      "/bases imprimiveis/E14 Base/2024-05-27_6ab2b9b16d53d.webp"
    ],
    totalArquivos: 2,
    qtdArquivos3D: 1,
    tamanhoDoArquivo: "0.1 MB",
    downloads: 2150,
    destaque: true,
    compatibilidade: "Soquete E14 Fino + Lâmpadas Vela LED"
  },
  {
    id: "base-led-rock",
    slug: "base-rocha-led-puck-light",
    nome: "Base Textura Rocha para Módulo / Fita LED",
    pastaOriginal: "Rock base LED for Lamp Moon",
    descricao: "Base estilizada com textura orgânica de rocha/pedra. Desenvolvida para encaixe de disco LED (Puck Light) sem fio ou fita LED com controle remoto.",
    categoria: "Bases LED",
    socketType: "LED",
    thumbnailUrl: "/bases imprimiveis/Rock base LED for Lamp Moon/2025-05-07_c2fd45b03a06a.webp",
    imagens: [
      "/bases imprimiveis/Rock base LED for Lamp Moon/2025-05-07_c2fd45b03a06a.webp",
      "/bases imprimiveis/Rock base LED for Lamp Moon/2025-05-07_3b7151a2a6f2a.webp"
    ],
    totalArquivos: 3,
    qtdArquivos3D: 1,
    tamanhoDoArquivo: "4.4 MB",
    downloads: 3120,
    destaque: true,
    compatibilidade: "Módulo LED Puck Light / Fita LED RGB"
  },
  {
    id: "base-e27-lamp2",
    slug: "base-e27-lamp-2-foxwood",
    nome: "Base E27 Lamp 2.0 (Foxwood Design)",
    pastaOriginal: "Base e27 LAMP 2.0",
    descricao: "Versão otimizada 2.0 com saídas de ar térmicas para lâmpadas LED E27 de alta potência. Design limpo e impressão rápida sem suportes.",
    categoria: "Bases E27",
    socketType: "E27",
    thumbnailUrl: "/bases imprimiveis/Base e27 LAMP 2.0/2025-03-28_deb4070fc79b6.webp",
    imagens: [
      "/bases imprimiveis/Base e27 LAMP 2.0/2025-03-28_deb4070fc79b6.webp"
    ],
    totalArquivos: 2,
    qtdArquivos3D: 1,
    tamanhoDoArquivo: "0.2 MB",
    downloads: 1980,
    destaque: false,
    compatibilidade: "Soquete E27 + Lâmpadas LED 9W-15W"
  },
  {
    id: "base-e27-roscada",
    slug: "base-suporte-roscado-e27",
    nome: "Base de Suporte Roscado E27 (Ø100mm x 28mm)",
    pastaOriginal: "LAMP BASE FOR E27 SUPPORT",
    descricao: "Base circular ergonômica com rosca integrada de 100mm de diâmetro por 28mm de altura. Desenvolvida para encaixe firme e estável em superfícies retas e mesas de cabeceira.",
    categoria: "Bases E27",
    socketType: "E27",
    thumbnailUrl: "/bases imprimiveis/LAMP BASE FOR E27 SUPPORT/2024-09-28_500334da0ee18.webp",
    imagens: [
      "/bases imprimiveis/LAMP BASE FOR E27 SUPPORT/2024-09-28_500334da0ee18.webp",
      "/bases imprimiveis/LAMP BASE FOR E27 SUPPORT/2024-09-28_56d5e10d140e2.webp",
      "/bases imprimiveis/LAMP BASE FOR E27 SUPPORT/2024-09-28_6bd1bb8d858d6.webp",
      "/bases imprimiveis/LAMP BASE FOR E27 SUPPORT/2024-09-28_fbc6caaf99644.webp"
    ],
    totalArquivos: 6,
    qtdArquivos3D: 1,
    tamanhoDoArquivo: "1.2 MB",
    downloads: 2950,
    destaque: false,
    compatibilidade: "Soquetes E27 + Lâmpadas LED Bivolt"
  },
  {
    id: "base-wavy-e27",
    slug: "base-wavy-petg-pes",
    nome: "Base Wavy com Pés (PETG / E26 / E27)",
    pastaOriginal: "Wavy+Lamp+-+E27+E26+Base+-+PETG",
    descricao: "Base de design ondulado 'Wavy' com pés elevados intercambiáveis (curtos e longos). Compatível com soquetes E26/E27. Projetada para impressão em PETG/PLA.",
    categoria: "Bases E27",
    socketType: "E26/E27",
    thumbnailUrl: "/bases imprimiveis/Wavy+Lamp+-+E27+E26+Base+-+PETG/2025-01-07_1fe2bbb9c1c538.webp",
    imagens: [
      "/bases imprimiveis/Wavy+Lamp+-+E27+E26+Base+-+PETG/2025-01-07_1fe2bbb9c1c538.webp",
      "/bases imprimiveis/Wavy+Lamp+-+E27+E26+Base+-+PETG/2025-08-09_d531ea9d5d9e3.webp"
    ],
    totalArquivos: 6,
    qtdArquivos3D: 4,
    tamanhoDoArquivo: "138.0 MB",
    downloads: 2640,
    destaque: true,
    compatibilidade: "Soquetes E26 e E27 + Pés de Apoio"
  },
  {
    id: "base-waveglow",
    slug: "base-quadrada-waveglow",
    nome: "Base Minimalista Quadrada WaveGlow",
    pastaOriginal: "WaveGlow Lamp",
    descricao: "Suporte de base cúbica com linhas suaves para modelos da série WaveGlow. Encaixe central estabilizado.",
    categoria: "Bases LED",
    socketType: "LED",
    thumbnailUrl: "/bases imprimiveis/WaveGlow Lamp/8dc29ab765b2e166 (1).webp",
    imagens: [
      "/bases imprimiveis/WaveGlow Lamp/8dc29ab765b2e166 (1).webp"
    ],
    totalArquivos: 3,
    qtdArquivos3D: 2,
    tamanhoDoArquivo: "17.2 MB",
    downloads: 1840,
    destaque: false,
    compatibilidade: "Lâmpada LED Bivolt / Soquete E27"
  }
];

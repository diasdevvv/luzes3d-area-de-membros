import modelsDataRaw from '@/data/models.json';

interface ModelData {
  slug: string;
  [key: string]: unknown;
}

const modelsData = modelsDataRaw as ModelData[];

export async function generateStaticParams() {
  return modelsData.map((model) => ({
    slug: model.slug,
  }));
}

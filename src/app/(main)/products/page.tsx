import { ProductsPageClient } from '@/components/products-page-client';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string | string[] }>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const categoryParam = params?.category;
  const initialCategory = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;
  return <ProductsPageClient initialCategory={initialCategory ?? 'all'} />;
}

'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ProductGroup from '@/app/components/ProductGroup/ProductGroup';
import { useProducts } from '@/app/context/ProductContext';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const { products } = useProducts();

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.details.toLowerCase().includes(query.toLowerCase()) ||
      product.category.some((cat) =>
        cat.toLowerCase().includes(query.toLowerCase()),
      ),
  );

  return (
    <ProductGroup products={filteredProducts} category={[]} title={query} />
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}

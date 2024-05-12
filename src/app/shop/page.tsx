'use client';
import ProductGroup from '@/app/components/ProductGroup/ProductGroup';
import { useProducts } from '../context/ProductContext';

export default function Shop() {
  const { products } = useProducts();

  return <ProductGroup products={products} category={['all']} title={'SHOP'} />;
}

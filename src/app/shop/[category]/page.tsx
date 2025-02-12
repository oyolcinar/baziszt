'use client';
import { usePathname } from 'next/navigation';
import ProductGroup from '@/app/components/ProductGroup/ProductGroup';
import { useProducts } from '../../context/ProductContext';
import { useEffect } from 'react';

type CategoryKey =
  | 'new'
  | 'shirts-and-tops'
  | 'bottoms'
  | 'accessories'
  | 'oneOfone'
  | 'knitwear'
  | 'jackets'
  | 'latest-arrivals';

interface CategoryMapping {
  [key: string]: string[];
}

const categoryMapping: CategoryMapping = {
  'latest-arrivals': ['Latest arrivals'],
  'shirts-and-tops': ['Shirts & Tops'],
  bottoms: ['Shorts', 'Pants', 'Bottoms'],
  accessories: ['Accessories', 'Carry over'],
  oneOfone: ['One-of-one'],
  knitwear: ['Knitwear'],
  jackets: ['Jackets'],
};

export default function Shop() {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const categoryFromUrl = parts[2] as CategoryKey;
  const { products } = useProducts();

  const categoriesToShow = categoryMapping[categoryFromUrl];

  if (!categoriesToShow) {
    return <div className='text-8xl text-bordeux'>Category not found</div>;
  }

  const filteredProducts = products.filter((product) =>
    product.category.some((cat) => categoriesToShow.includes(cat)),
  );

  const categoryTitle =
    categoryFromUrl === 'oneOfone'
      ? 'One of One'
      : categoryFromUrl === 'latest-arrivals'
      ? 'Latest Arrivals'
      : categoryFromUrl === 'shirts-and-tops'
      ? 'Shirts & Tops'
      : categoryFromUrl.toUpperCase();

  return (
    <ProductGroup
      products={filteredProducts}
      category={categoriesToShow}
      title={categoryTitle}
    />
  );
}

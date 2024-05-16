'use client';
import { usePathname } from 'next/navigation';
import ProductGroup from '@/app/components/ProductGroup/ProductGroup';
import { useProducts } from '../../context/ProductContext';

type CategoryKey = 'new' | 'tops' | 'bottoms' | 'accessories' | 'oneOfone';

interface CategoryMapping {
  [key: string]: string[];
}

const categoryMapping: CategoryMapping = {
  new: ['SS24'],
  tops: ['Shirts & Tops'],
  bottoms: ['Shorts', 'Pants'],
  accessories: ['Accessories'],
  oneOfone: ['One-of-one'],
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
      : categoryFromUrl.toUpperCase();

  return (
    <ProductGroup
      products={filteredProducts}
      category={categoriesToShow}
      title={categoryTitle}
    />
  );
}

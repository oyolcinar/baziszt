import React from 'react';
import { dummyProductsArray } from '../../dummyData/dummyData';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../ProductCard/ProductCard';

interface CompleteTheLookProps {
  product: Product;
}

const findMatchingProducts = (
  products: Product[],
  currentProduct: Product,
): Product[] => {
  let result: Product[] = [];

  const filteredProducts = products.filter(
    (p) => p.id !== currentProduct.id && p.category !== currentProduct.category,
  );

  for (let product of filteredProducts) {
    if (currentProduct.colors.some((color) => product.colors.includes(color))) {
      result.push(product);
      if (result.length === 3) break;
    } else {
      //test için else atıldı
      result.push(product);
      if (result.length === 3) break;
    }
  }

  return result;
};

const CompleteTheLook: React.FC<CompleteTheLookProps> = ({ product }) => {
  const matchingProducts = findMatchingProducts(dummyProductsArray, product);

  return (
    <div className='md:mt-10 mb-20 flex flex-col items-center md:block'>
      <div className='text-bordeux font-quasimoda text-lg md:ml-10 mb-10'>
        COMPLETE THE LOOK
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 customMd:grid-cols-3 lg:grid-cols-3 md:pl-0 p-2 gap-2'>
        {matchingProducts.map((matchingProduct) => (
          <ProductCard key={matchingProduct.id} product={matchingProduct} />
        ))}
      </div>
    </div>
  );
};

export default CompleteTheLook;

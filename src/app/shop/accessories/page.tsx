import ProductGroup from '@/app/components/ProductGroup/ProductGroup';

import { dummyProductsArray } from '@/app/dummyData/dummyData';

export default function Accessories() {
  return (
    <ProductGroup
      products={dummyProductsArray}
      category='all'
      title={'ACCESSORIES'}
    />
  );
}

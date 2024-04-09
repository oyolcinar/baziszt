import ProductGroup from '@/app/components/ProductGroup/ProductGroup';

import { dummyProductsArray } from '@/app/dummyData/dummyData';

export default function Bottoms() {
  return (
    <ProductGroup
      products={dummyProductsArray}
      category='all'
      title={'BOTTOMS'}
    />
  );
}

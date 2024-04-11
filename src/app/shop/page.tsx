import ProductGroup from '@/app/components/ProductGroup/ProductGroup';

import { dummyProductsArray } from '@/app/dummyData/dummyData';

export default function Shop() {
  return (
    <ProductGroup products={dummyProductsArray} category='all' title={'SHOP'} />
  );
}

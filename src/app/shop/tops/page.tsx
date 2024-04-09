import ProductGroup from '@/app/components/ProductGroup/ProductGroup';

import { dummyProductsArray } from '@/app/dummyData/dummyData';

export default function Tops() {
  return (
    <ProductGroup products={dummyProductsArray} category='all' title={'TOPS'} />
  );
}

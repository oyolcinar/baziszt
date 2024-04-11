import Dummy1 from '../../../public/DummyImages/dummy1.png';
import Dummy2 from '../../../public/DummyImages/dummy2.png';
import Dummy3 from '../../../public/DummyImages/dummy3.png';

const dummyProduct1 = {
  id: '1',
  slug: 'test',
  name: 'TEST',
  images: [Dummy1.src, Dummy2.src, Dummy3.src],
  colors: ['black', 'white', 'red'],
  price: '100.00€',
  sizes: ['S', 'M', 'L'],
  category: 'tops',
};

const dummyProduct2 = {
  id: '2',
  slug: 'test-two',
  name: 'TEST2',
  images: [Dummy1.src, Dummy2.src, Dummy3.src],
  colors: ['blue', 'green'],
  price: '150.00€',
  sizes: ['M', 'L', 'XL'],
  category: 'bottoms',
};

const dummyProduct3 = {
  id: '3',
  slug: 'test-three',
  name: 'TEST3',
  images: [Dummy1.src, Dummy2.src, Dummy3.src],
  colors: ['brown'],
  price: '75.00€',
  sizes: ['One size'],
  category: 'accessories',
};

export { dummyProduct1, dummyProduct2, dummyProduct3 };

export const dummyProductsArray = Array.from({ length: 24 }, (_, index) => {
  let product;
  if (index % 3 === 0) {
    product = { ...dummyProduct1 };
  } else if (index % 3 === 1) {
    product = { ...dummyProduct2 };
  } else {
    product = { ...dummyProduct3 };
  }

  return { ...product, id: `${product.id}-${index}` };
});

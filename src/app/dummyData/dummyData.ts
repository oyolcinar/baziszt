import Dummy1 from '../../../public/DummyImages/dummy1.png';
import Dummy2 from '../../../public/DummyImages/dummy2.png';
import Dummy3 from '../../../public/DummyImages/dummy3.png';

export const dummyProduct = {
  id: '1',
  slug: '/',
  name: 'TEST',
  images: [Dummy1.src, Dummy2.src, Dummy3.src],
  colors: ['black', 'white', 'red'],
  price: '100.00€',
  sizes: ['S', 'M', 'L'],
  category: 'all',
};

export const dummyProductsArray = Array.from(
  { length: 24 },
  () => dummyProduct,
);

import CatalogImage from '../components/CatalogImage/CatalogImage';
import { StaticImageData } from 'next/image';

const images = Array.from({ length: 61 }, (_, i) => ({
  src: `https://baziszt.nuglobucket.org/public/SS24/${(i + 1)
    .toString()
    .padStart(2, '0')}.jpg`,
  alt: `Image ${i + 1}`,
}));

const CatalogPage: React.FC = () => {
  return (
    <div className='mx-4 mt-28 md:mt-40'>
      <div className='font-futura text-bordeux text-center text-2xl md:text-4xl mb-12'>
        SPRING SUMMER 2024
      </div>
      <div className='flex flex-wrap'>
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 4 < 2 ? 'md:flex-row' : 'md:flex-row-reverse'
            } w-full gap-4 mb-4`}
          >
            <CatalogImage
              src={image.src}
              alt={image.alt}
              large={index % 4 === 0 || index % 4 === 3}
            />
            {index + 1 < images.length && (
              <CatalogImage
                src={images[index + 1].src}
                alt={images[index + 1].alt}
                large={index % 4 === 1 || index % 4 === 2}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;

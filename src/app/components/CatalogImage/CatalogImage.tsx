import Image, { StaticImageData } from 'next/image';

interface CatalogImageProps {
  src: string | StaticImageData;
  alt: string;
  large: boolean;
}

const CatalogImage: React.FC<CatalogImageProps> = ({ src, alt, large }) => {
  return (
    <div
      className={`relative w-full ${large ? 'md:w-2/3' : 'md:w-1/3'} h-[100vh]`}
    >
      <Image
        src={src}
        alt={alt}
        objectFit='cover'
        layout='fill'
        objectPosition={large ? 'top' : 'center'}
      />
    </div>
  );
};

export default CatalogImage;

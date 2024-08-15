import CatalogImage from '../components/CatalogImage/CatalogImage';
import image01 from '../../../public/SS24/01.jpg';
import image02 from '../../../public/SS24/02.jpg';
import image03 from '../../../public/SS24/03.jpg';
import image04 from '../../../public/SS24/04.jpg';
import image05 from '../../../public/SS24/05.jpg';
import image06 from '../../../public/SS24/06.jpg';
import image07 from '../../../public/SS24/07.jpg';
import image08 from '../../../public/SS24/08.jpg';
import image09 from '../../../public/SS24/09.jpg';
import image10 from '../../../public/SS24/10.jpg';
import image11 from '../../../public/SS24/11.jpg';
import image12 from '../../../public/SS24/12.jpg';
import image13 from '../../../public/SS24/13.jpg';
import image14 from '../../../public/SS24/14.jpg';
import image15 from '../../../public/SS24/15.jpg';
import image16 from '../../../public/SS24/16.jpg';
import image17 from '../../../public/SS24/17.jpg';
import image18 from '../../../public/SS24/18.jpg';
import image19 from '../../../public/SS24/19.jpg';
import image20 from '../../../public/SS24/20.jpg';
import image21 from '../../../public/SS24/21.jpg';
import image22 from '../../../public/SS24/22.jpg';
import image23 from '../../../public/SS24/23.jpg';
import image24 from '../../../public/SS24/24.jpg';
import image25 from '../../../public/SS24/25.jpg';
import image26 from '../../../public/SS24/26.jpg';
import image27 from '../../../public/SS24/27.jpg';
import image28 from '../../../public/SS24/28.jpg';
import image29 from '../../../public/SS24/29.jpg';
import image30 from '../../../public/SS24/30.jpg';
import image31 from '../../../public/SS24/31.jpg';
import image32 from '../../../public/SS24/32.jpg';
import image33 from '../../../public/SS24/33.jpg';
import image34 from '../../../public/SS24/34.jpg';
import image35 from '../../../public/SS24/35.jpg';
import image36 from '../../../public/SS24/36.jpg';
import image37 from '../../../public/SS24/37.jpg';
import image38 from '../../../public/SS24/38.jpg';
import image39 from '../../../public/SS24/39.jpg';
import image40 from '../../../public/SS24/40.jpg';
import image41 from '../../../public/SS24/41.jpg';
import image42 from '../../../public/SS24/42.jpg';
import image43 from '../../../public/SS24/43.jpg';
import image44 from '../../../public/SS24/44.jpg';
import image45 from '../../../public/SS24/45.jpg';
import image46 from '../../../public/SS24/46.jpg';
import image47 from '../../../public/SS24/47.jpg';
import image48 from '../../../public/SS24/48.jpg';
import image49 from '../../../public/SS24/49.jpg';
import image50 from '../../../public/SS24/50.jpg';
import image51 from '../../../public/SS24/51.jpg';
import image52 from '../../../public/SS24/52.jpg';
import image53 from '../../../public/SS24/53.jpg';
import image54 from '../../../public/SS24/54.jpg';
import image55 from '../../../public/SS24/55.jpg';
import image56 from '../../../public/SS24/56.jpg';
import image57 from '../../../public/SS24/57.jpg';
import image58 from '../../../public/SS24/58.jpg';
import image59 from '../../../public/SS24/59.jpg';
import image60 from '../../../public/SS24/60.jpg';
import image61 from '../../../public/SS24/61.jpg';
import { StaticImageData } from 'next/image';

const images: StaticImageData[] = [
  image01,
  image02,
  image03,
  image04,
  image05,
  image06,
  image07,
  image08,
  image09,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
  image19,
  image20,
  image21,
  image22,
  image23,
  image24,
  image25,
  image26,
  image27,
  image28,
  image29,
  image30,
  image31,
  image32,
  image33,
  image34,
  image35,
  image36,
  image37,
  image38,
  image39,
  image40,
  image41,
  image42,
  image43,
  image44,
  image45,
  image46,
  image47,
  image48,
  image49,
  image50,
  image51,
  image52,
  image53,
  image54,
  image55,
  image56,
  image57,
  image58,
  image59,
  image60,
  image61,
];

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
              src={image}
              alt={`Image ${index + 1}`}
              large={index % 4 === 0 || index % 4 === 3}
            />
            {index + 1 < images.length && (
              <CatalogImage
                src={images[index + 1]}
                alt={`Image ${index + 2}`}
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

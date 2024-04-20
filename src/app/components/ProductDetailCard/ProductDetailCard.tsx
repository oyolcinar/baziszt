import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  CSSProperties,
} from 'react';
import Image from 'next/image';
import { Product } from '../ProductCard/ProductCard';

import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/outline';
import CompleteTheLook from '../CompleteTheLook/CompleteTheLook';

const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

interface ProductDetailCardProps {
  product: Product;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [colorSelection, setColorSelection] = useState(product.colors[0]);
  const [sizeSelection, setSizeSelection] = useState(product.sizes[0]);
  const [isDetails, setIsDetails] = useState(false);
  const [isDelivery, setIsDelivery] = useState(false);
  const [isAssistance, setIsAssistance] = useState(false);

  const toggleDetails = () => {
    setIsDetails(true);
    setIsDelivery(false);
    setIsAssistance(false);
  };

  const toggleDelivery = () => {
    setIsDetails(false);
    setIsDelivery(true);
    setIsAssistance(false);
  };

  const toggleAssistance = () => {
    setIsDetails(false);
    setIsDelivery(false);
    setIsAssistance(true);
  };

  useEffect(() => {
    setIsMobileScreen(window.innerWidth < 600);
    function handleResize() {
      setIsMobileScreen(window.innerWidth < 600);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scaleAmount = isMobileScreen ? 4 : 2;

  useEffect(() => {
    if (isMobileScreen && isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileScreen, isZoomed]);

  const toggleZoom = useCallback(() => {
    setIsZoomed((prevZoomed) => !prevZoomed);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const updateWidth = useCallback(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const debouncedHandleResize = debounce(updateWidth, 350);
    window.addEventListener('resize', debouncedHandleResize);
    updateWidth();
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, [updateWidth]);

  const handleImageChange = (
    direction: 'next' | 'prev',
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isTransitioning) {
      let newIndex = currentImageIndex + (direction === 'next' ? 1 : -1);
      setIsTransitioning(true);
      setCurrentImageIndex(newIndex);
    }
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentImageIndex <= 0) {
      setCurrentImageIndex(product.images.length);
    } else if (currentImageIndex >= product.images.length + 1) {
      setCurrentImageIndex(1);
    }
  };

  const shift = -currentImageIndex * carouselWidth;
  const enhancedImages = [
    product.images[product.images.length - 1],
    ...product.images,
    product.images[0],
  ];

  const handleMove = useCallback(
    (event: any) => {
      if (!isZoomed || !carouselRef.current) return;

      const rect = carouselRef.current.getBoundingClientRect();
      const x = event.type.includes('touch')
        ? event.touches[0].clientX
        : event.clientX;
      const y = event.type.includes('touch')
        ? event.touches[0].clientY
        : event.clientY;

      if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
        setMousePos(null);
        return;
      }

      if (!mousePos) {
        setMousePos({ x, y });
        return;
      }

      let deltaX = mousePos.x - x;
      let deltaY = mousePos.y - y;

      setTranslate((prev) => {
        let newX = prev.x - deltaX;
        let newY = prev.y - deltaY;

        const maxTranslateX = Math.max(
          0,
          (carouselWidth * scaleAmount - carouselWidth) / 2,
        );
        const maxTranslateY = Math.max(
          0,
          (carouselWidth * scaleAmount - carouselWidth) / 2,
        );

        newX = Math.min(Math.max(newX, -maxTranslateX), maxTranslateX);
        newY = Math.min(Math.max(newY, -maxTranslateY), maxTranslateY);

        return {
          x: newX,
          y: newY,
        };
      });

      setMousePos({ x, y });
    },
    [isZoomed, mousePos, carouselWidth, scaleAmount],
  );

  const handleMouseDown = useCallback(
    (event: any) => {
      if (!isZoomed || !carouselRef.current) return;

      const rect = carouselRef.current.getBoundingClientRect();
      const x = event.type.includes('touch')
        ? event.touches[0].clientX
        : event.clientX;
      const y = event.type.includes('touch')
        ? event.touches[0].clientY
        : event.clientY;

      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        setMousePos({ x, y });
      }
    },
    [isZoomed, carouselRef],
  );

  useEffect(() => {
    const handleMouseUp = () => {
      setMousePos(null);
    };

    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleTouchMove = (event: any) => handleMove(event);
    const handleTouchEnd = (event: any) => handleMove(event);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMove]);

  return (
    <div>
      <div className='flex flex-col md:flex-row'>
        <div
          ref={carouselRef}
          className={`relative w-full h-full md:w-[58%] ${
            isZoomed ? 'cursor-dragCustom' : 'cursor-zoomInCustom'
          }`}
          style={{ position: 'relative', contain: 'paint' }}
        >
          <div
            className={`flex ${
              isTransitioning
                ? 'transition-transform duration-500 ease-in-out'
                : ''
            }`}
            style={{
              transform: `translateX(${shift}px)`,
              width: `${product.images.length * carouselWidth}px`,
              zIndex: 2,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {enhancedImages.map((image, index) => (
              <div
                key={index}
                className='flex-none relative h-[100vh] md:h-[1100px]'
                style={{
                  width: `${carouselWidth}px`,
                  overflow: 'hidden',
                }}
                // onMouseDown={handleMouseDown}
                // onMouseMove={handleMove}
                // onMouseUp={handleMove}
                // onTouchStart={handleMouseDown}
                // onTouchMove={handleMove}
                // onTouchEnd={handleMove}
                // onClick={toggleZoom}
              >
                <Image
                  key={isZoomed.toString() + index}
                  src={image}
                  alt={product.name}
                  layout='fill'
                  objectFit={isZoomed ? 'contain' : 'cover'}
                  objectPosition='center'
                  style={{
                    transform: `translate(${translate.x}px, ${
                      translate.y
                    }px) scale(${isZoomed ? scaleAmount : 1})`,
                  }}
                />
              </div>
            ))}
          </div>
          <div
            className='absolute inset-0'
            onMouseDown={handleMouseDown}
            onMouseMove={handleMove}
            onMouseUp={handleMove}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMove}
            onTouchEnd={handleMove}
            onClick={toggleZoom}
          >
            <div className='relative h-full w-full'>
              <div className='sticky top-[50vh] -translate-y-1/2 pb-[80px]'>
                <div className='flex justify-between'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageChange('prev', e);
                    }}
                    disabled={isTransitioning}
                    className='cursor-pointer left-0 p-4 text-bone'
                    style={{ zIndex: 3 }}
                  >
                    ←
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageChange('next', e);
                    }}
                    disabled={isTransitioning}
                    className='cursor-pointer right-0 p-4 text-bone'
                    style={{ zIndex: 3 }}
                  >
                    →
                  </button>
                </div>
              </div>
              <div className='sticky top-[95%] -translate-y-1/2 flex justify-between'>
                <div className='ml-4 cursor-pointer'>Test</div>
                <div>
                  <HeartIcon className='cursor-pointer text-bone h-4 w-4 mr-4' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='sticky top-0 min-h-[900px] h-[100vh] flex flex-col items-center pt-20 w-[100%] md:w-[42%]'>
          <div className='text-bordeux font-quasimoda w-[60%] mb-12'>
            <div className='mb-4'>{product.name}</div>
            <div>{product.details}</div>
          </div>
          <div className='w-[60%] mb-12'>
            <div>
              <div className='font-quasimoda text-bordeux text-[12px] mb-4'>
                {colorSelection.toUpperCase()}
              </div>
              <div className='flex gap-4'>
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`inline-block pb-[6px] pl-[1px] pr-[1px] border-b-2 transition-colors duration-500 ease-in-out ${
                      colorSelection === color
                        ? 'border-bordeux'
                        : 'border-transparent'
                    }`}
                    onClick={() => {
                      setColorSelection(color);
                    }}
                  >
                    <span
                      className='block w-2 h-2 rounded-full'
                      style={{
                        backgroundColor: color,
                        border:
                          color === '#ffffff' || color.toLowerCase() === 'white'
                            ? '1px solid black'
                            : '1px solid transparent',
                      }}
                    ></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='border-b-[1px] border-gray-200 w-[60%]'></div>
          <div className='text-bordeux font-quasimoda w-[60%] mt-6'>
            <div className='flex justify-between mb-4'>
              <div className='text-[10px]'>SIZE</div>
              <div className='cursor-pointer text-[10px] hover:opacity-70 transition duration-300'>
                SIZE GUIDE
              </div>
            </div>
            <div>
              <div className='flex gap-4'>
                {product.sizes.map((size, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer hover:opacity-70 transition duration-300 inline-block px-1 pb-2 ${
                      sizeSelection === size
                        ? `border-b-2 border-bordeux hover:bordeux/70 hover:border-bordeux/70 transition duration-300`
                        : 'border-b-2 border-transparent'
                    }`}
                    onClick={() => {
                      setSizeSelection(size);
                    }}
                  >
                    <span key={index}>{size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='hidden border border-bordeux h-16 w-[60%] mt-16 sm:flex justify-center items-center transition duration-300 ease-in-out hover:bg-bordeux text-bordeux hover:text-bone'>
            <div className='flex justify-between items-center w-[80%]'>
              <div className='flex gap-2'>
                <ShoppingBagIcon className='h-4 w-4 font-bold' />
                <div className='font-quasimoda text-sm'>ADD</div>
              </div>
              <div className='font-quasimoda text-sm'>{product.price}</div>
            </div>
          </div>
          <div className='font-quasimoda text-bordeux text-sm flex flex-col md:flex-row md:justify-between w-[60%] mt-20'>
            <div
              className={`cursor-pointer hover:opacity-70 transition duration-300 hover:border-b-2 hover:border-bordeux/70 mb-4 md:mb-0 ${
                isDetails
                  ? `border-b-2 border-bordeux hover:border-bordeux/70`
                  : `border-b border-transparent`
              }`}
              onClick={() => {
                toggleDetails();
              }}
            >
              DETAILS
            </div>
            <div
              className={`cursor-pointer hover:opacity-70 transition duration-300 hover:border-b-2 hover:border-bordeux/70 mb-4 md:mb-0 ${
                isDelivery
                  ? `border-b-2 border-bordeux hover:border-bordeux/70`
                  : `border-b border-transparent`
              }`}
              onClick={() => {
                toggleDelivery();
              }}
            >
              DELIVERY & RETURNS
            </div>
            <div
              className={`cursor-pointer hover:opacity-70 transition duration-300 hover:border-b-2 hover:border-bordeux/70 ${
                isAssistance
                  ? `border-b-2 border-bordeux hover:border-bordeux/70`
                  : `border-b border-transparent`
              }`}
              onClick={() => {
                toggleAssistance();
              }}
            >
              ASSISTANCE
            </div>
          </div>
        </div>
      </div>
      <CompleteTheLook product={product} />
      <div className='sticky bottom-0 h-[100px] sm:hidden bg-lightBlue px-2'>
        <div className='font-quasimoda text-bordeux text-[14px] ml-2'>
          {product.name}
        </div>
        <div className='border border-bordeux h-16 w-[100%] flex justify-center items-center transition duration-300 ease-in-out bg-bordeux hover:bg-bordeux text-bone hover:text-bone'>
          <div className='flex justify-between items-center w-[80%]'>
            <div className='flex gap-2'>
              <ShoppingBagIcon className='h-4 w-4 font-bold' />
              <div className='font-quasimoda text-sm'>ADD</div>
            </div>
            <div className='font-quasimoda text-sm'>{product.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;

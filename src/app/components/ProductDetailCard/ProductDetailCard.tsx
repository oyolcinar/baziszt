import { useSwipeable } from 'react-swipeable';
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createRef,
} from 'react';
import Image from 'next/image';
import { Product } from '../ProductCard/ProductCard';

import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import CompleteTheLook from '../CompleteTheLook/CompleteTheLook';
import DetailsMenu from '../DetailsMenu/DetailsMenu';

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
  const [clickedIndex, setClickedIndex] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);
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
  const [detailsMenu, setDetailsMenu] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const imageRefs = useRef<Array<React.RefObject<HTMLDivElement>>>(
    product.images.map(() => createRef<HTMLDivElement>()),
  );

  useEffect(() => {
    const currentRefs = imageRefs.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = currentRefs.findIndex(
              (ref) => ref.current === entry.target,
            );
            if (index !== -1) {
              if (Math.abs(index - clickedIndex) <= 2) {
                setScrollIndex(index);
              }
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      },
    );

    currentRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [product.images.length, clickedIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const imageWidth =
    windowSize.width < 768
      ? windowSize.width
      : Math.round(windowSize.width * 0.58);
  const imageHeight =
    windowSize.width < 768
      ? windowSize.width * 1.289
      : windowSize.width * 0.58 * 1.289;

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
    e?: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

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

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  const handleImageClick = (index: number) => {
    setClickedIndex(index);
  };

  const smoothScrollTo = (targetElement: any, duration = 500) => {
    const target =
      targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.scrollY;
    const distance = target - startPosition;
    let startTime: any = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutCubic(
        timeElapsed,
        startPosition,
        distance,
        duration,
      );
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const easeInOutCubic = (t: any, b: any, c: any, d: any) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    };

    requestAnimationFrame(animation);
  };

  const scrollToImage = (index: any) => {
    const ref = imageRefs.current[index];
    if (ref && ref.current) {
      smoothScrollTo(ref.current);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      console.log('Swiped left');
      imageWidth && handleImageChange('next');
    },
    onSwipedRight: () => {
      console.log('Swiped left');
      imageWidth && handleImageChange('prev');
    },
    trackTouch: true,
  });

  useEffect(() => {
    console.log(carouselRef.current);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(windowSize.width * 0.58);
    }
  }, [windowSize]);

  return (
    <div>
      <div className='flex flex-col md:flex-row'>
        <div
          ref={carouselRef}
          className={`hidden md:block md:relative md:w-[58%] md:h-[${
            imageHeight * product.images.length
          }px] ${isZoomed ? 'cursor-dragCustom' : 'cursor-zoomInCustom'}`}
          style={{
            height: `${imageHeight * product.images.length}px`,
            position: 'relative',
            contain: 'paint',
          }}
        >
          {product.images.map((image, index) => (
            <div
              key={index}
              ref={imageRefs.current[index]}
              className={`flex-none relative h-[${imageHeight}px]`}
              style={{
                width: `${imageWidth}px`,
                overflow: 'hidden',
              }}
              onClick={() => handleImageClick(index)}
            >
              <Image
                key={isZoomed.toString() + index}
                src={image}
                alt={product.name}
                width={imageWidth}
                height={imageHeight}
                // objectFit='cover'
                // layout='fill'
                objectPosition='center'
                style={{
                  transform:
                    clickedIndex === index
                      ? `translate(${translate.x}px, ${translate.y}px) scale(${
                          isZoomed ? scaleAmount : 1
                        })`
                      : 'none',
                }}
              />
              <div
                className='absolute inset-0 z-10'
                onMouseDown={handleMouseDown}
                onMouseMove={handleMove}
                onMouseUp={handleMove}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMove}
                onTouchEnd={handleMove}
                onClick={toggleZoom}
              ></div>
            </div>
          ))}
          <div className='absolute inset-0'>
            <div className={`relative h-[96%] w-full`}>
              <div
                className={`sticky top-[95%] -translate-y-1/2 w-full flex justify-between items-end z-20`}
              >
                <div
                  className='cursor-pointer ml-4 flex-col items-center'
                  onClick={(e) => {
                    e.preventDefault;
                    e.stopPropagation();
                  }}
                >
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className='w-4 h-4 flex justify-center items-center'
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToImage(index);
                        setClickedIndex(index);
                      }}
                    >
                      <button
                        className={`h-2 w-2 rounded-full cursor-pointer border ${
                          scrollIndex === index
                            ? 'bg-bordeux border-bordeux'
                            : 'bg-transparent border-bone'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      ></button>
                    </div>
                  ))}
                </div>
                <div
                  className='w-full flex justify-end'
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite();
                  }}
                >
                  {isFavorite ? (
                    <HeartIconSolid className='cursor-pointer text-bordeux h-4 w-4 mr-4' />
                  ) : (
                    <HeartIcon className='cursor-pointer text-bone h-4 w-4 mr-4' />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          {...swipeHandlers}
          className={`relative md:hidden w-full h-[${imageHeight}px]`}
          style={{ width: '100%', overflow: 'hidden' }}
        >
          <div
            ref={carouselRef}
            className={`relative md:hidden w-full h-[${imageHeight}px] ${
              isZoomed ? 'cursor-dragCustom' : 'cursor-zoomInCustom'
            }`}
            style={{
              height: `${imageHeight}px`,
              position: 'relative',
              contain: 'paint',
            }}
          >
            <div
              className={`flex ${
                isTransitioning
                  ? 'transition-transform duration-500 ease-in-out'
                  : ''
              }`}
              style={{
                height: `${imageHeight}px`,
                transform: `translateX(${shift}px)`,
                width: `${product.images.length * carouselWidth}px`,
                zIndex: 2,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {enhancedImages.map((image, index) => (
                <div
                  key={index}
                  className={`flex-none relative h-[${imageHeight}px]`}
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
                    width={imageWidth}
                    height={imageHeight}
                    // objectFit='cover'
                    // layout='fill'
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
              <div className={`relative h-[96%] w-full`}>
                <div className={`sticky top-[50%] -translate-y-1/2 pb-[80px]`}>
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
                <div
                  className={`sticky top-[95%] -translate-y-1/2 flex justify-between`}
                >
                  <div
                    className='cursor-pointer ml-4 flex justify-center space-x-2 mt-4'
                    onClick={(e) => {
                      e.preventDefault;
                      e.stopPropagation();
                    }}
                  >
                    {product.images.map((image, index) => (
                      <div
                        key={index}
                        className='w-4 h-4 flex justify-center items-center'
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index + 1);
                        }}
                      >
                        <button
                          className={`h-2 w-2 rounded-full cursor-pointer border ${
                            currentImageIndex === index + 1
                              ? 'bg-bordeux border-bordeux'
                              : 'bg-transparent border-bone'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        ></button>
                      </div>
                    ))}
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite();
                    }}
                  >
                    {isFavorite ? (
                      <HeartIconSolid className='cursor-pointer text-bordeux h-4 w-4 mr-4' />
                    ) : (
                      <HeartIcon className='cursor-pointer text-bone h-4 w-4 mr-4' />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='sticky top-0 min-h-[760px] md:min-h-[900px] h-[100vh] flex flex-col items-center pt-20 w-[100%] md:w-[42%]'>
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
              <div
                className='cursor-pointer text-[10px] hover:opacity-70 transition duration-300'
                onClick={() => {
                  setDetailsMenu('sizeMenu');
                }}
              >
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
          <div className='font-quasimoda text-bordeux text-sm flex flex-col lg:flex-row md:justify-between w-[60%] mt-20'>
            <div
              className={`cursor-pointer hover:opacity-70 transition duration-300 hover:border-b-2 hover:border-bordeux/70 mb-4 md:mb-0 ${
                detailsMenu === 'details'
                  ? `border-b-2 border-bordeux hover:border-bordeux/70`
                  : `border-b border-transparent`
              }`}
              onClick={() => {
                setDetailsMenu('details');
              }}
            >
              DETAILS
            </div>
            <div
              className={`cursor-pointer hover:opacity-70 transition duration-300 hover:border-b-2 hover:border-bordeux/70 mb-4 md:mb-0 ${
                detailsMenu === 'delivery'
                  ? `border-b-2 border-bordeux hover:border-bordeux/70`
                  : `border-b border-transparent`
              }`}
              onClick={() => {
                setDetailsMenu('delivery');
              }}
            >
              DELIVERY & RETURNS
            </div>
            <div
              className={`cursor-pointer hover:opacity-70 transition duration-300 hover:border-b-2 hover:border-bordeux/70 ${
                detailsMenu === 'assistance'
                  ? `border-b-2 border-bordeux hover:border-bordeux/70`
                  : `border-b border-transparent`
              }`}
              onClick={() => {
                setDetailsMenu('assistance');
              }}
            >
              ASSISTANCE
            </div>
          </div>
        </div>
      </div>
      <div className='sticky bottom-0 h-[100px] mb-12 sm:hidden bg-sandColor px-2'>
        <div className='font-quasimoda text-bone text-[14px] ml-2'>
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
      <CompleteTheLook product={product} />
      {detailsMenu && (
        <DetailsMenu
          product={product}
          menu={detailsMenu}
          setMenu={setDetailsMenu}
          detailText={product.details}
        />
      )}
    </div>
  );
};

export default ProductDetailCard;

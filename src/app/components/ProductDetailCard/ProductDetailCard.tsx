/* eslint-disable react/no-danger-with-children */
import { useSwipeable } from 'react-swipeable';
import htmlParser, { domToReact, DOMNode, Element } from 'html-react-parser';
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createRef,
} from 'react';
import Image from 'next/image';
import { Product } from '@/app/context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useMenu } from '../../context/MenuContext';
import { useTranslation } from '../../../../utils/useTranslation';

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
  const uniqueColors = Array.from(new Set(product.colors));
  const uniqueSizes = Array.from(new Set(product.sizes));
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const desktopCarouselRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [colorSelection, setColorSelection] = useState(uniqueColors[0]);
  const [sizeSelection, setSizeSelection] = useState(uniqueSizes[0]);
  const [detailsMenu, setDetailsMenu] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const [expandedSections, setExpandedSections] = useState<string[]>([
    'description',
    'size',
    'color',
  ]);
  const { addToCart } = useCart();
  const { cartMenuOpened, openCartMenu, closeCartMenu } = useMenu();

  const imageRefs = useRef<Array<React.RefObject<HTMLDivElement>>>(
    product.images.map(() => createRef<HTMLDivElement>()),
  );

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const { t } = useTranslation();

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
      ? windowSize.width - 20
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
    if (window.innerWidth >= 768 && desktopCarouselRef.current) {
      setCarouselWidth(desktopCarouselRef.current.offsetWidth);
    } else if (carouselRef.current) {
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
      const currentRef =
        window.innerWidth >= 768
          ? desktopCarouselRef.current
          : carouselRef.current;
      if (!isZoomed || !currentRef) return;

      const rect = currentRef.getBoundingClientRect();
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
    onSwipedLeft: () => !isZoomed && imageWidth && handleImageChange('next'),
    onSwipedRight: () => !isZoomed && imageWidth && handleImageChange('prev'),
    onSwiping: (eventData) => {
      if (Math.abs(eventData.deltaX) > Math.abs(eventData.deltaY)) {
        eventData.event.preventDefault();
      }
    },
    trackTouch: !isZoomed,
  });

  useEffect(() => {
    if (uniqueColors.length === 1) {
      setColorSelection(uniqueColors[0]);
    }
    if (uniqueSizes.length === 1) {
      setSizeSelection(uniqueSizes[0]);
    }
  }, [uniqueColors, uniqueSizes]);

  let selectedVariant = product.variants.find(
    (variant) =>
      variant.selectedOptions.some(
        (option) => option.name === 'Color' && option.value === colorSelection,
      ) &&
      variant.selectedOptions.some(
        (option) => option.name === 'Size' && option.value === sizeSelection,
      ),
  );

  const handleAddToCart = async () => {
    if (!selectedVariant && product.variants.length === 1) {
      selectedVariant = product.variants[0];
    }

    if (!selectedVariant) {
      selectedVariant = {
        id: product.id,
        title: product.name,
        price: product.price,
        selectedOptions: [
          { name: 'Color', value: colorSelection },
          { name: 'Size', value: sizeSelection },
        ],
      };
    }

    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
        color: colorSelection,
        title: product.name,
        image: product.images[0],
        price: selectedVariant.price,
        size: sizeSelection,
        currency: selectedVariant.price.split(' ')[1],
      });
      console.log('Added to cart successfully');
      openCartMenu();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prevSections) =>
      prevSections.includes(section)
        ? prevSections.filter((sec) => sec !== section)
        : [...prevSections, section],
    );
  };

  useEffect(() => {
    expandedSections.forEach((section) => {
      const sectionRef = sectionRefs.current[section];
      if (sectionRef) {
        sectionRef.style.maxHeight = `${sectionRef.scrollHeight}px`;
      }
    });
  }, [expandedSections]);

  useEffect(() => {
    Object.keys(sectionRefs.current).forEach((section) => {
      const sectionRef = sectionRefs.current[section];
      if (sectionRef && !expandedSections.includes(section)) {
        sectionRef.style.maxHeight = '0px';
      }
    });
  }, [expandedSections]);

  const transformDetailsHtml = (html: string): React.ReactNode => {
    const parsedHtml = htmlParser(html, {
      replace: (domNode) => {
        if (
          domNode &&
          'type' in domNode &&
          domNode.type === 'tag' &&
          domNode.name === 'p'
        ) {
          if (!domNode.attribs) {
            domNode.attribs = {};
          }
          domNode.attribs.className = 'mb-2';
        }
        return domNode;
      },
    });

    const contentArray: React.ReactNode[] = Array.isArray(parsedHtml)
      ? parsedHtml
      : [parsedHtml];
    const transformedContent: React.ReactNode[] = [];

    let firstParagraphFound = false;
    let secondParagraphFound = false;

    contentArray.forEach((node, index) => {
      if (React.isValidElement(node) && node.type === 'p') {
        if (!firstParagraphFound) {
          transformedContent.push(
            React.cloneElement(node, {
              ...node.props,
              className: 'mb-2 text-sm',
            }), // Add text-sm class for 12px font size
          );
          firstParagraphFound = true;
        } else if (!secondParagraphFound) {
          // Handle the second paragraph
          const secondParagraphContent = node.props.children;

          const listItems = React.Children.toArray(secondParagraphContent)
            .filter(
              (child) =>
                React.isValidElement(child) &&
                typeof child.props.children === 'string' &&
                child.props.children.trim() !== '',
            )
            .map((child, i) => (
              <li className='mb-2' key={`list-item-${i}`}>
                {child}
              </li>
            ));

          transformedContent.push(
            <ul className='custom-list' key={index}>
              {listItems}
            </ul>,
          );

          secondParagraphFound = true;
        } else {
          transformedContent.push(node);
        }
      } else {
        transformedContent.push(node);
      }
    });

    return <>{transformedContent}</>;
  };

  return (
    <div>
      <div className='flex flex-col md:flex-row'>
        <div
          ref={desktopCarouselRef}
          className={`hidden md:block md:relative md:w-[58%] mt-[80px] md:h-[${
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
                {product.images.length > 1 && (
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
                              ? 'bg-black border-black'
                              : 'bg-transparent border-black'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        ></button>
                      </div>
                    ))}
                  </div>
                )}
                <div
                  className='w-full flex justify-end'
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite();
                  }}
                >
                  {isFavorite ? (
                    <HeartIconSolid className='cursor-pointer text-black h-4 w-4 mr-4' />
                  ) : (
                    <HeartIcon className='cursor-pointer text-black h-4 w-4 mr-4' />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          {...swipeHandlers}
          className={`relative md:hidden w-full h-[${imageHeight}px] mt-[80px]`}
          style={{ width: imageWidth, overflow: 'hidden' }}
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
                      className='cursor-pointer left-0 p-4 text-transparent'
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
                      className='cursor-pointer right-0 p-4 text-transparent'
                      style={{ zIndex: 3 }}
                    >
                      →
                    </button>
                  </div>
                </div>
                <div
                  className={`sticky top-[95%] -translate-y-1/2 flex justify-between items-end`}
                >
                  {product.images.length > 1 && (
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
                                ? 'bg-black border-black'
                                : 'bg-transparent border-black'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          ></button>
                        </div>
                      ))}
                    </div>
                  )}
                  {product.images.length === 1 && <div></div>}
                  <div
                    className='mr-4'
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite();
                    }}
                  >
                    {isFavorite ? (
                      <HeartIconSolid className='cursor-pointer text-black h-4 w-4 mr-4' />
                    ) : (
                      <HeartIcon className='cursor-pointer text-black h-4 w-4 mr-4' />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='sticky top-0 min-h-[760px] md:min-h-[900px] h-[100vh] flex flex-col items-center justify-start pt-[80px] w-[100%] md:w-[42%]'>
          <div className='text-black font-futura w-[60%] md:mt-12 mb-4 flex flex-col items-center'>
            <div className='mb-4 text-4xl font-altesse24'>
              {product.name[0].toUpperCase() + product.name.slice(1)}
            </div>
            <div className='mb-4 font-futura font-bold'>{product.price}</div>
            <div
              className='cursor-pointer w-[100%]'
              onClick={() => toggleSection('description')}
            >
              <div className='flex justify-between items-center w-[100%]'>
                <div className='text-[12px] font-bold'>{t('description')}</div>
                <div>
                  {expandedSections.includes('description') ? '-' : '+'}
                </div>
              </div>
              <div
                ref={(el) => (sectionRefs.current['description'] = el)}
                className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                  expandedSections.includes('description')
                    ? 'max-h-screen'
                    : 'max-h-0'
                }`}
              >
                <div>{transformDetailsHtml(product.details)}</div>
              </div>
            </div>
          </div>
          <div className='border-b-[1px] border-gray-200 w-[60%]'></div>
          <div className='cursor-pointer w-[60%] my-4'>
            <div
              className='flex justify-between items-center'
              onClick={() => toggleSection('color')}
            >
              <div className='text-[12px] text-black font-futura font-bold'>
                {t('color')}
              </div>
              <div className='text-black'>
                {expandedSections.includes('color') ? '-' : '+'}
              </div>
            </div>
            <div
              ref={(el) => (sectionRefs.current['color'] = el)}
              className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                expandedSections.includes('color') ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className='font-futura text-black text-[12px] mb-2'>
                {colorSelection
                  ? colorSelection.toUpperCase()
                  : product.colors.length <= 1
                  ? 'ONE COLOR'
                  : product.colors[0]}
              </div>
              <div className='flex gap-4'>
                {uniqueColors.map((color, index) => (
                  <div
                    key={index}
                    className={`inline-block pb-[5px] pl-[1px] pr-[1px] border-b-2 transition-colors duration-500 ease-in-out ${
                      colorSelection === color
                        ? 'border-black'
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
          <div className='cursor-pointer w-[60%] my-4'>
            <div
              className='flex justify-between items-center'
              onClick={() => toggleSection('size')}
            >
              <div className='text-[12px] text-black font-futura font-bold'>
                {t('size')}
              </div>
              <div className='text-black'>
                {expandedSections.includes('size') ? '-' : '+'}
              </div>
            </div>
            <div
              ref={(el) => (sectionRefs.current['size'] = el)}
              className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                expandedSections.includes('size') ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className='flex gap-4 text-[12px] font-futura text-black mb-4'>
                {uniqueSizes.map((size, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer hover:opacity-70 transition duration-300 inline-block px-1 ${
                      sizeSelection === size
                        ? `border-b-2 border-black hover:black/70 hover:border-black/70 transition duration-300`
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
              <div className='font-futura text-black text-[12px] w-full text-left'>
                <table className='w-full'>
                  <thead>
                    <tr className='border border-transparent border-b-black mb-2'>
                      <th className='w-1/6'>{t('chart')}</th>
                      <th className='w-1/6'>XS</th>
                      <th className='w-1/6'>SM</th>
                      <th className='w-1/6'>MD</th>
                      <th className='w-1/6'>LG</th>
                      <th className='w-1/6'>XL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='border border-transparent border-b-black mb-2'>
                      <td className='w-1/6'>{t('chest')}&quot;</td>
                      <td className='w-1/6'>21&quot;</td>
                      <td className='w-1/6'>22&quot;</td>
                      <td className='w-1/6'>23.25&quot;</td>
                      <td className='w-1/6'>24&quot;</td>
                      <td className='w-1/6'>25&quot;</td>
                    </tr>
                    <tr className='mb-2'>
                      <td className='w-1/6'>{t('length')}&quot;</td>
                      <td className='w-1/6'>23&quot;</td>
                      <td className='w-1/6'>24&quot;</td>
                      <td className='w-1/6'>25&quot;</td>
                      <td className='w-1/6'>26.5&quot;</td>
                      <td className='w-1/6'>27.5&quot;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='border-b-[1px] border-gray-200 w-[100%] my-4'></div>
            <div className='flex justify-center w-[100%]'>
              <div
                className='hidden border border-black h-16 w-[60%] mb-4 sm:flex justify-center items-center transition duration-300 ease-in-out hover:bg-black text-black hover:text-bone cursor-pointer'
                onClick={handleAddToCart}
              >
                <div className='flex justify-center items-center w-[80%]'>
                  <div className='flex gap-2'>
                    <ShoppingBagIcon className='h-4 w-4 font-bold' />
                    <div className='font-futura text-sm'>{t('add')}</div>
                  </div>
                  {/* <div className='font-futura text-sm'>{product.price}</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className='sticky bottom-0 h-[100px] mb-12 sm:hidden bg-bone px-2 border border-black'
        onClick={handleAddToCart}
      >
        <div className='flex justify-between font-futura text-black text-[14px] ml-2 pt-1'>
          <div>{product.name.toUpperCase()}</div>
          <div className='flex gap-2 mr-2'>
            <div>
              {colorSelection ? colorSelection.toUpperCase() : 'ONE COLOR'}
            </div>
            <div>{sizeSelection}</div>
          </div>
        </div>
        <div className='border border-black h-16 w-[100%] flex justify-center items-center transition duration-300 ease-in-out bg-bone hover:bg-black text-black hover:text-bone'>
          <div className='flex justify-between items-center w-[80%]'>
            <div className='flex gap-2 pb-2'>
              <ShoppingBagIcon className='h-4 w-4 font-bold' />
              <div className='font-futura text-sm'>{t('add')}</div>
            </div>
            <div className='font-futura text-sm'>{product.price}</div>
          </div>
        </div>
      </div>
      <CompleteTheLook product={product} />
      {/* {detailsMenu && (
        <DetailsMenu
          product={product}
          menu={detailsMenu}
          setMenu={setDetailsMenu}
          detailText={product.details}
        />
      )} */}
    </div>
  );
};

export default ProductDetailCard;

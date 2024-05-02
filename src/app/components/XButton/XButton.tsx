import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';

import brownLine1 from '../../../../public/Hamburger/brownLine.png';
import brownLine2 from '../../../../public/Hamburger/brownLine2.png';
import brownLine3 from '../../../../public/Hamburger/brownLine3.png';
import brownLine4 from '../../../../public/Hamburger/brownLine4.png';

interface XButtonProps {
  allowAnimation: boolean;
  isOpen: boolean;
  toggle: () => void;
  onAnimationComplete: () => void;
  setAllowAnimation: (allow: boolean) => void;
}

const XButton: React.FC<XButtonProps> = ({
  isOpen,
  toggle,
  onAnimationComplete,
  allowAnimation,
  setAllowAnimation,
}) => {
  const lineImages = useMemo(
    () => [
      [brownLine1, brownLine2, brownLine3, brownLine4],
      [brownLine1, brownLine2, brownLine3, brownLine4],
    ],
    [],
  );

  const [currentIndices, setCurrentIndices] = useState([0, 0]);
  const [lineOpacities, setLineOpacities] = useState([
    'opacity-100',
    'opacity-100',
  ]);

  const [animationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationReady(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const animateLinesOpen = useCallback(() => {
    if (!allowAnimation) return;
    if (!animationReady) return;

    lineImages.forEach((line, lineIndex) => {
      line.forEach((_, imgIndex) => {
        setTimeout(() => {
          setCurrentIndices((prev) =>
            prev.map((curr, idx) => (idx === lineIndex ? imgIndex : curr)),
          );
          if (imgIndex === line.length - 1) {
            setLineOpacities((prev) =>
              prev.map((opacity, idx) =>
                idx === lineIndex ? 'opacity-100' : opacity,
              ),
            );
            if (lineIndex === 0) {
              setTimeout(onAnimationComplete, 300);
            }
          }
        }, 100 * imgIndex + 400 * lineIndex);
      });
    });
  }, [lineImages, animationReady, onAnimationComplete, allowAnimation]);

  const animateLinesClose = useCallback(() => {
    if (!allowAnimation) return;
    if (!animationReady) return;

    [...lineImages].reverse().forEach((line, reversedLineIndex) => {
      const lineIndex = lineImages.length - 1 - reversedLineIndex;
      [...line].reverse().forEach((_, reversedImgIndex) => {
        const imgIndex = line.length - 1 - reversedImgIndex;
        setTimeout(() => {
          setCurrentIndices((prev) =>
            prev.map((curr, idx) => (idx === lineIndex ? imgIndex : curr)),
          );
          if (imgIndex === 0) {
            setLineOpacities((prev) =>
              prev.map((opacity, idx) =>
                idx === lineIndex ? 'opacity-0' : opacity,
              ),
            );
            if (lineIndex === 3) {
              onAnimationComplete();
            }
          }
        }, 100 * reversedImgIndex + 400 * reversedLineIndex);
      });
    });
  }, [lineImages, onAnimationComplete, animationReady, allowAnimation]);

  useEffect(() => {
    if (animationReady) {
      if (isOpen) {
        animateLinesClose();
      } else {
        animateLinesOpen();
      }
    }
  }, [isOpen, animationReady, animateLinesOpen, animateLinesClose]);

  return (
    <div
      className='flex flex-col items-center gap-2 cursor-pointer z-50'
      onClick={(e) => {
        setAllowAnimation(true);
        toggle();
      }}
    >
      {currentIndices.map((imgIndex, lineIndex) => (
        <div
          key={lineIndex}
          className='transition-transform duration-300'
          style={{
            transform: `
              rotate(${lineIndex === 0 ? '45deg' : '-45deg'}) 
              translate(${lineIndex === 0 ? '-5%, 15%' : '5%, 15%'})
            `,
            transformOrigin: 'center center',
            position: 'absolute',
            width: '30px',
            height: '8px',
            transition: 'transform 300ms ease-in-out',
          }}
        >
          <Image
            src={lineImages[lineIndex][imgIndex]}
            alt={`Line ${lineIndex + 1}`}
            width={30}
            height={8}
            layout='fixed'
          />
        </div>
      ))}
    </div>
  );
};

export default XButton;

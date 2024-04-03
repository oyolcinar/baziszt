'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import whiteLine1 from '../../../../public/Hamburger/whiteLine.png';
import brownLine1 from '../../../../public/Hamburger/brownLine.png';
import blueLine1 from '../../../../public/Hamburger/blueLine.png';
import whiteLine2 from '../../../../public/Hamburger/whiteLine2.png';
import brownLine2 from '../../../../public/Hamburger/brownLine2.png';
import blueLine2 from '../../../../public/Hamburger/blueLine2.png';
import whiteLine3 from '../../../../public/Hamburger/whiteLine3.png';
import brownLine3 from '../../../../public/Hamburger/brownLine3.png';
import blueLine3 from '../../../../public/Hamburger/blueLine3.png';
import whiteLine4 from '../../../../public/Hamburger/whiteLine4.png';
import brownLine4 from '../../../../public/Hamburger/brownLine4.png';
import blueLine4 from '../../../../public/Hamburger/blueLine4.png';

const HamburgerMenu: React.FC = () => {
  const lineImages = [
    [brownLine1, brownLine2, brownLine3, brownLine4],
    [whiteLine1, whiteLine2, whiteLine3, whiteLine4],
    [blueLine1, blueLine2, blueLine3, blueLine4],
  ];

  const [currentIndices, setCurrentIndices] = useState([0, 0, 0]);
  const [lineOpacities, setLineOpacities] = useState([
    'opacity-100',
    'opacity-100',
    'opacity-100',
  ]);
  const [phase, setPhase] = useState('normal');
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => {
    if (!menuOpened) {
      startSequence();
    } else {
      reverseSequence();
    }
  };

  const toggleStitch = (
    startIndex: number,
    onComplete?: () => void,
    reverse: boolean = false,
    updateOpacity: boolean = true,
    skipSecondLine: boolean = false,
  ) => {
    if (reverse && skipSecondLine) {
      setLineOpacities([
        'opacity-100',
        'opacity-0',
        lineImages.length > 2 && startIndex === lineImages[2].length - 1
          ? 'opacity-0'
          : 'opacity-100',
      ]);
    }

    for (let lineIndex = 0; lineIndex < lineImages.length; lineIndex++) {
      if (skipSecondLine && lineIndex === 1) continue;

      for (
        let imgIndex = startIndex;
        reverse ? imgIndex >= 0 : imgIndex < lineImages[lineIndex].length;
        reverse ? imgIndex-- : imgIndex++
      ) {
        setTimeout(() => {
          setCurrentIndices((currentIndices) =>
            currentIndices.map((index, idx) =>
              idx === lineIndex ? imgIndex : index,
            ),
          );

          if (
            updateOpacity &&
            ((reverse && imgIndex === 0) ||
              (!reverse && imgIndex === lineImages[lineIndex].length - 1))
          ) {
            setLineOpacities((opacities) =>
              opacities.map((opacity, idx) =>
                idx === lineIndex ? 'opacity-0' : opacity,
              ),
            );
          }

          if (
            reverse &&
            skipSecondLine &&
            lineIndex === 2 &&
            imgIndex === lineImages[2].length - 1
          ) {
            setLineOpacities((opacities) =>
              opacities.map((opacity, idx) =>
                idx === 2 ? 'opacity-100' : opacity,
              ),
            );
          }
        }, 35 * (reverse ? startIndex - imgIndex : imgIndex) + 140 * lineIndex);
      }
    }

    setTimeout(
      onComplete || (() => {}),
      lineImages[0].length * 35 + 140 * lineImages.length,
    );
  };

  const startSequence = () => {
    setMenuOpened(true);
    setPhase('normal');
    setLineOpacities(['opacity-100', 'opacity-100', 'opacity-100']);
    toggleStitch(0, () => {
      setPhase('toX');
      setTimeout(() => {
        setLineOpacities(['opacity-100', 'opacity-0', 'opacity-100']);
        toggleStitch(lineImages[0].length - 1, undefined, true, false, true);
      }, 15); // Short pause before starting the reverse sequence
    });
  };

  const reverseSequence = () => {
    setMenuOpened(false);
    setPhase('toX');
    setLineOpacities(['opacity-100', 'opacity-0', 'opacity-100']);
    toggleStitch(0, () => {
      setPhase('normal');
      setTimeout(() => {
        setLineOpacities(['opacity-100', 'opacity-100', 'opacity-100']);
        toggleStitch(lineImages[0].length - 1, undefined, true, false, false);
      }, 15);
    });
  };

  return (
    <div
      className='flex flex-col items-start gap-1 cursor-pointer'
      onClick={toggleMenu}
    >
      {currentIndices.map((imgIndex, lineIndex) => (
        <div
          key={lineIndex}
          className={`${
            lineOpacities[lineIndex]
          } transition-opacity duration-150 ${
            phase === 'toX' && (lineIndex === 0 || lineIndex === 2)
              ? 'transform translate-y-[16px]'
              : ''
          } ${
            phase === 'toX' && lineIndex === 2
              ? '-rotate-45 translate-y-[-16px]'
              : phase === 'toX' && lineIndex === 0
              ? 'rotate-45 translate-y-[18px]'
              : ''
          }`}
          style={{ transformOrigin: 'center' }}
        >
          <Image
            src={lineImages[lineIndex][imgIndex]}
            alt={`Line ${lineIndex + 1}`}
            width={40}
            height={10}
          />
        </div>
      ))}
    </div>
  );
};

export default HamburgerMenu;

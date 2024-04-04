import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import brownLine from '../../../../public/Hamburger/brownLine.png';
import blueLine from '../../../../public/Hamburger/blueLine.png';
import Logo from '../../../../public/Logos/camelLogoSmall.png';

const Footer: React.FC = () => {
  const borderStyle = {
    backgroundImage: `url(${brownLine.src})`,
    backgroundRepeat: 'repeat-x',
  };

  const borderStyle2 = {
    backgroundImage: `url(${blueLine.src})`,
    backgroundRepeat: 'repeat-x',
  };

  return (
    <nav>
      <div className='flex justify-center items-center flex-row text-center'>
        <div className='flex-1 w-full'>
          <div className='w-full h-2' style={borderStyle}></div>
          <div className='w-full h-2' style={borderStyle2}></div>
        </div>
        <div className='py-4'>
          <Image alt='baziszt' src={Logo} width={100} height={60} />{' '}
          {/* Adjust width and height as needed */}
        </div>
        <div className='flex-1 w-full'>
          <div className='w-full h-2' style={borderStyle}></div>
          <div className='w-full h-2' style={borderStyle2}></div>
        </div>
      </div>
    </nav>
  );
};

export default Footer;

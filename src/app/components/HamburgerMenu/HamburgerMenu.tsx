'use client';
import { useState } from 'react';
import Image from 'next/image';

import whiteLine from '../../../../public/Hamburger/whiteLine.png';
import brownLine from '../../../../public/Hamburger/brownLine.png';
import blueLine from '../../../../public/Hamburger/blueLine.png';
import yellowLine from '../../../../public/Hamburger/yellowLine.png';

import styles from './HamburgerMenu.module.css';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${styles.hamburgerMenu} ${isOpen ? styles.open : ''}`}
      onClick={toggleMenu}
    >
      <div className={styles.hamburgerIcon}>
        <Image src={brownLine} alt='Hamburger Line' width={30} height={3} />
      </div>
      <div className={styles.hamburgerIcon}>
        <Image src={whiteLine} alt='Hamburger Line' width={30} height={3} />
      </div>
      <div className={styles.hamburgerIcon}>
        <Image src={blueLine} alt='Hamburger Line' width={30} height={3} />
      </div>
    </div>
  );
};

export default HamburgerMenu;

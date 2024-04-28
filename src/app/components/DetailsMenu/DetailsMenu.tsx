import { useEffect, useState } from 'react';
import XButton from '../XButton/XButton';
import { Product } from '../ProductCard/ProductCard';

export interface DetailProps {
  detailText?: string;
  menu: string;
  setMenu: (menu: string) => void;
  product: Product;
}

const DetailsMenu: React.FC<DetailProps> = ({
  detailText,
  menu,
  setMenu,
  product,
}) => {
  const [visible, setVisible] = useState(false);
  const [allowAnimation, setAllowAnimation] = useState(true); // New state to control animations

  const toggleAnimationControl = () => {
    setAllowAnimation(!allowAnimation);
  };

  useEffect(() => {
    if (menu !== '') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [menu]);

  const toggleMenu = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[42%] bg-sandColor transform flex flex-col justify-start items-center ${
          visible ? '-translate-x-0' : 'translate-x-full'
        } transition-transform duration-700 ease-in-out z-40`}
      >
        <div
          style={{
            zIndex: 50,
            position: 'fixed',
            top: 0,
            right: 0,
            height: 30,
            width: 30,
            marginTop: 20,
            marginRight: 30,
          }}
        >
          <XButton
            isOpen={visible}
            toggle={toggleMenu}
            onAnimationComplete={() => setMenu('')}
            allowAnimation={allowAnimation}
            setAllowAnimation={setAllowAnimation}
          />
        </div>
        {menu === 'details' && (
          <div className='font-quasimoda text-bone flex flex-col w-[60%] pt-20'>
            <div className='mb-4'>{product.name}</div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              deleniti voluptates reiciendis iusto blanditiis quasi, in vero
              aspernatur sit amet dolor obcaecati, magnam neque unde quibusdam!
              Accusamus ducimus eius ab?
            </div>
          </div>
        )}
        {menu === 'delivery' && (
          <div className='font-quasimoda text-bone flex flex-col w-[60%] pt-20'>
            <div className='mb-4'>DELIVERY</div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              deleniti voluptates reiciendis iusto blanditiis quasi, in vero
              aspernatur sit amet dolor obcaecati, magnam neque unde quibusdam!
              Accusamus ducimus eius ab?
            </div>
          </div>
        )}
        {menu === 'assistance' && (
          <div className='font-quasimoda text-bone flex flex-col w-[60%] pt-20'>
            <div className='mb-4'>EMAIL US</div>
            <div>info@baziszt.com</div>
          </div>
        )}
        {menu === 'sizeMenu' && (
          <div className='font-quasimoda text-bone flex flex-col w-[60%] pt-20'>
            <div className='mb-4'>SIZE CHART</div>
            <div></div>
          </div>
        )}
        {menu !== 'sizeMenu' && (
          <div className='fixed font-quasimoda text-bone text-sm flex flex-col lg:flex-row md:justify-between w-[60%] bottom-10'>
            <div
              className={`cursor-pointer hover:opacity-70 transition duration-300 hover:border-b-2 hover:border-bone/70 mb-4 md:mb-0 ${
                menu === 'details'
                  ? `border-b-2 border-bone hover:border-bone/70`
                  : `border-b border-transparent`
              }`}
              onClick={() => {
                setAllowAnimation(false);
                setMenu('details');
              }}
            >
              DETAILS
            </div>
            <div
              className={`cursor-pointer hover:opacity-70 transition duration-300 hover:border-b-2 hover:border-bone/70 mb-4 md:mb-0 ${
                menu === 'delivery'
                  ? `border-b-2 border-bone hover:border-bone/70`
                  : `border-b border-transparent`
              }`}
              onClick={() => {
                setAllowAnimation(false);
                setMenu('delivery');
              }}
            >
              DELIVERY & RETURNS
            </div>
            <div
              className={`cursor-pointer hover:opacity-70 transition duration-300 hover:border-b-2 hover:border-bone/70 ${
                menu === 'assistance'
                  ? `border-b-2 border-bone hover:border-bone/70`
                  : `border-b border-transparent`
              }`}
              onClick={() => {
                setAllowAnimation(false);
                setMenu('assistance');
              }}
            >
              ASSISTANCE
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailsMenu;

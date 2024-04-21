import { useEffect, useState } from 'react';
import XButton from '../XButton/XButton';

export interface DetailProps {
  detailText?: string;
  menu: string;
  setMenu: (menu: string) => void;
}

const DetailsMenu: React.FC<DetailProps> = ({ detailText, menu, setMenu }) => {
  const [visible, setVisible] = useState(false);

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
        className={`fixed top-0 right-0 h-full w-full md:w-[42%] bg-bordeux transform flex justify-start items-center pr-[60px] ${
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
          <XButton isOpen={visible} toggle={toggleMenu} />
        </div>
        <div className='font-quasimoda text-bone text-sm flex flex-col md:flex-row md:justify-between w-[60%] mt-20'>
          <div
            className={`cursor-pointer hover:opacity-70 transition duration-300 hover:border-b-2 hover:border-bone/70 mb-4 md:mb-0 ${
              menu === 'details'
                ? `border-b-2 border-bone hover:border-bone/70`
                : `border-b border-transparent`
            }`}
            onClick={() => {
              setMenu('details');
            }}
          >
            DETAILS
          </div>
          <div
            className={`cursor-pointer hover:opacity-70 transition duration-300 hover:border-b-2 hover:border-bordeux/70 mb-4 md:mb-0 ${
              menu === 'delivery'
                ? `border-b-2 border-bone hover:border-bone/70`
                : `border-b border-transparent`
            }`}
            onClick={() => {
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
              setMenu('assistance');
            }}
          >
            ASSISTANCE
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsMenu;

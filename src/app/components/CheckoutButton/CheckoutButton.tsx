import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';
import { useTranslation } from '../../../../utils/useTranslation';

const CheckoutButton: React.FC = () => {
  const { checkout, toggleCartMenu } = useCart();
  const router = useRouter();

  const { t } = useTranslation();

  const handleCheckout = async () => {
    try {
      const checkoutUrl = await checkout();
      router.push(checkoutUrl);
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed, please try again.');
    }
  };

  return (
    <div className='w-full mt-4'>
      <button
        onClick={async () => {
          toggleCartMenu();
          await handleCheckout();
        }}
        className='w-full border b-1 border-black bg-black text-white py-2 hover:text-black hover:bg-white transition duration-300 text-center block my-4'
      >
        {t('proceedtocheckout')}
      </button>
    </div>
  );
};

export default CheckoutButton;

const NotFound = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='text-4xl text-bordeux font-futura my-40 flex flex-col md:flex-row items-center'>
        <div className='font-altesse24 font-bold text-6xl mr-4'>404</div>
        <div className='hidden md:block'>|</div>
        <div className='md:hidden block w-20 border border-bordeux my-4'></div>
        <div className='md:ml-4'>page not found</div>
      </div>
    </div>
  );
};

export default NotFound;

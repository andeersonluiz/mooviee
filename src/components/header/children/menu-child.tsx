import SubItemChild from './sub-item-child';

const MenuChild = () => {
  return (
    //a partir de sm mudar o padrão
    <div className='md:mx- flex flex-1 justify-center gap-20 pl-8 pr-8 sm:gap-3 md:gap-10 lg:mx-8 lg:gap-20 xl:mx-16 2xl:mx-16'>
      <SubItemChild title='Home' color='text-neutral-400' />

      <SubItemChild title='Movies' color='text-white' />

      <SubItemChild title='Series' color='text-white' />
    </div>
  );
};

export default MenuChild;

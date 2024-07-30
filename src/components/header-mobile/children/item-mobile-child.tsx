const ItemMobileChild = ({ title, color }: { title: string; color: string }) => {
  return (
    <a className={`cursor-pointer text-xl ${color} rounded-lg bg-opacity-70 p-2 text-gray-200`}>
      {title}
    </a>
  );
};
export default ItemMobileChild;

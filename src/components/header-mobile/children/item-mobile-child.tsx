const ItemMobileChild = ({
  title,
  color,
  onClick,
}: {
  title: string;
  color: string;
  onClick: () => void;
}) => {
  return (
    <a
      onClick={onClick}
      className={`cursor-pointer select-none text-xl ${color} rounded-lg bg-opacity-70 p-2 text-gray-200`}
    >
      {title}
    </a>
  );
};
export default ItemMobileChild;

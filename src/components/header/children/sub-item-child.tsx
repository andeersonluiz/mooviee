const SubItemChild = ({
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
      className={`cursor-pointer text-2xl font-semibold ${color} `}
    >
      {title}
    </a>
  );
};
export default SubItemChild;

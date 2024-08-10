import SearchIcon from '../../icon/search-icon';

const SearchChild = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <a onMouseUp={onClick} onTouchEnd={onClick}>
      <SearchIcon />
    </a>
  );
};
export default SearchChild;

import SearchIcon from '../../icon/search-icon';

const SearchChild = ({ onClick }: { onClick: () => void }) => {
  return (
    <a onClick={onClick}>
      <SearchIcon />
    </a>
  );
};
export default SearchChild;

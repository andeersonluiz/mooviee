import SearchIcon from '../../icon/search-icon';
import { useEffect, useRef, useState } from 'react';

const SearchChild = ({ onClick }: { onClick: () => void }) => {
  return (
    <a onMouseUp={onClick} onTouchEnd={onClick}>
      <SearchIcon />
    </a>
  );
};
export default SearchChild;

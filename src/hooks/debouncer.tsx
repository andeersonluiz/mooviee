import React, { useEffect, useLayoutEffect, useState } from 'react';
import { clearTimeout } from 'timers';

export default function useDebouncer(value: any, delay = 1000) {
  const [debouncer, setDebouncer] = useState(value);

  useEffect(() => {
    console.log('value', value);
    const handler = setTimeout(() => {
      setDebouncer(value);
    }, delay);

    return () => {
      clearInterval(handler);
    };
  }, [value, delay]);

  return debouncer;
}

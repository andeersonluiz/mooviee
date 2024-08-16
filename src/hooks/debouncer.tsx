import { useEffect, useState } from 'react';

export default function useDebouncer(
  value: any,
  delay = 1000
) {
  const [debouncer, setDebouncer] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncer(value);
    }, delay);

    return () => {
      clearInterval(handler);
    };
  }, [value, delay]);

  return debouncer;
}

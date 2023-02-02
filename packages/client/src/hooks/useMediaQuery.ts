import { useEffect, useState } from "react";

const useMediaQuery = (query: string): boolean => {
  const defaultValue = (query: string): boolean => {
    if (typeof window !== undefined) {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(defaultValue(query));
  const handleChange = () => setMatches(defaultValue(query));

  useEffect(() => {
    const matchMedia = window.matchMedia(query);
    if (matches !== matchMedia.matches) {
      handleChange();
    }
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);
  return matches;
};

export default useMediaQuery;

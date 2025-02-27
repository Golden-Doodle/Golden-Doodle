import { useState, useEffect } from "react";

interface UseSearchProps<T> {
  data: T[];
  searchKey: keyof T;
  debounceTime?: number;
}

const useSearch = <T extends {}>({
  data,
  searchKey,
  debounceTime = 300,
}: UseSearchProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData([]); // Reset results when input is empty
      return;
    }

    const timeout = setTimeout(() => {
      // Filter data based on the search query
      const results = data.filter((item) =>
        String(item[searchKey])
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredData(results);
    }, debounceTime); // Debounce time

    return () => clearTimeout(timeout);
  }, [searchQuery, data, searchKey, debounceTime]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
  };
};

export default useSearch;

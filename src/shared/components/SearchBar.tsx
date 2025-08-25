import {
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

interface SearchBarProps {
  placeholder?: string;
  buttonLabel?: string;

  onQuery: (term: string) => void;
}

export const SearchBar = ({
  placeholder,
  buttonLabel,
  onQuery,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onQuery(query);
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, onQuery]);

  const handleSearch = () => {
    onQuery(query);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder ?? ""}
        value={query}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>{buttonLabel ?? "Buscar"}</button>
    </div>
  );
};

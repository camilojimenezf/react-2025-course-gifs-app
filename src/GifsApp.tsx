import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {
  const { gifs, previousTerms, handlePrevSearch, handleSearch } = useGifs();

  return (
    <>
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el gif perfecto"
      />

      <SearchBar
        placeholder="Buscar gifs"
        buttonLabel="Buscar"
        onQuery={handleSearch}
      />

      <PreviousSearches
        searches={previousTerms}
        onSearchClicked={handlePrevSearch}
      />

      <GifList gifs={gifs} />
    </>
  );
};

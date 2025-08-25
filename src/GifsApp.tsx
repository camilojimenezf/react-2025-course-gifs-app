import { useState } from "react";

import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";

import { getsGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";

import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const handlePrevSearch = async (term: string) => {
    const parsedTerm = term.trim().toLowerCase();
    const gifs = await getsGifsByQuery(parsedTerm);
    setGifs(gifs);
  };

  const handleSearch = async (term: string) => {
    const parsedTerm = term.trim().toLowerCase();

    if (parsedTerm.length === 0) return;
    if (previousTerms.includes(parsedTerm)) return;

    setPreviousTerms([parsedTerm, ...previousTerms].splice(0, 7));

    const gifs = await getsGifsByQuery(parsedTerm);
    setGifs(gifs);
  };

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

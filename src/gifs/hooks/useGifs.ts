import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getsGifsByQuery } from "../actions/get-gifs-by-query.action";

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const gifsCache = useRef<Map<string, Gif[]>>(new Map());

  const handlePrevSearch = async (term: string) => {
    if (gifsCache.current.has(term)) {
      setGifs(gifsCache.current.get(term)!);
      return;
    }

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
    gifsCache.current.set(parsedTerm, gifs);
  };

  return {
    gifs,
    previousTerms,

    handlePrevSearch,
    handleSearch,
  };
};

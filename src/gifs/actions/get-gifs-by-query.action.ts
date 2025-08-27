import type { Gif } from "../interfaces/gif.interface";
import type { GiphyResponse } from "../interfaces/giphy-response.interface";
import { giphyApi } from "../api/giphy.api";

export async function getsGifsByQuery(query: string): Promise<Gif[]> {
  if (query.trim().length === 0) return [];

  try {
    const response = await giphyApi.get<GiphyResponse>("/search", {
      params: {
        q: query,
        limit: 25,
      },
    });

    return response.data.data.map((giphyGif) => ({
      id: giphyGif.id,
      title: giphyGif.title,
      url: giphyGif.images.original.url,
      width: Number(giphyGif.images.original.width),
      height: Number(giphyGif.images.original.height),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

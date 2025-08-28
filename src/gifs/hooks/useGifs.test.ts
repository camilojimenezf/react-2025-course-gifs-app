import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { useGifs } from "./useGifs";
import * as actions from "../actions/get-gifs-by-query.action";
import { mockGifs } from "../../mocks/gifs.mock";

describe("useGifs", () => {
  test("should init hook with the right state", () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifs).toStrictEqual([]);
    expect(result.current.previousTerms).toStrictEqual([]);
    expect(result.current.handlePrevSearch).toBeDefined();
    expect(result.current.handleSearch).toBeDefined();
  });

  test("should perform handle search correctly", async () => {
    const { result } = renderHook(() => useGifs());

    const getGifsByQuerySpy = vi
      .spyOn(actions, "getsGifsByQuery")
      .mockResolvedValue(mockGifs);

    await act(async () => {
      await result.current.handleSearch("goku");
    });

    expect(getGifsByQuerySpy).toHaveBeenCalledOnce();
    expect(result.current.gifs).toStrictEqual(mockGifs);
  });

  test("should perform handle prev search correctly", async () => {
    const { result } = renderHook(() => useGifs());

    const getGifsByQuerySpy = vi
      .spyOn(actions, "getsGifsByQuery")
      .mockResolvedValue(mockGifs);

    await act(async () => {
      await result.current.handlePrevSearch("goku");
    });

    expect(getGifsByQuerySpy).toHaveBeenCalledOnce();
    expect(result.current.gifs).toStrictEqual(mockGifs);
  });

  test("should use cache correctly", async () => {
    const { result } = renderHook(() => useGifs());

    const getGifsByQuerySpy = vi
      .spyOn(actions, "getsGifsByQuery")
      .mockResolvedValueOnce(mockGifs);

    await act(async () => {
      await result.current.handleSearch("goku");
    });

    const getGifsByQueryErrorSpy = vi
      .spyOn(actions, "getsGifsByQuery")
      .mockRejectedValueOnce(new Error("My Custom Error"));

    expect(getGifsByQuerySpy).toHaveBeenCalledOnce();
    expect(getGifsByQueryErrorSpy).not.toHaveBeenCalled();
    expect(result.current.gifs).toStrictEqual(mockGifs);
  });

  test("should handle up to 8 previous terms", async () => {
    const { result } = renderHook(() => useGifs());
    const searches = [
      "goku",
      "vegeta",
      "gohan",
      "piccolo",
      "bulma",
      "goten",
      "trunks",
      "frezeer",
      "cell",
    ];

    vi.spyOn(actions, "getsGifsByQuery").mockResolvedValue([]);

    for (const search of searches) {
      await act(async () => {
        await result.current.handleSearch(search);
      });
    }

    const expectedResult = searches.slice(1, 9).reverse();

    expect(result.current.previousTerms.length).toBe(8);
    expect(result.current.previousTerms).toStrictEqual(expectedResult);
  });
});

import { beforeEach, describe, expect, test, vi } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";
import { giphyApi } from "../api/giphy.api";
import { giphySearchResponseMock } from "../../../tests/mocks/giphy.mock";
import { getsGifsByQuery } from "./get-gifs-by-query.action";

describe("getsGifsByQuery", () => {
  const mock = new AxiosMockAdapter(giphyApi);

  beforeEach(() => {
    mock.onGet("/search").reply(200, giphySearchResponseMock);
  });

  test("should return a list of gifs", async () => {
    const gifs = await getsGifsByQuery("goku");

    expect(gifs.length).toBe(giphySearchResponseMock.data.length);

    gifs.forEach((gif) => {
      expect(gif).toStrictEqual({
        id: expect.any(String),
        title: expect.any(String),
        url: expect.any(String),
        width: expect.any(Number),
        height: expect.any(Number),
      });
    });
  });

  test("should return empty list if query is empty", async () => {
    const gifs = await getsGifsByQuery("");

    expect(gifs.length).toBe(0);
  });

  test("should handle error", async () => {
    mock.onGet("/search").reply(400, "Bad Request Error");
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const gifs = await getsGifsByQuery("goku");

    expect(gifs.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
  });
});

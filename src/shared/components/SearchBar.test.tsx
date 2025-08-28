import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  test("should render the component correctly", () => {
    const { container } = render(<SearchBar onQuery={() => {}} />);

    expect(container).toMatchSnapshot();
  });

  test("should call onQuery with delay (debounce)", async () => {
    const onQueryMock = vi.fn();
    const inputText = "test message";
    render(<SearchBar onQuery={onQueryMock} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: inputText },
    });

    expect(onQueryMock).not.toHaveBeenCalled(); // not called immediately

    await new Promise((resolve) => setTimeout(() => resolve(true), 200));

    expect(onQueryMock).not.toHaveBeenCalled(); // not called in 200 ms

    // should be called after 200 ms
    await waitFor(() => {
      expect(onQueryMock).toHaveBeenCalled();
      expect(onQueryMock).toHaveBeenCalledWith(inputText);
    });
  });

  test("should call onQuery with the latest change (debounce)", async () => {
    const onQueryMock = vi.fn();
    const inputText = "test message";
    render(<SearchBar onQuery={onQueryMock} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, {
      target: { value: "t" },
    });
    fireEvent.change(input, {
      target: { value: "te" },
    });
    fireEvent.change(input, {
      target: { value: "tes" },
    });
    fireEvent.change(input, {
      target: { value: "test" },
    });
    fireEvent.change(input, {
      target: { value: "test m" },
    });
    fireEvent.change(input, {
      target: { value: inputText },
    });

    await waitFor(() => {
      expect(onQueryMock).toHaveBeenCalled();
      expect(onQueryMock).toHaveBeenCalledWith(inputText);
    });
  });

  test("should call immediately onQuery when clicking button", () => {
    const onQueryMock = vi.fn();
    const inputText = "test message";
    render(<SearchBar onQuery={onQueryMock} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    fireEvent.change(input, {
      target: { value: inputText },
    });

    fireEvent.click(button);

    expect(onQueryMock).toHaveBeenCalled();
    expect(onQueryMock).toHaveBeenCalledWith(inputText);
  });

  test("should use the placeholder", () => {
    const placeholder = "insert message";

    render(<SearchBar onQuery={() => {}} placeholder={placeholder} />);

    const input = screen.getByRole("textbox");
    const placeholderElement = screen.getByPlaceholderText(placeholder);

    expect(input).toBe(placeholderElement);
  });
});

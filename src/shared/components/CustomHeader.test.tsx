import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CustomHeader } from "./CustomHeader";

describe("CustomHeader", () => {
  const title = "Test Title";

  test("Should render title correctly", () => {
    const { container } = render(<CustomHeader title={title} />);

    const h1 = container.querySelector("h1");

    expect(h1?.innerHTML).toBe(title);
  });

  test("Should render description when is given", () => {
    const description = "Test Description";

    const { container } = render(
      <CustomHeader title={title} description={description} />
    );

    const p = container.querySelector("p");

    expect(p).toBeDefined();
    expect(p?.innerHTML).toBe(description);
  });

  test("Should not render description if not given", () => {
    const { container } = render(<CustomHeader title={title} />);

    const p = container.querySelector("p");

    expect(p).toBe(null);
  });
});

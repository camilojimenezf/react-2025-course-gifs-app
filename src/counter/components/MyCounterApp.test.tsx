import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { MyCounterApp } from "./MyCounterApp";

describe("MyCounterApp", () => {
  test("should render component", () => {
    render(<MyCounterApp />);

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toBe(
      "counter: 10"
    );
    expect(screen.getByRole("button", { name: "+1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "-1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "reset" })).toBeDefined();
  });

  test("should handle add action", () => {
    render(<MyCounterApp />);

    const button = screen.getByRole("button", { name: "+1" });

    fireEvent.click(button);

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toBe(
      "counter: 11"
    );
  });

  test("should handle subtract action", () => {
    render(<MyCounterApp />);

    const button = screen.getByRole("button", { name: "-1" });

    fireEvent.click(button);

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toBe(
      "counter: 9"
    );
  });
});

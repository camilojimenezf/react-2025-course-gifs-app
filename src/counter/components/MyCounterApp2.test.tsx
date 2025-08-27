import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MyCounterApp } from "./MyCounterApp";

const handleAddMock = vi.fn();
const handleSubtractMock = vi.fn();
const handleResetMock = vi.fn();

vi.mock("../hooks/useCounter", () => ({
  useCounter: () => ({
    counter: 40,
    handleAdd: handleAddMock,
    handleSubtract: handleSubtractMock,
    handleReset: handleResetMock,
  }),
}));

describe("MyCounterApp", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render component", () => {
    render(<MyCounterApp />);

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toBe(
      "counter: 40"
    );
    expect(screen.getByRole("button", { name: "+1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "-1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "reset" })).toBeDefined();
  });

  test("should handle add action", () => {
    render(<MyCounterApp />);

    const button = screen.getByRole("button", { name: "+1" });

    fireEvent.click(button);

    expect(handleAddMock).toHaveBeenCalled();
    expect(handleSubtractMock).not.toHaveBeenCalled();
    expect(handleResetMock).not.toHaveBeenCalled();
  });

  test("should handle subtract action", () => {
    render(<MyCounterApp />);

    const button = screen.getByRole("button", { name: "-1" });

    fireEvent.click(button);

    expect(handleAddMock).not.toHaveBeenCalled();
    expect(handleSubtractMock).toHaveBeenCalled();
    expect(handleResetMock).not.toHaveBeenCalled();
  });

  test("should handle reset action", () => {
    render(<MyCounterApp />);

    const button = screen.getByRole("button", { name: "reset" });

    fireEvent.click(button);

    expect(handleAddMock).not.toHaveBeenCalled();
    expect(handleSubtractMock).not.toHaveBeenCalled();
    expect(handleResetMock).toHaveBeenCalled();
  });
});

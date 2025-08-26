import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  test("Should init with default value", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.counter).toBe(10);
  });

  test("Should init with custom default value", () => {
    const initialValue = 20;
    const { result } = renderHook(() => useCounter(initialValue));

    expect(result.current.counter).toBe(initialValue);
  });

  test("Should add correctly", () => {
    const { result } = renderHook(() => useCounter());
    const initialValue = result.current.counter;

    act(() => {
      result.current.handleAdd();
    });

    expect(result.current.counter).toBe(initialValue + 1);
  });

  test("Should subtract correctly", () => {
    const { result } = renderHook(() => useCounter());
    const initialValue = result.current.counter;

    act(() => {
      result.current.handleSubtract();
    });

    expect(result.current.counter).toBe(initialValue - 1);
  });

  test("Should reset correctly", () => {
    const { result } = renderHook(() => useCounter());
    const initialValue = result.current.counter;

    act(() => {
      result.current.handleSubtract();
      result.current.handleSubtract();
      result.current.handleSubtract();
      result.current.handleSubtract();
      result.current.handleSubtract();
    });

    expect(result.current.counter).toBe(initialValue - 5);

    act(() => {
      result.current.handleReset();
    });

    expect(result.current.counter).toBe(initialValue);
  });
});

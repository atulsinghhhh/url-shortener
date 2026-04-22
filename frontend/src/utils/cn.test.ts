import { expect, test, describe } from "bun:test";
import { cn } from "./cn";

describe("cn utility", () => {
  test("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  test("handles conditional classes", () => {
    const isTrue = true;
    const isFalse = false;
    expect(cn("a", isTrue && "b", isFalse && "c")).toBe("a b");
  });

  test("merges tailwind classes correctly", () => {
    // twMerge should handle conflicts
    expect(cn("px-2 py-2", "px-4")).toBe("py-2 px-4");
  });

  test("handles undefined and null", () => {
    expect(cn("a", undefined, null, "b")).toBe("a b");
  });
});

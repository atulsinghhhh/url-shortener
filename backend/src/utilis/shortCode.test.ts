import { expect, test, describe } from "bun:test";
import { generateShortCode } from "./shortCode";

describe("generateShortCode", () => {
  test("should generate a code of default length 6", () => {
    const code = generateShortCode();
    expect(code).toHaveLength(6);
  });

  test("should generate a code of specified length", () => {
    const code = generateShortCode(8);
    expect(code).toHaveLength(8);
  });

  test("should only contain valid characters", () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const code = generateShortCode(100);
    for (const char of code) {
      expect(chars).toContain(char);
    }
  });

  test("should generate different codes (randomness check)", () => {
    const code1 = generateShortCode();
    const code2 = generateShortCode();
    expect(code1).not.toBe(code2);
  });
});

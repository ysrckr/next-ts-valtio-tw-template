import { test, describe, expect } from 'vitest';
import 'array.d.ts';
describe('reverseFast', () => {
  test('should reverse an array of numbers', () => {
    const arr = [1, 2, 3, 4, 5];
    const reversed = arr.reverseFast();

    expect(reversed).toEqual([5, 4, 3, 2, 1]);
  });

  test('should reverse an array of strings', () => {
    const arr = ['a', 'b', 'c', 'd', 'e'];
    const reversed = arr.reverseFast();

    expect(reversed).toEqual(['e', 'd', 'c', 'b', 'a']);
  });

  test('should reverse an array of objects', () => {
    const arr = [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }, { e: 5 }];
    const reversed = arr.reverseFast();

    expect(reversed).toEqual([{ e: 5 }, { d: 4 }, { c: 3 }, { b: 2 }, { a: 1 }]);
  });

  test('should reverse an array of arrays', () => {
    const arr = [[1], [2], [3], [4], [5], [6]];
    const reversed = arr.reverseFast();

    expect(reversed).toEqual([[6], [5], [4], [3], [2], [1]]);
  });
});

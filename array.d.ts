declare global {
  interface Array<T> {
    reverseFast(): Array<T>;
  }
}

Array.prototype.reverseFast = function () {
  let left = 0;
  let right = 0;
  const { length } = this;

  for (left = 0; left < length / 2; left += 1) {
    right = length - 1 - left;
    [this[left], this[right]] = [this[right], this[left]];
  }

  return this;
};

export {};

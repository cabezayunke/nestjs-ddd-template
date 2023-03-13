export abstract class ValueObject<T> {
  private readonly _value: T;

  constructor(value: T) {
    this._value = value;
  }

  get value(): T {
    return this._value;
  }

  equals(o: ValueObject<T>): boolean {
    return this.value === o.value;
  }

  toString(): string | undefined {
    return this._value?.toString();
  }
}

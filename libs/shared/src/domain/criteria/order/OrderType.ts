import { InvalidArgumentError } from '../../errors/InvalidArgumentError';
import { EnumValueObject } from '../../value-object/primitives/EnumValueObject';

export enum OrderTypes {
  ASC = 'asc',
  DESC = 'desc',
}

export class OrderType extends EnumValueObject<OrderTypes> {
  constructor(value: OrderTypes) {
    super(value, Object.values(OrderTypes));
  }

  static fromValue(value: string): OrderType {
    switch (value) {
      case OrderTypes.ASC:
        return new OrderType(OrderTypes.ASC);
      case OrderTypes.DESC:
        return new OrderType(OrderTypes.DESC);
      default:
        throw new InvalidArgumentError(`The order type ${value} is invalid`);
    }
  }

  public isAsc(): boolean {
    return this.value === OrderTypes.ASC;
  }

  protected throwErrorForInvalidValue(value: OrderTypes): void {
    throw new InvalidArgumentError(`The order type ${value} is invalid`);
  }
}

import { applyDecorators } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

// eslint-disable-next-line @typescript-eslint/ban-types
export const OnEvents = (events: string[]): Function => {
  return applyDecorators(...events.map(e => OnEvent(e)));
};

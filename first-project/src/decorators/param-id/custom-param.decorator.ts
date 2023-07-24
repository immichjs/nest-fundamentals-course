import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CustomParam = createParamDecorator((_data: string, context: ExecutionContext) => {
  return Number(context.switchToHttp().getRequest().params[_data])
})
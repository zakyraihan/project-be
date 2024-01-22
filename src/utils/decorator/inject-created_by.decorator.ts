import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CreatedBy = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    request.body.created_by = { id: request.user.id };

    return request.body;
  },
);

import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UpdatedBy = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    req.body.updated_by = { id: req.user.id };

    return req.body;
  },
);

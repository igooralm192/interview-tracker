import { CanActivate, ExecutionContext } from '@nestjs/common';

export class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // 🚀 Importante: para GraphQL, o request vem do GqlExecutionContext
    const ctx = context.getArgByIndex(2); // GraphQL context
    ctx.req.user = {
      userId: 'auth0|fake-user-123',
      email: 'test@example.com',
      roles: ['tester'],
    };
    return true;
  }
}

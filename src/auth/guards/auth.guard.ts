import { User } from '@/user/entities/user.entity';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  // constructor() {
  //   super();
  // }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    // const req = context.switchToHttp().getRequest();
    // const user = req.user;
    return true;
  }

  handleRequest(error: any, user: User): any {
    if (error || !user) {
      throw error || new UnauthorizedException('Acesso não autorizado.');
    }
    return user;
  }
}

import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JAuthGuard extends AuthGuard('jwt') {
}
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login-dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(dto: LoginDTO) {
        const user = await this.usersService.validateAndFindUser(dto.username.toLowerCase(), dto.password);
        if (!user)
            throw new HttpException('Invalid username/password, Please try again.', HttpStatus.FORBIDDEN);
        console.log(user);
        return {
            access_token: this.jwtService.sign({ ...user })
        }
    }

}

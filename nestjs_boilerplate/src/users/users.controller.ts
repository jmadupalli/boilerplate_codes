import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDTO } from './dto/register-dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    async userRegister(@Body() userData: RegisterDTO) {
        return await this.usersService.register(userData);
    }

    @Post('login')
    async userLogin() {
        return 'Logged in';
    }
}

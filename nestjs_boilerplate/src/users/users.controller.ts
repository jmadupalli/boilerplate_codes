import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    async userRegister() {
        return 'Registered';
    }

    @Post('login')
    async userLogin() {
        return 'Logged in';
    }
}

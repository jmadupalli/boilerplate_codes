import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { User } from 'src/auth/user.decorator';
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

    @Get('getUser')
    @UseGuards(JAuthGuard, RolesGuard)
    @ApiBearerAuth()
    async getUser(@User() user) {
        return user;
    }
}

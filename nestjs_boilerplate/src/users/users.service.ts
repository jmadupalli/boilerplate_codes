import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dto/register-dto';

import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/roles/role.enum';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>
    ) { }

    async register(userData: RegisterDTO) {
        const alreadyRegistered = await this.usersRepo.findOneBy({ email: userData.email.toLowerCase() });
        if (alreadyRegistered) {
            throw new HttpException('User email already registered, Please try again.', HttpStatus.BAD_REQUEST)
        }
        userData['roles'] = [Role.User, Role.Admin];
        return { id: (await this.usersRepo.save(this.usersRepo.create(userData))).id };
    }

    async validateAndFindUser(email: string, password: string) {
        const user = await this.usersRepo.findOne({ where: { email }, select: ['id', 'firstName', 'lastName', 'email', 'password', 'roles'] })
        if (!user)
            return null;
        if (!(await bcrypt.compare(password, user.password)))
            return null;
        delete user.password;
        return user;
    }


}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dto/register-dto';

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
        return { id: (await this.usersRepo.save(this.usersRepo.create(userData))).id };
    }


}

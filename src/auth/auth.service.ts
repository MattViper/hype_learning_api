import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from '../users/user.entity';
import { JwtPayload } from './dto/jwt-payload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    async signUp(credentialsDto: CredentialsDto): Promise<User> {
        return await this.userRepository.signUp(credentialsDto);
    }

    async signIn (credentialsDto: CredentialsDto): Promise<{ accessToken: string }> {
        const email = await this.userRepository.validatePassword(credentialsDto);

        if (!email) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { email };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }
}
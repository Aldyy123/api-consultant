import { Injectable } from '@nestjs/common';
import { UserLoginService } from '../user-login/user-login.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private usersService: UserLoginService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        try {
            const userLogin = await this.usersService.findOne(email);
            const passwordCompare = await bcrypt.compare(pass, userLogin.user.password)
            if (userLogin.user && passwordCompare) {
                const { password, ...result } = userLogin.user;
                console.log(result)
                return result;
            }
            return null;
        } catch (error) {
            console.log(error)
        }
    }
}

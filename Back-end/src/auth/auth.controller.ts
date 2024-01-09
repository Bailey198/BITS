import { Body, Controller, Post, SetMetadata, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './decorator/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('register')
    @Public()
    register(@Body() registerUserDto:RegisterUserDto): Promise<User> {
        console.log('register api');
        console.log(registerUserDto);
        return this.authService.register(registerUserDto);
    }

    @Post('login')
    @Public()
    @ApiResponse({status:201, description: 'Login Successfully!'})
    @ApiResponse({status:401, description: 'Login Fail!'})
    @UsePipes(ValidationPipe)
    login(@Body() loginUserDto:LoginUserDto):Promise<any> {
        console.log(loginUserDto)

        return this.authService.login(loginUserDto)
    }
    
    @Public()
    @Post('refresh-token')
    refreshToken(@Body() {refresh_token}):Promise<any> {
        console.log('refresh token api')
        return this.authService.refreshToken(refresh_token);
    }

}

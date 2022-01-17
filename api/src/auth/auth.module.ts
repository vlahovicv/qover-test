import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { defaultTokenExp } from './values';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: defaultTokenExp,
          },
        }),
      }),
    ],
    providers: [JwtStrategy, AuthService, UserRepository],
    controllers: [AuthController],
})
export class AuthModule {}
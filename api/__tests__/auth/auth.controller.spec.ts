import { Test } from '@nestjs/testing';
import { loginRequestStub, loginResponseStub, userValuesStub } from '../stub/authData';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';
import { UserRepository } from 'src/auth/user.repository';
import { MockModel } from '__tests__/util/mock.modlel';
import { User } from 'src/auth/schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { defaultTokenExp } from 'src/auth/values';

class MockUserModel extends MockModel<User>(userValuesStub()) {}

describe('AuthController', () => {
  let authService: AuthService;
  let authController: AuthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET || 'secret',
          signOptions: { expiresIn: defaultTokenExp },
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        UserRepository,
        {
          provide: getModelToken(User.name),
          useValue: MockUserModel,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  it('Should return login in success response', async () => {
    const res = await authController.logIn(loginRequestStub());
    console.log(res)
    console.log(loginResponseStub())

    expect(res.token).toBeDefined();
    expect(res.user).toEqual(loginResponseStub().user);

  });
});
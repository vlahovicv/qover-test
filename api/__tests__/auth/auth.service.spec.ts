import { Test } from '@nestjs/testing';
import { UserDataDto } from 'src/auth/dto/user-data.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { loginRequestStub, loginResponseStub, userValuesStub } from '../stub/authData';
import { defaultTokenExp, rememberUserTokenExp } from 'src/auth/values';
import { BadPasswordException } from 'src/auth/exceptions/BadPassword.exception';
import { UserAlreadyExistsException } from 'src/auth/exceptions/UserAlreadyExists.exception';
import { User } from 'src/auth/schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { MockModel } from '__tests__/util/mock.modlel';
import { UserRepository } from 'src/auth/user.repository';

class MockUserModel extends MockModel<User>(userValuesStub()) {}

describe('AuthService', () => {
  let jwtService: JwtService;
  let authService: AuthService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET || 'secret',
          signOptions: { expiresIn: defaultTokenExp },
        }),
      ],
      providers: [
        AuthService,
        UserRepository,
        {
          provide: getModelToken(User.name),
          useValue: MockUserModel,
        },
      ],
    }).compile();

    jwtService = module.get<JwtService>(JwtService);
    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    
    jest.clearAllMocks();
  });

  describe('User authentication', () => {
    it('Should respond with token and serialized user', async () => {
      const req = loginRequestStub();
      const res = loginResponseStub();
      const expected =  await authService.findUser(req)
      expect(expected.token).toBeDefined();
      expect(expected.user).toEqual(res.user);
    });

    it('Should throw error if user already exists', async () => {
        const req: UserDataDto = loginRequestStub();
        expect(authService.createUser(req)).rejects.toThrow(UserAlreadyExistsException);
    });

    it('Should throw error if user forwarded wrong password', async () => {
        const req: UserDataDto = loginRequestStub({
            password: 'Bad password'
        });
      expect(authService.findUser(req)).rejects.toThrow(BadPasswordException);
    });

    it('Should implement logic for longer token exparation time', async () => {

        const req: UserDataDto = loginRequestStub();
        const miliSecondToSecond = 1000;
        const timestamp =
        new Date().getTime() + rememberUserTokenExp * miliSecondToSecond;

        const res = await authService.findUser(req);
        const jwt = jwtService.decode(res.token);
        const jwtExpTimeInMiliseconds = (jwt as any).exp * miliSecondToSecond;

        expect((jwt as any).exp).toBeDefined();timestamp
        expect(timestamp).toBeGreaterThan(jwtExpTimeInMiliseconds);
    });
  });
});

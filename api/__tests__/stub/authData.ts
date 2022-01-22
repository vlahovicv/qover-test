import { UserDataDto } from 'src/auth/dto/user-data.dto';
import { ResponseDataDto } from 'src/auth/dto/response-data.dto';
import { SerializedUser } from 'src/auth/types/SerializedUser';
import { User } from 'src/auth/schemas/user.schema';


export const loginRequestStub = (
  values?: Partial<UserDataDto>,
): UserDataDto => ({
  email: 'test2@gmail.com',
  rememberUser: true,
  password: 'test2',
  ...values,
});

export const userValuesStub = (): User => ({
  _id: '61bc8d1a6dc017e360ba86b7',
  email: 'test2@gmail.com',
  password: '$2b$10$dD3/8KVSWYk/EPRyKs44tu3j0fTlo5Rs7lgv9j4G4gm6A7nVUNmsG'
})


export const loginResponseStub = (): ResponseDataDto => ({
  user: new SerializedUser(userValuesStub()),
  token: 'token'
});

export const hashedPassword = () => { 
  return '$2b$10$dD3/8KVSWYk/EPRyKs44tu3j0fTlo5Rs7lgv9j4G4gm6A7nVUNmsG'; 
}
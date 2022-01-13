import { IsNotEmpty, Matches } from 'class-validator';

 export class UserDataDto {
    @Matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, {
        message:
          'Please enter email address with valid format.',
      })
    @IsNotEmpty({ message: 'Email should not be empty' })
    email: string;
  
    @IsNotEmpty({ message: 'Password should not be empty' })
    password: string;
}
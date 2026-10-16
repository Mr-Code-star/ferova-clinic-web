import { SignInResource, SignInResponse } from './sign-in-response';
import { SignInCommand } from '../domain/model/sign-in.command';
import { SignInRequest } from './sign-in.request';

export class SignInAssembler {
  toResourceFromResponse(response: SignInResponse): SignInResource {
    return  {
      id: response.id,
      token: response.token
    }
  }

  toRequestFromCommand(command: SignInCommand): SignInRequest {
    return {
      dni: command.dni,
      password: command.password,
    } as SignInRequest;
  }
}

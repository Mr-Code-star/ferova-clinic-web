import { SignUpResource, SignUpResponse } from './sign-up-response';
import { SignUpCommand } from '../domain/model/sign-up.command';
import { SignUpRequest } from './sign-up.request';

/**
 *
 */
export class SignUpAssembler {
  /**
   * Converts a SignUpResponse object to a SignUpResource object.
   * @param response
   */
  toResourceFromResponse(response: SignUpResponse): SignUpResource {
    return {
      id: response.id,
      message: response.message
    }
  }

  /**
   * Converts a SignUpCommand object to a SignUpRequest object.
   * @param command
   */
  toRequestFromCommand(command: SignUpCommand): SignUpRequest {
    return {
      name: command.name,
      lastName: command.lastName,
      email: command.email,
      dni: command.dni,
      phone: command.phone,
      password: command.password, // Password is not part of the command, set it to an empty string or handle it as needed
      role: command.role
    } as SignUpRequest;
  }
}

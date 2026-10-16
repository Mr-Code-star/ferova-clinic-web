import { RequestCodeCommand } from '../domain/model/request-code.command';
import { VerifyCodeCommand } from '../domain/model/verify-code.command';
import { ResetPasswordCommand } from '../domain/model/reset-password.command';

import {
  RequestCodeRequest,
  VerifyCodeRequest,
  ResetPasswordRequest,
} from './password-recovery-request';

/**
 * Assembler that transforms domain commands into backend requests.
 *
 * @remarks
 * This class handles the conversion between the domain layer (which uses
 * domain language) and the infrastructure layer (which uses the backend's
 * exact JSON contract).
 */
export class PasswordRecoveryAssembler {

  /**
   * Converts a RequestCodeCommand into a RequestCodeRequest.
   *
   * @param command - Domain command with the email
   * @returns Request body for POST /password/request-code
   */
  toRequestCodeRequest(command: RequestCodeCommand): RequestCodeRequest {
    return {
      email: command.email,
    };
  }

  /**
   * Converts a VerifyCodeCommand into a VerifyCodeRequest.
   *
   * @param command - Domain command with email and code
   * @returns Request body for POST /password/verify-code
   */
  toVerifyCodeRequest(command: VerifyCodeCommand): VerifyCodeRequest {
    return {
      email: command.email,
      code: command.code,
    };
  }

  /**
   * Converts a ResetPasswordCommand into a ResetPasswordRequest.
   *
   * @param command - Domain command with email, code, and new password
   * @returns Request body for POST /password/reset
   */
  toResetPasswordRequest(command: ResetPasswordCommand): ResetPasswordRequest {
    return {
      email: command.email,
      code: command.code,
      newPassword: command.newPassword,
    };
  }
}

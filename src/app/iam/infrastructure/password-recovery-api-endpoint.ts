import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment.development';
import { PasswordRecoveryAssembler } from './password-recovery-assembler';

import { RequestCodeCommand } from '../domain/model/request-code.command';
import { VerifyCodeCommand } from '../domain/model/verify-code.command';
import { ResetPasswordCommand } from '../domain/model/reset-password.command';

import {
  RequestCodeResponse,
  VerifyCodeResponse,
  ResetPasswordResponse,
} from './password-recovery-response';

/**
 * Base URL for all password recovery endpoints.
 *
 * @remarks
 * Combines environment base path with the users endpoint path
 * and appends `/password` to reach the recovery flow.
 */
const passwordRecoveryUrl =
  `${environment.serverBasePath}${environment.usersEndpointPath}/password`;

/**
 * HTTP endpoint for the password recovery flow (3 steps).
 *
 * @remarks
 * This endpoint intentionally does NOT wrap errors with catchError so
 * the HttpErrorResponse (including the backend's error body) reaches
 * the store intact. The store is responsible for extracting the error
 * message from `err.error.error`.
 */
@Injectable({ providedIn: 'root' })
export class PasswordRecoveryApiEndpoint {

  private readonly assembler = new PasswordRecoveryAssembler();

  constructor(private readonly http: HttpClient) {}

  /**
   * Step 1: Request a recovery code by email.
   *
   * @param command - Command with the user's email
   * @returns Observable with the backend's response
   */
  requestCode(command: RequestCodeCommand): Observable<RequestCodeResponse> {
    const request = this.assembler.toRequestCodeRequest(command);
    return this.http.post<RequestCodeResponse>(
      `${passwordRecoveryUrl}/request-code`,
      request
    );
  }

  /**
   * Step 2: Verify the 4-digit code received by email.
   *
   * @param command - Command with email and code
   * @returns Observable with the backend's response
   */
  verifyCode(command: VerifyCodeCommand): Observable<VerifyCodeResponse> {
    const request = this.assembler.toVerifyCodeRequest(command);
    return this.http.post<VerifyCodeResponse>(
      `${passwordRecoveryUrl}/verify-code`,
      request
    );
  }

  /**
   * Step 3: Set a new password using the verified code.
   *
   * @param command - Command with email, code, and new password
   * @returns Observable with the backend's response
   */
  resetPassword(command: ResetPasswordCommand): Observable<ResetPasswordResponse> {
    const request = this.assembler.toResetPasswordRequest(command);
    return this.http.post<ResetPasswordResponse>(
      `${passwordRecoveryUrl}/reset`,
      request
    );
  }
}

import { BaseApi } from '../../shared/infrastructure/base-api';
import { Injectable } from '@angular/core';
import { SignInApiEndpoint } from './sign-in-api-endpoint';
import { SignUpCommand } from '../domain/model/sign-up.command';
import { Observable } from 'rxjs';
import { SignUpResource } from './sign-up-response';
import { HttpClient } from '@angular/common/http';
import { SignInAssembler } from './sign-in-assembler';
import { SignUpApiEndpoint } from './sign-up-api-endpoint';
import { SignUpAssembler } from './sign-up-assembler';
import { SignInCommand } from '../domain/model/sign-in.command';
import { SignInResource } from './sign-in-response';
import { RequestCodeCommand } from '../domain/model/request-code.command';
import { VerifyCodeCommand } from '../domain/model/verify-code.command';
import { ResetPasswordCommand } from '../domain/model/reset-password.command';
import {
  RequestCodeResponse,
  ResetPasswordResponse,
  VerifyCodeResponse,
} from './password-recovery-response';
import { PasswordRecoveryApiEndpoint } from './password-recovery-api-endpoint';

@Injectable({ providedIn: 'root' })
export class IamApi extends BaseApi {
  private readonly signInREndpoint: SignInApiEndpoint;
  private readonly signUpEndpoint: SignUpApiEndpoint;
  private readonly passwordRecoveryEndpoint: PasswordRecoveryApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.signInREndpoint = new SignInApiEndpoint(http, new SignInAssembler());
    this.signUpEndpoint = new SignUpApiEndpoint(http, new SignUpAssembler());
    this.passwordRecoveryEndpoint = new PasswordRecoveryApiEndpoint(http);
  }
  // ============================================
  // AUTH
  // ============================================

  signUp(signUpCommand: SignUpCommand): Observable<SignUpResource> {
    return this.signUpEndpoint.signUp(signUpCommand);
  }

  signIn(signInCommand: SignInCommand): Observable<SignInResource> {
    return this.signInREndpoint.signIn(signInCommand);
  }

  // ============================================
  // PASSWORD RECOVERY
  // ============================================
  requestPasswordCode(command: RequestCodeCommand): Observable<RequestCodeResponse> {
    return this.passwordRecoveryEndpoint.requestCode(command);
  }

  verifyPasswordCode(command: VerifyCodeCommand): Observable<VerifyCodeResponse> {
    return this.passwordRecoveryEndpoint.verifyCode(command);
  }

  resetPassword(command: ResetPasswordCommand): Observable<ResetPasswordResponse> {
    return this.passwordRecoveryEndpoint.resetPassword(command);
  }

}

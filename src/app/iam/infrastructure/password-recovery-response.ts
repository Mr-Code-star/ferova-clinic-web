import { BaseResponse } from '../../shared/infrastructure/base-response';

export interface RequestCodeResponse extends BaseResponse {
  message?: string;
}

export interface VerifyCodeResponse extends BaseResponse {
  message?: string;
}

export interface ResetPasswordResponse extends BaseResponse {
  message?: string;
}

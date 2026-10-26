import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface SignInResource extends BaseResource{
  token: string;
}

export interface SignInResponse extends BaseResponse, SignInResource {}

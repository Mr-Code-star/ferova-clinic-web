import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface UserResource extends BaseResource {
  id: string;
  name: string;
  lastName: string;
  role: string,
  dni: string,
  email: string,
  phone: string;
}

export interface UserResponse extends BaseResponse, UserResource {}

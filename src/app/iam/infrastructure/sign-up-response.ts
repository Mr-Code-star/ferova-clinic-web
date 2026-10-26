import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface SignUpResource extends BaseResource {
  message: string;
}

/**
 * Response interface for sign-up API calls.
 * Extends BaseResponse and SignUpResource.
 */
export interface SignUpResponse extends BaseResponse, SignUpResource {}

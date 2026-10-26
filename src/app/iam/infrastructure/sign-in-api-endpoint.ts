import { HttpClient } from '@angular/common/http';
import { SignInAssembler } from './sign-in-assembler';
import { environment } from '../../../environment/environment';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { SignInCommand } from '../domain/model/sign-in.command';
import { catchError, map, Observable } from 'rxjs';
import { SignInResource, SignInResponse } from './sign-in-response';

const signInApiEndpointUrl = `${environment.serverBasePath}${environment.usersEndpointPath}`;

export class SignInApiEndpoint extends ErrorHandlingEnabledBaseType{
  constructor(private http: HttpClient, private assembler: SignInAssembler) {
    super();
  }

  signIn(signInCommand: SignInCommand): Observable<SignInResource> {
    const signInRequest = this.assembler.toRequestFromCommand(signInCommand);
    return this.http.post<SignInResponse>(`${signInApiEndpointUrl}/login`, signInRequest).pipe(
      map(res => this.assembler.toResourceFromResponse(res)),
      catchError(this.handleError('Failed to sign in user'))
    )
  }

}

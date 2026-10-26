import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { HttpClient } from '@angular/common/http';
import { SignUpAssembler } from './sign-up-assembler';
import { SignUpCommand } from '../domain/model/sign-up.command';
import { catchError, map, Observable } from 'rxjs';
import { SignUpResource } from './sign-up-response';
import { environment } from '../../../environment/environment.development';

const signUpApiUrl = `${environment.serverBasePath}${environment.usersEndpointPath}`;

export class SignUpApiEndpoint extends ErrorHandlingEnabledBaseType {
  constructor(private http: HttpClient, private assembler: SignUpAssembler) {
    super();
  }

  signUp(signUpCommand: SignUpCommand) : Observable<SignUpResource> {
    const signUpRequest = this.assembler.toRequestFromCommand(signUpCommand);
    return this.http.post<SignUpResource>(`${signUpApiUrl}/register/staff`, signUpRequest).pipe(
        map(res => this.assembler.toResourceFromResponse(res)),
        catchError(this.handleError('Failed to sign up user'))
      )
  }
}

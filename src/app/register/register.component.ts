import { Component} from '@angular/core';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {
  credentials: TokenPayload = {
    username: '',
    password: ''
  };

  constructor(private _authService: AuthenticationService, private _router: Router) { }

  register() {
    this._authService.register(this.credentials)
    .subscribe(() => {
      this._router.navigateByUrl('/home');
    }, (err) => console.error(err));
  }
}

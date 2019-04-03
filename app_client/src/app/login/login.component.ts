import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  unauthorized: boolean;

  credentials: TokenPayload = {
    username: '',
    password: ''
  };

  constructor(private _authService: AuthenticationService, private _router: Router) {
    this.unauthorized = false;
  }

  login() {
    this._authService.login(this.credentials)
    .subscribe(() => {
      this._router.navigateByUrl('/home');
    }, (err) => {
      this.unauthorized = true;
      console.error(err);
    });
  }
}

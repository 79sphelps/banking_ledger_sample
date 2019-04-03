import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../services/authentication.service';

import { Inject, ViewChild, ElementRef } from '@angular/core';
// import { DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('menu') menu: ElementRef;
  details: UserDetails;

  constructor(private _authService: AuthenticationService, private _router: Router) {
    if (!localStorage.getItem('mean-token')) {
      this._router.navigate(['/']);
    }
  }

  ngOnInit() {
    /*
    this._authService.profile()
    .subscribe(user => {
      this.details = user;
    }, (err) => console.error(err));
    */
  }

  goToProfile() {
    this._router.navigateByUrl('/profile');
  }

  logout() {
    localStorage.removeItem('mean-token');
    this._router.navigate(['/']);
    this.closeMenu();
  }

  closeMenu() {
    this.menu.nativeElement.click();
  }
}

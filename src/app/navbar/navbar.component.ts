import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from '../services/authentication.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {
  @ViewChild('menu') menu: ElementRef;
  details: UserDetails;

  constructor(private _router: Router) {
    if (!localStorage.getItem('mean-token')) {
      this._router.navigate(['/']);
    }
  }

  ngOnInit() {
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

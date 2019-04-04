import { Component, OnInit } from '@angular/core';
import {
  AuthenticationService,
  UserDetails
} from '../services/authentication.service';
import { Router } from '@angular/router';
import { AccountsService } from '../services/accounts.service';
import { Account } from '../models/account.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // FormBuilder form
  withdrawlForm: FormGroup;
  depositForm: FormGroup;
  withdrawlAmount: FormControl;
  depositAmount: FormControl;

  // Declare variables to hold account data
  details: UserDetails;
  userAccounts: Array<Account> = [];  // all accounts
  userAccount: Account;

  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
    private _acctService: AccountsService
  ) {}

  ngOnInit() {
    this._authService.profile().subscribe(
      user => {
        this.details = user;
        this.getAccount(this.details.username);
      },
      err => console.error(err)
    );
    this.createFormControls();
    this.createWithdrawlForm();
    this.createDepositForm();
  }

  goToHome() {
    this._router.navigateByUrl('/home');
  }

  // ------------------------------------------
  // Form building methods
  // ------------------------------------------
  createFormControls() {
    this.withdrawlAmount = new FormControl('');
    this.depositAmount = new FormControl('');
  }

  createWithdrawlForm() {
    this.withdrawlForm = new FormGroup({
      withdrawlAmount: new FormControl()
    });
  }

  createDepositForm() {
    this.depositForm = new FormGroup({
      depositAmount: new FormControl()
    });
  }

  // ------------------------------------------
  // Transaction methods
  // ------------------------------------------
  onWithdrawlSubmit() {
    this._acctService
      .performWithdrawl(
        this.details.username,
        this.withdrawlForm.value.withdrawlAmount
      )
      .subscribe(data => {
        this.userAccount = data;
        this.getAccount(this.details.username);
      });
    this.withdrawlForm.reset();
  }

  onDepositSubmit() {
    this._acctService
      .performDeposit(
        this.details.username,
        this.depositForm.value.depositAmount
      )
      .subscribe(data => {
        this.userAccount = data;
        this.getAccount(this.details.username);
      });
    this.depositForm.reset();
  }

  // ------------------------------------------
  // Account information methods
  // ------------------------------------------
  getAccounts() {
    this._acctService
      .getAccounts()
      .subscribe(data => (this.userAccounts = data));
  }

  getAccount(name: String) {
    this._acctService
      .getAccount(name)
      .subscribe(data => (this.userAccount = data));
  }
}

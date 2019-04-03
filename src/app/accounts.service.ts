import { Injectable } from '@angular/core';
import { Account } from '../app/models/account.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountsService {
  constructor(private _http: HttpClient) { }

  getAccounts() {
    return this._http.get('/api/accounts')
    .map(data => data as Account[]);
  }

  getAccount(username: String) {
    return this._http.get('/api/accounts/' + username)
    .map(data => {
      return data as Account;
    });
  }

  performWithdrawl(username: String, amount: Number) {
    return this._http.put('/api/accounts/withdrawl/' + username, { 'amount': amount })
    .map(data => data as Account);
  }

  performDeposit(username: String, amount: Number) {
    return this._http.put('/api/accounts/deposit/' + username, { 'amount': amount })
    .map(data => data as Account);
  }
}

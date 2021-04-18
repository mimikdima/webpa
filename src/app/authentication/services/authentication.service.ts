import {Injectable} from '@angular/core';
import {Login} from '../login.interface';
import {Router} from '@angular/router';

const USER = 'admin';
const PASSWORD = 'admin';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated = false;

  constructor(private router: Router) { }

  public login({username, password}: Login): boolean {
    if (username === USER && password === PASSWORD) {
      this.authenticated = true;

      return true;
    }

    return false;
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public logout() {
    this.authenticated = false;

    this.router.navigate(['/login']);
  }
}

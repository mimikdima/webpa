import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UsersListItem} from './dtos/users-list-item';
import {User} from './dtos/user';
import {SearchUser} from './dtos/search-user';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  private domain = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getRequest(path: string): Observable<any> {
    return this.http.get<any>(this.domain + path).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): any {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }

  getUsersList(): Observable<UsersListItem[]> {
    return this.http.get<UsersListItem[]>(`${this.domain}/users`);
  }

  getUser(login: string): Observable<User> {
    return this.http.get<User>(`${this.domain}/users/${login}`);
  }

  getUserRepos(login): Observable<any> {
    return this.http.get<User>(`${this.domain}/users/${login}/repos`);
  }

  getUserIssues(login, repo): Observable<any> {
    return this.http.get<User>(`${this.domain}/repos/${login}/${repo}/issues`);
  }

  searchUser(login) {
    return this.http.get<SearchUser>(`${this.domain}/search/users?q=${login}`);
  }
}

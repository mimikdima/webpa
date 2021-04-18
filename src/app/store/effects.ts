import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {forkJoin, Observable, of, zip} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {
  LoadSearchUser,
  LoadSearchUserSuccess,
  LoadUserDetails,
  LoadUserDetailsSuccess,
  LoadUsersListFailedAction,
  LoadUsersListSuccessAction,
  LoadUsersListAction
} from '.';
import {GithubApiService} from '../shared/services/github-api/github-api.service';
import {UsersListItem} from '../shared/services/github-api/dtos/users-list-item';
import {SearchUser} from '../shared/services/github-api/dtos/search-user';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
              private apiSrv: GithubApiService) {
  }

  @Effect()
  getUsers$: Observable<Action> = this.actions$.pipe(
    ofType(LoadUsersListAction),
    mergeMap(() =>
      this.apiSrv.getUsersList().pipe(
        map((usersList: UsersListItem[]) => {
          return LoadUsersListSuccessAction({usersList});
        }),
        catchError((error) =>
          of(LoadUsersListFailedAction()))
      )
    ));

  @Effect()
  getUserDetails$: Observable<Action> = this.actions$.pipe(
    ofType(LoadUserDetails),
    mergeMap(({login}) => {
      return forkJoin([
        this.apiSrv.getUser(login),
        this.apiSrv.getUserRepos(login)]
      ).pipe(map(([user, repos]) => {
        return LoadUserDetailsSuccess({user, repos});
      }));
    }));

  @Effect()
  getSearchUser$: Observable<Action> = this.actions$.pipe(
    ofType(LoadSearchUser),
    mergeMap(({login}) =>
      this.apiSrv.searchUser(login).pipe(
        map((searchUser: SearchUser) => {
        return LoadSearchUserSuccess({searchUser});
      })
    )));
}

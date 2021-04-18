import {createAction, props} from '@ngrx/store';
import {UsersListItem} from '../shared/services/github-api/dtos/users-list-item';
import {User} from '../shared/services/github-api/dtos/user';
import {SearchUser} from '../shared/services/github-api/dtos/search-user';
import {ReposList} from '../shared/services/github-api/dtos/repos';

export enum UserActionTypes {
  LoadUsersList = 'LoadUsersList',
  LoadUsersListSuccess = 'LoadUsersListSuccess',
  LoadUsersListFailed = 'LoadUsersListFailed',

  LoadUserDetails = 'LoadUserDetails',
  LoadUserDetailsSuccess = 'LoadUserDetailsSuccess',

  LoadSearchUser = 'LoadSearchUser',
  LoadSearchUserSuccess = 'LoadSearchUserSuccess'
}

export const LoadUsersListAction = createAction(UserActionTypes.LoadUsersList);
export const LoadUsersListSuccessAction = createAction(UserActionTypes.LoadUsersListSuccess, props<{
  usersList: UsersListItem[]
}>());
export const LoadUsersListFailedAction = createAction(UserActionTypes.LoadUsersListFailed);

export const LoadUserDetails = createAction(UserActionTypes.LoadUserDetails, props<{login: string}>());
export const LoadUserDetailsSuccess = createAction(UserActionTypes.LoadUserDetailsSuccess, props<{
  user: User, repos: ReposList[]
}>());

export const LoadSearchUser = createAction(UserActionTypes.LoadSearchUser, props<{login: string}>());
export const LoadSearchUserSuccess = createAction(UserActionTypes.LoadSearchUserSuccess, props<{
  searchUser: SearchUser
}>());

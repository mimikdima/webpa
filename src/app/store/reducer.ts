import {
  LoadSearchUserSuccess,
  LoadUserDetailsSuccess,
  LoadUsersListAction,
  LoadUsersListFailedAction,
  LoadUsersListSuccessAction
} from './actions';
import {UsersListItem} from '../shared/services/github-api/dtos/users-list-item';
import {createReducer, on} from '@ngrx/store';
import {SearchUser} from '../shared/services/github-api/dtos/search-user';
import {ReposList} from '../shared/services/github-api/dtos/repos';
import {User} from '../shared/services/github-api/dtos/user';

export interface UsersState {
  usersList: UsersListItem[];
  isLoading: boolean;
  searchUser: any;
  userDetails: {
    user: User,
    repos: ReposList[]
  };
}

const initialState: UsersState = {
  usersList: [],
  isLoading: false,
  userDetails: undefined,
  searchUser: undefined
};

const reducer = createReducer(
  initialState,
  on(LoadUsersListAction, state => ({ ...state, isLoading: true})),
  on(LoadUsersListSuccessAction, (state, {usersList}) => ({ ...state, isLoading: false, usersList})),
  on(LoadUsersListFailedAction, state => ({ ...state, isLoading: false})),
  on(LoadUserDetailsSuccess, (state, {user, repos}) => ({
    ...state,
    userDetails: {user, repos}
  })),
  on(LoadSearchUserSuccess, (state, {searchUser}) => ({
    ...state,
    searchUser
  })),
);

export function reducerCreator(state: UsersState = initialState, action): UsersState {
  return reducer(state, action);
}

import { createFeatureSelector, createSelector } from '@ngrx/store';

import {UsersState} from './reducer';

const getUsersState = createFeatureSelector<UsersState>('users');

export const isLoading = createSelector(getUsersState, (state: UsersState) => {
  return state.isLoading;
});

export const usersList = createSelector(getUsersState, (state: UsersState) => {
  return state.usersList;
});

export const userDetails = createSelector(getUsersState, (state: UsersState) => {
  return state.userDetails;
});

export const searchUser = createSelector(getUsersState, (state: UsersState) => {
  return state.searchUser;
});

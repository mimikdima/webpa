import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromUsers from '../../store';
import {isLoading, LoadSearchUser, LoadUserDetails, searchUser, userDetails} from '../../store';
import {UsersListItem} from '../../shared/services/github-api/dtos/users-list-item';
import {GithubApiService} from '../../shared/services/github-api/github-api.service';
import {takeUntil, tap} from 'rxjs/operators';
import {UserDetailsData} from '../../shared/services/github-api/dtos/user';
import {SearchUser} from '../../shared/services/github-api/dtos/search-user';

@Component({
  selector: 'app-github-profiles',
  templateUrl: './github-profiles.component.html',
  styleUrls: ['./github-profiles.component.scss']
})
export class GithubProfilesComponent implements OnInit, OnDestroy {

  usersList: UsersListItem[] = [];
  userDetailsModal = false;
  loading$: Observable<boolean>;
  userDetails$: Observable<UserDetailsData>;
  searchUser$: Observable<SearchUser>;

  private onDestroy$ = new Subject();

  constructor(private apiSrv: GithubApiService,
              private store: Store<fromUsers.UsersState>) { }

  ngOnInit(): void {
    this.store.dispatch(fromUsers.LoadUsersListAction());

    this.loading$ = this.store.select(isLoading).pipe(takeUntil(this.onDestroy$));

    this.userDetails$ = this.store.select(userDetails)
      .pipe(takeUntil(this.onDestroy$), tap(() => {
        this.userDetailsModal = true;
      }));

    this.searchUser$ = this.store.select(searchUser).pipe(takeUntil(this.onDestroy$));

    this.store.select(fromUsers.usersList)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(usersList => {
        this.usersList = usersList;
    });
  }

  getUserDetails(login): void {
    this.store.dispatch(LoadUserDetails({login}));
    console.log(this.userDetails$);
  }

  onCloseModal() {
    this.userDetailsModal = false;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SearchUser} from '../../../shared/services/github-api/dtos/search-user';
import {takeUntil, tap} from 'rxjs/operators';
import {LoadSearchUser, LoadUserDetails, searchUser, userDetails} from '../../../store';
import {Store} from '@ngrx/store';
import * as fromUsers from '../../../store';
import {UserDetailsData} from '../../../shared/services/github-api/dtos/user';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Output() userDetailEmit = new EventEmitter<string>();
  searchUser$: Observable<SearchUser>;

  showModal = false;

  private onDestroy$ = new Subject();

  constructor(private store: Store<fromUsers.UsersState>) { }

  ngOnInit() {
    this.searchUser$ = this.store.select(searchUser).pipe(takeUntil(this.onDestroy$));
  }

  searchUser(login) {
    if (login.length > 0) {
      this.store.dispatch(LoadSearchUser({login}));
      this.showModal = true;
    }
  }

  getUserDetails(login): void {
    this.userDetailEmit.emit(login);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}

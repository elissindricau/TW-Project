import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { DataState } from './enum/data-state.enum';
import { AppState } from './interface/app-state';
import { CustomResponse } from './interface/custom-response';
import { User } from './interface/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  appState$: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  private dataSubject = new BehaviorSubject<CustomResponse>(null);
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.appState$ = this.userService.users$
      .pipe(
        map(response => {
          return { dataState: DataState.LOADED_STATE, appData: response }
        }),
        startWith({ dataState: DataState.LOADING_STATE }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR_STATE, error });
        })
      );
  }


  saveUser(userForm: NgForm): void {
    this.appState$ = this.userService.save$(userForm.value as User)
    .pipe(
      map(response => {
        this.dataSubject.next(
          {...response, data: {users: [response.data.user, ...this.dataSubject.value.data.users]}}
        );
        // document.getElementById('registerBtn').click();
        return{dataState: DataState.LOADED_STATE, appData: this.dataSubject.value};
      }),
      startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value}),
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR_STATE, error });
      })
    );

  }



}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { DataState } from 'app/enum/data-state.enum';
import { AppState } from 'app/interface/app-state';
import { CustomResponse } from 'app/interface/custom-response';
import { User } from 'app/interface/user';
import { UserService } from 'app/service/user.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit{
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
      console.log(userForm.value as User)
      userForm.resetForm()
    this.appState$ = this.userService.save$(userForm.value as User)
    .pipe(
      map(response => {
        this.dataSubject.next(
          {...response, data: {users: [response.data.user, ...this.dataSubject.value.data.users]}}
        );
        console.log(userForm.value as User)
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

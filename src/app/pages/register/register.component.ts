import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  users: User[] = [];
  appState$: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  private dataSubject = new BehaviorSubject<CustomResponse>(null);
  // userForm: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder) { 
    // this.createForm(); 
  }

  // createForm() {
  //   this.userForm = this.fb.group({
  //     firstName: ['', Validators.required]
  //   });
  // }

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


  //     this.userForm = new FormGroup({          
  //       'firstName':new FormControl(null, Validators.required), //note, can have up to 3 Constructor Params: default value, validators, AsyncValidators
  //       'lastName':new FormControl(null, Validators.required),
  //       'dept':new FormControl(null, Validators.required),
  //       'email':new FormControl(null, Validators.email),
  //       'password':new FormControl(null, Validators.required)
  //  })
  }



  saveUser(userForm: NgForm): void {
      const data = {
        firstName : userForm.controls['firstName'].value,
        lastName : userForm.controls['lastName'].value,
        dept : userForm.controls['dept'].value,
        email : userForm.controls['email'].value,
        password : userForm.controls['password'].value
      };
      this.userService
          .save(data)
          .subscribe(userForm => this.users.push(data));
      console.log(data);
      userForm.resetForm();

    // this.appState$ = this.userService.save(userForm.value as User);

    // .pipe(
    //   map(response => {
    //     this.dataSubject.next(
    //       {...response, data: {users: [response.data.user, ...this.dataSubject.value.data.users]}}
    //     );
    //     console.log(userForm.value as User)
    //     // document.getElementById('registerBtn').click();
    //     return{dataState: DataState.LOADED_STATE, appData: this.dataSubject.value};
    //   }),
    //   startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value}),
    //   catchError((error: string) => {
    //     return of({ dataState: DataState.ERROR_STATE, error });
    //   })
    // );

  }
}

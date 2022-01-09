import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataState } from 'app/enum/data-state.enum';
import { AppState } from 'app/interface/app-state';
import { CustomResponse } from 'app/interface/custom-response';
import { Activitate } from 'app/interface/activitate';
import { ActivitateService } from 'app/service/activitate.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { PacientService } from 'app/service/pacient.service';
import { param } from 'jquery';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'info-cmp',
    moduleId: module.id,
    templateUrl: 'info.component.html'
})

export class PacientInfoComponent implements OnInit{
    public id: number;
    appState$: Observable<AppState<CustomResponse>>;
    readonly DataState = DataState;
    private dataSubject = new BehaviorSubject<CustomResponse>(null);
    constructor(private pacientService: PacientService, private activatedRoute: ActivatedRoute) {
      this.activatedRoute.queryParams.subscribe(params => {
            this.id = params['id'];
            console.log(this.id); // Print the parameter to the console. 
        });
    }
  
  
    ngOnInit(): void {
      this.appState$ = this.pacientService.getPacient(this.id)
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
  
  }
  

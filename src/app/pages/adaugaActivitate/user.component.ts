import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataState } from 'app/enum/data-state.enum';
import { AppState } from 'app/interface/app-state';
import { CustomResponse } from 'app/interface/custom-response';
import { Activitate } from 'app/interface/activitate';
import { ActivitateService } from 'app/service/activitate.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class AdaugaActivitateComponent implements OnInit{
    activitati: Activitate[] = [];
    appState$: Observable<AppState<CustomResponse>>;
    readonly DataState = DataState;
    private dataSubject = new BehaviorSubject<CustomResponse>(null);
    constructor(private activitateService: ActivitateService, private fb: FormBuilder) { 
    }
  
  
    ngOnInit(): void {
      this.appState$ = this.activitateService.activitati$
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
  
  
  
    saveActivitate(activitateForm: NgForm): void {
        const data = {
          ora : activitateForm.controls['ora'].value,
          data : activitateForm.controls['data'].value,
          subiect : activitateForm.controls['subiect'].value,
          descriere : activitateForm.controls['descriere'].value
        };
        this.activitateService
            .save(data)
            .subscribe(activitateForm => this.activitati.push(data));
        console.log(data);
        activitateForm.resetForm();
  
    }
  }
  

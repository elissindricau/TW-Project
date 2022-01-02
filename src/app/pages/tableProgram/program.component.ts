import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataState } from 'app/enum/data-state.enum';
import { Activitate } from 'app/interface/activitate';
import { AppState } from 'app/interface/app-state';
import { Consultatie } from 'app/interface/consultatie';
import { CustomResponse } from 'app/interface/custom-response';
import { ActivitateService } from 'app/service/activitate.service';
import { ConsultatieService } from 'app/service/consultatie.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'program.component.html'
})

export class TableProgramComponent implements OnInit{
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

  getFuture() {

    var futureDate = new Date();
   futureDate.setDate(futureDate.getDate() + 7);
     
      console.log(futureDate)
    return futureDate;
  }

  getToday() {

    var date = new Date();
    return date;
  }
}

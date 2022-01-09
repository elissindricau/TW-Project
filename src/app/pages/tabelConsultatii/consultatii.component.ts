import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataState } from 'app/enum/data-state.enum';
import { AppState } from 'app/interface/app-state';
import { Consultatie } from 'app/interface/consultatie';
import { CustomResponse } from 'app/interface/custom-response';
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
    templateUrl: 'consultatii.component.html'
})

export class TableConsultatiiComponent implements OnInit{
    consultatii: Consultatie[] = [];
  appState$: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  private dataSubject = new BehaviorSubject<CustomResponse>(null);
  constructor(private consultatieService: ConsultatieService, private fb: FormBuilder) { 
  }


  ngOnInit(): void {
    this.appState$ = this.consultatieService.consultatii$
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

//   getFuture() {

//     var futureDate = new Date();
//    futureDate.setDate(futureDate.getDate() + 7);
     
//       console.log(futureDate)
//     return futureDate;
//   }

//   getToday() {

//     var date = new Date();
//     return date;
//   }
}

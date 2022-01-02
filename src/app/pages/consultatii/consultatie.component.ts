import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { DataState } from 'app/enum/data-state.enum';
import { AppState } from 'app/interface/app-state';
import { Consultatie } from 'app/interface/consultatie';
import { CustomResponse } from 'app/interface/custom-response';
import { ConsultatieService } from 'app/service/consultatie.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'consultatie.component.html'
})

export class ConsultatiiComponent implements OnInit{
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



  saveConsultatie(consultatieForm: NgForm): void {
      const data = {
        cnp : consultatieForm.controls['cnp'].value,
        nume : consultatieForm.controls['nume'].value,
        prenume : consultatieForm.controls['prenume'].value,
        dataConsultatie : consultatieForm.controls['dataConsultatie'].value,
        simptome : consultatieForm.controls['simptome'].value,
        diagnostic : consultatieForm.controls['diagnostic'].value,
        prescriptie : consultatieForm.controls['prescriptie'].value
      };
      this.consultatieService
          .save(data)
          .subscribe(consultatieForm => this.consultatii.push(data));
      console.log(data);
      consultatieForm.resetForm();

  }
}

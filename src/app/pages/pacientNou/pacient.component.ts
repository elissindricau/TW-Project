import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataState } from 'app/enum/data-state.enum';
import { AppState } from 'app/interface/app-state';
import { CustomResponse } from 'app/interface/custom-response';
import { Pacient } from 'app/interface/pacient';
import { PacientService } from 'app/service/pacient.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'pacient.component.html'
})

export class PacientComponent implements OnInit{
  pacienti: Pacient[] = [];
  appState$: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  private dataSubject = new BehaviorSubject<CustomResponse>(null);
  constructor(private pacientService: PacientService, private fb: FormBuilder) { 
  }


  ngOnInit(): void {
    this.appState$ = this.pacientService.pacienti$
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



  savePacient(pacientForm: NgForm): void {
      const data = {
        cnp : pacientForm.controls['cnp'].value,
        nume : pacientForm.controls['nume'].value,
        prenume : pacientForm.controls['prenume'].value,
        dataNasterii : pacientForm.controls['dataNasterii'].value,
        sex : pacientForm.controls['sex'].value,
        stareCivila : pacientForm.controls['stareCivila'].value,
        nrTelefon : pacientForm.controls['nrTelefon'].value,
        adresa : pacientForm.controls['adresa'].value,
        oras : pacientForm.controls['oras'].value,
        judet : pacientForm.controls['judet'].value,
        tara : pacientForm.controls['tara'].value,
        antecedente : pacientForm.controls['antecedente'].value,
        persoanaContact : pacientForm.controls['persoanaContact'].value,
        telefonContact : pacientForm.controls['telefonContact'].value
      };
      this.pacientService
          .save(data)
          .subscribe(pacientForm => this.pacienti.push(data));
      console.log(data);
      pacientForm.resetForm();

  }
}

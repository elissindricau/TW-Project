import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CustomResponse } from "app/interface/custom-response";
import { Pacient } from "app/interface/pacient";
import { Observable, throwError  } from "rxjs";
import { tap, catchError, retry} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class PacientService {

    private readonly apiUrl = 'http://localhost:8081';

    constructor(private http: HttpClient) {}

    pacienti$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/pacient/list`)
    .pipe(
        tap(console.log),
        catchError(this.handleError)
    );

    save(data: { cnp: any; nume: any; prenume: any; dataNasterii: any; sex: any; stareCivila: any; nrTelefon: any; adresa: any; 
        oras: any; judet: any; tara: any; antecedente: any; persoanaContact: any; telefonContact: any;}) : Observable<Pacient> {

        return this.http.post<Pacient>(`${this.apiUrl}/pacient/save`, data);

    }


    private handleError(error: HttpErrorResponse): Observable<never> {
        console.log(error)
        return throwError(`An error occurred - Error code: ${error.status}`);
    }

}
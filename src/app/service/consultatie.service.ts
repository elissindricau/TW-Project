import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CustomResponse } from "app/interface/custom-response";
import { Consultatie } from "app/interface/consultatie";
import { Observable, throwError  } from "rxjs";
import { tap, catchError, retry} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class ConsultatieService {

    private readonly apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    consultatii$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/consultatie/list`)
    .pipe(
        tap(console.log),
        catchError(this.handleError)
    );

    save(data: { cnp: any; nume: any; prenume: any; dataConsultatie: any; simptome: any, diagnostic: any, prescriptie: any}) : Observable<Consultatie> {

        return this.http.post<Consultatie>(`${this.apiUrl}/consultatie/save`, data);

    }


    private handleError(error: HttpErrorResponse): Observable<never> {
        console.log(error)
        return throwError(`An error occurred - Error code: ${error.status}`);
    }

}
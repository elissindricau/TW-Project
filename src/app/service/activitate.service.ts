import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CustomResponse } from "app/interface/custom-response";
import { Activitate } from "app/interface/activitate";
import { Observable, throwError  } from "rxjs";
import { tap, catchError, retry} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class ActivitateService {

    private readonly apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    activitati$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/activitate/list`)
    .pipe(
        tap(console.log),
        catchError(this.handleError)
    );

    save(data: { ora: any; data: any; subiect: any; descriere: any; }) : Observable<Activitate> {

        return this.http.post<Activitate>(`${this.apiUrl}/activitate/save`, data);

    }


    private handleError(error: HttpErrorResponse): Observable<never> {
        console.log(error)
        return throwError(`An error occurred - Error code: ${error.status}`);
    }

}
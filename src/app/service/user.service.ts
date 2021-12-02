import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CustomResponse } from "app/interface/custom-response";
import { User } from "app/interface/user";
import { Observable, throwError  } from "rxjs";
import { tap, catchError} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class UserService {

    private readonly apiUrl = 'http://localhost:8081';

    constructor(private http: HttpClient) {}

    users$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/user/list`)
    .pipe(
        tap(console.log),
        catchError(this.handleError)
    );

    save$ = (user: User) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.apiUrl}/user/save` , user)
    .pipe(
        tap(console.log),
        catchError(this.handleError)
    );
    
    private handleError(error: HttpErrorResponse): Observable<never> {
        console.log(error)
        return throwError(`An error occurred - Error code: ${error.status}`);
    }
}
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let message = "Cannot Connect to the Server";
                if (error.error.message) {
                    message = error.error.message;
                }
                console.log(error);
                alert(message);
                return throwError(error);
            })
        );
    }
}

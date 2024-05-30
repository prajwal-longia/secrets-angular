import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.getToken();
        if (!authToken) {
            return next.handle(req);
        }
        const authRequest = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + authToken)
        });
        console.log(authRequest);
        return next.handle(authRequest);

    }
}

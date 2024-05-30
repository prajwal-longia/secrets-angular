import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { Router } from "@angular/router";
import { Subject, tap } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
    private token: string;


    constructor(public http: HttpClient, public router: Router) { }

    getToken() {
        return this.token;
    }

    createUser(email: string, username: string, password: string) {
        const authData: AuthData = {
            email: email,
            username: username,
            password: password
        };
        console.log(authData);
        this.http.post<{ message: string, result: any }>("http://localhost:3000/user/signup", authData)
            .subscribe(response => {
                console.log(response);
                this.router.navigate(["/login"])
            });
    }

    loginUser(username: string, password: string) {
        const authData = { username: username, password: password };
        this.http.post<{ token: string }>("http://localhost:3000/user/login", authData)
            .subscribe(response => {
                this.token = response.token;
                console.log(response);
            })
    }

    /* loginUser(username: string, password: string) {
        const authData = { username: username, password: password };
        this.http.post<{ token: string }>("http://localhost:3000/user/login", authData)
            .pipe(tap((response: any) => {
                this.token = response.token;
                console.log(response);
            })
            );
    } */

}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {

    constructor(public http: HttpClient, public router: Router) { }

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
        this.http.post("http://localhost:3000/user/login", authData)
            .subscribe(response => {
                console.log(response);
            })
    }

}
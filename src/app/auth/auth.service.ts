import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {

    constructor(public http: HttpClient) { }

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
            });
    }

}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { Router } from "@angular/router";
import { Subject, tap } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
    private token: string;
    private authStatusListener = new Subject<boolean>();
    private isAutheticated: boolean = false;
    private tokenTimer: any;

    constructor(public http: HttpClient, public router: Router) { }

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAutheticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
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
        this.http.post<{ token: string, expiresIn: number }>("http://localhost:3000/user/login", authData)
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                if (token) {
                    const expiresInDuration = response.expiresIn;
                    this.tokenTimer = setTimeout(() => { this.logoutUser(); }, expiresInDuration * 1000);
                    this.isAutheticated = true;
                    this.authStatusListener.next(true);
                    this.router.navigate(['/home'])
                }
                console.log(response);
            })
    }

    logoutUser() {
        this.token = null;
        this.isAutheticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.router.navigate(['/login']);
    }

}
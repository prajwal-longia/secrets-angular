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
                    this.setAuthTimer(expiresInDuration);
                    this.isAutheticated = true;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    this.saveAuthData(token, expirationDate);
                    this.router.navigate(['/home'])
                }
                console.log(response);
            })
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAutheticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    logoutUser() {
        this.token = null;
        this.isAutheticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/login']);
    }

    private setAuthTimer(duration: number) {
        console.log("Setting Timer: " + duration);
        this.tokenTimer = setTimeout(() => {
            this.logoutUser();
        },
            duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("exipiration");
        if (!token || !expirationDate) {
            return null;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate)
        }
    }

}
import { Injectable } from "@angular/core";
import { Contact } from "./contact.model";
import { Subject, map } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from "@angular/router";


@Injectable({ providedIn: "root" })
export class ContactService {

    constructor(private http: HttpClient, private router: Router) { }

    addQuery(contact: Contact) {
        const query: Contact = contact;
        this.http.post<{ message: string }>(`http://localhost:3000/contact`, query)
            .subscribe(responseData => {
                console.log(responseData.message);
                window.location.reload();
            });
    }
}
import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, share } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavService {
    private baseUrl = 'http://localhost:8080';
    public plyVd: any;
    public currentUrl = new BehaviorSubject<any>(undefined);
    loginDtls: Observable<any>;
    videoDtls: Observable<any>;
    vdDtls: Observable<any>;

    constructor(private router: Router, private http: HttpClient) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl.next(event.urlAfterRedirects);
            }
        });
    }

    public set setViewVd(val: any) {
        this.plyVd = val;
    }

    public get getVdData() {
        return this.plyVd;
    }

    upload(file: any): Observable<HttpEvent<any>> {
        const formData = new FormData();
        formData.append('video', file);

        const req = new HttpRequest('POST', `${this.baseUrl}/uploadVideo`, formData, {
            reportProgress: true,
            responseType: 'json'
        })
        return this.http.request(req);
    }

    getLoginDtls(): Observable<any> {
        this.loginDtls = this.http.get<any>(`${this.baseUrl}/fetchValues`).pipe(share());
        return this.loginDtls;
    }

    postVideoDetails(data: any): Observable<any> {
        this.videoDtls = this.http.post<any>(`${this.baseUrl}/insertVideoTableValues`, data).pipe(share());
        return this.videoDtls;
    }

    getVideoDtls(): Observable<any> {
        this.vdDtls = this.http.get<any>(`${this.baseUrl}/fetchVdValues`).pipe(share());
        return this.vdDtls;
    }
}

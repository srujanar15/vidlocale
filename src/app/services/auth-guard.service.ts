import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard {
    loggedIn: any;
    constructor(
        private router: Router) {
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (state) {
            let usrAvlb = localStorage.getItem('user');
            if (usrAvlb) {
                this.loggedIn = true;
            }
        }
        // or false get you logged in status from state  
        if (this.loggedIn) {
            return true;
        }
        this.router.navigate(["/login"]);
        return false;
    }
    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        return this.canActivate(next, state);
    }
}
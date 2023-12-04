import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NavService } from 'src/app/services/nav.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSideLoginComponent {
  usrNm: any;
  pwd: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loginFn: Subject<boolean> = new Subject();
  constructor(private _snackBar: MatSnackBar, private navService: NavService, private router: Router) {}

  ngOnInit(): void {
    
  }

  gotoVdPg() {
    if (this.usrNm === undefined || this.usrNm === '' || this.usrNm === ' ') {
      this._snackBar.open("Please enter username", "Close", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 1500
      });
    } else if (this.pwd === undefined || this.pwd === '' || this.pwd === ' ') {
      this._snackBar.open("Please enter password", "Close", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 1500
      });
    } else {
      this.navService.getLoginDtls().
      pipe(takeUntil(this.loginFn)).subscribe((res) => {
        let lgn_dtls = res;
        if(lgn_dtls){
          if(this.usrNm === lgn_dtls.username && this.pwd === lgn_dtls.password){
            let usrDtls: any = {usr: lgn_dtls.username, pwd: lgn_dtls.password}
            localStorage.setItem('user', usrDtls);
            this.router.navigateByUrl("/main/upload-video");
          } else {
            this._snackBar.open("Please enter a valid username and password", "Close", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5500
            });
          }
        }
        
      })
    }
  }

  ngOnDestroy(): void {
      this.loginFn.next(true);
      this.loginFn.complete();
  }
}

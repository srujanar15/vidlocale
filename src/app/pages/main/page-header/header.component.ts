import { Component,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

  @Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    encapsulation: ViewEncapsulation.None,
  })
  export class HeaderComponent {
  
    constructor(private router: Router) {}

    logout(){
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }
  
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html'
})
export class AppViewVideoComponent implements OnInit {
  format: string;
  snapshot: RouterStateSnapshot;
  param1: any;
  vdNm: any;
  vdSz: any;
  constructor(private router: Router, private navService: NavService) { }

  ngOnInit(): void {
    this.goToVideo();
  }

  goToVideo() {
    this.param1 = this.navService.getVdData;
    this.navService.getVideoDtls().subscribe((res) => {
      this.vdNm = res.name;
      this.vdSz = this.niceBytes(res.size);
    })
  }

  niceBytes(x: any) {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  }

  goBack() {
    this.router.navigateByUrl("/main/upload-video");
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from 'src/app/services/nav.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppUploadVideoComponent implements OnInit {
  url: string | ArrayBuffer | null;
  format: string;
  @Output() uploadedVideoFile = new EventEmitter();
  showVBtn = false;
  message = '';
  slctdFleNm: any;
  upldFle: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private router: Router, private navService: NavService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSelectFile(event: any) {
    const file = event.target.files && event.target.files[0];
    this.upldFle = file;
    this.slctdFleNm = file.name;
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('image') > -1) {
        this.format = 'image';
      } else if (file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }

  goToViewPage() {
    if (this.upldFle) {
      this.navService.upload(this.upldFle).subscribe({
        next: (event: any) => {
          if (event.status === 200) {
            let fleDtls = {
              name: this.upldFle.name,
              size: this.upldFle.size
            }
            this.navService.postVideoDetails(fleDtls).subscribe(res => {
            })
          }
        },
        error: (err: any) => {
          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the video!';
          }
        }
      });
      this.navService.setViewVd = this.url;
      this.router.navigate(['main/view-video']);
    } else {
      this._snackBar.open("Please select a video", "Close", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 1500
      });
    }
  }
}
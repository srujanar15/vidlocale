import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { MatIconModule } from '@angular/material/icon';

import { MainRoutes } from './main.routing';
import { AppUploadVideoComponent } from './upload-video/upload-video.component';
import { AppViewVideoComponent } from './view-video/view-video.component';
import { HeaderComponent } from './page-header/header.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  declarations: [
    AppUploadVideoComponent,
    AppViewVideoComponent,
    HeaderComponent
  ],
})
export class MainModule { }

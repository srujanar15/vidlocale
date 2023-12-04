import { Routes } from '@angular/router';
import { AuthGuard } from '../../services/auth-guard.service';

// pages
import { AppUploadVideoComponent } from './upload-video/upload-video.component';
import { AppViewVideoComponent } from './view-video/view-video.component';

export const MainRoutes: Routes = [
  {
    path: 'main',
    children: [
      {
        path: 'upload-video',
        component: AppUploadVideoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'view-video',
        component: AppViewVideoComponent,
        canActivate: [AuthGuard]
      },
    ],
  },
];

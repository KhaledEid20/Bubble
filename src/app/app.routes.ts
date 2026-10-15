import { Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { MainComponent } from './layout/main/main.component';
import { FeedComponent } from './features/feed/feed.component';
import { ProfileComponent } from './features/profile/profile.component';
import { authGuard } from './core/auth/guards/auth-guard-guard';
import { guestGuard } from './core/auth/guards/guest-guard';
import { PostDetailComponent } from './features/posts/components/post-detail/post-detail.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
    {path:"" , component:AuthComponent},
    {path:"NotFound" , component:NotFoundComponent},
    { path: 'auth', component: AuthComponent , canActivate :[guestGuard],
        children : [
            {path : "login" , component:LoginComponent},
            {path : "register" , component:RegisterComponent},
            {path : "forgotPassword" , component:ForgotPasswordComponent}
        ],
        title:"Bubble Authentication"
    },
    {path:"main" , component:MainComponent, title:"BUBBLE", canActivate:[authGuard],
        children:[
            {path : "feed" , component:FeedComponent},
            {path : "profile/:id" , component:ProfileComponent},
            {path : "details/:id" , component:PostDetailComponent}
        ]
    },
];

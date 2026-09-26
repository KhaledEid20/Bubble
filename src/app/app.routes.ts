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

export const routes: Routes = [
    {path:"" , component:AuthComponent},
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
            {path : "profile" , component:ProfileComponent},
        ]
    }
];

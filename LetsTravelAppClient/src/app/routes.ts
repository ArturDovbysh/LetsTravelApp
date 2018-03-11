import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { OtherTravelersComponent } from './other-travelers/other-travelers.component';
import { OtherUserProfileComponent } from './other-user-profile/other-user-profile.component';
import { MyTravelsComponent } from './my-travels/my-travels.component';

export const appRoutes : Routes = [
    { path : 'home', component : HomeComponent , canActivate:[AuthGuard]},
    {
        path: 'home/profile', component : ProfileComponent, canActivate:[AuthGuard]
    },
    {
        path : 'home/otherusers', component : OtherTravelersComponent, canActivate:[AuthGuard]
    },
    {
        path : 'home/otheruserprofile/:userName', component : OtherUserProfileComponent, canActivate : [AuthGuard]
    },
    {
        path : 'home/mytravels', component : MyTravelsComponent, canActivate : [AuthGuard]
    },
    { 
        path : 'signup' , component : UserComponent ,
        children : [
    { path : '' , component : SignUpComponent }]
    },
    { 
        path : 'login' , component : UserComponent ,
        children : [
    { path : '' , component : SignInComponent }]
    },
    { path : '' , redirectTo : '/login', pathMatch : 'full'}
];
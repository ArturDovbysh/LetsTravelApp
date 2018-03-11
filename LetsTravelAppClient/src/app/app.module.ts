import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from "@agm/core";

import { AppComponent } from './app.component';
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { appRoutes } from './routes';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { GoogleMapComponent } from './google-map/google-map.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OtherTravelersComponent } from './other-travelers/other-travelers.component';
import { OtherUserProfileComponent } from './other-user-profile/other-user-profile.component';
import { FooterComponent } from './footer/footer.component';
import { MyTravelsComponent } from './my-travels/my-travels.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    GoogleMapComponent,
    ProfileComponent,
    NavbarComponent,
    OtherTravelersComponent,
    OtherUserProfileComponent,
    FooterComponent,
    MyTravelsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey : "AIzaSyAP_5UJLYpxtk_gl1PJjuXZ4XTrNn6h3Ww",
      libraries : ["places"]
    })
  ],
  providers: [UserService, AuthGuard ,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { navBarConfigure } from '../footer/navBarConfig';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userClaims : any;
  config : any;

  constructor(    
    private router : Router,
    private userService : UserService
  ) { }

  ngOnInit() {

    this.config = navBarConfigure;
    
    this.config();

    this.userService.getUserClaims().subscribe(
      (data : any) => {
        this.userClaims = data;
      });
  }

  Home(){
    this.router.navigate(['/home']);
  }

  GetMyTravels(){
    this.router.navigate(['/home/mytravels']);
  }

  GetUsersList(){
    this.router.navigate(['/home/otherusers']);
  }

  ProfileSettings(){
    this.router.navigate(['/home/profile']);
  }

  Logout(){
    localStorage.removeItem("userToken");
    this.router.navigate(['/login']);
  }

  
}

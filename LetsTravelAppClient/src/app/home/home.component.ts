import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { GoogleMapComponent } from '../google-map/google-map.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userClaims : any;
  
  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {

  }

}

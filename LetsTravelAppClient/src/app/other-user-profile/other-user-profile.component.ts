import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.css']
})
export class OtherUserProfileComponent implements OnInit {

  userName : string;
  userData : any;
  sub : any;
  datka : any;
  anyTrips : boolean;

  constructor(
    private userService : UserService,
    private route : ActivatedRoute,
    private toastr : ToastrService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userName = params['userName'];});

      this.getUserData();
  }

  getUserData(){
    this.userService.getUserDetails(this.userName)
    .subscribe(
      (data : any) => {
        if(data != null)
        {
          this.userData = data;
          this.anyTrips = true;       
        }
        else
        {
          this.toastr.error(data.Errors[0]);
        }

        if(this.userData.m_Item2.length == 0)
        {
          let el = document.getElementById("footik");
          el.style.position = "absolute";
          this.anyTrips = false;
        }
      }
    );
  }

}

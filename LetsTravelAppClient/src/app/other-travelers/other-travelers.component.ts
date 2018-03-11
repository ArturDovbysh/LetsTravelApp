import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-other-travelers',
  templateUrl: './other-travelers.component.html',
  styleUrls: ['./other-travelers.component.css']
})
export class OtherTravelersComponent implements OnInit {

  users : any;
  userName : string;

  constructor(
    private router : Router,
    private userService : UserService,
    private toastr : ToastrService
  ) { }

  getUsersList(){

    this.userService.getOtherUsers(this.userName)
    .subscribe(
      (data : any)=>{
        if(data != null)
        {
          this.users = data;
        }
        else
        {
          this.toastr.error(data.Errors[0]);
        }
      }
    );
  }

  ngOnInit() {
    this.userService.getUserClaims().subscribe(
      (data : any) => {
        this.userName = data.UserName;
      });

      this.getUsersList();
  }

  RedirectToUser(userName : string){
    this.router.navigate(['/home/otheruserprofile/'+userName]);
  }
}

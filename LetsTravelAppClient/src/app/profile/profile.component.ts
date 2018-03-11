import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userClaims : any;

  constructor(
    private toastr : ToastrService,
    private userService : UserService,
    private router : Router
  ) { }

  DeleteUser(){
    
    if(window.confirm("Are you sure to delete your account ?"))
    {
        this.userService.deleteUser(this.userClaims.UserName)
      .subscribe(
        (data : any)=>{
          if(data == true)
          {
            localStorage.removeItem("userToken");
            this.router.navigate(['/login']);
          }
          else
          {
            this.toastr.error(data.Errors[0]);
          }
        }
      );
  }
}

  ngOnInit() {
    this.userService.getUserClaims().subscribe(
      (data : any) => {
        this.userClaims = data;
      }
    );
  }

}

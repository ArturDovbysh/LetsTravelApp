import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-travels',
  templateUrl: './my-travels.component.html',
  styleUrls: ['./my-travels.component.css']
})
export class MyTravelsComponent implements OnInit {

  userName : any;
  myTravels = [];
  anyTrips : boolean;

  constructor(
    private toastr : ToastrService,
    private userService : UserService,
    private router : Router
  ) {  }

  ngOnInit() {
      
    this.userService.getUserClaims().subscribe(
      (data : any) => {
        if(data != null){
          this.userName = data.UserName;
          this.getMyTravels();    
        }
        else
        {
          this.toastr.error(data.Errors[0]);        
        }
      });
      
  }

  AddComment(id : number){
    var comment = prompt("New comment");
    if(comment!="")
    {
      this.userService.updateTrip(id,comment)
      .subscribe(
        (data : any) => {
          if(data == "Updated")
          {
            location.reload();
          }
          else
          {
            this.toastr.error(data.Errors[0]);
          }
        }
      );
    }
  }

  DeleteTrip(id:number){
    if(window.confirm("Are you sure ?"))
    {
    this.userService.deleteTrip(id)
    .subscribe(
      (data:any) =>{
        if(data=="Deleted")
        {
          location.reload();
        }
        else
        {
          this.toastr.error(data.Errors[0]);
        }
      }
    );
  }
  }

  getMyTravels(){
    this.userService.getTravels(this.userName)
    .subscribe(
      (data:any)=>{
        if(data != null)
        {
          this.myTravels = data;
          if(this.myTravels.length == 0)   
            this.anyTrips = false;
          else this.anyTrips = true;

        }
        else
        {
          this.toastr.error(data.Errors[0]);
        }

        if(this.myTravels.length == 0)
        {
          let el = document.getElementById("footik");
          el.style.position = "absolute";
        }
      }     
    );
    
  }

}

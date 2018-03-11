import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from '../models/user.model';
import { rootUrl } from '../rootUrl';
import { Trip } from '../models/trip.model';



@Injectable()
export class UserService {

  //readonly rootUrl = "http://localhost:51631/";
  
  constructor(private http : HttpClient) { }

  registerUser(user : User){
    
    const body : User = {
      UserName : user.UserName,
      Password : user.Password,
      Email : user.Email,
      FirstName : user.FirstName,
      LastName : user.LastName
    };
    var requestHeader = new HttpHeaders({"No-Auth" : "True"});
    return this.http.post(rootUrl + 'api/User/Register', body, {headers : requestHeader});
  }

  getOtherUsers(userName : string){
    return this.http.get(rootUrl+'api/GetOtherUsers?userName='+userName);
  }

  userAuthentication(userName,password){
    var data = "username="+userName+"&password="+password+"&grant_type=password";
    var requestHeader = new HttpHeaders({"Content-Type" : 'application/x-www-urlencoded', "No-Auth" : "True"});
    return this.http.post(rootUrl+'/token', data, {headers: requestHeader});
  }

  updateTrip(tripId:number,newComment:string){
    console.log(newComment);
    
    return this.http.put(rootUrl+'api/trips/updatecomment?id='+tripId + '&comment=' + newComment,{});
  }

  deleteTrip(id : number){
    return this.http.delete(rootUrl+'api/trips/delete?id='+id);
  }

  addTrip(trip : Trip){
    const body = {
      City : trip.City,
      Country : trip.Country,
      StartDate : trip.StartDate,
      EndDate : trip.EndDate,
      Comment : trip.Comment,
      Raiting : trip.Raiting
    };

    return this.http.post(rootUrl+'api/trips/add',body);

  }

  getTravels(userName : string){
    return this.http.get(rootUrl+'api/trips/getusertrips?userName='+userName);
  }

  deleteUser(userName : string){
    return this.http.delete(rootUrl+'api/DeleteUser?userName='+userName);
  }

  getUserClaims(){
    return this.http.get(rootUrl+'api/GetUserClaims');
  }

  getUserDetails(userName : string){
    return this.http.get(rootUrl+'api/GetUserDetails?userName='+userName);
  }
}

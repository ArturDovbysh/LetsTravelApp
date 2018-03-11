import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { Trip } from '../models/trip.model';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { selectConfig } from '../google-map/selectConfig';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  public latitude : number;
  public longitude : number;
  public zoom : number;
 
  city : string;
  country : string;

  newTrip : Trip;


  @ViewChild('search') public searchElement : ElementRef;

  constructor(
  private mapsAPILoader : MapsAPILoader,
  private ngZone : NgZone ,
  private userService : UserService,
  private toastr : ToastrService
  ) {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //set current position  
this.setCurrentPosition();
}

  ngOnInit() {

    selectConfig();

    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;  

    this.setCurrentPosition();

    this.mapsAPILoader.load().then(()=>{
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement,{
          types:["(cities)"]
        });

        autocomplete.addListener("place_changed",()=>{
          this.ngZone.run(()=>{
            let place : google.maps.places.PlaceResult = autocomplete.getPlace();

            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            this.city = place.name;

            for(var i=0; i < place.address_components.length; i++)
            {
              if(place.address_components[i].types[0] == "country")
                this.country = place.address_components[i].long_name;
            }

            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;

          });
        });
      }
    );
  }
 
  AddNewTrip(){
    if(this.city == null || this.country == null || this.city=="" || this.country == "")
      return;
    
      let startDate = document.getElementsByTagName("input")[1].value;
    
      let endDate = document.getElementsByTagName("input")[2].value;
      
      if(startDate != null && endDate !=null){
        let comment = document.getElementsByTagName("input")[3].value;
        
        if(Date.parse(startDate) > Date.parse(endDate)){
          this.toastr.error("Invalid dates input");
          return; 
        }
      let select = document.getElementsByTagName("select")[0];
      console.log(select.value);
      
      this.newTrip = {
          City : this.city,
          Country : this.country,
          StartDate : startDate,
          EndDate : endDate,
          Comment : comment,
          Raiting : parseInt(select.value)
        };



        this.userService.addTrip(this.newTrip)
        .subscribe(
          (data:any)=>{
            if(data=="Added"){
              this.toastr.success("Trip was added!");
              location.reload();
            }
            else{
              this.toastr.error(data.Errors[0]);
            }
          }
        );

        this.city = "";
        this.country = "";
        this.newTrip = null;
        
      }
  }

  private setCurrentPosition(){
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12;
      });
}
  }
}

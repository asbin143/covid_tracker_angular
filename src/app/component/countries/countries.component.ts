import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { globalDataSummary } from "src/app/models/global-data";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data:globalDataSummary[];
  countries : string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  constructor(private service : DataServiceService) { }

  ngOnInit(): void {
    this.service.getGlobalData().subscribe(result=>{
      this.data = result;
      this.data.forEach(cs=>{
        this.countries.push(cs.country)
      })
      this.updateAllCountry()
    });
    
  }

  updateAllCountry(){
    this.totalActive = 0;
    this.totalDeaths = 0;
    this.totalRecovered = 0;
    this.totalConfirmed = 0;
    this.data.forEach(cs=>{
      if(!Number.isNaN(cs.confirmed)){
        this.totalActive+=Number(cs.active);
        this.totalConfirmed +=Number(cs.confirmed);
        this.totalDeaths += Number(cs.deaths);
        this.totalRecovered +=Number(cs.recovered);
      }
    })

  }
  updateValues(country : string){
        if(country == "all"){
          this.updateAllCountry();
        }
      else{
      this.data.forEach(cs=>{
        if(cs.country == country){
          this.totalActive = Number(cs.active);
          this.totalDeaths = Number(cs.deaths);
          this.totalRecovered = Number(cs.recovered);
          this.totalConfirmed = Number(cs.confirmed);
        }
      })
    }
  }

}

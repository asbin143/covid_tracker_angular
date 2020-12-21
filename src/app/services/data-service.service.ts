import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import { globalDataSummary } from '../models/global-data';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  
  date = new Date();
  date_str = this.date.getMonth()+1+"-"+(this.date.getDate()-1)+"-"+ this.date.getFullYear();
  private globalDataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"+this.date_str+".csv";
  constructor(private http : HttpClient) { }

  getGlobalData(){
    
    return this.http.get(this.globalDataUrl, {responseType:'text'}).pipe(
      map(result=>{
        let data: globalDataSummary[]=[]
        let raw = {}
        let rows = result.split('\n');
        rows.splice(0,1);
        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);
          

          let cs = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10],
          };
          let temp : globalDataSummary = raw[cs.country]
          if(temp){
            temp.active = cs.active + temp.active
            temp.confirmed = cs.confirmed + temp.confirmed
            temp.deaths = cs.deaths + temp.deaths
            temp.recovered = cs.recovered + temp.recovered
            raw[cs.country]=temp;
          }
          else{
            raw[cs.country]=cs;

          }
        });
        return <globalDataSummary[]>Object.values(raw);
      })
    )
  }
}

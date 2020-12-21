import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { globalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData :globalDataSummary[];

  pieChart : GoogleChartInterface = {
    chartType : 'PieChart'
  }
  columnChart : GoogleChartInterface = {
    chartType : 'ColumnChart'
  }
  constructor(private dataService : DataServiceService) { }

  initchart(caseType :String){
    // getting Data
    let dataTable = [];
    dataTable.push(["Country" , "Cases"]);
    this.globalData.forEach(cs=>{
      let value: Number;
      if(caseType == "c"){
        if(Number(cs.confirmed) > 100){
          value = Number(cs.confirmed);
        }
        
      }
      if(caseType == "r"){
        if(Number(cs.recovered) > 100){
          value=Number(cs.recovered);
        }

      }
      if(caseType == "d"){
        if(Number(cs.deaths) > 100){
          value=Number(cs.deaths);
        }
      }
      if(caseType == "a"){
        if(Number(cs.active) > 100){
          value=Number(cs.active);
        }
      }

      dataTable.push([
        cs.country,value
      ])

      
    })
    
    // Put data into piechart
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: dataTable
      ,
      //firstRowIsData: true,
      options: {
        height:500,
        is3D: true
      },
    };

    // Put data into columnchart
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: dataTable
      ,
      //firstRowIsData: true,
      options: {
        height:500
      },
    };
  }
  ngOnInit(): void {
    this.dataService.getGlobalData()
    .subscribe(
      {
        next : (result)=>{
          this.globalData = result;
          result.forEach(cs=>{
            if(!Number.isNaN(cs.confirmed)){
              this.totalActive+=Number(cs.active);
              this.totalConfirmed +=Number(cs.confirmed);
              this.totalDeaths += Number(cs.deaths);
              this.totalRecovered +=Number(cs.recovered);
            }
          })
          this.initchart('c');
          
        }
      }
    )
  }
  filterdate(input: HTMLInputElement){
      this.initchart(input.value)
    
  }

}

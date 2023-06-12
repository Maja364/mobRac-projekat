import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import * as moment from 'moment';



@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage {

modes = ['date', 'date-time', 'month', 'month-year', 'time', 'time-date', 'year'];
selectedMode = 'date';
showPicker = false;
today_date = '';
  @ViewChild(IonDatetime) dateTime!: IonDatetime;

constructor() {
  this.setToday();
 }

setToday(){
this.today_date = moment().format('MMMM Do YYYY, h:mm:ss a');
}

  
dateChanged(value: any){
  console.log(value);
  this.today_date = moment(value).format('MMMM Do YYYY, h:mm:ss a');
  this.showPicker = false;
}

close(){
this.dateTime.cancel(true);
}

select(){
this.dateTime.confirm(true);
}




}


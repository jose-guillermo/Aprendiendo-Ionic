import { Component, ElementRef, OnInit } from '@angular/core';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.page.html',
  styleUrls: ['./date-time.page.scss'],
})
export class DateTimePage implements OnInit {

  public fechaNaci: Date = new Date();
  public yearValues = [2002, 1997, 2010]
  public customPickerOptions = {
    buttons: [
      {
        text: "hola"
      },
      {
        text: "mundo"
      },
    ]
  }

  constructor() { }

  ngOnInit() {
  }

  cambioFecha( event: any ) {
    console.log(event)
    console.log(new Date(event.detail.value))
  }

  mostrarFecha( datetime: IonDatetime ){
    console.log(datetime.value);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'ui-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  constructor(){
    console.log("I am banner component")
  }
}

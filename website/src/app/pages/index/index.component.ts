import { Component} from '@angular/core';
import {productAnimate} from '../../app-animation'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  animations:[productAnimate]
})
export class IndexComponent{
  
  state?:string;
  
  constructor() { }

  nextProduct(event:any){
    this.state = 'next'
  }

  prevProduct(event:any){
    this.state = 'prev'
  }
}

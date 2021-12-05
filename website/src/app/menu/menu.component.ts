import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private scroll:ViewportScroller) { }


  onClickScroll(element:string){
    this.scroll.scrollToAnchor(element)
  }

  ngOnInit(): void {
    
  }
}

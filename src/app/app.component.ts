import { Component } from '@angular/core';
import { Router, RouterOutlet} from '@angular/router';
import {routerAnimate} from './app-animation'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[routerAnimate]
})
export class AppComponent {
  title:string = 'QuestOrganic';
  currentRouter?:string;
  constructor(private router:Router){
    router.events.subscribe(event => {
      return this.currentRouter = router.url
    });
  }

  animateRouteing(outlet:RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
  }
  pagingAnimate(){
    window.scroll({
      top: 200, 
      left: 0, 
      behavior: 'smooth'
    })
  }
}

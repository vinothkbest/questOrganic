import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  {
    path:'',
    component:IndexComponent,
    data:{
      animationState:'index'
    }
  },
  {
    path:'about-us',
    component:AboutComponent,
    data:{
      animationState:'about'
    }
  },
  {
    path:'contact-us',
    component:ContactComponent,
    data:{
      animationState:'contact'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    scrollPositionRestoration:'enabled'

  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

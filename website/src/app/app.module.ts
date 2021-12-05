import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

/**
 * importing components  
 */

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BannerComponent } from './banner/banner.component';
import { ProductComponent } from './product/product.component';
import { IndexComponent } from './pages/index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ContactComponent } from './pages/contact/contact.component';

/**
 * importing services  
 */
import { ContactService } from './services/contact.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BannerComponent,
    ProductComponent,
    IndexComponent,
    AboutComponent,
    FooterComponent,
    ProductViewComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }

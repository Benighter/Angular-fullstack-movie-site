import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopupbuttonComponent } from './components/topupbutton/topupbutton.component';

@NgModule({
  imports: [BrowserModule],
  providers: [],
  schemas: [],
  declarations: [
    NavbarComponent,
    TopupbuttonComponent
  ],
})
export class AppModule {}

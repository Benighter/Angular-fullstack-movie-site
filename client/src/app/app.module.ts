import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopupbuttonComponent } from './components/topupbutton/topupbutton.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';

@NgModule({
  imports: [BrowserModule],
  providers: [],
  schemas: [],
  declarations: [
    NavbarComponent,
    TopupbuttonComponent,
    NavigationComponent,
    SearchBarComponent,
    SearchResultsComponent
  ],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { TopupbuttonComponent } from './components/topupbutton/topupbutton.component';

@NgModule({
  imports: [
    BrowserModule,
    NavigationComponent,
    SearchBarComponent,
    SearchResultsComponent,
    TopupbuttonComponent
  ],
  providers: [],
  schemas: [],
  declarations: []
})
export class AppModule {}

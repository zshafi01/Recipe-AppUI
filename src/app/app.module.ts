import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { PagenotfoundComponent } from './Pages/pagenotfound/pagenotfound.component';
import { HomeComponent } from './Pages/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule} from '@angular/common/http';
import { AdminAddCategoryComponent } from './Pages/admin-add-category/admin-add-category.component';
import { AdminCategoriesComponent } from './Pages/admin-categories/admin-categories.component';
import { AdminCategoryUpdateComponent } from './Pages/admin-category-update/admin-category-update.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PagenotfoundComponent,
    HomeComponent,
    FooterComponent,
    AdminAddCategoryComponent,
    AdminCategoriesComponent,
    AdminCategoryUpdateComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

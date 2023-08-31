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
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CategoryDetailsComponent } from './Pages/category-details/category-details.component';
import { AddUnitOfMeasureComponent } from './Pages/add-unit-of-measure/add-unit-of-measure.component';
import { UnitOfMeasuresComponent } from './Pages/unit-of-measures/unit-of-measures.component';
import { UpdateUnitOfMeasureComponent } from './Pages/update-unit-of-measure/update-unit-of-measure.component';
import { AddRecipeComponent } from './Pages/add-recipe/add-recipe.component';








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
    CategoryDetailsComponent,
    AddUnitOfMeasureComponent,
    UnitOfMeasuresComponent,
    UpdateUnitOfMeasureComponent,
    AddRecipeComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

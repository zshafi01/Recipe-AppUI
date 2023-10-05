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
import {MatPaginatorModule} from '@angular/material/paginator';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CategoryDetailsComponent } from './Pages/category-details/category-details.component';
import { AddUnitOfMeasureComponent } from './Pages/add-unit-of-measure/add-unit-of-measure.component';
import { UnitOfMeasuresComponent } from './Pages/unit-of-measures/unit-of-measures.component';
import { UpdateUnitOfMeasureComponent } from './Pages/update-unit-of-measure/update-unit-of-measure.component';
import { AddRecipeComponent } from './Pages/add-recipe/add-recipe.component';
import { RecipiedetailesComponent } from './Pages/recipiedetailes/recipiedetailes.component';
import { UpdateRecipeComponent } from './Pages/update-recipe/update-recipe.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireStorageModule} from '@angular/fire/compat/storage'; 
import { environment } from 'src/environments/environment.development';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { AdminInboxComponent } from './Pages/admin-inbox/admin-inbox.component';
import { AdminDeletedInboxComponent } from './Pages/admin-deleted-inbox/admin-deleted-inbox.component';
import { ContactDetailsComponent } from './Pages/contact-details/contact-details.component';
import { AdminTrashComponent } from './Pages/admin-trash/admin-trash.component';
import { AdminFavoriteComponent } from './Pages/admin-favorite/admin-favorite.component';
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
    RecipiedetailesComponent,
    UpdateRecipeComponent,
    AboutUsComponent,
    ContactUsComponent,
    AdminInboxComponent,
    AdminDeletedInboxComponent,
    ContactDetailsComponent,
    AdminTrashComponent,
    AdminFavoriteComponent,
    
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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

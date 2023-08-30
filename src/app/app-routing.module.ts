import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitOfMeasure } from './models/unit-of-measure';
import { AddUnitOfMeasureComponent } from './Pages/add-unit-of-measure/add-unit-of-measure.component';
import { AdminAddCategoryComponent } from './Pages/admin-add-category/admin-add-category.component';
import { AdminCategoriesComponent } from './Pages/admin-categories/admin-categories.component';
import { AdminCategoryUpdateComponent } from './Pages/admin-category-update/admin-category-update.component';
import { CategoryDetailsComponent } from './Pages/category-details/category-details.component';
import { HomeComponent } from './Pages/home/home.component';
import { PagenotfoundComponent } from './Pages/pagenotfound/pagenotfound.component';
import { UnitOfMeasuresComponent } from './Pages/unit-of-measures/unit-of-measures.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'', redirectTo:'home',pathMatch:'full'}, 
  {path:'add-category', component:AdminAddCategoryComponent},
  {path:'categories', component:AdminCategoriesComponent},
  {path:'category/detail/:id', component:CategoryDetailsComponent},
  {path:'category/:id',component:AdminCategoryUpdateComponent},
  {path:'add-unitofmeasure', component:AddUnitOfMeasureComponent},
  {path:'unitofmeasures', component:UnitOfMeasuresComponent},
  {path:'**',component:PagenotfoundComponent},
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

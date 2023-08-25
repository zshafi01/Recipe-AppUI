import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddCategoryComponent } from './Pages/admin-add-category/admin-add-category.component';
import { AdminCategoriesComponent } from './Pages/admin-categories/admin-categories.component';
import { AdminCategoryUpdateComponent } from './Pages/admin-category-update/admin-category-update.component';
import { HomeComponent } from './Pages/home/home.component';
import { PagenotfoundComponent } from './Pages/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'add-category', component:AdminAddCategoryComponent},
  {path:'categories', component:AdminCategoriesComponent},
  {path:'category/:id',component:AdminCategoryUpdateComponent},
  {path:'', redirectTo:'home',pathMatch:'full'}, 
  {path:'**',component:PagenotfoundComponent},
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

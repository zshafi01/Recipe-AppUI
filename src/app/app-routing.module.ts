import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFavoriteComponent } from './Pages/admin-favorite/admin-favorite.component';
import { Recipe } from './models/recipe';
import { UnitOfMeasure } from './models/unit-of-measure';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { AddRecipeComponent } from './Pages/add-recipe/add-recipe.component';
import { AddUnitOfMeasureComponent } from './Pages/add-unit-of-measure/add-unit-of-measure.component';
import { AdminAddCategoryComponent } from './Pages/admin-add-category/admin-add-category.component';
import { AdminCategoriesComponent } from './Pages/admin-categories/admin-categories.component';
import { AdminCategoryUpdateComponent } from './Pages/admin-category-update/admin-category-update.component';
import { AdminInboxComponent } from './Pages/admin-inbox/admin-inbox.component';
import { AdminTrashComponent } from './Pages/admin-trash/admin-trash.component';
import { CategoryDetailsComponent } from './Pages/category-details/category-details.component';
import { ContactDetailsComponent } from './Pages/contact-details/contact-details.component';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { HomeComponent } from './Pages/home/home.component';
import { PagenotfoundComponent } from './Pages/pagenotfound/pagenotfound.component';
import { RecipiedetailesComponent } from './Pages/recipiedetailes/recipiedetailes.component';
import { UnitOfMeasuresComponent } from './Pages/unit-of-measures/unit-of-measures.component';
import { UpdateRecipeComponent } from './Pages/update-recipe/update-recipe.component';
import { UpdateUnitOfMeasureComponent } from './Pages/update-unit-of-measure/update-unit-of-measure.component';
import { AdminComposeEmailComponent } from './Pages/admin-compose-email/admin-compose-email.component';
import { AdminSentEmailsComponent } from './Pages/admin-sent-emails/admin-sent-emails.component';
import { SampleInboxComponent } from './Pages/sample-inbox/sample-inbox.component';
import { SigninComponent } from './Pages/signin/signin.component';
import { SignupComponent } from './Pages/signup/signup.component';

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'}, 
  {path:'add-recipe', component:AddRecipeComponent},
  {path:'add-category', component:AdminAddCategoryComponent},
  {path:'categories', component:AdminCategoriesComponent},
  {path:'category/detail/:id', component:CategoryDetailsComponent},
  {path:'category/:id',component:AdminCategoryUpdateComponent},
  {path:'add-unitofmeasure', component:AddUnitOfMeasureComponent},
  {path:'unitofmeasures', component:UnitOfMeasuresComponent},
  {path:'unitofmeasure/:id', component:UpdateUnitOfMeasureComponent},
  {path:'recipe/:id/detail',component:RecipiedetailesComponent},
  {path:'recipe/:id', component:UpdateRecipeComponent},
  {path:'aboutus', component:AboutUsComponent},
  {path:'contactus', component:ContactUsComponent},
  {path:'admin/inbox', component:AdminInboxComponent},
  {path:'admin/sent-emails', component:AdminSentEmailsComponent},
  {path:'contact/detail/:id', component:ContactDetailsComponent},
  {path:'admin/trash', component:AdminTrashComponent},
  {path:'admin/favorite', component:AdminFavoriteComponent}, 
  {path:'admin/compose-email',component:AdminComposeEmailComponent},
  {path:'admin/sample-inbox',component:SampleInboxComponent},
  {path:'signup',component:SignupComponent},
  {path:'signin', component:SigninComponent},
  {path:'home',component:HomeComponent},
  {path:'**',component:PagenotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

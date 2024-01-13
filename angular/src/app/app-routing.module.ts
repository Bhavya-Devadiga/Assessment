import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserdepComponent } from './userdep/userdep.component';

const routes: Routes = [
  { path: '', component: UserdepComponent },
  { path: 'userdep', component: UserdepComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

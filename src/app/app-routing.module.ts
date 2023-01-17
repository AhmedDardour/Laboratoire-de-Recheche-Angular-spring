//defenir les routes des projets. permet de basculer entre les differente pages a traver les paths 

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffectComponent } from './affect/affect.component';
import { ArticlesComponent } from './articles/articles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
import { ToolFormComponent } from './tool-form/tool-form.component';
import { ToolsComponent } from './tools/tools.component';

const routes: Routes = [
  {  
    path: '',
    pathMatch:'full', 
    redirectTo: 'login', 
  },
  {  
    path: 'login',
    pathMatch:'full', 
    component: LoginComponent
  },
  
  {  // 1er path de la route 
    path: 'members',
    pathMatch:'full', 

    component: MemberComponent,
  },

  {  // 2eme path de la route 
    path:'create',
    pathMatch:'full', 
    component: MemberFormComponent,

  },
  {  // 2eme path de la route 
    path:'create-tool',
    pathMatch:'full', 
    component: ToolFormComponent,

  },
  {  // 2eme path de la route 
    path:'create-event',
    pathMatch:'full', 
    component: EventFormComponent,

  },
  
  {
    path: 'members/:id/edit',
    pathMatch:'full',
    component: MemberFormComponent
  },

  {
    path: 'tools/:id/edit',
    pathMatch:'full',
    component: ToolFormComponent
  },
  {
    path: 'events/:id/edit',
    pathMatch:'full',
    component: EventFormComponent
  },

  {
    path: 'dashboard',
    pathMatch:'full',
    component: DashboardComponent
  },

  {
    path: 'articles',
    pathMatch:'full',
    component: ArticlesComponent
  },

  {
    path: 'tools',
    pathMatch:'full',
    component: ToolsComponent
  },

  {
    path: 'events',
    pathMatch:'full',
    component: EventsComponent
  },
  {
    path: 'articles/:id/Affect',
    pathMatch:'full',
    component: AffectComponent
  },

  


  {  //rederiction vers n'iport quel path 
    path:'**',
    redirectTo:"members",
    pathMatch:'full', 
    

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

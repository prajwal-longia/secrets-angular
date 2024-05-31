import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComposeComponent } from './compose/compose.component';
import { ContactComponent } from './contact/contact.component';
import { DefaultComponent } from './default/default.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './home/post/post.component';
import { EditPostComponent } from './home/edit-post/edit-post.component';
import { MyPostsComponent } from './account/my-posts/my-posts.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [{
  path: 'compose',
  component: ComposeComponent,
  canActivate: [AuthGuard]
},
{
  path: 'contact',
  component: ContactComponent
},
{
  path: 'about',
  component: AboutComponent
},
{
  path: 'my-account/my-posts',
  component: MyPostsComponent,
  canActivate: [AuthGuard]
},
{
  path: 'posts/:postId',
  component: PostComponent,
  canActivate: [AuthGuard]
},
{
  path: 'edit/:postId',
  component: EditPostComponent,
  canActivate: [AuthGuard]
},
{
  path: 'signup',
  component: SignupComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'home',
  component: HomeComponent,
  canActivate: [AuthGuard]
},
{
  path: '',
  component: DefaultComponent
},
{
  path: "**",
  component: NotfoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }

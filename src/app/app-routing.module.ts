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

const routes: Routes = [{
  path: 'compose',
  component: ComposeComponent
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
  component: MyPostsComponent
},
{
  path: 'posts/:postId',
  component: PostComponent
},
{
  path: 'edit/:postId',
  component: EditPostComponent
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: '',
  component: DefaultComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroNavComponent } from './intro-nav/intro-nav.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { ComposeComponent } from './compose/compose.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { DefaultComponent } from './default/default.component';
import { AboutComponent } from './about/about.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PostComponent } from './home/post/post.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditPostComponent } from './home/edit-post/edit-post.component';
import { MyPostsComponent } from './account/my-posts/my-posts.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroNavComponent,
    FooterComponent,
    HeaderComponent,
    ComposeComponent,
    ContactComponent,
    HomeComponent,
    DefaultComponent,
    AboutComponent,
    PostComponent,
    EditPostComponent,
    MyPostsComponent,
    AccountComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

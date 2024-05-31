import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  homeContent = "Welcome to IncognoTales, a sanctuary for anonymous storytelling. Dive into a world of untold tales and raw confessions where anonymity unlocks the freedom to share your most intimate experiences, unshackled from identity constraints. Join our community to share, connect, and explore the depth of human narratives, unbound by judgment or disclosure.";
  public postLikes: number;
  upButton: boolean;
  downButton: boolean;
  isShow = true;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;

  constructor(public postService: PostService, public cRef: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit() {
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.upButton = false;
    this.downButton = false;
    this.cRef.detectChanges();

  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onUpvote(post: Post) {
    if (this.upButton === true) {
      return;
    }
    this.postLikes += 1;
    this.postService.updateLikes(
      post._id,
      post.title,
      post.content,
      post.likes + 1);
    this.upButton = true;
    this.downButton = false;
    this.cRef.detectChanges();
    window.location.reload();
  }

  onDownvote(post: Post) {
    if (this.downButton === true) {
      return;
    }
    this.postLikes -= 1;
    this.postService.updateLikes(
      post._id,
      post.title,
      post.content,
      post.likes - 1);
    this.upButton = false;
    this.downButton = true;

    window.location.reload();
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  loadComment(_id: string) {
    console.log("hell");
  }

}

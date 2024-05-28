import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/home/post.model';
import { PostService } from 'src/app/home/post.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent {
  posts: Post[] = [];
  private postsSub: Subscription;
  public postLikes: number;
  upButton: boolean;
  downButton: boolean;
  isShow = true;

  constructor(public postService: PostService, public cRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
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

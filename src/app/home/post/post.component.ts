import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Comment } from '../comment.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  public post: Post = { _id: "", title: "", content: "", likes: null };
  public postId: string;
  public postLikes: number;
  upButton: boolean;
  downButton: boolean;
  enteredComment = "";
  newComment = "Nice";
  likeUpdated: number;
  comment: Comment = { _id: "", story_id: "", cmnt_cnt: null, cmnts: [] };


  constructor(public postService: PostService, public route: ActivatedRoute, public cRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe(postData => {
          this.post = {
            _id: postData._id,
            title: postData.title,
            content: postData.content,
            likes: postData.likes
          };
          this.postLikes = this.post.likes;
          this.likeUpdated = this.postLikes;
        });
      }
      else {
        this.postId = null;
      }
    });

    this.postService.getComments(this.postId).subscribe(commentData => {
      this.comment = {
        _id: commentData._id,
        story_id: commentData.story_id,
        cmnt_cnt: commentData.cmnt_cnt,
        cmnts: commentData.cmnts
      };
    })


    this.upButton = false;
    this.downButton = false;

    this.cRef.detectChanges();


  }

  ngOnDestroy() {

  }

  onUpvote() {
    if (this.upButton === true) {
      return;
    }
    this.postLikes = this.likeUpdated + 1;
    this.postService.updateLikes(
      this.post._id,
      this.post.title,
      this.post.content,
      this.post.likes + 1);
    this.upButton = true;
    this.downButton = false;
    this.cRef.detectChanges();
    const upButt = <HTMLElement>document.getElementsByClassName('up-btn')[0];
    const downButt = <HTMLElement>document.getElementsByClassName('down-btn')[0];
    upButt.style.fill = '#39a02b';
    downButt.style.fill = '#e2e1d9d7';
  }

  onDownvote() {
    if (this.downButton === true) {
      return;
    }
    this.postLikes = this.likeUpdated + -1;
    this.postService.updateLikes(
      this.post._id,
      this.post.title,
      this.post.content,
      this.post.likes - 1);
    this.downButton = true;
    this.upButton = false;
    const upButt = <HTMLElement>document.getElementsByClassName('up-btn')[0];
    const downButt = <HTMLElement>document.getElementsByClassName('down-btn')[0];
    upButt.style.fill = '#e2e1d9d7';
    downButt.style.fill = '#b14335';
    this.cRef.detectChanges();
  }

  onAddComment() {
    this.newComment = this.enteredComment;
    console.log(this.newComment, this.postId);
    this.postService.addComment(this.newComment, this.postId);
    this.comment.cmnts.push(this.newComment);
    this.enteredComment = "";
  }

  onDeletePost() {
    this.postService.deletePost(this.post);
  }
}

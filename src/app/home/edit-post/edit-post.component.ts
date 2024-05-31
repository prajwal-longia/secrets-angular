import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  postId: string = null;
  post: Post = { _id: "", title: "", content: "", likes: null, user_id: null };

  constructor(public postService: PostService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe(postData => {
          this.post = {
            _id: postData._id,
            title: postData.title,
            content: postData.content,
            likes: postData.likes,
            user_id: postData.user_id
          };
        });
      }
      else {
        this.postId = null;
      }
    });

  }

  onSavePost(form: NgForm) {
    const updatedPost: Post = {
      _id: this.postId,
      title: form.value.title,
      content: form.value.content,
      likes: this.post.likes,
      user_id: this.post.user_id
    };
    this.postService.updatePost(updatedPost);
  }

}

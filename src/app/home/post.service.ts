import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject, map } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from "@angular/router";
import { Comment } from "./comment.model";
import { ToastrService } from "ngx-toastr";

@Injectable({ providedIn: "root" })
export class PostService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();
    private myposts: Post[] = [];
    private mypostsUpdated = new Subject<Post[]>();
    story_id: string = "";

    constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

    getPosts() {
        this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts')
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        _id: post._id,
                        title: post.title,
                        content: post.content,
                        likes: post.likes,
                        user_id: post.user_id
                    };
                });
            }))
            .subscribe((transformedData) => {
                this.posts = transformedData;
                this.postsUpdated.next([...this.posts]);
            });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }


    getPost(_id: string) {
        return this.http.get<Post>(`http://localhost:3000/api/posts/${_id}`)
    };

    updateLikes(
        _id: string,
        title: string,
        content: string,
        likes: number) {
        const post: Post = {
            _id: _id,
            title: title,
            content: content,
            likes: likes,
            user_id: null
        };
        this.http.patch<{ message: string }>(`http://localhost:3000/api/posts/${_id}`, post)
            .subscribe(response => {
                console.log(response);
                const updatedPosts = [...this.posts];
                const oldPostIndex = updatedPosts.findIndex(p => p._id === post._id);
                updatedPosts[oldPostIndex] = post;
                this.postsUpdated.next([...this.posts]);
            });
    };

    addPost(
        title: string,
        content: string,
        likes: number
    ) {
        const post: Post = {
            _id: null,
            title: title,
            content: content,
            likes: likes,
            user_id: null
        };
        this.http.post<{ message: string, _id: string }>(`http://localhost:3000/api/posts`, post)
            .subscribe(responseData => {
                console.log(responseData._id);
                this.story_id = responseData._id;
                this.addCommentArray();
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
                this.toastr.success(responseData.message);
                this.router.navigate([`/posts/${responseData._id}`])
            });

    }

    updatePost(post: Post) {
        const updatedPost: Post = post;
        console.log(updatedPost);
        this.http.put<{ message: string }>(`http://localhost:3000/api/posts/${post._id}`, updatedPost)
            .subscribe(responseData => {
                console.log(responseData.message);
                this.toastr.success(responseData.message);
                this.router.navigate([`/posts/${post._id}`]);
            })
    }

    deletePost(post: Post) {
        const delPost: Post = post;
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: { _id: delPost._id },
        };
        console.log(delPost);
        this.http.delete<{ message: string }>(`http://localhost:3000/api/posts/`, options)
            .subscribe(response => {
                console.log(response.message);
                this.toastr.success(response.message);
            });
        this.deleteCommentArray(delPost._id);
    }

    getComments(_id: string) {
        return this.http.get<Comment>(`http://localhost:3000/comment/${_id}`);
    }

    addCommentArray() {
        const id = this.story_id;
        const comment = { _id: this.story_id };
        console.log(this.story_id);
        this.http.post<{ message: string }>(`http://localhost:3000/comment`, comment)
            .subscribe(responseData => {
                console.log(responseData.message);
            });
    }

    deleteCommentArray(id: string) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: { _id: id },
        };
        this.http.delete<{ message: string }>(`http://localhost:3000/comment`, options)
            .subscribe(response => {
                console.log(response.message);
                this.router.navigate(['/home']);
            });
    }

    addComment(comment: string, _id: string) {
        const newComment = { comment: comment };
        this.http.patch<{ message: string }>(`http://localhost:3000/comment/${_id}`, newComment)
            .subscribe(responseData => {
                console.log(responseData.message);
            })
    }

    getMyPosts() {
        this.http.get<{ message: string, posts: Post[] }>(`http://localhost:3000/user/myposts`)
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        _id: post._id,
                        title: post.title,
                        content: post.content,
                        likes: post.likes,
                        user_id: post.user_id
                    };
                });
            }))
            .subscribe((transformedData) => {
                this.myposts = transformedData;
                this.mypostsUpdated.next([...this.myposts]);
            });
    }

    getMyPostUpdateListener() {
        return this.mypostsUpdated.asObservable();
    }


}

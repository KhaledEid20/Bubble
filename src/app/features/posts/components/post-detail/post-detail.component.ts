import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/Services/posts.service';
import { SinglePostData } from '../../../../core/models/single-post-mutation.interface';
import { PostCommentsComponent } from '../../../feed/components/post-comments/post-comments.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  imports: [PostCommentsComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent implements OnInit{

  private readonly postsService = inject(PostsService)
  activatedRoute = inject(ActivatedRoute)
  private readonly location = inject(Location)

  id!:string | null;
  menuOptions:boolean = false
  article!:SinglePostData;
  CreationDate: string | null = null;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.id = param.get("id");
      this.getThePostById();
    })
  }
  getThePostById(){
    if(this.id === null){
      console.error("Id is Required")
    }
    else{
      this.postsService.getSinglePost(this.id).subscribe({
        next: (res) =>{
          if(res){
            console.log("This is the single Data Post",res);
            this.article = res.data.post;
            this.CreationDate = this.timeAgo(res.data.post.createdAt)
          }
        }
      })
    }
  }


  PostOptionToggler(e : PointerEvent) {
    e.stopPropagation();
    this.menuOptions = !this.menuOptions

  }
  
    RemovePost(id: string , e: PointerEvent){
    e.preventDefault();
    console.log(id);
    this.postsService.DeletePost(id).subscribe({
      next: (res)=>{
        if(res.success){
          this.closePostOptionMenu();
          console.log(res);
        }
      },
    })
  }

    closePostOptionMenu(){
      this.menuOptions = false;
  }

  goBack(){
    this.location.back();
  }

  timeAgo(dateString: string): string {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const seconds = Math.floor(diffMs / 1000);

    if (seconds < 60) return 'just now';

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;

    const weeks = Math.floor(days / 7);
    if (days < 30) return `${weeks}w`;

    const months = Math.floor(days / 30);
    if (days < 365) return `${months}mo`;

    return `${Math.floor(days / 365)}y`;
  }
}

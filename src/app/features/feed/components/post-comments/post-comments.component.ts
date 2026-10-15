import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { CommentsService } from './services/comments.service';
import { Comment} from './services/comments.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-comments',
  imports: [ReactiveFormsModule],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css',
})
export class PostCommentsComponent implements OnInit {

  @ViewChild('imageInput') imageInput?:ElementRef<HTMLInputElement>;

  @Input({ required: true }) postId!: string;
  @Input({ required: true }) PostCreatorID!: string;

  private readonly commentService = inject(CommentsService);
  commentList!: Comment[]
  PostedSince!: string;
  CommentsCount!: number;
  userInfo! : any;
  CommentImage: File | null = null
  imgURL:string | ArrayBuffer | null | undefined;

  CommentContent = new FormControl('');

  ngOnInit(): void {
    this.getAllComments();
    this.getUserInfo()
  }

  removeImage(){
    this.CommentImage = null
    this.imgURL= null
    if(this.imageInput){
      this.imageInput.nativeElement.value = "";
    }
  }

  CreatePost(e:SubmitEvent , form:HTMLFormElement){
    e.preventDefault();
    const formData = new FormData();
    if(this.CommentContent.value){
      formData.append("content" , this.CommentContent.value)
    }
    if(this.CommentImage){
      formData.append("image" , this.CommentImage)
    }

    this.commentService.CreateComment(formData , this.postId).subscribe({
      next:(res)=>{
        if(res){
          console.log(res);
          this.CommentContent.reset('')
          this.removeImage()
          this.getAllComments()
        }
      }
    })
  }

  changeFile(e:Event):void{
    const inputElement = e.target as HTMLInputElement
    if(inputElement.files){
      this.CommentImage = inputElement.files[0]
    }
    const fileReader = new FileReader();
    if(this.CommentImage){
      fileReader.readAsDataURL(this.CommentImage);
    }
    fileReader.addEventListener('load' , (e)=>{
      this.imgURL = e.target?.result;
    })
  }

  getAllComments(): void {
    this.commentService.getALLComments(this.postId).subscribe({
      next: (res) => {
        if (res.success) {
          this.commentList = res.data.comments;
          this.CommentsCount = res.data.comments.length;
        }
      },
    });
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

  LikesCount(arr : any[]) : number{
    return arr.length
  }
    
  getUserInfo() : any {
    const raw = localStorage.getItem('userData');
    if (!raw) return;

    try {
      this.userInfo = JSON.parse(raw);
    } catch (e) {
      console.error('Invalid userData in localStorage', e);
    }
  }
}
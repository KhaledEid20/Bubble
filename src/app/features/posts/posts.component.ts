import { afterNextRender, Component, HostListener, inject, OnInit } from '@angular/core';
import { PostsService } from '../../core/Services/posts.service';
import {Post} from '../../core/models/posts-data.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PostCommentsComponent } from '../feed/components/post-comments/post-comments.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts',
  imports: [ReactiveFormsModule, PostCommentsComponent, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {

  private readonly postService = inject(PostsService);
  postsData!:Post[] ;
  userInfo! : any;
  ImageInput! : File;
  imgURL!:string | ArrayBuffer | null | undefined;
  openMenuId: string | null = null;

  // content control
  contentData = new FormControl('')

  // privacy 
  PrivacyContorol = new FormControl('public')
  
  ngOnInit(): void {
    this.getAllPosts();
    this.getUserInfo();
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.closePostOptionMenu();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closePostOptionMenu();
  }

  PostOptionToggler(id:string , e:PointerEvent) {
    e.stopPropagation();
    this.openMenuId  = this.openMenuId === id? null :id;
  }

  closePostOptionMenu(){
    this.openMenuId = null;
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

  getAllPosts() : void{
    this.postService.getPosts().subscribe({
      next : (res) => {
        this.postsData = res.data.posts
        console.log("the Posts data here",this.postsData)
      },
    });
  }

  changeFile(e:Event):void{
    const inputElement = e.target as HTMLInputElement
    if(inputElement.files){
      this.ImageInput = inputElement.files[0]
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.ImageInput);


    fileReader.addEventListener('load' , (e)=>{
      this.imgURL = e.target?.result;
    })
  }

  removePhoto(){
    this.imgURL = ''
  }

  submitForm(e : SubmitEvent , form:HTMLFormElement){
    e.preventDefault()
    const formData = new FormData();

    if(this.contentData.value){

      formData.append('body' , this.contentData.value);
    }
    if(this.ImageInput){

      formData.append('image' , this.ImageInput);
    }
    if(this.PrivacyContorol.value){

      formData.append('privacy' , this.PrivacyContorol.value);
    }
    this.postService.createPost(formData).subscribe({
      next: (res)=>{
        if(res.success){
          console.log(res);
            form.reset();
            this.getAllPosts()
        }
      },
    })
    form.reset();
    this.removePhoto()
    this.getAllPosts()
  }

  RemovePost(id: any , e: PointerEvent){
    e.preventDefault();
    console.log(id);
    this.postService.DeletePost(id).subscribe({
      next: (res)=>{
        if(res.success){
          this.closePostOptionMenu();
          console.log(res);
        }
      },
    })
    this.getAllPosts()
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
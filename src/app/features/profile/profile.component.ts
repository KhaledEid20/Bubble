import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../core/Services/profile.service';
import {  ProfileUserData } from './Models/profile-response.interface';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserPostsData } from './Models/profile-posts.interface';
import { PostsService } from '../../core/Services/posts.service';
import { PostCommentsComponent } from '../feed/components/post-comments/post-comments.component';
import { BookMarksData } from './Models/book-marks-response.interface';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, PostCommentsComponent],
  providers:[DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit{
  private readonly profileService = inject(ProfileService)
  private readonly postService = inject(PostsService);
  router = inject(Router)
  private activatedRoute= inject(ActivatedRoute)
  
  ProfileData:ProfileUserData | null = null
  birthDate:string|null = null;
  UserId!: string;
  userPosts!: UserPostsData[]
  openMenuId: string | null = null;
  userInfo! : any;
  ImageInput! : File;
  imgURL:string | ArrayBuffer | null | undefined;
  ToggleThePhotoPage:boolean = false;
  BookmarksData! : BookMarksData ;

  activateTab : 'posts' | 'bookmarks'= 'posts';
  
  @HostListener('document:click')
  onDocumentClick() {
    this.closePostOptionMenu();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closePostOptionMenu();
  }

  constructor(public datepipe:DatePipe){}

  ngOnInit(): void {
    this.getUserInfo();
    console.log("the window owner ID :" , this.userInfo._id)
    this.activatedRoute.paramMap.subscribe((param)=>{
      const id = param.get("id");
      if(!id){
        this.router.navigate(["/NotFound"])
      }
      else{
        this.UserId = id;
        console.log("the profile ID :" , this.UserId)
      }
    })
    if(this.userInfo._id === this.UserId){
      this.getMainProfileData();
    }
    else{
      this.getUserProfile();
    }
    this.getUserPosts();
    if(!this.userInfo){
      this.router.navigate(["/NotFound"])
    }
    this.getAllBookMarks();
  }

  // API COntrollers

  getMainProfileData(){
    this.profileService.getMyProfile().subscribe({
      next:(res)=>{
        if(res){
          this.ProfileData = res.data.user;
        }
      }
    })
  }
  getUserProfile(){
    this.profileService.getUserProfile(this.UserId).subscribe({
      next:(res)=>{
        if(res){
          console.log("The new person data",res.data.user)
          this.ProfileData = res.data.user;
          this.imgURL = res.data.user.photo;
        }
      }
    })
  }
  getUserPosts(){
    this.profileService.getAllUserPosts(this.UserId).subscribe({
      next:(res)=>{
        if(res){
          console.log(res.data.posts)
          this.userPosts = res.data.posts;
        }
      }
    })
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
    this.getUserPosts()
  }
  updateAvatar(e:SubmitEvent){
    e.preventDefault()
    const form = new FormData()
    if(this.ImageInput){
      form.append("photo" , this.ImageInput)
    }
    this.profileService.UpdateTheProfilePicture(form).subscribe({
      next:(res)=>{
        if(res){
          console.log("The avatar Changed")
          if(this.userInfo._id === this.UserId){
            this.getMainProfileData();
          }
          else{
            this.getUserProfile();
          }
          this.ToggleThePhotoPage = false;
          form.delete("photo")
        }
      }
    })
  }
  getAllBookMarks(){
    this.profileService.getAllTheBookmarks().subscribe({
      next:(res)=>{
        this.BookmarksData = res.data;
      }
    })
  }

  /// end of the API Section

  // document Controllers
    getUserInfo() : any {
    const raw = localStorage.getItem('userData');
    if (!raw) return;

    try {
      this.userInfo = JSON.parse(raw);
    } catch (e) {
      console.error('Invalid userData in localStorage', e);
    }
  }
    PostOptionToggler(id:string , e:PointerEvent) {
    e.stopPropagation();
    this.openMenuId  = this.openMenuId === id? null :id;
  }
    closePostOptionMenu(){
    this.openMenuId = null;
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
  changeAvatar(e : Event):any{
    const inputElement = e.target as HTMLInputElement
    if(inputElement.files){
      this.ImageInput = inputElement.files[0]
    }
    const fileReader = new FileReader()
    fileReader.readAsDataURL(this.ImageInput);

    fileReader.addEventListener("load" , (e)=>{
      this.imgURL = e.target?.result
    })
    
  }
  changePhotoPage(e : PointerEvent){
    e.preventDefault();
    this.ToggleThePhotoPage = true;
  }
  closeChangePhotopage(e:PointerEvent){
    e.preventDefault();
    this.ToggleThePhotoPage = false;
  }
  transformDate(date:string) : string{
    let dateOfBirth = this.datepipe.transform(date , 'MMM d, y')
    if(dateOfBirth){
      return dateOfBirth;
    }
    else{
      return " "
    }
  }
  switchTab(tab:'posts' | 'bookmarks'){
    this.activateTab = tab;
  }
  // end of document Controllers
}

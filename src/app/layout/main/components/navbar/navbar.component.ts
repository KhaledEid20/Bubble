import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/auth/Services/auth.service';
import { AsideTogglerService } from '../../../../core/Services/aside-toggler.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  UserData:any;
  profileClicked:boolean= false;
  authService = inject(AuthService);
  toggler:boolean = false;
  togglerService = inject(AsideTogglerService);
  ngOnInit(): void {
    this.UserData = this.parseUserData();
    console.log("user Data : ", this.UserData);
  }
  @ViewChild('profilePhoto')
  profilePhoto!: ElementRef<HTMLImageElement>;
  
  private parseUserData() :any{ 
    const raw = localStorage.getItem('userData')
    if(!raw) return;
    try{ 
      return JSON.parse(raw);
    }
    catch(err){
      console.log("error in parsing the data : " , err)
    }
  }
  profileInfo():void{
    if(!this.profileClicked){
      this.profileClicked = true;
    }
    else{
      this.profileClicked = false;
    }
  }
  signOut():void{
    this.authService.signOut();
  }
  toggleSidebar() {
    this.toggler = !this.toggler;
    this.togglerService.setTogelerValue(this.toggler);
}
}

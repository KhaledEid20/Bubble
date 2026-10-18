import { Component, HostListener, inject, OnInit } from '@angular/core';
import { AsideService } from './Services/aside.service';
import { Suggestion } from './Models/suggestions.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aside',
  imports: [RouterLink],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css',
})
export class AsideComponent implements OnInit{

  private readonly asideService = inject(AsideService);
  Friends: Suggestion[] | null = null;

  ngOnInit(): void {
    this.getFriendsSuggestion(10)
  }

  getFriendsSuggestion(limit:number){
    this.asideService.getSuggestion(limit).subscribe({
      next:(res)=>{
        if(res){
          this.Friends = res.data.suggestions;
        }
      }
    })
  }

  FollowOrUnfollow(id : string){
    this.asideService.FollowAndUnfollow(id).subscribe({
      next:()=>{
        this.getFriendsSuggestion(10);
      }
    })
  }


}

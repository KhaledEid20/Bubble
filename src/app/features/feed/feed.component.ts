import { Component, inject } from '@angular/core';
import { AsideComponent } from '../aside/aside.component';
import { PostsComponent } from '../posts/posts.component';
import { AsideTogglerService } from '../../core/Services/aside-toggler.service';

@Component({
  selector: 'app-feed',
  imports: [AsideComponent, PostsComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
  togglerService = inject(AsideTogglerService);
  
  displayAside():boolean{
    return this.togglerService.getTogelerValue();
  }
}

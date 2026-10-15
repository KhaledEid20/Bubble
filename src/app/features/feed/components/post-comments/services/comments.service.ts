import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { CommentsResponse } from './comments.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  
  httpClent = inject(HttpClient);

  getALLComments(id : string):Observable<CommentsResponse>{
    return this.httpClent.get<CommentsResponse>(environment.baseurl + `/posts/${id}/comments?page=1&limit=10` );
  }
  CreateComment(data : FormData , id : string ):Observable<any>{
    return this.httpClent.post<any>(environment.baseurl + `/posts/${id}/comments`, data);
  }
}

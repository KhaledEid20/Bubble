import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PostsDataResponse } from '../models/posts-data.interface';
import { PostMutationDataResponse } from '../models/post-mutation-data-response.interface';
import { SinglePostMutation } from '../models/single-post-mutation.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  httpClient = inject(HttpClient);
  getPosts():Observable<PostsDataResponse>{
    return this.httpClient.get<PostsDataResponse>(environment.baseurl + "/posts" );
  }
  getSinglePost(id:string):Observable<SinglePostMutation>{
    return this.httpClient.get<SinglePostMutation>(`${environment.baseurl}/posts/${id}`);
  }
  createPost(data : FormData):Observable<PostMutationDataResponse>{
    return this.httpClient.post<PostMutationDataResponse>(environment.baseurl + "/posts" , data );
  }
  DeletePost(id : string):Observable<PostMutationDataResponse>{
    return this.httpClient.delete<PostMutationDataResponse>(`${environment.baseurl}/posts/${id}`);
  }
}

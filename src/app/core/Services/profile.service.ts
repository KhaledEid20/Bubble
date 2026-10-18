import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProfileResponse } from '../../features/profile/Models/profile-response.interface';
import { ProfilePostsResponse } from '../../features/profile/Models/profile-posts.interface';
import { BookMarksResponse } from '../../features/profile/Models/book-marks-response.interface';
import { MyProfileResponse } from '../models/my-profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private httpClient = inject(HttpClient);

  getMyProfile() : Observable<ProfileResponse>{
    return this.httpClient.get<ProfileResponse>(`${environment.baseurl}/users/profile-data`);
  }

  getUserProfile(id:string):Observable<MyProfileResponse>{
    return this.httpClient.get<MyProfileResponse>(`${environment.baseurl}/users/${id}/profile`);
  }

  getAllUserPosts(id : string):Observable<ProfilePostsResponse>{
    return this.httpClient.get<ProfilePostsResponse>(`${environment.baseurl}/users/${id}/posts`);
  }
  UpdateTheProfilePicture(data : FormData):Observable<any>{
    return this.httpClient.put<any>(`${environment.baseurl}/users/upload-photo` , data);
  }
  getAllTheBookmarks():Observable<BookMarksResponse>{
    return this.httpClient.get<BookMarksResponse>(`${environment.baseurl}/users/bookmarks`)
  }
}

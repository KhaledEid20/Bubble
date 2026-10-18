import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { SuggestionsResponse } from '../Models/suggestions.interface';

@Injectable({
  providedIn: 'root',
})
export class AsideService {
  readonly httpClient = inject(HttpClient);

  getSuggestion(limit : number):Observable<SuggestionsResponse>{
    return this.httpClient.get<SuggestionsResponse>(`${environment.baseurl}/users/suggestions?limit=${limit}`)
  }
  FollowAndUnfollow(id : string):Observable<any>{
    return this.httpClient.put<any>(`${environment.baseurl}/users/${id}/follow`,{})
  }
}

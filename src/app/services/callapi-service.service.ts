import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CallapiService {

  usersList: any;
  repositoriesList: any;
  repositoryViewDetails: any;

  constructor(private http: HttpClient) { }

  getDataFromApi(endPoint: string) {
    return this.http.get(environment.apiUrl + '/' + endPoint);
  }

  getDetailsFromApi(reposUrl: string) {
    return this.http.get(reposUrl);
  }

}

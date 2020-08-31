import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(public http: HttpClient) { }

  getFlatUserList(page){
    return this.http.get(`${environment.app.baseURL}users?since=${page}`);
  }
  getRepo(user, page){
    return this.http.get(`${environment.app.baseURL}users/${user}/repos?page=${page}`);
  }
  getUserSearch(user, page){
    return this.http.get(`${environment.app.baseURL}search/users?q=${user}&page=${page}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { MasterService } from './master.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  keyword: string = '';
  listData: any;
  title: string = '';
  userName: string = '';
  boolPreloader: boolean = false;
  errorMessage: boolean = false;
  page: number = 1;
  Math: any;
  constructor(private _masterService: MasterService) { 
    this.Math = Math;
  }

  ngOnInit() {
    this.page = 1;
    this.getFlatUserList()
  }
  getFlatUserList(){
    this.boolPreloader = true;
    this.title = 'userList'
    this._masterService.getFlatUserList(this.page).subscribe(res=>{
      this.listData = res;
      this.boolPreloader = false;
    }, err=>{
      this.boolPreloader = false;
      this.errorMessage = true;
    })
  }
  userRepo(user){
    this.userName = user;
    this.page = 1;
    this.getUserRepo(user)  
  }
  getUserRepo(user){
    this.boolPreloader = true;
    this.title = 'repoList';
    this._masterService.getRepo(user, this.page).subscribe(res=>{
      this.listData = res;
      this.boolPreloader = false;
    }, err=>{
      this.boolPreloader = false;
      this.errorMessage = true;
    })
  }
  searchUser(){
    if(this.keyword){
      this.keyword = this.keyword.trim();
      this.page = 1;
      this.searchUserApiCall();
    }
  }
  searchUserApiCall(){
    this.boolPreloader = true;
    this.title = 'userSearch';
    this._masterService.getUserSearch(this.keyword, this.page).subscribe(res=>{
      this.listData = res['items'];
      this.boolPreloader = false;
    }, err=>{
      this.boolPreloader = false;
      this.errorMessage = true;
    })
  }
  next(evt){
    this.page += 30;
    this.apiCalls();
  }
  prev(evt){
    this.page -= 30;
    this.apiCalls();
  }
  apiCalls(){
    if(this.title == 'userList'){
      this.getFlatUserList();
    }
    if(this.title == 'repoList'){
      this.getUserRepo(this.userName)
    }
    if(this.title == 'userSearch'){
      this.searchUserApiCall();
    }
  }

}

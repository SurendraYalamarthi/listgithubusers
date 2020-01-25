import { Component, OnInit, ViewChild } from '@angular/core';

import { CallapiService } from '../../services/callapi-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent implements OnInit {

  @ViewChild('resultSet', { static: false }) resultSet;
  @ViewChild('input', { static: false }) input;

  usersList: any;
  search: string;

  constructor(private callApiService: CallapiService, private router: Router) { }

  ngOnInit() {
    // checking whether users service called or not.
    if (!this.callApiService.usersList || this.callApiService.usersList.length === 0) {
      this.getUsersList();
    } else {
      // getting users list from api
      this.usersList = Object.assign([], this.callApiService.usersList);
    }
  }

  getUsersList() {
    // fetching users list from api
    this.callApiService.getDataFromApi('users').subscribe((response) => {
      // Storing users list in service
      this.callApiService.usersList = Object.assign([], response);
      this.usersList = Object.assign([], response);
    }, (error) => {
      console.error(error);
    });
  }

  filterUserList(e) {
    if (e.key.toLowerCase() !== 'arrowdown' && e.key.toLowerCase() !== 'arrowup') {
      setTimeout(() => {
        this.usersList.length = 0;
        if (this.search.length !== 0) {
          for (const i in this.callApiService.usersList) {
            if (this.callApiService.usersList[i].login.indexOf(this.search) >= 0) {
              setTimeout(() => {
                this.usersList.push(this.callApiService.usersList[i]);
              }, 200);
            }
          }
        } else {
          this.usersList = Object.assign([], this.callApiService.usersList);
        }
      }, 200);
    }
  }

  // if user selected using arrows and press enter key this function will trigger
  selectValue() {
    const selectedIndex = this.usersList.findIndex(data => data.mouseEntered);
    if (selectedIndex !== -1) {
      this.getRepositories(this.usersList[selectedIndex]);
      this.input.nativeElement.blur();
    }
  }

  // function to fetch repositories
  getRepositories(user) {
    this.callApiService.getDetailsFromApi(user.repos_url).subscribe((response) => {
      // storing repositories in service
      this.callApiService.repositoriesList = response;
      this.router.navigate(['/repositories']);
    }, (error) => {
      console.error(error);
    });
  }

  // function to handle up and down arrows
  Move(event, dir) {
    const posStart = this.input.nativeElement.selectionStart;
    const posEnd = this.input.nativeElement.selectionEnd;
    const hoverIndex = this.usersList.findIndex(data => data.mouseEntered);
    if (dir === 'UP') {
      if (hoverIndex !== -1) {
        this.usersList[hoverIndex].mouseEntered = false;
        if (hoverIndex !== 0) {
          this.resultSet.nativeElement.scrollTop = this.resultSet.nativeElement.children[hoverIndex].offsetTop - 250;
        }
        this.usersList[parseInt(hoverIndex) - 1].mouseEntered = true;
      } else {
        this.usersList[this.usersList.length - 1].mouseEntered = true;
        this.resultSet.nativeElement.scrollTop = this.resultSet.nativeElement.scrollHeight;
      }
    } else if (dir === 'DOWN') {
      if (hoverIndex !== -1 && hoverIndex !== (this.usersList.length - 1)) {
        this.usersList[hoverIndex].mouseEntered = false;
        this.resultSet.nativeElement.scrollTop = this.resultSet.nativeElement.children[hoverIndex].offsetTop - 80;
        this.usersList[parseInt(hoverIndex) + 1].mouseEntered = true;
      } else if (hoverIndex === (this.usersList.length - 1)) {
        this.usersList[0].mouseEntered = true;
        this.resultSet.nativeElement.scrollTop = 0;
      } else {
        this.usersList[0].mouseEntered = true;
      }
    }
    this.input.nativeElement.selectionStart = posStart;
    this.input.nativeElement.selectionEnd = posEnd;
  }

  // function to add class when mouse hover on user
  mouseEntered(result) {
    this.usersList = this.usersList.map(data => {
      if (data === result) {
        data.mouseEntered = true;
      } else {
        data.mouseEntered = false;
      }
      return data;
    });
  }


}

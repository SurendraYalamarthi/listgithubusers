import { Component, OnInit } from '@angular/core';
import { CallapiService } from 'src/app/services/callapi-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {

  repositoriesList: any;

  constructor(private callApiService: CallapiService, private router: Router) { }

  ngOnInit() {
    // getting stored repositories from service
    this.repositoriesList = this.callApiService.repositoriesList;
  }

  viewRepository(repo) {
    // open url on selection of repositories
    window.open(repo.html_url, '_blank');
  }

}

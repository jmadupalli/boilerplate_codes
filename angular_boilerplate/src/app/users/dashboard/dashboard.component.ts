import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private backend: BackendService) { }

  user = this.backend.user;

  ngOnInit(): void {
    this.backend.getUser().subscribe(
      (resp) => {
        console.log(resp);
      }
    )
  }

  logout() {
    this.backend.logout();
  }

}

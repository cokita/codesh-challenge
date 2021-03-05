import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/external/login/login.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed: boolean = true;
  constructor(protected loginService:LoginService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.loginService.logout();
  }

}

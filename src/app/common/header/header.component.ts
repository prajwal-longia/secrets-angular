import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  showSidebar() {
    const sidebar = <HTMLElement>document.getElementsByClassName('sidebar')[0];
    sidebar.style.display = 'flex';
  }

  hideSidebar() {
    const sidebar = <HTMLElement>document.getElementsByClassName('sidebar')[0];
    sidebar.style.display = 'none';
  }

  onLogout() {
    this.authService.logoutUser();
  }

}

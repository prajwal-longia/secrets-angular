import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  showSidebar() {
    const sidebar = <HTMLElement>document.getElementsByClassName('sidebar')[0];
    sidebar.style.display = 'flex';
  }

  hideSidebar() {
    const sidebar = <HTMLElement>document.getElementsByClassName('sidebar')[0];
    sidebar.style.display = 'none';
  }

}

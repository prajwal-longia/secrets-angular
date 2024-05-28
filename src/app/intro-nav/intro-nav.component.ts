import { Component } from '@angular/core';

@Component({
  selector: 'app-intro-nav',
  templateUrl: './intro-nav.component.html',
  styleUrls: ['./intro-nav.component.css']
})
export class IntroNavComponent {
  showSidebar() {
    const sidebar = <HTMLElement>document.getElementsByClassName('sidebar')[0];
    sidebar.style.display = 'flex';
  }

  hideSidebar() {
    const sidebar = <HTMLElement>document.getElementsByClassName('sidebar')[0];
    sidebar.style.display = 'none';
  }

}

import { Component, AfterViewChecked } from '@angular/core';
import { NavigationTab } from '../models/navigation-tab.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  constructor(private router: Router){}

  ngAfterViewChecked(): void {
    this.checkCurrentTab();
  }

  tabs: NavigationTab[] = [
    {
      name: 'Empresas',
      value: 'company',
      route: '/company',
    },
    {
      name: 'Funcionários',
      value: 'employee',
      route: '/employee',
    },
    {
      name: 'Cargos',
      value: 'position',
      route: '/position'
    }
  ];

  currentTab: NavigationTab = this.tabs[0];

  changeTab(tab: NavigationTab) {
    this.currentTab = tab;
  }

  checkCurrentTab() {
    const { url } = this.router;
    this.tabs.map(tab => {
      if (tab.route === url) {
        this.currentTab = tab;
        return;
      }
    })
  }
}

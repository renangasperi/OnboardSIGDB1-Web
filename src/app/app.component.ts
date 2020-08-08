import { Component, AfterViewInit } from '@angular/core';
import { NavigationTab } from '../models/navigation-tab.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(private router: Router){}

  ngAfterViewInit(): void {
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
    console.log(url, 'socorro');
    this.tabs.map(tab => {
      if (tab.route === url) {
        this.currentTab = tab;
        return;
      }
    })
  }
}

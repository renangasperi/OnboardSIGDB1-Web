import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavigationTab } from '../../models/navigation-tab.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() currentTab: NavigationTab;

  @Input() tabs: NavigationTab[];

  @Output() changeTab = new EventEmitter();

  handleTabChange(tab: string) {
    this.changeTab.emit(tab);
  }

}

import { Component, OnInit } from '@angular/core';
import {UiToolbarService} from "ng-smn-ui";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  menuOpen: boolean;
  title: string;

  constructor(private toolbarService: UiToolbarService) {
  }

  ngOnInit() {
    this.toolbarService.registerMainToolbar(document.getElementById('app-header'));
    this.toolbarService.change.subscribe(title => {
      this.title = title;
    });

    this.toolbarService.set('Home');
  }
}

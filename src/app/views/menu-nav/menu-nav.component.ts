import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss']
})
export class MenuNavComponent implements OnInit {

  public href: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}

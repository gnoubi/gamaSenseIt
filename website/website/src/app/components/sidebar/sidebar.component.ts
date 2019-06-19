import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/qrcode', title: 'Scan QR codes', icon: 'ni-camera-compact text-info', class: ''},
    { path: '/maps', title: "Sensor's Maps",  icon:'ni-pin-3 text-success', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-dark', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-primary', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-danger', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}

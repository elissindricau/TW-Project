import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',                   title: 'Dashboard',                icon:'nc-chart-pie-36',       class: '' },
    { path: '/consultatii',                 title: 'Consultații',              icon:'nc-sound-wave',         class: '' },
    { path: '/table',                       title: 'Management Pacienți',      icon:'nc-badge',              class: '' },
    { path: '/dashboardSaloane',            title: 'Management Saloane',       icon:'nc-layout-11',          class: '' },
    { path: '/tableProgram',                title: 'Program de lucru',         icon:'nc-calendar-60',        class: '' },
    // { path: '/notifications',               title: 'Notifications',            icon:'nc-bell-55',            class: '' },
    // { path: '/user',                        title: 'User Profile',             icon:'nc-circle-10',          class: '' },
    { path: '/icons',                       title: 'Icons',                    icon:'nc-diamond',            class: '' },
    // { path: '/table',         title: 'Table List',               icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',               icon:'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',           icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}

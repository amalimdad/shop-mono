import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LibAppToolbarComponent } from '@shopmono/shared-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    LibAppToolbarComponent
  ],
  template: `
    <div class="admin-container">
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav mode="side" opened class="sidenav">
          <div class="sidenav-header">
            <h3>Admin Panel</h3>
          </div>

          <mat-nav-list>
            <a mat-list-item routerLink="/admin" routerLinkActive="active">
              <mat-icon matListItemIcon>dashboard</mat-icon>
              <span matListItemTitle>Dashboard</span>
            </a>

            <a mat-list-item routerLink="/admin/products" routerLinkActive="active">
              <mat-icon matListItemIcon>inventory</mat-icon>
              <span matListItemTitle>Products</span>
            </a>

            <a mat-list-item routerLink="/admin/orders" routerLinkActive="active">
              <mat-icon matListItemIcon>shopping_bag</mat-icon>
              <span matListItemTitle>Orders</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
          <lib-app-toolbar title="Admin Dashboard">
            <div class="user-info">
              <span>Welcome, Admin</span>
              <button mat-button>
                <mat-icon>logout</mat-icon>
                Logout
              </button>
            </div>
          </lib-app-toolbar>

          <main class="admin-content">
            <router-outlet></router-outlet>
          </main>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
  title = 'admin';

  constructor() {}

  ngOnInit(): void {}
}

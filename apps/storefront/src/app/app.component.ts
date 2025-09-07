import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LibAppToolbarComponent } from '@shopmono/shared-ui';
import { CartIconComponent } from '@shopmono/features-cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    LibAppToolbarComponent,
    CartIconComponent
  ],
  template: `
    <div class="app-container">
      <lib-app-toolbar title="Shop Mono">
        <lib-cart-icon></lib-cart-icon>
      </lib-app-toolbar>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
    }

    .auth-section {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class AppComponent {
  title = 'storefront';
  private router = inject(Router);
}

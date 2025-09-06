import { Component,Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';


@Component({
  selector: 'lib-app-toolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatBadgeModule],
  templateUrl: './app-toolbar.html',
  styleUrl: './app-toolbar.scss',
})
export class AppToolbarComponent {
  @Input() title = 'Shop';
}

import { Component,Input} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-app-card',
  imports: [MatCardModule, CommonModule],
  templateUrl: './app-card.html',
  styleUrl: './app-card.scss',
})
export class AppCardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() showActions = false;
}

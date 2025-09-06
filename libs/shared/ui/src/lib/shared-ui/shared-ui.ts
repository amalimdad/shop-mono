import { Component, Input, Injectable, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PriceFormatter } from '@shopmono/shared-utils';



@Component({
  selector: 'lib-price',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="cssClass">{{ formattedPrice }}</span>
  `
})
export class PriceComponent {
  @Input() price!: number;
  @Input() currency = 'USD';
  @Input() cssClass = '';

  get formattedPrice(): string {
    return PriceFormatter.format(this.price, this.currency);
  }
}

@Component({
  selector: 'lib-star-rating',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="star-rating">
      <mat-icon
        *ngFor="let star of stars"
        [class.filled]="star.filled"
        class="star">
        {{ star.filled ? 'star' : 'star_border' }}
      </mat-icon>
      <span class="rating-text" *ngIf="showText">{{ rating }}/5</span>
    </div>
  `,
  styles: [`
    .star-rating {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .star {
      color: #ddd;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }
    .star.filled {
      color: #ffc107;
    }
    .rating-text {
      margin-left: 8px;
      font-size: 14px;
      color: #666;
    }
  `]
})
export class StarRatingComponent {
  @Input() rating = 0;
  @Input() showText = false;

  get stars() {
    return Array.from({ length: 5 }, (_, i) => ({
      filled: i < Math.round(this.rating)
    }));
  }
}


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private snackBar = inject(MatSnackBar);

  show(message: string, action = 'Close', duration = 3000): void {
    this.snackBar.open(message, action, {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  success(message: string): void {
    this.show(message, '✓', 2000);
  }

  error(message: string): void {
    this.show(message, '✗', 5000);
  }
}

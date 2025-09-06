import { Component,Input } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
@Component({
  selector: 'lib-pill',
  imports: [MatChipsModule],
  templateUrl: './pill.html',
  styleUrl: './pill.scss',
})
export class PillComponent {
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() disabled = false;
}

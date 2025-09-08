import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
// import {StatusEnum} from "../../features/catalog/src/lib/product-detail.component";
// Local status enum to avoid importing application-level code which creates
// circular dependencies (apps -> libs -> apps). If this enum needs to be
// shared across libraries and apps, move it to a dedicated shared lib (e.g.
// libs/shared/types) instead of importing from an app.
// export enum CardStatus {
//   PENDING = 1,
//   EMPTY = 0,
//   SHIPPED = 2
// }
@Component({
  selector: 'lib-app-card',
  imports: [MatCardModule, CommonModule],
  templateUrl: './app-card.html',
  styleUrl: './app-card.scss',
})
export class AppCardComponent implements OnInit {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() showActions = false;

  ngOnInit() {
    // const status = StatusEnum.PENDING //CardStatus.EMPTY;
    console.log('initialized status:');
  }
}

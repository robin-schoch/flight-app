import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {initLuggage, Luggage} from "@flight-demo/luggage/domain";

@Component({
  selector: 'common-luggage-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './luggage-card.component.html',
  styleUrls: ['./luggage-card.component.css'],
})
export class LuggageCardComponent {
  @Input()
  luggage: Luggage = initLuggage
}

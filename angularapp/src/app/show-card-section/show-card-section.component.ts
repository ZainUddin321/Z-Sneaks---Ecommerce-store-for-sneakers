import { Component, Input } from '@angular/core';
import { Sneakers } from '../sneakers-api.service';
@Component({
  selector: 'app-show-card-section',
  templateUrl: './show-card-section.component.html',
  styleUrls: ['./show-card-section.component.css']
})
export class ShowCardSectionComponent {
  @Input() sneakers: Sneakers[]=[];
  @Input() Title: string="";
}

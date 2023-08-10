import { Component, Input } from '@angular/core';
import { Sneakers } from '../Services/sneakers-api.service';
import { ShoeCardComponent } from '../shoe-card/shoe-card.component';
import { NgFor } from '@angular/common';
@Component({
    selector: 'app-show-card-section',
    templateUrl: './show-card-section.component.html',
    styleUrls: ['./show-card-section.component.css'],
    standalone: true,
    imports: [NgFor, ShoeCardComponent]
})
export class ShowCardSectionComponent {
  @Input() sneakers: Sneakers[]=[];
  @Input() Title: string="";
}

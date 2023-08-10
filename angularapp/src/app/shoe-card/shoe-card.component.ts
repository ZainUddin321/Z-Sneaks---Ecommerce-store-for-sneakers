import { Component, Input } from '@angular/core';
import { Sneakers } from '../Services/sneakers-api.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-shoe-card',
    templateUrl: './shoe-card.component.html',
    styleUrls: ['./shoe-card.component.css'],
    standalone: true,
    imports: [RouterLink]
})
export class ShoeCardComponent {
  @Input() sneakerDetail:Sneakers={
    boxCondition: '',
    brandName: '',
    category: [],
    collectionSlugs: [],
    color: '',
    designer: '',
    details: '',
    gender: [],
    gridPictureUrl: '',
    hasPicture: false,
    hasStock: false,
    id: '',
    keywords: [],
    mainPictureUrl: '',
    midsole: '',
    name: '',
    nickname: '',
    originalPictureUrl: '',
    productTemplateId: 0,
    releaseDate: '',
    releaseDateUnix: 0,
    releaseYear: 0,
    retailPriceCents: 0,
    shoeCondition: '',
    silhouette: '',
    sizeRange: [],
    slug: '',
    sneakerID: 0,
    status: '',
    stockKeepingUnits: '',
    storyHtml: '',
    upperMaterial: ''
  };
}

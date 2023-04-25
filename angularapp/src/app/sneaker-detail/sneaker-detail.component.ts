import { Component } from '@angular/core';
import { Sneakers, SneakersApiService } from '../sneakers-api.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sneaker-detail',
  templateUrl: './sneaker-detail.component.html',
  styleUrls: ['./sneaker-detail.component.css']
})
export class SneakerDetailComponent {
  sneaker: Sneakers={
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
  id:number=397517;
  taskSubscription: Subscription = new Subscription;
  constructor(private sneakersApi: SneakersApiService, private route:ActivatedRoute) { }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.taskSubscription=this.sneakersApi.getSneakerById(this.id).subscribe((result) => {
      if (result) {
        this.sneaker = result;
      }
    }, error => console.error(error));
  }
  ngOnDestroy(){
    this.taskSubscription.unsubscribe();
  }
}

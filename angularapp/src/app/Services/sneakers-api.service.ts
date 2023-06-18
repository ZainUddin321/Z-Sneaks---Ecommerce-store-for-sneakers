import { InterpolationConfig } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SneakersApiService {
  constructor(private http: HttpClient) { }
  
  getAllSneakers() {
    return this.http.get<Sneakers[]>('/api/Sneakers/getAllSneakers');
  }

  getSneakerById(id: number) {
    return this.http.get<Sneakers>('/api/Sneakers/getSneakerById/' + id);
  }
  
  getLimitedSneakers(limit: number) {
    return this.http.get<Sneakers[]>('/api/Sneakers/getLimitedSneakers/' + limit);
  }

}

export interface Sneakers {
  boxCondition: string
  brandName: string
  category: string[]
  collectionSlugs: string[]
  color: string
  designer: string
  details: string
  gender: string[]
  gridPictureUrl: string
  hasPicture: boolean
  hasStock: boolean
  id: string
  keywords: string[]
  mainPictureUrl: string
  midsole: string
  name: string
  nickname: string
  originalPictureUrl: string
  productTemplateId: number
  releaseDate: string
  releaseDateUnix: number
  releaseYear: number
  retailPriceCents: number
  shoeCondition: string
  silhouette: string
  sizeRange: number[]
  slug: string
  sneakerID: number
  status: string
  stockKeepingUnits: string
  storyHtml: string
  upperMaterial: string
}

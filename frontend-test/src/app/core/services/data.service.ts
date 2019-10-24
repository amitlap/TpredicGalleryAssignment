import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private favoritePhotosSource = new BehaviorSubject<{id: string, link: string}[]>([]);
  readonly currentFavoritePhotos = this.favoritePhotosSource.asObservable();

  constructor() {}

  addPhoto(id: string, link: string){
    let favoritePhotos = this.favoritePhotosSource.getValue();
    if(favoritePhotos.length > 14){
      alert('Favorite Photos is full! Pleas delete some old photo before adding new one');
      return;
    }
    let index = favoritePhotos.map(item => item.id).indexOf(id);
    index === -1 && favoritePhotos.unshift({id,link});
    this.favoritePhotosSource.next(favoritePhotos);
  }

  removePhoto(id: string){
    let favoritePhotos = this.favoritePhotosSource.getValue();
    let index = favoritePhotos.map(item => item.id).indexOf(id);
    favoritePhotos.splice(index,1);
    this.favoritePhotosSource.next(favoritePhotos);
  }
}

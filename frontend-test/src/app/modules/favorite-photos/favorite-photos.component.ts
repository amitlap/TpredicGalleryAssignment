import { Component, OnInit} from '@angular/core';
import {DataService} from "../../core/services/data.service";
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'favorite-photos',
  templateUrl: './favorite-photos.component.html',
  styleUrls: ['./favorite-photos.component.scss'],
  animations: [trigger('EnterLeave', [
    state('flyIn', style({ transform: 'translateX(0)' })),
    transition(':enter', [
      style({ transform: 'translateY(-100%)'}),
      animate('0.5s 300ms ease-in')
    ]),
    transition(':leave', [
      animate('0.3s ease-out',
      style({ transform: 'translateX(-100%)' }))
    ])
  ])]
})


export class FavoritePhotosComponent implements OnInit {
  favoritePhotos: {id: string, link: string}[];
  clickedPhotoId = '-1';
  clickedPhotoLink = '';
  exitImgLink = '../../assets/exit.png';


  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.currentFavoritePhotos.subscribe(favoriteLinkPhotos => this.favoritePhotos = favoriteLinkPhotos);
  }

  removeFavoritePhoto(id) {
    this.data.removePhoto(id);
  }

  handlePhotoClick(id,link){
    this.clickedPhotoId = id;
    this.clickedPhotoLink = link;
  }


}




import { Component, Input, OnInit } from '@angular/core';
import {DataService} from '../../core/services/data.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'image',
  templateUrl: 'image.component.html',
  styleUrls: ['image.component.scss'],
  animations: [trigger('changeImgSize', [
    state('initial', style({
      width: '286px',
      height: '200px',
      zIndex: '1',
    })),
    state('final', style({
      width: '586px',
      height: '500px',
      zIndex: '1000',
      boxShadow: '1px 2px 4px rgba(0, 0, 0, .5)',
      opacity: '1',
    })),
    transition('initial=>final', animate('900ms')),
    transition('final=>initial', animate('1000ms'))
  ]), trigger('fadeCard', [
    state('initial', style({
      opacity: '1'
    })),
    state('final', style({
      opacity: '0',
      border: 'none'
    })),
    transition('initial=>final', animate('900ms')),
    transition('final=>initial', animate('1000ms'))
  ])]
})

export class ImageComponent {
  @Input() imageData: any;
  imageLink: string;
  errorImgLink = '../../assets/exit.png';
  currentState = 'initial';
  imgClicked = false;

  constructor(private data: DataService){}

  ngOnInit() {
    this.imageLink = `https://farm${this.imageData.farm}.staticflickr.com/${this.imageData.server}/${this.imageData.id}_${this.imageData.secret}.jpg`;
  }

  changeImgState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
    this.imgClicked = !this.imgClicked;

  }

  addToFavorite() {
    this.data.addPhoto(this.imageData.id, this.imageLink);
  }

  handleMouseLeaveImg() {
    this.currentState = 'initial';
    this.imgClicked = false;
  }

  handleError() {
    this.imageLink = this.errorImgLink;
    console.log('Error on image: ' + this.imageData.id);
  }
}

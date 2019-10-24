import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GalleryService } from 'src/app/core/services/gallery.service';

// const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&page=${page}&tag_mode=any&per_page=100&format=json&safe_search=1&nojsoncallback=1`;
// const baseUrl = 'https://api.flickr.com/';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gallery',
  templateUrl: 'gallery.component.html',
  styleUrls: ['gallery.component.scss'],
})

export class GalleryComponent {
  @Input() events: Observable<void>;
  eventsSubscription: any;
  gallery = [];
  photosEndIndex: number;
  photosStartIndex: number;
  photos = [];
  imagesLoad = false;
  startImagesNum = 9;
  lastScrollTop = 0;

  constructor(private httpClient: HttpClient, private galleryService: GalleryService){}

  ngOnInit() {
    this.loadImageGallery('flower', 1);
    this.eventsSubscription = this.events.subscribe((searchValue) => this.loadImageGallery(searchValue, 1));
  }

  loadImageGallery(searchValue, page) {
    this.imagesLoad = false;
    this.photosEndIndex  = this.startImagesNum;
    this.photosStartIndex  = 0;
    this.galleryService.getCalendarData(searchValue, page).subscribe(
      res => {
         this.photos = res.photos.photo;
         this.gallery = this.photos.slice(0,this.startImagesNum);
         this.imagesLoad = true;
      },
      error => {
         console.log(error.message);
         alert('There is some ERROR, try to refresh the page, (' + error.statusText +')');
         return;
      }
    );
  }

  getScrollDirection() {
    let scrollDirectionSign = 0;
    const st = window.pageYOffset || document.documentElement.scrollTop;

    (st > this.lastScrollTop) ? scrollDirectionSign = 1 : scrollDirectionSign = -1;
    this.lastScrollTop = st <= 0 ? 0 : st;
    return scrollDirectionSign;
  }

  isScrollingDown(myLocation: number, pageEnding: number, loadNextImagesPoint: number, scrollDirectionSign: number) {
    return (myLocation/pageEnding >= loadNextImagesPoint &&
            scrollDirectionSign === 1 &&
            this.photosEndIndex < this.photos.length);
  }

  isScrollingUp(myLocation: number, pageEnding: number, loadPrevImagesPoint: number, scrollDirectionSign: number) {
    return (myLocation / pageEnding <= loadPrevImagesPoint &&
            scrollDirectionSign === -1 &&
            this.photosStartIndex > 0);
  }

  onScroll() {
    const myLocation = window.pageYOffset;
    const pageEnding = window.innerHeight;
    const loadNextImagesPoint = 0.8;
    const loadPrevImagesPoint = 0.2;
    const addedImagesNum = 2;
    const removedImagesNum = 2;
    const scrollDirectionSign = this.getScrollDirection();

    if(this.isScrollingDown(myLocation, pageEnding, loadNextImagesPoint, scrollDirectionSign)){
      this.photosEndIndex = this.photosEndIndex + addedImagesNum;
      this.photosStartIndex = this.photosStartIndex + addedImagesNum;
      this.gallery = this.gallery.concat(this.photos.slice(this.photosEndIndex,this.photosEndIndex + addedImagesNum));
      this.gallery.splice(0, removedImagesNum);
    }
    if(this.isScrollingUp(myLocation, pageEnding, loadPrevImagesPoint, scrollDirectionSign)){
      this.photosEndIndex = this.photosEndIndex - addedImagesNum;
      this.photosStartIndex = this.photosStartIndex - addedImagesNum;
      this.gallery = (this.photos.slice(this.photosStartIndex,this.photosStartIndex + addedImagesNum)).concat(this.gallery);
      this.gallery.length = this.startImagesNum;
    }
  }

  getGalleryState() {
    if(!this.imagesLoad) return 'Loading Photos...';
    if(this.imagesLoad && this.gallery.length === 0) return 'No Results';
    return 'display';
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

}

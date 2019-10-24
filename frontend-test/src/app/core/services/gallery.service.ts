import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Authorization':'authkey',
    'userid':'1'
  })
};

@Injectable()
export class GalleryService {
  constructor(private http:HttpClient){}
  
  getCalendarData(searchValue, page): Observable<any> {
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=f33f238800a5534d5888d913ace69ca7&tags=${searchValue}&page=${page}&tag_mode=any&per_page=100&format=json&safe_search=1&nojsoncallback=1`;
    const baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.flickr.com/';
    return this.http.get<any>(baseUrl+getImagesUrl, httpOptions);
  }
}

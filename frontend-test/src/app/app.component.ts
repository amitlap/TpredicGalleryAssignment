import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Tpredic-Gallery-Test';
  searchInputValue = 'test';

  eventsSubject = new Subject<any>();

  emitEventToChild(value: string) {
    this.searchInputValue = value;
    this.eventsSubject.next(this.searchInputValue);
  }
}

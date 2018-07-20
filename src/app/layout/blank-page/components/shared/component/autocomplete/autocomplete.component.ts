import {Component, Input, OnInit} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  @Input() inputId;
  @Input() inputName: FormControl = new FormControl();

  searching = false;
  searchFailed = false;

  formatter = (result: any) => result;

  selectItem(event) {
    const item = event.item;
    console.log(item);
    console.log(this.inputId);
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => {
          return this._service.findActivitiesBySuggestion(term).pipe(
            tap(() => {
              this.searchFailed = false;
            }),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            }));
        }
      ),
      tap(() => this.searching = false));
  }

  constructor() { }

  ngOnInit() {
  }

}

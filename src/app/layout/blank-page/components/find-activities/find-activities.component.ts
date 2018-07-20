import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, tap, switchMap} from 'rxjs/operators';

import {Observable, of, Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {ActivityService} from '../shared/service/activity.service';
import {Activity} from '../shared/model/activity/activity';
import {FindActivity} from '../shared/model/activity/find-activity';

@Component({
  selector: 'app-find-activities',
  templateUrl: './find-activities.component.html',
  styleUrls: ['./find-activities.component.css'],
  providers: [ActivityService]
})
export class FindActivitiesComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  activitiesForm: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private formBuilder: FormBuilder, private _service: ActivityService) {
    this.activitiesForm = this.formBuilder.group({
      activity: ['', Validators.required],
      environment: ['', Validators.required ],
      status: ['', Validators.required ],
      module: ['', Validators.required ]
    });
  }

  activitiesModel: FindActivity = new FindActivity();
  searching = false;
  searchFailed = false;

  /*
  formatter = (result: Activity) => result.activityId;

  selectItem(event, id) {
    const item = event.item;
    switch (id) {
      case 'activity':
        this.activitiesModel.activityId = item;
        break;
      case 'module':
        this.activitiesModel.moduleId = item;
        break;
      default:
        alert('invalid selected item');
    }
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
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
      tap(() => this.searching = false))
  */

  ngOnInit() {

    this.dtOptions = {
      processing: true,
      lengthMenu: [5, 10, 15, 20, 30],
      pageLength: 10,
      responsive: true,
      ajax: (data: any, callback: any, settings: any) => {

        data.activityId = this.activitiesForm.controls['activity'].value;
        data.environmentId = this.activitiesForm.controls['environment'].value;
        data.statusId = this.activitiesForm.controls['status'].value;
        data.moduleId = this.activitiesForm.controls['module'].value;

        this._service.filterActivities(data)
          .subscribe(response => {
            callback({data: response});
          });
      },
      columns: [{
        title: 'Activity', data: 'activity.activityId'
      }, {
        title: 'Environment', data: 'activity.environment.name'
      }]
    };

  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  findActivities() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {map} from 'rxjs/operators';
import {Activity} from '../model/activity/activity';
import {ActivityMessages} from '../model/activity/activity-messages';

@Injectable()
export class ActivityService {

  _baseUrl = 'http://localhost:8089/v1/activity/messages';

  constructor(private http: HttpClient) {}

  getActivities() {
    return this.http.get<Activity[]>(this._baseUrl)
      .pipe(map(response => {
          return response[1];
        })
      );
  }

  filterActivities(params: any) {
    return this.http.get<ActivityMessages[]>(this._baseUrl + '/find', {params: params});
  }

  findActivitiesBySuggestion(activityId: string) {
    return this.http.get<Activity[]>(this._baseUrl + '/find/suggestions', {
      params: new HttpParams({fromObject: {activityId: activityId}})
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-last-activities',
  templateUrl: './last-activities.component.html',
  styleUrls: ['./last-activities.component.css']
})
export class LastActivitiesComponent implements OnInit {

  model: any = 1;
  public radioGroupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.radioGroupForm = this.formBuilder.group({
      model: 'middle'
    });
  }

}

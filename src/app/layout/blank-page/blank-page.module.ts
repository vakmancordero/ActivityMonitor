import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';

import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';

import {
  LastActivitiesComponent,
  FindActivitiesComponent
} from './components';
import { AutocompleteComponent } from './components/shared/component/autocomplete/autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule.forRoot(),
    BlankPageRoutingModule
  ],
  declarations: [
    BlankPageComponent,
    LastActivitiesComponent,
    FindActivitiesComponent,
    AutocompleteComponent,
  ]
})
export class BlankPageModule {}

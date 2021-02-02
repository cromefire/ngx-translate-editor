import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { CdkTreeModule } from "@angular/cdk/tree";
import { ProjectRoutingModule } from 'app/modules/project/project-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectCreateDialogComponent } from './project-create-dialog/project-create-dialog.component';
import { ProjectItemSettingsComponent } from './project-item-settings/project-item-settings.component';
import { ProjectCreateKeyDialogComponent } from './project-create-key-dialog/project-create-key-dialog.component';
import { SearchKeyByNamePipe } from './project-item/pipe/search-key-by-name.pipe';

@NgModule({
  declarations: [
    ProjectItemComponent,
    ProjectListComponent,
    ProjectCreateDialogComponent,
    ProjectCreateKeyDialogComponent,
    ProjectItemSettingsComponent,
    SearchKeyByNamePipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CdkTreeModule,
  ],
  entryComponents: [
    ProjectCreateDialogComponent, ProjectCreateKeyDialogComponent
  ]
})
export class ProjectModule { }

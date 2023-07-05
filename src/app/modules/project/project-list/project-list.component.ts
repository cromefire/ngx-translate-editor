import * as shortId from 'shortid';
import { MatDialog } from "@angular/material/dialog";
import { UntypedFormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

import { ProjectLowdbService } from 'app/core/services/lowdb/project.lowdb.service';
import { ProjectModel } from 'app/core/models/project.model';
import { AppSettingsModel } from "../../../core/models";
import { defaultProjectSettings } from 'app/core/const/defaultProjectSettings.const';
import { AppSettingsLowdbService } from "../../../core/services/lowdb/app.settings.lowdb.service";
import { NgxTranslateLintService } from "../../../core/services/ngx-translate-lint/ngx-translate-lint.service";
import { ProjectCreateDialogComponent } from "../project-create-dialog/project-create-dialog.component";
import { ApplicationSettingsDialogComponent } from "../../application/application-settings-dialog/application-settings-dialog.component";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  public projects: ProjectModel[] = [];
  public selected = new UntypedFormControl(0);

  constructor(
    public dialog: MatDialog,
    private translateService: TranslateService,
    private projectLowdbService: ProjectLowdbService,
    private ngxTranslateLintService: NgxTranslateLintService,
    private appSettingsLowdbService: AppSettingsLowdbService,
  ) { }

  public ngOnInit(): void {
    this.updateProjects();
  }

  public createProjectAction(): void {
    const project = new ProjectModel();
    project.id = shortId.generate();
    project.name = 'New Project';

    const dialogRef = this.dialog.open(ProjectCreateDialogComponent, {
      width: '550px',
      data: project
    });

    dialogRef.afterClosed().subscribe((result: ProjectModel) => {
      if (result && result.languagesPath) {
        result.settings = defaultProjectSettings;
        result.keysModel = this.ngxTranslateLintService.getKeys(result.viewPath, result.languagesPath);
        result.lintResult = this.ngxTranslateLintService.run(result.viewPath, result.languagesPath, result.settings.linting);
        result.languagesModel = this.ngxTranslateLintService.getLanguages(result.viewPath, result.languagesPath);
        this.projectLowdbService.setProject(result);
        this.updateProjects();
        this.selected.setValue(this.projects.length - 1);
      }
    });
  }

  public removeProjectAction($event: ProjectModel): void {
    this.projectLowdbService.removeProject($event.id);
    this.updateProjects();
  }

  public runProjectLintingAction($event: ProjectModel): void {
    $event.lintResult = this.ngxTranslateLintService.run($event.viewPath, $event.languagesPath, $event.settings.linting);
    this.projectLowdbService.updateProject($event);
  }

  public openAppSettingsAction(): void {
    const dialogRef = this.dialog.open(ApplicationSettingsDialogComponent, {
      width: '550px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: AppSettingsModel) => {
       if (result) {
         this.translateService.use(result.language);
         this.appSettingsLowdbService.setSettings(result);
       }
    });
  }

  public saveProjectSettingsAction($event: ProjectModel): void {
    this.projectLowdbService.updateProject($event);
  }

  private updateProjects(): void {
    this.projects = this.projectLowdbService.getAllProjects();
    this.projects.forEach((project: ProjectModel) => {
      project.keysModel = this.ngxTranslateLintService.getKeys(project.viewPath, project.languagesPath);
      project.lintResult = this.ngxTranslateLintService.run(project.viewPath, project.languagesPath, project.settings.linting);
      project.languagesModel = this.ngxTranslateLintService.getLanguages(project.viewPath, project.languagesPath);
      this.projectLowdbService.updateProject(project);
    });
  }
}

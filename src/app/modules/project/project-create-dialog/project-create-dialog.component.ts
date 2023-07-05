import { Component, OnInit, Inject} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";

import {ProjectModel} from "../../../core/models/project.model";
import {ElectronService} from "../../../core/services";
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-project-create-dialog',
  templateUrl: './project-create-dialog.component.html',
  styleUrls: ['./project-create-dialog.component.scss']
})
export class ProjectCreateDialogComponent implements OnInit {
  public projectFormGroup: UntypedFormGroup;
  public projectIdControl: UntypedFormControl = new UntypedFormControl();
  public projectNameControl: UntypedFormControl = new UntypedFormControl();
  public projectViewPathControl: UntypedFormControl = new UntypedFormControl();
  public projectLanguagesPathControl: UntypedFormControl = new UntypedFormControl();

  constructor(
    public dialogRef: MatDialogRef<ProjectCreateDialogComponent>,
    private electronService: ElectronService,
    @Inject(MAT_DIALOG_DATA) public project: ProjectModel,
  ) { }

  public ngOnInit(): void {
    this.buildForm();
  }

  public onNoClickAction(): void {
    this.dialogRef.close();
  }

  public OpenLanguagesFolderAction(): void {
    this.electronService.remote.dialog.showOpenDialog({ properties: ['openDirectory']})
      .then(result => {
        const folders: string[] = result.filePaths;
        if(folders && folders[0]) {
          const languagePath: string = folders[0];
          const correctViewsPath: string = this.electronService.path.normalize(this.electronService.path.join(languagePath.replace(/src\\.*/gmi, 'src/app/'), `**`, `*.{html,ts}`));
          const correctLanguagesPath: string = this.electronService.path.join(languagePath, '*.json').replace(`/`, `\\`);

          this.projectViewPathControl.setValue(correctViewsPath);
          this.projectLanguagesPathControl.setValue(correctLanguagesPath);
        }
      }).catch(err => {
      console.log(err);
    });
  }

  public resetProjectNameAction(): void {
    this.projectNameControl.setValue('');
  }

  public resetProjectLanguagesPathAction(): void {
    this.projectLanguagesPathControl.setValue('');
  }

  private buildForm(): void {
    this.projectIdControl = new UntypedFormControl(this.project.id);
    this.projectNameControl = new UntypedFormControl(this.project.name);
    this.projectViewPathControl = new UntypedFormControl(this.project.viewPath);
    this.projectLanguagesPathControl = new UntypedFormControl(this.project.languagesPath);
    this.projectFormGroup = new UntypedFormGroup({
      id: this.projectIdControl,
      name: this.projectNameControl,
      viewPath: this.projectViewPathControl,
      languagesPath: this.projectLanguagesPathControl,
    });
  }
}

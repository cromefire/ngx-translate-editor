import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {ErrorTypes} from "ngx-translate-lint";
import {ProjectMainSettingModel, ProjectModel} from "../../../core/models";

@Component({
  selector: 'app-project-item-settings',
  templateUrl: './project-item-settings.component.html',
  styleUrls: ['./project-item-settings.component.scss']
})
export class ProjectItemSettingsComponent implements OnInit {
  @Input() project: ProjectModel;
  @Output() removeProjectEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveProjectLintingSettingsEmitter: EventEmitter<ProjectMainSettingModel> = new EventEmitter<ProjectMainSettingModel>();

  public errorTypesList: ErrorTypes[] = [ ErrorTypes.disable, ErrorTypes.error, ErrorTypes.warning ];
  public projectItemSettingsForm: UntypedFormGroup;
  public projectLintingSettingsForm: UntypedFormGroup;
  public projectLintingViewsControl: UntypedFormControl = new UntypedFormControl();
  public projectLintingZombieControl: UntypedFormControl = new UntypedFormControl();
  constructor() { }

  ngOnInit(): void {
    this.buildForm();
  }

  public removeProjectAction(): void {
    this.removeProjectEmitter.emit();
  }

  public saveProjectLintingAction(): void {
    const projectSettings: ProjectMainSettingModel = {
      linting: this.projectLintingSettingsForm.value,
      settings: this.projectItemSettingsForm.value
    };
    this.saveProjectLintingSettingsEmitter.emit(projectSettings);
  }

  private buildForm(): void {
    this.projectLintingViewsControl.setValue(this.project.settings.linting.views);
    this.projectLintingZombieControl.setValue(this.project.settings.linting.zombies);
    this.projectItemSettingsForm = new UntypedFormGroup({});
    this.projectLintingSettingsForm = new UntypedFormGroup({
      views: this.projectLintingViewsControl,
      zombies: this.projectLintingZombieControl,
    });
  }


}

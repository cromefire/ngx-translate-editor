import { LanguagesShortEnum } from 'app/core/enum';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { AppSettingsLowdbService } from "../../../core/services/lowdb/app.settings.lowdb.service";
import { TranslateService } from "@ngx-translate/core";
import { AppSettingsModel } from "../../../core/models";


@Component({
  selector: 'app-application-settings-dialog',
  templateUrl: './application-settings-dialog.component.html',
  styleUrls: ['./application-settings-dialog.component.scss']
})
export class ApplicationSettingsDialogComponent implements OnInit {
  public appSettings: AppSettingsModel;
  public languagesList: LanguagesShortEnum[] = [ LanguagesShortEnum.en, LanguagesShortEnum.ru ]

  public appSettingsFormGroup: UntypedFormGroup;
  public languagesControl: UntypedFormControl = new UntypedFormControl();

  constructor(
    private translateService: TranslateService,
    private appSettingsLowdbService: AppSettingsLowdbService,
    public dialogRef: MatDialogRef<ApplicationSettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppSettingsModel,
  ) { }

  ngOnInit(): void {
    this.appSettings = this.appSettingsLowdbService.getSettings();
    this.buildForm();
  }

  onNoClickAction(): void {
    this.dialogRef.close();
  }

  public buildForm(): void {
    this.languagesControl.setValue(this.appSettings.language);
    this.appSettingsFormGroup = new UntypedFormGroup({
      language: this.languagesControl,
    });
  }
}

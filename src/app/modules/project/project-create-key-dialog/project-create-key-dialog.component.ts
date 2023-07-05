import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {KeyModelWithLanguages} from "ngx-translate-lint";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'app-project-create-key-dialog',
  templateUrl: './project-create-key-dialog.component.html',
  styleUrls: ['./project-create-key-dialog.component.scss']
})
export class ProjectCreateKeyDialogComponent implements OnInit {
  public keyFormGroup: UntypedFormGroup;
  public keyNameControl: UntypedFormControl = new UntypedFormControl();

  constructor(
    public dialogRef: MatDialogRef<ProjectCreateKeyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public key: KeyModelWithLanguages,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  public onNoClickAction(): void {
    this.dialogRef.close();
  }

  public keyDownFunction() {
    this.dialogRef.close(this.keyFormGroup.value);
  }

  private buildForm(): void {
    this.keyNameControl = new UntypedFormControl(this.key.name || "");
    this.keyFormGroup = new UntypedFormGroup({
      name: this.keyNameControl,
    });
  }

}

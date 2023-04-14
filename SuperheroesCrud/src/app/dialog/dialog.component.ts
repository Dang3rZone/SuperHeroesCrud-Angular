import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

export interface SupeDialogData {
  name: string;
  category: string;
  dateBirth: string;
  power: string;
  id: number;
  about: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  powersList: string[] = ['Creation', 'Manipulations', 'Destruction'];
  actionBtn: string = 'Save';
  supeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: SupeDialogData
  ) {}

  ngOnInit(): void {
    this.createForm();

    if (this.editData) {
      this.actionBtn = 'Update';
      this.supeForm.patchValue(this.editData);
    }
  }

  private createForm(): void {
    this.supeForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      dateBirth: ['', Validators.required],
      power: ['', Validators.required],
      id: ['', Validators.required],
      about: [''],
    });
  }

  addSupe(): void {
    if (this.supeForm.invalid) {
      return;
    }

    const formValue = this.supeForm.value;

    if (!this.editData) {
      this.apiService.postSupe(formValue).subscribe({
        next: () => {
          alert('Supe added successfully');
          this.dialogRef.close('save');
        },
        error: () => {
          alert('Failed to add Supe');
        },
      });
    } else {
      this.apiService.putSupe(formValue, this.editData.id).subscribe({
        next: () => {
          alert('Supe updated successfully');
          this.dialogRef.close('update');
        },
        error: () => {
          alert('Failed to update Supe');
        },
      });
    }
  }
}

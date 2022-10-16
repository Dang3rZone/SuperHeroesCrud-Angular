import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  powersList = ['Creation', 'Manipulations', ' Destruction'];
  supeForm!: FormGroup;

  constructor(
    private FormBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.supeForm = this.FormBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      dateBirth: ['', Validators.required],
      power: ['', Validators.required],
      id: ['', Validators.required],
      about: [''],
    });

    if (this.editData) {
      this.supeForm.controls['name'].setValue(this.editData.name);
      this.supeForm.controls['category'].setValue(this.editData.category);
      this.supeForm.controls['dateBirth'].setValue(this.editData.name);
      this.supeForm.controls['power'].setValue(this.editData.power);
      this.supeForm.controls['id'].setValue(this.editData.id);
      this.supeForm.controls['about'].setValue(this.editData.about);
    }
  }

  addSupe() {
    if (this.supeForm.valid) {
      this.api.postSupe(this.supeForm.value).subscribe({
        next: (res) => {
          alert('supe added successfully');
          this.supeForm.reset();
          this.dialogRef.close('save');
        },
        error: () => {
          alert('supe added failed');
        },
      });
    }
  }
}

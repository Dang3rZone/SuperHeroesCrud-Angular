import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private FormBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.supeForm = this.FormBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      dateBirth: ['', Validators.required],
      power: ['', Validators.required],
      id: ['', Validators.required],
      about: [''],
    });
  }

  addSupe() {
    console.log(this.supeForm.value);
  }
}

import { Component, OnInit } from '@angular/core';

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
  ngOnInit(): void {}
}

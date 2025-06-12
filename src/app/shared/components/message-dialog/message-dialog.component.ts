import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [MatButtonModule, CommonModule,MatIcon,MatDialogModule],
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css'],
})
export class MessageDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    type: 'success' | 'error',
    title: string,
    message: string
  }) {}

  get icon() {
    return this.data.type === 'success' ? 'check_circle' : 'error';
  }

  get type() {
    return this.data.type;
  }

  get title() {
    return this.data.title;
  }

  get message() {
    return this.data.message;
  }

  ngOnInit() {}
}

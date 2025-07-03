import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
<<<<<<< HEAD
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
=======
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalDialogService } from '../../../core/services/modals/modalDialog/modalDialog.service';
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73

@Component({
  selector: 'app-message-dialog',
  standalone: true,
<<<<<<< HEAD
  imports: [MatButtonModule, CommonModule,MatIcon,MatDialogModule],
=======
  imports: [MatButtonModule, CommonModule,MatIconModule,MatDialogModule],
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css'],
})
export class MessageDialogComponent implements OnInit {
<<<<<<< HEAD
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
=======
 constructor( public modalDialog: ModalDialogService) {}

  get type() {
    return this.modalDialog.type();
  }

  get title() {
    return this.modalDialog.title();
  }

  get message() {
    return this.modalDialog.message();
  }

  get icon() {
    return this.type === 'success' ? 'check_circle' : 'error';
  }

  close() {
    this.modalDialog.close();
  }

  ngOnInit(): void {}
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
}

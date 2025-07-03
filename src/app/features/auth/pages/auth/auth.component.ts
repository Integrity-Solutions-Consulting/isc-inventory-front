import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './../../components/carousel/carousel.component'


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    CarouselComponent
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {}

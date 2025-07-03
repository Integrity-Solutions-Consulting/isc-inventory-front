<<<<<<< HEAD
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './../../components/carousel/carousel.component'

=======
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73

@Component({
  selector: 'app-auth',
  standalone: true,
<<<<<<< HEAD
  imports: [
    RouterModule,
    CommonModule,
    CarouselComponent
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {}
=======
  imports: [RouterModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

   images: string[] = [
    'assets/image1.jpg',
    'assets/image2.jpg',
    'assets/image3.jpg',
  ];

  constructor() { }

  ngOnInit() {
  }

}
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73

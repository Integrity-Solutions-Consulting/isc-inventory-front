import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
=======
import { CommonModule } from '@angular/common';
import { VerticalBarChartComponent } from '../verticalBarChart/verticalBarChart.component';
import { PieChartComponent } from '../pieChart/pieChart.component';
import { MatCardModule } from '@angular/material/card';
>>>>>>> origin/developAdrian

@Component({
  selector: 'app-home',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, MatCardModule, MatIconModule],
=======
>>>>>>> origin/developAdrian
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [VerticalBarChartComponent, MatCardModule, CommonModule, PieChartComponent],
})
export class HomeComponent implements OnInit {
<<<<<<< HEAD
  constructor(private router: Router, private route: ActivatedRoute ) {}

  ngOnInit(): void {}

  goTo(path: string): void {
    this.router.navigate([path], { relativeTo: this.route });
  }
}
=======
  cards = [
    { title: 'Equipos', count: 120, color: '#e0f7fa' }, // celeste claro
    { title: 'Equipos asignados', count: 45, color: '#eeeeee' }, // gris claro
    { title: 'Clientes', count: 30, color: '#e0f7fa' },
    { title: 'Equipos en reparación', count: 12, color: '#eeeeee' },
    { title: 'Equipos disponibles', count: 50, color: '#e0f7fa' },
    { title: 'Equipos de baja', count: 8, color: '#eeeeee' },
  ];

  constructor() {}

  ngOnInit() {}
}
>>>>>>> origin/developAdrian

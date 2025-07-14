import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalBarChartComponent } from '../verticalBarChart/verticalBarChart.component';
import { PieChartComponent } from '../pieChart/pieChart.component';
import { MatCardModule } from '@angular/material/card';
import { LineChartComponent } from '../lineChart/lineChart.component';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [VerticalBarChartComponent, MatCardModule, CommonModule, PieChartComponent,LineChartComponent],
})
export class HomeComponent implements OnInit {
  cards = [
    { title: 'Equipos', count: 120, color: '#e0f7fa' }, // celeste claro
    { title: 'Equipos asignados', count: 45, color: '#eeeeee' }, // gris claro
    { title: 'Clientes', count: 30, color: '#e0f7fa' },
    { title: 'Equipos en reparación', count: 12, color: '#eeeeee' },
    { title: 'Equipos disponibles', count: 50, color: '#e0f7fa' },
    { title: 'Equipos de baja', count: 8, color: '#eeeeee' },
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getAll().subscribe({
      next: (response) => {
      console.log(response.data)
      },
      error: (error) => {
        console.error('Error fetching dashboard data:', error);
      },
    });
  }
}

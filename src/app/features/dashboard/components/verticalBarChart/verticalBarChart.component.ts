import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-verticalBarChart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './verticalBarChart.component.html',
  styleUrls: ['./verticalBarChart.component.css'],
})
export class VerticalBarChartComponent implements OnInit {
  barWidth = 600;

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C'],
  };

  data = [
    { name: '2021', value: 150 },
    { name: '2022', value: 200 },
    { name: '2023', value: 180 },
    { name: '2024', value: 220 },
    { name: '2025', value: 240 },
  ];

  constructor() {}

  ngOnInit() {
    const barCount = this.data.length;
    const barSpacing = 80; // ancho estimado por barra
    this.barWidth = Math.max(barCount * barSpacing, 500);
  }
}

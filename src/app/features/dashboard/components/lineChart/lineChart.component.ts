import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartModule } from '@swimlane/ngx-charts';
import {
  curveBasis,
  curveLinear,
  curveStep,
  curveCardinal,
  curveMonotoneX,
} from 'd3-shape';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-lineChart',
  standalone: true,
  templateUrl: './lineChart.component.html',
  styleUrls: ['./lineChart.component.css'],
  imports: [
    LineChartModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
  ],
})
export class LineChartComponent implements OnInit, AfterViewInit {
  curve: any = curveMonotoneX;

  view: [number, number] = [0, 400];

  years: number[] = [2023, 2024, 2025];
  selectedYear: number = 2024;

  lineData: any[] = [];

  colorScheme = {
    domain: ['#5AA454'],
  };

  ngOnInit(): void {
    this.loadData(this.selectedYear);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateView();
    }, 0);
    window.addEventListener('resize', () => this.updateView());
  }

  updateView(): void {
    const width = (document.querySelector('.chart-container') as HTMLElement)
      .clientWidth;

    this.view = [width, 400]; // ajusta el alto si lo deseas
  }

  onYearChange(event: any): void {
    this.loadData(+event.target.value);
  }

  loadData(year: number): void {
    this.selectedYear = year;

    // Datos ficticios (puedes reemplazarlos por los del backend luego)
    this.lineData = [
      {
        name: `Año ${year}`,
        series: [
          { name: 'Enero', value: 120 },
          { name: 'Febrero', value: 150 },
          { name: 'Marzo', value: 180 },
          { name: 'Abril', value: 75 },
          { name: 'Mayo', value: 200 },
          { name: 'Junio', value: 95 },
          { name: 'Julio', value: 160 },
          { name: 'Agosto', value: 130 },
          { name: 'Septiembre', value: 90 },
          { name: 'Octubre', value: 170 },
          { name: 'Noviembre', value: 145 },
          { name: 'Diciembre', value: 190 },
        ],
      },
    ];
  }
}

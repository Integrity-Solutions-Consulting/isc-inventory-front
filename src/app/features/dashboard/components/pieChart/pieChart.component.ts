import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pieChart',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxChartsModule,
    FormsModule,
  ],
  templateUrl: './pieChart.component.html',
  styleUrls: ['./pieChart.component.css'],
})
export class PieChartComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  selectedCategory = 'Categoria A';

  categories = ['Categoria A', 'Categoria B', 'Categoria C'];

  // Datos ejemplo: estados por categoría
  allData = {
    'Categoria A': [
      { name: 'Asignados', value: 45 },
      { name: 'Disponibles', value: 50 },
      { name: 'Reparación', value: 12 },
      { name: 'Baja', value: 8 },
    ],
    'Categoria B': [
      { name: 'Asignados', value: 20 },
      { name: 'Disponibles', value: 70 },
      { name: 'Reparación', value: 15 },
      { name: 'Baja', value: 3 },
    ],
    'Categoria C': [
      { name: 'Asignados', value: 10 },
      { name: 'Disponibles', value: 30 },
      { name: 'Reparación', value: 5 },
      { name: 'Baja', value: 2 },
    ],
  };

  pieData = this.allData[this.selectedCategory as keyof typeof this.allData];

 colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C'],
  };

  onCategoryChange() {
    this.pieData = this.allData[this.selectedCategory as keyof typeof this.allData];
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentDetailResponseDTO } from '../../../../core/models/ResponseDTO/inventory/EquipmentDetailResponseDTO';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog'; // <-- ya está, pero asegúrate
import { WarrantyTypeComponent } from '../../components/warranty-type-form/warranty-type-form.component';


@Component({
  selector: 'app-equipmentDetail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  templateUrl: './equipmentDetail.component.html',
  styleUrls: ['./equipmentDetail.component.css'],
})
export class EquipmentDetailComponent implements OnInit {
  @Input() equipmentId?: number;
  equipment?: EquipmentDetailResponseDTO;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private equipmentService: EquipmentService,
    private location: Location,
      private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    const navigation = history.state as {
      equipment?: EquipmentDetailResponseDTO;
    };

    if (navigation.equipment) {
      this.equipment = navigation.equipment;
      console.log(this.equipment)
      this.loading = false;
    } else {
      const id =
        this.equipmentId ?? Number(this.route.snapshot.queryParamMap.get('id'));
      console.log(id)
        if (id) {
        this.equipmentService.getDetailById(id).subscribe({
          next: (resp) => {
            this.equipment = resp.data;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error al cargar el detalle', err);
            this.loading = false;
          },
        });
      } else {
        this.loading = false;
      }
    }
  }

  goBack() {
  this.location.back();
}

 openWarrantyForm() {
  if (!this.equipment?.id) return;

  this.dialog.open(WarrantyTypeComponent, {
    width: '600px',
    data: { equipmentId: this.equipment.id },
    disableClose: true,
  });
}

  openInvoiceForm() {}
}

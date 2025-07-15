import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentDetailResponseDTO } from '../../../../core/models/ResponseDTO/inventory/EquipmentDetailResponseDTO';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { FormService } from '../../../../core/services/modals/form/form.service';
import { EquipmentInvoiceFormComponent } from '../../components/equipmentInvoiceForm/equipmentInvoiceForm.component';
import { InvoiceDetailResponseDTO } from '../../../../core/models/ResponseDTO/inventory/InvoiceDetailResponseDTO';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ModalDialogService } from '../../../../core/services/modals/modalDialog/modalDialog.service';
import { InvoiceService } from '../../services/invoice/invoice.service';
import { WarningService } from '../../../../core/services/modals/warning/warning.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { LoadingService } from '../../../../core/services/modals/loading/loading.service';

@Component({
    selector: 'app-equipmentDetail',
    standalone: true,
    imports: [
      CommonModule,
      MatCardModule,
      MatButtonModule,
      MatIconModule,
      MatMenuModule,
      MatProgressSpinnerModule,
      MatDialogModule,
      MatTableModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      MatMenuModule,
      FormsModule,
      CommonModule,
      LayoutModule,
      MatCardModule,
      MatSortModule
    ],
    templateUrl: './equipmentDetail.component.html',
    styleUrls: ['./equipmentDetail.component.css'],
    })
export class EquipmentDetailComponent implements OnInit {
      @Input() equipmentId?: number;
      equipment?: EquipmentDetailResponseDTO;
      invoice?: InvoiceDetailResponseDTO;
      loading = true;

      invoiceNumberSearch: string = '';
      serialNumberSearch: string = '';

      total: number = 0;

      @ViewChild(MatSort) sort!: MatSort;
      
      constructor(
        private route: ActivatedRoute,
        private equipmentService: EquipmentService,
        private invoiceService: InvoiceService,
        private modalDialogService: ModalDialogService,
        private warningService: WarningService,
        private formService: FormService,
        private load: LoadingService,        
        private location: Location,
      ) {}

      ngOnInit() {
      const navigation = history.state as {
        equipment?: EquipmentDetailResponseDTO;
      };

      if (navigation.equipment) {
        this.equipment = navigation.equipment;
        this.loadInvoicesBySerialNumber(this.equipment.serialNumber);
        this.loading = false;
      } else {
        const id =
          this.equipmentId ?? Number(this.route.snapshot.queryParamMap.get('id'));
        if (id) {
          this.equipmentService.getDetailById(id).subscribe({
            next: (resp) => {
              this.equipment = resp.data;
              this.loadInvoicesBySerialNumber(this.equipment.serialNumber);
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

    openWarrantyForm() {}

    openInvoiceForm() {  
      const invoice = {
        equipmentId: this.equipment?.id,
        invoiceDetail: this.invoice

      }
      this.formService.open(
      'Registrar detalle de factura',
      'edit',
      EquipmentInvoiceFormComponent,
      invoice,
      (result: InvoiceDetailResponseDTO) => {
        if (result && this.equipment?.id) {
            this.equipmentService.getDetailById(this.equipment.id).subscribe({
            next: (resp) => {
              this.equipment = resp.data;
              this.modalDialogService.open(
                'success',
                'Factura creada',
                'La factura fue creada correctamente.'
              );}
            });
          }
          }, (error) => {
          this.modalDialogService.open(
            'error',
            'Error al crear',
            'Ocurrió un error al crear la factura.'
          );}
      )

    }

    searchInvoices(): void {
      if (this.invoiceNumberSearch?.trim()) {
        this.loadInvoicesByInvoiceNumber(this.invoiceNumberSearch.trim());
      } else if (this.serialNumberSearch?.trim()) {
        this.loadInvoicesBySerialNumber(this.serialNumberSearch.trim());
      } else {
        this.modalDialogService.open(
          'error',
          'Búsqueda vacía',
          'Por favor ingrese un número de factura o número de serie para buscar.'
        );
      }
    }

    loadInvoicesBySerialNumber(serialNumber: string): void {
      this.loading = true;
      this.invoiceService.getBySerialNumber(serialNumber).subscribe({
        next: (resp) => {
          this.invoice = resp.data ?? null;
          if (!this.invoice) {
          this.modalDialogService.open(
            'error',
            'No encontrado',
            'No se encontró una factura asociada a ese número de serie.'
          );
        }
        },
        error: (err) => {
          console.error('Error al cargar facturas por número de serie', err);
          this.load.hide();
          this.modalDialogService.open(
          'error',
          'No encontrado',
          'No se encontró un equipo con ese número de serie.');
      },
      complete: () => {
        this.loading = false;}
    });
    }

    loadInvoicesByInvoiceNumber(invoiceNumber: string) {
      this.loading = true;
      this.invoiceService.getByInvoiceNumber(invoiceNumber).subscribe({
          next: (resp) => {
            this.invoice = resp.data ?? null;
            console.log('Facturas encontradas:', this.invoice);
          },
          error: (err) => {
            console.error('Error al buscar por número de factura', err);
            this.load.hide();
            this.modalDialogService.open(
            'error',
            'Factura no encontrada',
            'No se encontró una factura con ese número.');
          },
          });
        };


    warningDelete(invoice: InvoiceDetailResponseDTO): void {
      this.warningService.open(
        'Eliminar factura',
        '¿Estás seguro de que deseas eliminar esta factura? Esta acción no se puede deshacer.',
        () => this.deleteInvoice(invoice)
      );
    }

    deleteInvoice(invoice: InvoiceDetailResponseDTO): void {
      this.invoiceService.delete(invoice.id).subscribe({
        next: () => {
         
          this.modalDialogService.open(
            'success',
            'Factura eliminada',
            'La factura fue eliminada correctamente.'
          );
        },
        error: (err) => {
          console.error('Error al eliminar factura', err);
          this.modalDialogService.open(
            'error',
            'Error al eliminar',
            'No se pudo eliminar la factura.'
          );
        },
      });
    }

}

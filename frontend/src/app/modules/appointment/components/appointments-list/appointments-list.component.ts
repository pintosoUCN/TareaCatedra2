import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalComponent } from 'src/app/_metronic/partials';
import { ModalAppointmentConfig } from '../../models/modal-appointment.config';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment-model';
import { Observable } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationModalComponentComponent } from '../delete-confirmation-modal-component/delete-confirmation-modal-component.component';
import { ModalAppointmentComponent } from '../modal-appointment/modal-appointment.component';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
})
export class AppointmentsListComponent implements OnInit {
  modalRef: NgbModalRef;
  appointments!: Observable<Appointment[]>;
  modalConfig: ModalAppointmentConfig = {
    modalTitle: 'Crear paciente',
    dismissButtonLabel: 'Guardar',
    closeButtonLabel: 'Cancelar',
  };

  @ViewChild('modal') private modalComponent: ModalComponent;

  constructor(
    private appointmentService: AppointmentService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllAppointments();
  }

  getAllAppointments() {
    this.appointments = this.appointmentService.getAll();
    console.log('Cita eliminada exitosamente');
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  deleteAppointment(id: number) {
    this.appointmentService.delete(id).subscribe(
      (res) => {
        this.getAllAppointments();
        this.cdr.detectChanges();
      },
      (err) => {
        console.error('Error al eliminar la cita', err);
      }
    );
  }

  openEditModal(appointment: Appointment) {
    const modalRef = this.modalService.open(ModalAppointmentComponent, {
      centered: true,
    });
  }

  openDeleteConfirmationModal(id: number) {
    this.modalRef = this.modalService.open(DeleteConfirmationModalComponentComponent, {
      centered: true,
    });

    this.modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.deleteAppointment(id);
        }
      },
      (reason) => {
        // Manejar el rechazo del modal de confirmación si es necesario
      }
    );
  }
}

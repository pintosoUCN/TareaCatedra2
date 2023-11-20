import { Component, Input, TemplateRef, ViewChild, Output, EventEmitter  } from '@angular/core';

import { ModalConfig } from '../../../../_metronic/partials/layout/modals/modal.config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-appointment',
  templateUrl: './modal-appointment.component.html',
})
export class ModalAppointmentComponent {
  @Output() updateAppointmentsList = new EventEmitter<void>();
  @Input() public modalConfig: ModalConfig;
  @ViewChild('modal') private modalContent: TemplateRef<ModalAppointmentComponent>;
  private modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  open(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.modalRef = this.modalService.open(this.modalContent,{size: 'xl', centered: true, scrollable: true});
      this.modalRef.result.then(resolve, resolve);
    });
  }

  async close(): Promise<void> {
    if (
      this.modalConfig.shouldClose === undefined ||
      (await this.modalConfig.shouldClose())
    ) {
      const result =
        this.modalConfig.onClose === undefined ||
        (await this.modalConfig.onClose());
      this.modalRef.close(result);
    }
    this.updateAppointmentsList.emit();
  }

  async dismiss(): Promise<void> {
    if (this.modalConfig.disableDismissButton !== undefined) {
      return;
    }

    if (
      this.modalConfig.shouldDismiss === undefined ||
      (await this.modalConfig.shouldDismiss())
    ) {
      const result =
        this.modalConfig.onDismiss === undefined ||
        (await this.modalConfig.onDismiss());
      this.modalRef.dismiss(result);
    }
  }

}

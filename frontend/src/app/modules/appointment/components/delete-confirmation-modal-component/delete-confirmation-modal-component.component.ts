import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-delete-confirmation-modal-component',
  templateUrl: './delete-confirmation-modal-component.component.html',

})
export class DeleteConfirmationModalComponentComponent {
  constructor(private activeModal: NgbActiveModal) {}

  confirmDelete() {
    this.activeModal.close('confirm');
  }

  dismiss(reason: string) {
    this.activeModal.dismiss(reason);
  }
}

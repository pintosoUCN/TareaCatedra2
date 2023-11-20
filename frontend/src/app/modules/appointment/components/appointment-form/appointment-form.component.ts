import { ChangeDetectorRef, Component, OnDestroy, OnInit,Output, EventEmitter } from '@angular/core';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserInteface } from '../../models/owner-model';
import { AppointmentService } from '../../services/appointment.service';
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { Appointment } from '../../models/appointment-model';
@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
})
export class AppointmentFormComponent implements OnInit, OnDestroy {
  @Output() closeModalAndRefreshList = new EventEmitter<boolean>();
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  users!:Observable<UserInteface[]>;

  appointment: Appointment;
  validateForm: FormGroup;

  constructor(private cdr: ChangeDetectorRef,
    private userService:UserService,
    private appointmentService:AppointmentService,
    private fb: FormBuilder) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);

    this.validateForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      symptoms: new FormControl(null, [Validators.required]),
    });
 
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.users = this.userService.getAll();
    console.log(this.users)
  }

  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);
  }

  save(appointment: Appointment) {
    const numericValue: number = parseInt(appointment.name, 10);
    // En base al id del usuario poner el nombre del usuario
    this.userService.getUserById(numericValue).subscribe(
      (user) => {
        // Asignar el nombre del usuario al appointment
        appointment.user_id = user.id;
        appointment.name = user.name;
        appointment.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      console.log(appointment.name);
      console.log(appointment.user_id);
    // Obtener la fecha actual
    const currentDate = new Date();
    appointment.user_id = numericValue;
    appointment.date = currentDate.toISOString();
   
    // Luego, llama al servicio para crear el appointment
    this.appointmentService.create(appointment).subscribe(
      (res) => {
        // Marcar los campos como dirty después de guardar exitosamente
        for (const key in this.validateForm.controls) {
          if (this.validateForm.controls.hasOwnProperty(key)) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
          }
        }
        // Emitir evento para cerrar el modal y actualizar la lista
        this.closeModalAndRefreshList.emit(true);
      },
      (error) => {
        console.error('Error al guardar el appointment', error);
        // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
      }
    );
  });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

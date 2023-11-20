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
      owner: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      symptom: new FormControl(null, [Validators.required]),
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

  save(appointment:Appointment){
    this.appointmentService.create(appointment).subscribe(res=>{
      for (const key in this.validateForm.controls) {
        if (this.validateForm.controls.hasOwnProperty(key)) {
          this.validateForm.controls[key].markAsDirty();
          this.validateForm.controls[key].updateValueAndValidity();
        }
      }
      this.closeModalAndRefreshList.emit(true);
    })
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

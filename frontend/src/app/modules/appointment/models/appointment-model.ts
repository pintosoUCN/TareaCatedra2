import { UserInteface } from "./owner-model";

export interface Appointment{
    id:number,
    name:string,
    owner:number,
    email:string,
    phone:string,
    date:string,
    symptom:string,
    user?:UserInteface
}
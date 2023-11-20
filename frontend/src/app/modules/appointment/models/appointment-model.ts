import { UserInteface } from "./owner-model";

export interface Appointment{
    id:number,
    name:string,
    date:string,
    symptoms:string,
    user_id:number,
    user?:UserInteface
}
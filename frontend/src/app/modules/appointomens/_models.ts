import {ID, Response} from '../../../_metronic/helpers'

export type Appointment = {
    id?: ID
    name?: string
    owner?: number
    email?: string
    phone?: string
    date?: string
    symptom?: string
}

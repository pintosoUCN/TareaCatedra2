import { FC, useState, useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { isNotEmpty } from '../../../../../../_metronic/helpers'
import clsx from 'clsx'
import { useListView } from '../core/ListViewProvider'
import { UsersListLoading } from '../components/loading/UsersListLoading'
import { createAppointment, updateUser } from '../core/_requests'
import { useQueryResponse } from '../core/QueryResponseProvider'
import { Appointment } from '../../../../appointomens/_models'
import axios from 'axios'

const URL_API = "http://localhost:8000/api/"

type Props = {
  isUserLoading: boolean
  appointment: Appointment
  handleClose: () => void
  getAllAppointments: () => void
}

const editUserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
  owner: Yup.number().required('Dueño del paciente es requerido'),
  phone: Yup.number().required('Teléfono es requerido'),
  date: Yup.date().required('Fecha es requerida'),
  symptom: Yup.string().required('Síntomas son requeridos'),

})

const UserEditModalForm: FC<Props> = ({ isUserLoading, appointment, handleClose, getAllAppointments }) => {
  const { setItemIdForUpdate } = useListView()
  const { refetch } = useQueryResponse()
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios
      .get(`${URL_API}users`)
      .then(res => {
        setUsers(res.data);
        console.log(res.data)
      })
      .catch(error => {
        console.log(error);
      });
  };

  const [userForEdit] = useState<Appointment>({
    ...appointment,
    name: appointment.name,
    email: appointment.email,
    owner: appointment.owner,
    phone: appointment.phone,
    date: appointment.date,
    symptom: appointment.symptom,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          await updateUser(values)
        } else {
          await createAppointment(values)
          handleClose()
          getAllAppointments()
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >

          {/* begin::Input group */}
          <div className='row mb-7'>
            <div className="col-6">
              {/* begin::Label */}
              <label className='required fw-bold fs-6 mb-2'>Nombre del paciente</label>
              {/* end::Label */}

              {/* begin::Input */}
              <input
                placeholder='Nombre de la mascota'
                {...formik.getFieldProps('name')}
                type='text'
                name='name'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  { 'is-invalid': formik.touched.name && formik.errors.name },
                  {
                    'is-valid': formik.touched.name && !formik.errors.name,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {formik.touched.name && formik.errors.name && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.name}</span>
                  </div>
                </div>
              )}
              {/* end::Input */}
            </div>
            <div className="col-6">
              {/* begin::Label */}
              <label className='required fw-bold fs-6 mb-2'>Email</label>
              {/* end::Label */}

              {/* begin::Input */}
              <input
                placeholder='Email'
                {...formik.getFieldProps('email')}
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  { 'is-invalid': formik.touched.email && formik.errors.email },
                  {
                    'is-valid': formik.touched.email && !formik.errors.email,
                  }
                )}
                type='email'
                name='email'
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {/* end::Input */}
              {formik.touched.email && formik.errors.email && (
                <div className='fv-plugins-message-container'>
                  <span role='alert'>{formik.errors.email}</span>
                </div>
              )}
            </div>

          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
        
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className='row mb-7'>
            <div className="col-6">
              {/* begin::Label */}
              <label className='fw-bold fs-6 mb-2'>Teléfono</label>
              {/* end::Label */}

              {/* begin::Input */}
              <input
                placeholder='Télefono'
                {...formik.getFieldProps('phone')}
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  { 'is-invalid': formik.touched.phone && formik.errors.phone },
                  {
                    'is-valid': formik.touched.phone && !formik.errors.phone,
                  }
                )}
                type='text'
                name='phone'
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {/* end::Input */}
              {formik.touched.phone && formik.errors.phone && (
                <div className='fv-plugins-message-container'>
                  <span role='alert'>{formik.errors.phone}</span>
                </div>
              )}
            </div>
            <div className="col-6">
              {/* begin::Label */}
              <label className='fw-bold fs-6 mb-2'>Fecha</label>
              {/* end::Label */}

              {/* begin::Input */}
              <input
                type='date'
                id='date'
                name='date'
                value={formik.values.date} // Asegúrate de enlazar el valor con formik
                onChange={formik.handleChange} // Asegúrate de manejar el cambio con formik
                onBlur={formik.handleBlur} // Asegúrate de manejar la pérdida de enfoque con formik
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  { 'is-invalid': formik.touched.date && formik.errors.date },
                  { 'is-valid': formik.touched.date && !formik.errors.date }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {/* end::Input */}
              {/* <ErrorMessage name='date' component='div' className='fv-plugins-message-container'>
            <span role='alert' />
          </ErrorMessage> */}
            </div>
          </div>

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Dueño del paciente</label>

            <div className='col-lg-12 fv-row'>
              <select
                className='form-select form-select-solid form-select-lg'
                {...formik.getFieldProps('owner')}
              >
                {users.map((user, index) =>
                  <option key={user['id']} value={user['id']}>{user['name']}</option>

                )}

              </select>
              {formik.touched.owner && formik.errors.owner && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.owner}</div>
                </div>
              )}
            </div>
          </div>

          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Síntomas</label>
            {/* end::Label */}

            <textarea
              placeholder='Síntomas del paciente'
              {...formik.getFieldProps('symptom')}
              name='symptom'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.symptom && formik.errors.symptom },
                { 'is-valid': formik.touched.symptom && !formik.errors.symptom }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.symptom && formik.errors.symptom && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.symptom}</span>
                </div>
              </div>
            )}
          </div>

          {/* end::Input group */}

        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => handleClose()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Cancelar
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Guardar</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  )
}

export { UserEditModalForm }

/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { Card2 } from '../../../_metronic/partials/content/cards/Card2'
import { useState } from 'react'
import { CreateAppModal } from '../../../_metronic/partials'
import axios from 'axios'

const URL_API = "http://localhost:8000/api/"

const DashboardPage = () => {

  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)

  const [appointments, setAppointments] = useState<any[]>([])

  useEffect(() => {
    getAllAppointments();
  }, []);

  const getAllAppointments = async () => {

    const response = await axios
      .get(`${URL_API}appointment`)
      .then(res => {
        setAppointments(res.data);
      })
      .catch(error => console.log(error));
  };

  const deleteAppointment = async id => {
    await axios
      .delete(`${URL_API}appointment/${id}`)
      .then(res => {
        getAllAppointments();
      })
      .catch(error => console.log(error));
  };


  return (
    <>
       {/* begin::Row */}
       <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
        <div className='d-flex flex-wrap flex-stack mb-6'>
          <h3 className='fw-bolder my-2'>
            Mis citas
            <span className='fs-6 text-gray-400 fw-bold ms-1'>Active</span>
          </h3>

          <div className='d-flex flex-wrap my-2'>
            <a
              href='#'
              onClick={() => {
                setShowCreateAppModal(true)
              }}
              className='btn btn-sm fw-bold btn-primary'
            >
              Nueva Cita
            </a>
          </div>
        </div>

        <div className='row g-6 g-xl-9'>
          {appointments.map((appointment, index) => {
            return (
              <div key={index} className='col-md-6 col-xl-4'>
                <Card2
                  id={appointment.id}
                  name={appointment.name}
                  symptom={appointment.symptom}
                  date={appointment.date}
                  owner={appointment.user.name}
                  deleteAppointment={deleteAppointment}
                />
              </div>
            )

          })}

        </div>


      </div>
      {/* end::Row */}
      <CreateAppModal
        show={showCreateAppModal}
        handleClose={() => setShowCreateAppModal(false)}
        getAllAppointments={getAllAppointments}
      />
    </>
  )
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <DashboardPage />
    </>
  )
}

export { DashboardWrapper }

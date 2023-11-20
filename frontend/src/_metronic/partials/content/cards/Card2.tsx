/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { KTIcon } from '../../../helpers'
import { DeleteConfrimation } from '../../../../app/modules/appointomens/DeleteConfirmation'

type Props = {
  id:number
  name: string
  symptom: string
  date: string
  owner: string
  deleteAppointment: (id: number) => void
}

const Card2: FC<Props> = ({
  id,
  name,
  symptom,
  date,
  owner,
  deleteAppointment
}) => {

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleDeleteClick = () => {
   
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmed = () => {

    deleteAppointment(id)
    setShowDeleteConfirmation(false); 
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false); 
  };

  return (
    <>
      <div className='card-header border-0 pt-9'>
        <div className='card-title m-0'>
          <div className='symbol symbol-50px bg-light'>
            <div className='fs-3 fw-bolder text-dark'>Paciente: {name}</div>

          </div>
        </div>

        <div className='card-toolbar'>
          <div className='d-flex justify-content-end flex-shrink-0'>
          
            <a
              href='#'
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTIcon iconName='pencil' className='fs-3' />
            </a>
            <a
              href='#'
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
              onClick={() => handleDeleteClick()}
            >
              <KTIcon iconName='trash' className='fs-3' />
            </a>
          </div>
        </div>
      </div>

      <div className='card-body p-9'>
        <h3>Síntomas</h3>
        <p className='text-gray-400 fw-bold fs-5 mt-1 mb-7'>{symptom}</p>
        <div className='d-flex flex-wrap mb-5'>
          <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3'>
            <div className='fs-6 text-gray-800 fw-bolder'>{date}</div>
          </div>
          <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3'>
            <div className='fs-6 text-gray-800 fw-bolder'>{owner}</div>
          </div>
        </div>
      </div>

      <DeleteConfrimation
        show={showDeleteConfirmation}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirmed}
      />
    </>
  )
}

export { Card2 }

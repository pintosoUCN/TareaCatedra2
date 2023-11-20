/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import { defaultCreateAppData, ICreateAppData } from './IAppModels'
import { StepperComponent } from '../../../assets/ts/components'
import { KTIcon } from '../../../helpers'
import { UserEditModalHeader } from '../../../../app/modules/apps/user-management/users-list/user-edit-modal/UserEditModalHeader'
import { UserEditModalFormWrapper } from '../../../../app/modules/apps/user-management/users-list/user-edit-modal/UserEditModalFormWrapper'

type Props = {
  show: boolean
  handleClose: () => void
  getAllAppointments: () => void
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateAppModal = ({ show, handleClose, getAllAppointments }: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [data, setData] = useState<ICreateAppData>(defaultCreateAppData)
  const [hasError, setHasError] = useState(false)

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const submit = () => {
    window.location.reload()
  }

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={handleClose}
      onEntered={loadStepper}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2 className='fw-bolder'>Add User</h2>
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
        {/* end::Close */}
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        {/*begin::Stepper */}
        <UserEditModalFormWrapper handleClose={handleClose} getAllAppointments={getAllAppointments} />

        {/* end::Stepper */}
      </div>
    </Modal>,
    modalsRoot
  )
}

export { CreateAppModal }

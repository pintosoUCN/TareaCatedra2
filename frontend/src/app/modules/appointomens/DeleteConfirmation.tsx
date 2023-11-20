import {FC} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
type Props = {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
  }
const DeleteConfrimation: FC<Props>= ({show, onHide, onConfirm }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este elemento?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    )

}

export {DeleteConfrimation}
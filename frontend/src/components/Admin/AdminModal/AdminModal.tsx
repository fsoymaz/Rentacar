import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface AdminModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  onSave?: () => void;
  saveText?: string;
  children: React.ReactNode;
  showSaveButton?: boolean;
}

const AdminModal: React.FC<AdminModalProps> = ({
  show,
  onHide,
  title,
  onSave,
  saveText = 'Kaydet',
  children,
  showSaveButton = true
}) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      {showSaveButton && (
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            İptal
          </Button>
          {onSave && (
            <Button variant="primary" onClick={onSave}>
              {saveText}
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default AdminModal; 
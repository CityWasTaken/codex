import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ViewPostModalProps {
  showViewPostModal: boolean;
  setShowViewPostModal: React.Dispatch<React.SetStateAction<boolean>>;
  post: { title: string; postText: string } | null;
}

function ViewPostModal({
  showViewPostModal,
  setShowViewPostModal,
  post
}: ViewPostModalProps) {
  return (
    <Modal show={showViewPostModal} onHide={() => setShowViewPostModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{post?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{post?.postText}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowViewPostModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewPostModal;
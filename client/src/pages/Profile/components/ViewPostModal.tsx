import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/client';

import { GET_USER_INFO } from '../../../graphql/queries';
import { useParams } from 'react-router-dom';

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
  const { username } = useParams<{ username: string }>();
  const { data } = useQuery(GET_USER_INFO, {
    variables: { username }
  });

  return (
    <Modal show={showViewPostModal} onHide={() => setShowViewPostModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{data.getUserInfo.user.username}</Modal.Title>
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
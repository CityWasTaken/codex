import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

interface ViewPostModalProps {
  showViewPostModal: boolean;
  setShowViewPostModal: React.Dispatch<React.SetStateAction<boolean>>;
  post: { _id: string; title: string; postText: string; user: any; comments: any[]} | null;
  
}

function ViewPostModal({
  showViewPostModal,
  setShowViewPostModal,
  post
}: ViewPostModalProps) {

  
  return (
    <Modal show={showViewPostModal} onHide={() => setShowViewPostModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
        <NavLink to={`/profile/${post?.user.username}`}>{post?.user.username}</NavLink>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='border'>{post?.postText}</p>
        <p>Comments:</p>
        {post?.comments.map((comment: any) => (
          <div key={comment._id} className='border'>
            <p>{comment.commentText}</p>
            <p>by: 
            <NavLink to={`/profile/${comment.user.username}`}>{comment.user.username}</NavLink>
            </p>
          </div>
        ))}
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
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

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


console.log(post);

  
  return (
    <Modal show={showViewPostModal} onHide={() => setShowViewPostModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{post?.user.username}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='border'>{post?.postText}</p>
        <p>Comments:</p>
        {post?.comments.map((comment: any) => (
          <div key={comment._id} className='border'>
            <p>{comment.commentText}</p>
            <p>by: {comment.user.username}</p>
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
export interface User {
  _id: string;
  username: string; 
}

// Added 'likes' property to the Post interface to store an array of users who liked the post
export interface Post {
  _id: string;
  title: string;
  postText: string;
  comments: any[];
  user: {
    name: string;
  };
  likes: User[]; // Array of users who liked the post
}


interface ViewPostModalProps {

  showViewPostModal: boolean;

  setShowViewPostModal: React.Dispatch<React.SetStateAction<boolean>>;

  post: Post | null;

  show: boolean;



  onHide: () => void;

}

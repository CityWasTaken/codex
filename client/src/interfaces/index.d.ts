export interface Post {
  _id: string;
  title: string;
  postText: string;
  user: {
    name: string;
  }
}


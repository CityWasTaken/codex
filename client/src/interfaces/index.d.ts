export interface Post {
  _id: string;
  title: string;
  postText: string;
  comments: any[];
  user: {
    name: string;
  }
}


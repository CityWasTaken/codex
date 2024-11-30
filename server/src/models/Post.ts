interface Post {
    id: number;
    title: string;
    content: number;
    likes: number;
    comments: Comment[];
}

interface Comment {
    id: number;
    content: string;
    author: string;
}

export { Post, Comment};
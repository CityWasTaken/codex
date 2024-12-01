interface Post {
    id: number;
    title: string;
    content: string; // Property is used to store the main text or message of the post or comment.
    likes: number;
    comments: Comment[];
}

interface Comment {
    id: number;
    content: string;
    author: string;
}

export { Post, Comment};
import { useState, useEffect } from "react";

function Blog() {
    type Post = {
        title: string;
        content: string;
    };

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const savedPosts = localStorage.getItem("posts");
        if (savedPosts) {
            const parsedPosts = JSON.parse(savedPosts); // Parsowanie JSON
            setPosts(parsedPosts);
        }
    }, []);

    return (
        <div>
            <p>{posts.length}</p>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div>
                        <hr />
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <hr />
                    </div>
                ))
            ) : (
                <p>Brak postów do wyświetlenia</p>
            )}
        </div>
    );
}

export default Blog;

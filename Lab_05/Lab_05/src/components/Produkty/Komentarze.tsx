import {useEffect, useState} from "react";
import Komentarz from "./Komentarz.tsx";

function Komentarze() {
    type User = {
        id: number,
        username: string,
        fullName: string,
    }
    type Comment = {
        id: number,
        body: string,
        postId: number,
        likes: number,
        user: User,
    }
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetch("https://dummyjson.com/comments")
            .then((res) => res.json())
            .then((data) => {
                setComments(data.comments);
            });
    }, []);


    return (
        comments.map((comment) => (
            <Komentarz {...comment}></Komentarz>
        ))
    )
}

export default Komentarze;
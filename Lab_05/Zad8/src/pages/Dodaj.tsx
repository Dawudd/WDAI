import {useEffect, useState} from "react";

function Dodaj() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const savedPosts = localStorage.getItem("posts");
        if (savedPosts) {
            const parsedPosts = JSON.parse(savedPosts);
            setPosts(parsedPosts);
        }
    }, []);

    function add() {
        const newPost = {
            title: title,
            content: content,
        };
        setPosts((prevPosts) => {
            const updatedPosts = [...prevPosts, newPost];
            localStorage.setItem("posts", JSON.stringify(updatedPosts));
            return updatedPosts;
        });
    }

    return (
        <div>
            <p>{posts.length}</p>
            <h4>Tytuł</h4>
            <input
                type="text"
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
            ></input>
            <h4>Treść</h4>
            <input
                type="text"
                onChange={(e) => {
                    setContent(e.target.value)
                }}
            ></input>
            <br/><br/>
            <button
                onClick={() => {add()}}
            >Dodaj
            </button>
        </div>
    )
}

export default Dodaj;
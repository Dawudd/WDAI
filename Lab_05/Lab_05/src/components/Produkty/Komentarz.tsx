import {useState} from "react";

function Komentarz({id, body, postId, likes, user}) {
    const [likesCount, setLikesCount] = useState(likes);

    function like() {
        setLikesCount(likesCount + 1);
    }
    function dislike() {
        setLikesCount(likesCount - 1);
    }

    return (
        <div>
            <header>
                <h2>@{user.username} {user.fullName}</h2>
            </header>

            <p>{body}</p>
            <footer>
                <button onClick={like}>LIKE</button>
                <p>Likes: {likesCount}</p>
                <button onClick={dislike}>DISLIKE</button>
            </footer>
        </div>
    )
}

export default Komentarz;
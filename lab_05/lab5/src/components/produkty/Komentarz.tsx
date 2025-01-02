import { useState } from "react";
import "./Komentarz.css";

// Deklaracja interfejsów
interface User {
    id: number;
    username: string;
    fullName: string;
}

interface Comment {
    id: number;
    body: string;
    postID: number;
    likes: number;
    user: User;
}

function Komentarz({id, body, postID, likes, user}: Comment) {
    const [commentLikes, setCommentLikes] = useState(likes);
    
    // Dodawanie polubień
    const addLike = () => {
        setCommentLikes(commentLikes => commentLikes + 1);
    }

    // Usuwanie polubień
    const deleteLike = () => {
        if (commentLikes !== 0){
            setCommentLikes(commentLikes => commentLikes - 1);
        }
    }

    return (
        <div className="Komentarz">
            <div className="Komentarz-user">
                <h3>{user.username}</h3>
                <span style={{fontStyle: "italic"}}>@{user.fullName}</span>
            </div>
            <div className="Komentarz-body">
                <p>{body}</p>
            </div>
            <div className="Komentarz-actions">
                <p>{commentLikes} Likes</p>
                <button onClick={addLike}>Up</button>
                <button onClick={deleteLike}>Down</button>
            </div>
        </div>
    );
}

export default Komentarz;
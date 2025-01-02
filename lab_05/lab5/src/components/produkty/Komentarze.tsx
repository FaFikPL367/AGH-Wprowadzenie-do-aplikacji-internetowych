import { useEffect, useState } from "react";
import Komentarz from "./Komentarz";
import axios from "axios";

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

function Komentarze() {
    // Deklaracja stanu komentarzy
    const [comments, setComments] = useState<Comment[]>([]);
    const url = 'https://dummyjson.com/comments';

    // Pobranie danych
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(url);
                const data = res.data.comments;
                
                // Ustawienie stany z pobranych danych
                setComments(data.map((comment: Comment) => {
                    return {
                        id: comment.id,
                        body: comment.body,
                        postID: comment.postID,
                        likes: comment.likes,
                        user: {
                            id: comment.user.id,
                            username: comment.user.username,
                            fullName: comment.user.fullName
                        }
                }}));
            } catch (error) {
                console.log(error);
            }
        }

        // Wykonanie pobierania danych
        fetchData();
    }, []);

    return (
        <div>
            <h1>Komentarze</h1>
            {comments.map(comment => (
                <Komentarz key={comment.id}  id={comment.id} body={comment.body} postID={comment.postID} likes={comment.likes} user={comment.user}/>
            ))}
        </div>
    );
}

export default Komentarze;
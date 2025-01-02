// Komponent do dodawania artykułów
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./AddArticle.css"


function AddArticle() {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const id: string = uuid(); // wygenerowanie unikalnego ID
    const navigate = useNavigate();

    // Funkcja dodająca artykuł
    const addArticle = () => {
        // Walidacja danych
        if (!title || !content) {
            alert('Wypełnij wszystkie pola');
            return;
        }

        // Aktualizacja localStorage
        const newArticle = {
            id: id,
            title: title,
            content: content
        };

        const savedArticles = localStorage.getItem('articles');
        const articles = savedArticles ? JSON.parse(savedArticles) : []; // Zamiana z JSON na tablicę obiektów
        articles.push(newArticle); // Dodanie nowego artykułu
        localStorage.setItem('articles', JSON.stringify(articles)); // Zamiana na JSON

        // Przekierowanie na stronę z artykułami
        navigate('/blog');
    }

    return (
        <form className="AddArticle">
            <label>
                Tytuł
            </label>
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <label>
                Treść
            </label>
            <input type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)}/>
            <button onClick={addArticle}>DODAJ</button>
        </form>
    );
}

export default AddArticle;
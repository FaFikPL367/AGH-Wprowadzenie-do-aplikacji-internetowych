// Komponent reprezentujący stronę artykułu
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Article.css";

// Deklaracja interfejsu artykółu
interface Article {
    id: string;
    title: string;
    content: string;
}

function Article() {
    const [article, setArticle] = useState<Article | null>(null);
    const { id } = useParams<{id: string}>(); // ID artykułu, który chcemy wyświetlić

    // Pobieranie artykułu z localStorage
    useEffect(() => {
        const savedArticles = localStorage.getItem('articles');

        // Jeżeli istnieją artykuły w localStorage
        if (savedArticles) {
            const articles: Article[] = JSON.parse(savedArticles);
            const selectedArticle = articles.find(article => article.id === id);
            
            // Jeżeli artykuł istnieje to go ustawiamy
            if (selectedArticle) {
                setArticle(selectedArticle);
            }
        }
    }, [id])

    return (
        <div className="Article">
            {article ? <>
                <h1>{article.title}</h1>
                <p>{article.content}</p>
            </> : <h1>Brak artykułu!!</h1>}
        </div>
    );
}

export default Article;
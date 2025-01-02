// Strona z tytułami artykułów
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Blog.css";

// Deklaracja interfejsu artykółu
interface Article {
    id: string;
    title: string;
    content: string;
}

function Blog() {
    // Tworzenie stanu dla artykułów
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        const savedArticles = localStorage.getItem('articles');
        if (savedArticles) {
            setArticles(JSON.parse(savedArticles));
        }
    }, []);
    
    return (
        <div className="Blog">
            <h1>Dostępne artykuły</h1>
            {articles.length !== 0 ? <ul>
                {articles.map(article => <li key={article.id}> <Link to={`/article/${article.id}`}>{article.title}</Link></li>)}
            </ul> : <p>Brak artykułów</p>}
        </div>
    );
}

export default Blog;
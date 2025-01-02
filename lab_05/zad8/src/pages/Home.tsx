// Strona główna aplikacji
import { Link } from "react-router-dom";
import "./Home.css";

function Home () {
    return (
        <div className="Home">
            <h1>Witaj na blogu</h1>
            <p>Zachęcam cię do zobaczenia moich artykułów</p>
            <Link to="/blog">Zobacz artykuły</Link>
        </div>
    );
}

export default Home;
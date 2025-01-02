import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="Navbar">
            <Link to="/">Strona główna</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/dodaj">Dodaj artykuł</Link>
        </nav>
    );
}

export default Navbar;
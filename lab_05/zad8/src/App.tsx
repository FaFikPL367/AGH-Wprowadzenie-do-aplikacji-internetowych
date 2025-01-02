import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Article from './pages/Article';
import AddArticle from './pages/AddArticle';
import Navbar from './pages/Navbar';
import './App.css';

function App() {
  return (
    <> 
    <BrowserRouter>
      <Navbar />
      <div className='content'>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/blog" element={<Blog />}/>
          <Route path="/article/:id" element={<Article />}/>
          <Route path="/dodaj" element={<AddArticle />}/>
        </Routes>
        </div>
    </BrowserRouter>
    </>
  )
}

export default App

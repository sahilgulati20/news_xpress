import { Routes, Route, ScrollRestoration } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import PostContent from './pages/PostContent';

function App() {
  return (
    <div className="min-h-screen flex flex-col lg:pt-0">
      {/* pt is added so content isn't hidden behind fixed header if layout relies on absolute */}
      <Header />

      {/* Persistence of scroll state */}
      <ScrollRestoration />

      {/* Routing Logic */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<PostContent />} />
        <Route path="/:category" element={<CategoryPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

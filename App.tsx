
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Lab from './pages/Lab';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/about" element={<About />} />
          <Route path="/archive" element={<div className="py-40 text-center font-serif text-3xl bg-[#fdfcf8]">El Archivo se está decantando... próximamente.</div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

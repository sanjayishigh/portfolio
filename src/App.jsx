import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

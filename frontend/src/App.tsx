import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import JobMatcher from './components/JobMatcher';
import CoverLetter from './components/CoverLetter';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<JobMatcher />} />
        <Route path="/cover-letter" element={<CoverLetter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

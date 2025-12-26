import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import JobMatcher from './components/JobMatcher';
import CoverLetter from './components/CoverLetter';
import { JobDescriptionProvider } from '@/contexts/JobDescriptionContext';

function App() {
  return (
    <JobDescriptionProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<JobMatcher />} />
          <Route path="/cover-letter" element={<CoverLetter />} />
        </Routes>
      </BrowserRouter>
    </JobDescriptionProvider>
  );
}

export default App;

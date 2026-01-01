import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import JobMatcher from './components/JobMatcher';
import CoverLetter from './components/CoverLetter';
import { JobProvider } from '@/contexts/JobContext';
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <JobProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<JobMatcher />} />
            <Route path="/cover-letter" element={<CoverLetter />} />
          </Routes>
        </BrowserRouter>
      </JobProvider>
    </ThemeProvider>
  );
}

export default App;

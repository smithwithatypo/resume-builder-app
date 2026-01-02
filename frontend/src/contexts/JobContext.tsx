import { createContext, useContext, useState, type ReactNode } from 'react';

interface JobContextType {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  resumeOutput: any;
  setResumeOutput: (value: any) => void;
  coverLetterOutput: string;
  setCoverLetterOutput: (value: string) => void;
  summary: string;
  setSummary: (value: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeOutput, setResumeOutput] = useState<any>(null);
  const [coverLetterOutput, setCoverLetterOutput] = useState('');
  const [summary, setSummary] = useState('');

  return (
    <JobContext.Provider value={{
      jobDescription,
      setJobDescription,
      resumeOutput,
      setResumeOutput,
      coverLetterOutput,
      setCoverLetterOutput,
      summary,
      setSummary
    }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJob() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJob must be used within JobProvider');
  }
  return context;
}
